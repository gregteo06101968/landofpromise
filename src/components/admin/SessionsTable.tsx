import Link from "next/link";
import type { communitySessions } from "@/db/schema";

type CommunitySession = typeof communitySessions.$inferSelect;

export function SessionsTable({ sessions }: { sessions: CommunitySession[] }) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-slate-500">
          No community sessions yet. Create one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Schedule
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Capacity
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sessions.map((session) => (
            <tr key={session.id} className="transition hover:bg-slate-50">
              <td className="px-6 py-3 font-medium text-slate-900">
                {session.title}
              </td>
              <td className="px-6 py-3 text-slate-600">
                {session.schedule || "—"}
              </td>
              <td className="px-6 py-3 text-slate-600">
                {session.capacity ?? "Unlimited"}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    session.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      session.isActive ? "bg-green-500" : "bg-slate-400"
                    }`}
                  />
                  {session.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-3 text-right">
                <Link
                  href={`/admin/dashboard/sessions/${session.id}/edit`}
                  className="inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-sm font-medium text-navy-deep transition hover:bg-navy-deep/5 hover:text-navy-light"
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
