"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { classSessions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { sessionFormSchema } from "@/lib/validation/session";
import type { ActionState } from "./types";

function parseSessionForm(formData: FormData) {
  return sessionFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    schedule: formData.get("schedule"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    capacity: formData.get("capacity"),
    isActive: formData.get("isActive"),
  });
}

export async function createClassSession(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = parseSessionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db.insert(classSessions).values({
    ...parsed.data,
    createdByAdminId: Number(session.user.id),
  });

  redirect("/admin/dashboard");
}

export async function updateClassSession(
  id: number,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = parseSessionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db
    .update(classSessions)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(classSessions.id, id));

  redirect("/admin/dashboard");
}

export async function setClassSessionActive(id: number, isActive: boolean) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db
    .update(classSessions)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(classSessions.id, id));

  redirect("/admin/dashboard");
}
