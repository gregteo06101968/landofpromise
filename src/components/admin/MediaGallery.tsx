import { deleteMedia } from "@/lib/actions/media";

type MediaRow = {
  id: number;
  url: string;
  type: "photo" | "video";
  caption: string | null;
};

export function MediaGallery({
  media,
  communitySessionId,
}: {
  media: MediaRow[];
  communitySessionId: number;
}) {
  if (media.length === 0) {
    return <p className="text-sm text-slate-500">No photos or videos uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {media.map((item) => (
        <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {item.type === "video" ? (
            <video src={item.url} controls className="h-48 w-full bg-black object-contain" />
          ) : (
            <img src={item.url} alt={item.caption ?? ""} className="h-48 w-full object-cover" />
          )}
          <div className="flex items-center justify-between gap-2 p-3">
            <p className="truncate text-sm text-slate-600">{item.caption || "—"}</p>
            <form action={deleteMedia.bind(null, item.id, communitySessionId, item.url)}>
              <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
