"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { attendanceRecords, children, registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { attendanceFormSchema } from "@/lib/validation/session-detail";
import type { ActionState } from "./types";

export async function saveAttendance(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const communitySessionId = Number(formData.get("communitySessionId"));

  const parsed = attendanceFormSchema.safeParse({
    attendanceDate: formData.get("attendanceDate"),
    registrationIds: formData.getAll("present"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { attendanceDate, registrationIds } = parsed.data;
  const presentSet = new Set(registrationIds);

  const sessionRegistrations = await db
    .select({ id: registrations.id })
    .from(registrations)
    .where(eq(registrations.communitySessionId, communitySessionId));

  await db.transaction(async (tx) => {
    for (const { id } of sessionRegistrations) {
      await tx
        .insert(attendanceRecords)
        .values({
          registrationId: id,
          attendanceDate,
          present: presentSet.has(id),
        })
        .onConflictDoUpdate({
          target: [attendanceRecords.registrationId, attendanceRecords.attendanceDate],
          set: { present: presentSet.has(id) },
        });
    }
  });

  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/attendance`);
  return { success: true };
}

export async function addChildToSession(communitySessionId: number, childId: number) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [child] = await db
    .select({ parentId: children.parentId })
    .from(children)
    .where(eq(children.id, childId));

  if (!child) {
    throw new Error("Child not found");
  }

  await db
    .insert(registrations)
    .values({
      childId,
      communitySessionId,
      parentId: child.parentId,
    })
    .onConflictDoNothing();

  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/attendance`);
  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/edit`);
}
