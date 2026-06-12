import Link from "next/link";
import type { classSessions } from "@/db/schema";

type ClassSession = typeof classSessions.$inferSelect;

export function SessionsTable({ sessions }: { sessions: ClassSession[] }) {
  if (sessions.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No class sessions yet. Create one to get started.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-navy-deep/5">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Title
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Schedule
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Capacity
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Status
            </th>
            <th className="px-4 py-2 text-right font-medium text-navy-deep">
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
                  className="text-sm font-medium text-navy-deep hover:text-navy-light"
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
