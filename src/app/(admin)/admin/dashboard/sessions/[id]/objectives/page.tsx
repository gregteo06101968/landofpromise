import { notFound } from "next/navigation";
import { ObjectiveForm } from "@/components/admin/ObjectiveForm";
import { ObjectivesList } from "@/components/admin/ObjectivesList";
import { SessionTabs } from "@/components/admin/SessionTabs";
import { getCommunitySessionById, getSessionObjectives } from "@/db/queries";

export default async function SessionObjectivesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionId = Number(id);

  const [session, objectives] = await Promise.all([
    getCommunitySessionById(sessionId),
    getSessionObjectives(sessionId),
  ]);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-navy-deep">{session.title}</h1>
      <SessionTabs sessionId={sessionId} active="objectives" />

      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-semibold text-navy-deep">Weekly Objectives</h2>
        <ObjectivesList objectives={objectives} communitySessionId={sessionId} />
      </div>

      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-semibold text-navy-deep">Add Objective</h2>
        <ObjectiveForm communitySessionId={sessionId} />
      </div>
    </div>
  );
}
