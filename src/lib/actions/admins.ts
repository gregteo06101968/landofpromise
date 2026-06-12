"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { auth } from "@/lib/auth";
import { adminFormSchema } from "@/lib/validation/admin";
import type { ActionState } from "./types";

export async function createAdmin(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const parsed = adminFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, email, password } = parsed.data;

  const [existing] = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, email));

  if (existing) {
    return { error: "An admin with that email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(admins).values({
    email,
    name: name || null,
    passwordHash,
  });

  revalidatePath("/admin/dashboard/admins");
  return { success: true };
}
