"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { observations } from "@/db/schema";
import { auth } from "@/lib/auth";
import { observationFormSchema } from "@/lib/validation/session-detail";
import type { ActionState } from "./types";

export async function addObservation(
  sessionId: number,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = observationFormSchema.safeParse({
    registrationId: formData.get("registrationId"),
    note: formData.get("note"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db.insert(observations).values({
    ...parsed.data,
    createdByAdminId: Number(session.user.id),
  });

  revalidatePath(`/admin/dashboard/sessions/${sessionId}/students/${parsed.data.registrationId}`);
  return { success: true };
}

export async function deleteObservation(id: number, sessionId: number, registrationId: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.delete(observations).where(eq(observations.id, id));

  revalidatePath(`/admin/dashboard/sessions/${sessionId}/students/${registrationId}`);
}
