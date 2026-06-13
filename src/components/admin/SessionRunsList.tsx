import Link from "next/link";
import { deleteSessionRun } from "@/lib/actions/sessionRuns";

type SessionRunRow = {
  id: number;
  startedAt: Date;
  endedAt: Date;
  durationSeconds: number;
  presentCount: number;
  totalCount: number;
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

export function SessionRunsList({
  runs,
  communitySessionId,
  sessionObjectiveId,
}: {
  runs: SessionRunRow[];
  communitySessionId: number;
  sessionObjectiveId: number;
}) {
  if (runs.length === 0) {
    return <p className="text-sm text-slate-500">No sessions recorded yet.</p>;
  }

  const totalRuns = runs.length;
  const avgDurationSeconds = Math.round(
    runs.reduce((sum, run) => sum + run.durationSeconds, 0) / totalRuns,
  );
  const ratedRuns = runs.filter((run) => run.totalCount > 0);
  const avgAttendanceRate = ratedRuns.length
    ? Math.round(
        (ratedRuns.reduce((sum, run) => sum + run.presentCount / run.totalCount, 0) /
          ratedRuns.length) *
          100,
      )
    : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Total sessions</p>
          <p className="font-display text-xl font-bold text-navy-deep">{totalRuns}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Average duration</p>
          <p className="font-display text-xl font-bold text-navy-deep">
            {formatDuration(avgDurationSeconds)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Average attendance</p>
          <p className="font-display text-xl font-bold text-navy-deep">
            {avgAttendanceRate === null ? "—" : `${avgAttendanceRate}%`}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-navy-deep/5">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Date</th>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Duration</th>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Attendance</th>
              <th className="px-4 py-2 text-left font-medium text-navy-deep"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {runs.map((run) => (
              <tr key={run.id}>
                <td className="px-4 py-2 font-medium text-slate-900">
                  {new Date(run.startedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-slate-600">{formatDuration(run.durationSeconds)}</td>
                <td className="px-4 py-2 text-slate-600">
                  {run.presentCount} / {run.totalCount}
                </td>
                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/dashboard/sessions/${communitySessionId}/objectives/${sessionObjectiveId}/history/${run.id}`}
                      className="text-sm font-medium text-navy-deep hover:underline"
                    >
                      View
                    </Link>
                    <form
                      action={deleteSessionRun.bind(null, run.id, communitySessionId, sessionObjectiveId)}
                    >
                      <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
