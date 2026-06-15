"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { children, communitySessions, parents, registrations } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  registrationEditFormSchema,
  registrationFormSchema,
  type RegistrationFormValues,
} from "@/lib/validation/registration";
import type { ActionState } from "./types";

function parseRegistrationForm(formData: FormData) {
  const childNames = formData.getAll("childFullName");
  const childBirthdates = formData.getAll("childBirthdate");

  return registrationFormSchema.safeParse({
    communitySessionId: formData.get("communitySessionId"),
    parentName: formData.get("parentName"),
    parentEmail: formData.get("parentEmail"),
    parentPhone: formData.get("parentPhone"),
    children: childNames.map((fullName, i) => ({
      fullName,
      birthdate: childBirthdates[i],
    })),
  });
}

async function insertRegistration({
  communitySessionId,
  parentName,
  parentEmail,
  parentPhone,
  children: childInputs,
}: RegistrationFormValues) {
  await db.transaction(async (tx) => {
    const [parent] = await tx
      .insert(parents)
      .values({ name: parentName, email: parentEmail, phone: parentPhone })
      .onConflictDoUpdate({
        target: parents.email,
        set: { name: parentName, phone: parentPhone },
      })
      .returning();

    for (const child of childInputs) {
      const [insertedChild] = await tx
        .insert(children)
        .values({
          parentId: parent.id,
          fullName: child.fullName,
          birthdate: child.birthdate,
        })
        .returning();

      await tx
        .insert(registrations)
        .values({
          childId: insertedChild.id,
          communitySessionId,
          parentId: parent.id,
        })
        .onConflictDoNothing();
    }
  });
}

export async function registerForSession(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseRegistrationForm(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const [session] = await db
    .select()
    .from(communitySessions)
    .where(
      and(
        eq(communitySessions.id, parsed.data.communitySessionId),
        eq(communitySessions.isActive, true),
      ),
    );

  if (!session) {
    return { error: "This community session is not available for registration" };
  }

  await insertRegistration(parsed.data);

  redirect("/register/success");
}

export async function adminRegisterForSession(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = parseRegistrationForm(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const [communitySession] = await db
    .select()
    .from(communitySessions)
    .where(eq(communitySessions.id, parsed.data.communitySessionId));

  if (!communitySession) {
    return { error: "Community session not found" };
  }

  await insertRegistration(parsed.data);

  return { success: true };
}

export async function updateRegistration(
  id: number,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = registrationEditFormSchema.safeParse({
    parentName: formData.get("parentName"),
    parentEmail: formData.get("parentEmail"),
    parentPhone: formData.get("parentPhone"),
    childFullName: formData.get("childFullName"),
    childBirthdate: formData.get("childBirthdate"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const [registration] = await db
    .select({ childId: registrations.childId, parentId: registrations.parentId })
    .from(registrations)
    .where(eq(registrations.id, id));

  if (!registration) {
    return { error: "Registration not found" };
  }

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(children)
        .set({
          fullName: parsed.data.childFullName,
          birthdate: parsed.data.childBirthdate,
        })
        .where(eq(children.id, registration.childId));

      await tx
        .update(parents)
        .set({
          name: parsed.data.parentName,
          email: parsed.data.parentEmail,
          phone: parsed.data.parentPhone,
        })
        .where(eq(parents.id, registration.parentId));
    });
  } catch (err) {
    const code = (err as { cause?: { code?: string } })?.cause?.code;
    if (code === "23505") {
      return { error: "Another parent already uses this email address" };
    }
    throw err;
  }

  revalidatePath("/admin/dashboard/registrations");
  redirect("/admin/dashboard/registrations");
}

export async function deleteRegistration(id: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.delete(registrations).where(eq(registrations.id, id));

  revalidatePath("/admin/dashboard/registrations");
}
