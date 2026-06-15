import Link from "next/link";
import { deleteObjective } from "@/lib/actions/objectives";

type ObjectiveRow = {
  id: number;
  weekNumber: number;
  title: string;
  description: string | null;
};

export function ObjectivesList({
  objectives,
  communitySessionId,
}: {
  objectives: ObjectiveRow[];
  communitySessionId: number;
}) {
  if (objectives.length === 0) {
    return <p className="text-sm text-slate-500">No objectives added yet.</p>;
  }

  return (
    <>
      {/* Card layout for small screens */}
      <div className="flex flex-col gap-3 sm:hidden">
        {objectives.map((objective) => (
          <div key={objective.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-slate-900">
                Week {objective.weekNumber}: {objective.title}
              </p>
            </div>
            {objective.description && (
              <p className="mt-1 text-sm text-slate-600">{objective.description}</p>
            )}
            <div className="mt-3 flex items-center gap-3">
              <Link
                href={`/admin/dashboard/sessions/${communitySessionId}/objectives/${objective.id}/start`}
                className="text-sm font-medium text-navy-deep hover:underline"
              >
                Start
              </Link>
              <Link
                href={`/admin/dashboard/sessions/${communitySessionId}/objectives/${objective.id}/history`}
                className="text-sm font-medium text-navy-deep hover:underline"
              >
                History
              </Link>
              <form action={deleteObjective.bind(null, objective.id, communitySessionId)}>
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
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Week</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Description</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {objectives.map((objective) => (
              <tr key={objective.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-900">{objective.weekNumber}</td>
                <td className="px-6 py-3 text-slate-900">{objective.title}</td>
                <td className="px-6 py-3 text-slate-600">{objective.description || "—"}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/dashboard/sessions/${communitySessionId}/objectives/${objective.id}/start`}
                      className="text-sm font-medium text-navy-deep hover:underline"
                    >
                      Start
                    </Link>
                    <Link
                      href={`/admin/dashboard/sessions/${communitySessionId}/objectives/${objective.id}/history`}
                      className="text-sm font-medium text-navy-deep hover:underline"
                    >
                      History
                    </Link>
                    <form action={deleteObjective.bind(null, objective.id, communitySessionId)}>
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
    </>
  );
}
