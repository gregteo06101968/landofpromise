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
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {registrations.map((registration) => (
            <tr key={registration.id} className="transition hover:bg-slate-50">
              <td className="px-6 py-3 font-medium text-slate-900">{registration.childName}</td>
              <td className="px-6 py-3 text-slate-600">{registration.parentName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
