"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { attendanceRecords, objectiveSessionRuns, observations } from "@/db/schema";
import { auth } from "@/lib/auth";
import { sessionRunFormSchema, sessionRunNoteSchema } from "@/lib/validation/session-detail";
import type { ActionState } from "./types";

export async function saveSessionRun(
  communitySessionId: number,
  sessionObjectiveId: number,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = sessionRunFormSchema.safeParse({
    startedAt: formData.get("startedAt"),
    registrationIds: formData.getAll("registrationId"),
    presentIds: formData.getAll("present"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { startedAt, registrationIds, presentIds } = parsed.data;
  const presentSet = new Set(presentIds);
  const startedDate = new Date(startedAt);
  const endedDate = new Date();
  const durationSeconds = Math.max(
    0,
    Math.round((endedDate.getTime() - startedDate.getTime()) / 1000),
  );
  const attendanceDate = startedDate.toISOString().slice(0, 10);
  const adminId = Number(session.user.id);

  let runId = 0;

  await db.transaction(async (tx) => {
    const [run] = await tx
      .insert(objectiveSessionRuns)
      .values({
        sessionObjectiveId,
        communitySessionId,
        startedAt: startedDate,
        endedAt: endedDate,
        durationSeconds,
        createdByAdminId: adminId,
      })
      .returning({ id: objectiveSessionRuns.id });

    runId = run.id;

    for (const registrationId of registrationIds) {
      const present = presentSet.has(registrationId);

      await tx
        .insert(attendanceRecords)
        .values({
          registrationId,
          attendanceDate,
          present,
          sessionRunId: runId,
        })
        .onConflictDoUpdate({
          target: [attendanceRecords.registrationId, attendanceRecords.attendanceDate],
          set: { present, sessionRunId: runId },
        });

      const note = sessionRunNoteSchema.parse(formData.get(`remark-${registrationId}`));

      if (note) {
        await tx.insert(observations).values({
          registrationId,
          note,
          sessionRunId: runId,
          createdByAdminId: adminId,
        });
      }
    }
  });

  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/objectives`);
  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/attendance`);
  redirect(
    `/admin/dashboard/sessions/${communitySessionId}/objectives/${sessionObjectiveId}/history/${runId}`,
  );
}

export async function deleteSessionRun(
  id: number,
  communitySessionId: number,
  sessionObjectiveId: number,
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.delete(objectiveSessionRuns).where(eq(objectiveSessionRuns.id, id));

  revalidatePath(
    `/admin/dashboard/sessions/${communitySessionId}/objectives/${sessionObjectiveId}/history`,
  );
}
