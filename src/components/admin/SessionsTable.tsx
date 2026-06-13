import Link from "next/link";
import type { communitySessions } from "@/db/schema";

type CommunitySession = typeof communitySessions.$inferSelect;

export function SessionsTable({ sessions }: { sessions: CommunitySession[] }) {
  if (sessions.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No community sessions yet. Create one to get started.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-slate-600">
              Title
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-600">
              Schedule
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-600">
              Capacity
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-600">
              Status
            </th>
            <th className="px-4 py-2 text-right font-medium text-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sessions.map((session) => (
            <tr key={session.id}>
              <td className="px-4 py-2 font-medium text-slate-900">
                {session.title}
              </td>
              <td className="px-4 py-2 text-slate-600">
                {session.schedule || "—"}
              </td>
              <td className="px-4 py-2 text-slate-600">
                {session.capacity ?? "Unlimited"}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    session.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {session.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-2 text-right">
                <Link
                  href={`/admin/dashboard/sessions/${session.id}/edit`}
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
