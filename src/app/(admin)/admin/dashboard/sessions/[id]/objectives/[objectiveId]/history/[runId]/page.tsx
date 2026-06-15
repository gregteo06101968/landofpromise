import Link from "next/link";
import { notFound } from "next/navigation";
import { SessionRunDetail } from "@/components/admin/SessionRunDetail";
import { SessionTabs } from "@/components/admin/SessionTabs";
import { getCommunitySessionById, getSessionObjectiveById, getSessionRunDetail } from "@/db/queries";

export default async function SessionRunDetailPage({
  params,
}: {
  params: Promise<{ id: string; objectiveId: string; runId: string }>;
}) {
  const { id, objectiveId, runId } = await params;
  const sessionId = Number(id);
  const sessionObjectiveId = Number(objectiveId);

  const [session, objective, run] = await Promise.all([
    getCommunitySessionById(sessionId),
    getSessionObjectiveById(sessionObjectiveId),
    getSessionRunDetail(Number(runId)),
  ]);

  if (
    !session ||
    !objective ||
    !run ||
    objective.communitySessionId !== sessionId ||
    run.sessionObjectiveId !== sessionObjectiveId
  ) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-navy-deep">{session.title}</h1>
      <SessionTabs sessionId={sessionId} active="objectives" />

      <div>
        <Link
          href={`/admin/dashboard/sessions/${sessionId}/objectives/${sessionObjectiveId}/history`}
          className="text-sm font-medium text-navy-deep hover:underline"
        >
          ← Back to history
        </Link>
      </div>

      <div>
        <p className="text-sm font-medium uppercase text-slate-500">Week {objective.weekNumber}</p>
        <h2 className="font-display text-xl font-semibold text-navy-deep">{objective.title}</h2>
      </div>

      <SessionRunDetail
        startedAt={run.startedAt}
        endedAt={run.endedAt}
        durationSeconds={run.durationSeconds}
        rows={run.rows}
        reviewQuestions={run.reviewQuestions}
      />
    </div>
  );
}
