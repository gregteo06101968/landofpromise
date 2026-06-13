type RegistrationRow = {
  id: number;
  status: "pending" | "confirmed" | "cancelled";
  registeredAt: Date;
  sessionId: number;
  sessionTitle: string;
  childName: string;
  childBirthdate: string | null;
  parentName: string;
  parentEmail: string;
  parentPhone: string | null;
};

const statusStyles: Record<RegistrationRow["status"], string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

export function RegistrationsTable({ registrations }: { registrations: RegistrationRow[] }) {
  if (registrations.length === 0) {
    return <p className="text-sm text-slate-500">No registrations yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-navy-deep/5">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Session
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Child
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Birthdate
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Parent
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Contact
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Status
            </th>
            <th className="px-4 py-2 text-left font-medium text-navy-deep">
              Registered
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td className="px-4 py-2 font-medium text-slate-900">
                {registration.sessionTitle}
              </td>
              <td className="px-4 py-2 text-slate-600">{registration.childName}</td>
              <td className="px-4 py-2 text-slate-600">
                {registration.childBirthdate || "—"}
              </td>
              <td className="px-4 py-2 text-slate-600">{registration.parentName}</td>
              <td className="px-4 py-2 text-slate-600">
                <div>{registration.parentEmail}</div>
                {registration.parentPhone && <div>{registration.parentPhone}</div>}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[registration.status]}`}
                >
                  {registration.status}
                </span>
              </td>
              <td className="px-4 py-2 text-slate-600">
                {registration.registeredAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
