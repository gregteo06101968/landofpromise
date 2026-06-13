import { notFound } from "next/navigation";
import { MediaGallery } from "@/components/admin/MediaGallery";
import { MediaUploadForm } from "@/components/admin/MediaUploadForm";
import { SessionTabs } from "@/components/admin/SessionTabs";
import { getCommunitySessionById, getSessionMedia } from "@/db/queries";

export default async function SessionMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionId = Number(id);

  const [session, media] = await Promise.all([
    getCommunitySessionById(sessionId),
    getSessionMedia(sessionId),
  ]);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-navy-deep">{session.title}</h1>
      <SessionTabs sessionId={sessionId} active="media" />

      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-semibold text-navy-deep">Upload</h2>
        <MediaUploadForm communitySessionId={sessionId} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-semibold text-navy-deep">Photos & Videos</h2>
        <MediaGallery media={media} communitySessionId={sessionId} />
      </div>
    </div>
  );
}
