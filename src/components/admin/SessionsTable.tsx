import Link from "next/link";
import type { communitySessions } from "@/db/schema";
import { StatusBadge } from "@/components/admin/StatusBadge";

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
    <>
      {/* Card layout for small screens */}
      <div className="flex flex-col gap-3 sm:hidden">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-slate-900">{session.title}</p>
              <StatusBadge label={session.isActive ? "Active" : "Inactive"} color={session.isActive ? "green" : "slate"} />
            </div>
            <dl className="mt-2 space-y-1 text-sm text-slate-600">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Schedule</dt>
                <dd className="text-right">{session.schedule || "—"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Capacity</dt>
                <dd>{session.capacity ?? "Unlimited"}</dd>
              </div>
            </dl>
            <Link
              href={`/admin/dashboard/sessions/${session.id}/edit`}
              className="mt-3 inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-navy-deep transition hover:bg-navy-deep/5"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>

      {/* Table layout for larger screens */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
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
                  <StatusBadge label={session.isActive ? "Active" : "Inactive"} color={session.isActive ? "green" : "slate"} />
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
    </>
  );
}
