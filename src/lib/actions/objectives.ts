"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { sessionObjectives } from "@/db/schema";
import { auth } from "@/lib/auth";
import { objectiveFormSchema } from "@/lib/validation/session-detail";
import type { ActionState } from "./types";

export async function createObjective(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const communitySessionId = Number(formData.get("communitySessionId"));

  const parsed = objectiveFormSchema.safeParse({
    weekNumber: formData.get("weekNumber"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await db.insert(sessionObjectives).values({
      communitySessionId,
      ...parsed.data,
    });
  } catch (err) {
    const code = (err as { cause?: { code?: string } })?.cause?.code;
    if (code === "23505") {
      return { error: `Week ${parsed.data.weekNumber} already has an objective` };
    }
    throw err;
  }

  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/objectives`);
  return { success: true };
}

export async function deleteObjective(id: number, communitySessionId: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.delete(sessionObjectives).where(eq(sessionObjectives.id, id));

  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/objectives`);
}
