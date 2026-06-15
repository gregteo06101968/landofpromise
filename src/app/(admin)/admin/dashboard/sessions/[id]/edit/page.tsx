import { notFound } from "next/navigation";
import { SessionForm } from "@/components/admin/SessionForm";
import { SessionTabs } from "@/components/admin/SessionTabs";
import { SessionRegistrationsTable } from "@/components/admin/SessionRegistrationsTable";
import { getCommunitySessionById, getRegistrationsForSession } from "@/db/queries";
import { setCommunitySessionActive, updateCommunitySession } from "@/lib/actions/sessions";

export default async function EditCommunitySessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionId = Number(id);

  const [session, registrations] = await Promise.all([
    getCommunitySessionById(sessionId),
    getRegistrationsForSession(sessionId),
  ]);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy-deep">
          Edit Community Session
        </h1>
        <form action={setCommunitySessionActive.bind(null, sessionId, !session.isActive)}>
          <button
            type="submit"
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-deep hover:bg-slate-50"
          >
            {session.isActive ? "Deactivate" : "Activate"}
          </button>
        </form>
      </div>

      <SessionTabs sessionId={sessionId} active="edit" />

      <SessionForm action={updateCommunitySession.bind(null, sessionId)} session={session} />

      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-semibold text-navy-deep">
          Registrations ({registrations.length})
        </h2>
        <SessionRegistrationsTable sessionId={sessionId} registrations={registrations} />
      </div>
    </div>
  );
}
