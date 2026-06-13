"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";
import { db } from "@/db";
import { sessionMedia } from "@/db/schema";
import { auth } from "@/lib/auth";
import { mediaCaptionSchema } from "@/lib/validation/session-detail";
import type { ActionState } from "./types";

export async function uploadMedia(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const communitySessionId = Number(formData.get("communitySessionId"));
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose a file to upload" };
  }

  const isVideo = file.type.startsWith("video/");
  if (!file.type.startsWith("image/") && !isVideo) {
    return { error: "Only image or video files are supported" };
  }

  const captionParsed = mediaCaptionSchema.safeParse(formData.get("caption"));
  if (!captionParsed.success) {
    return { error: "Invalid caption" };
  }

  const blob = await put(`sessions/${communitySessionId}/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  await db.insert(sessionMedia).values({
    communitySessionId,
    url: blob.url,
    type: isVideo ? "video" : "photo",
    caption: captionParsed.data,
    uploadedByAdminId: Number(session.user.id),
  });

  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/media`);
  return { success: true };
}

export async function deleteMedia(id: number, communitySessionId: number, url: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.delete(sessionMedia).where(eq(sessionMedia.id, id));
  await del(url);

  revalidatePath(`/admin/dashboard/sessions/${communitySessionId}/media`);
}
