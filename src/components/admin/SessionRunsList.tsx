import Link from "next/link";
import { deleteSessionRun } from "@/lib/actions/sessionRuns";
import { StatCard } from "@/components/admin/StatCard";

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
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Total sessions" value={totalRuns} />
        <StatCard label="Average duration" value={formatDuration(avgDurationSeconds)} />
        <StatCard
          label="Average attendance"
          value={avgAttendanceRate === null ? "—" : `${avgAttendanceRate}%`}
        />
      </div>

      {/* Card layout for small screens */}
      <div className="flex flex-col gap-3 sm:hidden">
        {runs.map((run) => (
          <div key={run.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-medium text-slate-900">{new Date(run.startedAt).toLocaleString()}</p>
            <dl className="mt-2 space-y-1 text-sm text-slate-600">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Duration</dt>
                <dd>{formatDuration(run.durationSeconds)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Attendance</dt>
                <dd>
                  {run.presentCount} / {run.totalCount}
                </dd>
              </div>
            </dl>
            <div className="mt-3 flex items-center gap-3">
              <Link
                href={`/admin/dashboard/sessions/${communitySessionId}/objectives/${sessionObjectiveId}/history/${run.id}`}
                className="text-sm font-medium text-navy-deep hover:underline"
              >
                View
              </Link>
              <form action={deleteSessionRun.bind(null, run.id, communitySessionId, sessionObjectiveId)}>
                <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Table layout for larger screens */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
        <table className="w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Attendance</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {runs.map((run) => (
              <tr key={run.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-900">
                  {new Date(run.startedAt).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-slate-600">{formatDuration(run.durationSeconds)}</td>
                <td className="px-6 py-3 text-slate-600">
                  {run.presentCount} / {run.totalCount}
                </td>
                <td className="px-6 py-3 text-right">
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
