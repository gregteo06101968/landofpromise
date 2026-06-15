import Link from "next/link";
import { deleteRegistration } from "@/lib/actions/registration";

type RegistrationRow = {
  id: number;
  childName: string;
  parentName: string;
};

export function RegistrationsTable({ registrations }: { registrations: RegistrationRow[] }) {
  if (registrations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-slate-500">No registrations yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Child
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Parent
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {registrations.map((registration) => (
            <tr key={registration.id} className="transition hover:bg-slate-50">
              <td className="px-6 py-3 font-medium text-slate-900">{registration.childName}</td>
              <td className="px-6 py-3 text-slate-600">{registration.parentName}</td>
              <td className="px-6 py-3 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/dashboard/registrations/${registration.id}/edit`}
                    className="text-sm font-medium text-navy-deep hover:underline"
                  >
                    Edit
                  </Link>
                  <form action={deleteRegistration.bind(null, registration.id)}>
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
