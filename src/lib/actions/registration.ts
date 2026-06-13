"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { children, communitySessions, parents, registrations } from "@/db/schema";
import { registrationFormSchema } from "@/lib/validation/registration";
import type { ActionState } from "./types";

export async function registerForSession(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const childNames = formData.getAll("childFullName");
  const childBirthdates = formData.getAll("childBirthdate");

  const parsed = registrationFormSchema.safeParse({
    communitySessionId: formData.get("communitySessionId"),
    parentName: formData.get("parentName"),
    parentEmail: formData.get("parentEmail"),
    parentPhone: formData.get("parentPhone"),
    children: childNames.map((fullName, i) => ({
      fullName,
      birthdate: childBirthdates[i],
    })),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { communitySessionId, parentName, parentEmail, parentPhone, children: childInputs } =
    parsed.data;

  const [session] = await db
    .select()
    .from(communitySessions)
    .where(
      and(
        eq(communitySessions.id, communitySessionId),
        eq(communitySessions.isActive, true),
      ),
    );

  if (!session) {
    return { error: "This community session is not available for registration" };
  }

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

  redirect("/register/success");
}
