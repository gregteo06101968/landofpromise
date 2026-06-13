"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { progressAssessments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { progressAssessmentFormSchema } from "@/lib/validation/session-detail";
import type { ActionState } from "./types";

export async function addProgressAssessment(
  sessionId: number,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = progressAssessmentFormSchema.safeParse({
    registrationId: formData.get("registrationId"),
    rating: formData.get("rating"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db.insert(progressAssessments).values({
    ...parsed.data,
    createdByAdminId: Number(session.user.id),
  });

  revalidatePath(`/admin/dashboard/sessions/${sessionId}/students/${parsed.data.registrationId}`);
  return { success: true };
}

export async function deleteProgressAssessment(id: number, sessionId: number, registrationId: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.delete(progressAssessments).where(eq(progressAssessments.id, id));

  revalidatePath(`/admin/dashboard/sessions/${sessionId}/students/${registrationId}`);
}
