import { notFound } from "next/navigation";
import { StartSessionForm } from "@/components/admin/StartSessionForm";
import { SessionTabs } from "@/components/admin/SessionTabs";
import { getAttendanceForDate, getCommunitySessionById, getSessionObjectiveById } from "@/db/queries";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default async function StartSessionPage({
  params,
}: {
  params: Promise<{ id: string; objectiveId: string }>;
}) {
  const { id, objectiveId } = await params;
  const sessionId = Number(id);
  const sessionObjectiveId = Number(objectiveId);

  const [session, objective, rows] = await Promise.all([
    getCommunitySessionById(sessionId),
    getSessionObjectiveById(sessionObjectiveId),
    getAttendanceForDate(sessionId, todayIso()),
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
        <h2 className="font-display text-xl font-semibold text-navy-deep">{objective.title}</h2>
      </div>

      <StartSessionForm
        communitySessionId={sessionId}
        sessionObjectiveId={sessionObjectiveId}
        rows={rows}
      />
    </div>
  );
}
