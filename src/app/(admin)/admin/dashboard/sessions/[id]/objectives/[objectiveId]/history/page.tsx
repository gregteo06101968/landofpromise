import { notFound } from "next/navigation";
import { SessionRunsList } from "@/components/admin/SessionRunsList";
import { SessionTabs } from "@/components/admin/SessionTabs";
import {
  getCommunitySessionById,
  getSessionObjectiveById,
  getSessionRunsForObjective,
} from "@/db/queries";

export default async function SessionObjectiveHistoryPage({
  params,
}: {
  params: Promise<{ id: string; objectiveId: string }>;
}) {
  const { id, objectiveId } = await params;
  const sessionId = Number(id);
  const sessionObjectiveId = Number(objectiveId);

  const [session, objective, runs] = await Promise.all([
    getCommunitySessionById(sessionId),
    getSessionObjectiveById(sessionObjectiveId),
    getSessionRunsForObjective(sessionObjectiveId),
  ]);

  if (!session || !objective || objective.communitySessionId !== sessionId) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-navy-deep">{session.title}</h1>
      <SessionTabs sessionId={sessionId} active="objectives" />

      <div>
        <p className="text-sm font-medium uppercase text-slate-500">Week {objective.weekNumber}</p>
        <h2 className="font-display text-xl font-semibold text-navy-deep">
          {objective.title} — Session History
        </h2>
      </div>

      <SessionRunsList runs={runs} communitySessionId={sessionId} sessionObjectiveId={sessionObjectiveId} />
    </div>
  );
}
