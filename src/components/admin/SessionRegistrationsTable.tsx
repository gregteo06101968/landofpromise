import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";

type SessionRegistrationRow = {
  id: number;
  status: "pending" | "confirmed" | "cancelled";
  childName: string;
  childBirthdate: string | null;
  parentName: string;
  parentEmail: string;
  parentPhone: string | null;
};

const statusColors: Record<SessionRegistrationRow["status"], "green" | "yellow" | "red"> = {
  confirmed: "green",
  pending: "yellow",
  cancelled: "red",
};

export function SessionRegistrationsTable({
  sessionId,
  registrations,
}: {
  sessionId: number;
  registrations: SessionRegistrationRow[];
}) {
  if (registrations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-slate-500">No registrations yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Card layout for small screens */}
      <div className="flex flex-col gap-3 sm:hidden">
        {registrations.map((registration) => (
          <div key={registration.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/admin/dashboard/sessions/${sessionId}/students/${registration.id}`}
                className="font-medium text-navy-deep hover:underline"
              >
                {registration.childName}
              </Link>
              <StatusBadge label={registration.status} color={statusColors[registration.status]} />
            </div>
            <dl className="mt-2 space-y-1 text-sm text-slate-600">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Birthdate</dt>
                <dd>{registration.childBirthdate || "—"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Parent</dt>
                <dd className="text-right">{registration.parentName}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Contact</dt>
                <dd className="text-right">
                  <div>{registration.parentEmail}</div>
                  {registration.parentPhone && <div>{registration.parentPhone}</div>}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* Table layout for larger screens */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
        <table className="w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Child
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Birthdate
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Parent
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {registrations.map((registration) => (
              <tr key={registration.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-900">
                  <Link
                    href={`/admin/dashboard/sessions/${sessionId}/students/${registration.id}`}
                    className="text-navy-deep hover:underline"
                  >
                    {registration.childName}
                  </Link>
                </td>
                <td className="px-6 py-3 text-slate-600">{registration.childBirthdate || "—"}</td>
                <td className="px-6 py-3 text-slate-600">{registration.parentName}</td>
                <td className="px-6 py-3 text-slate-600">
                  <div>{registration.parentEmail}</div>
                  {registration.parentPhone && <div>{registration.parentPhone}</div>}
                </td>
                <td className="px-6 py-3">
                  <StatusBadge label={registration.status} color={statusColors[registration.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
