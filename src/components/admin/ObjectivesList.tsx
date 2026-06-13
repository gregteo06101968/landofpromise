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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-navy-deep/5">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">Week</th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">Title</th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">Description</th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {objectives.map((objective) => (
            <tr key={objective.id}>
              <td className="px-4 py-2 font-medium text-slate-900">{objective.weekNumber}</td>
              <td className="px-4 py-2 text-slate-900">{objective.title}</td>
              <td className="px-4 py-2 text-slate-600">{objective.description || "—"}</td>
              <td className="px-4 py-2 text-right">
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
  );
}
