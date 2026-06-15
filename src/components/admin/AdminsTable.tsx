type AdminRow = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
};

export function AdminsTable({ admins }: { admins: AdminRow[] }) {
  if (admins.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-slate-500">No admins yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Card layout for small screens */}
      <div className="flex flex-col gap-3 sm:hidden">
        {admins.map((admin) => (
          <div key={admin.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-medium text-slate-900">{admin.name || "—"}</p>
            <p className="mt-1 text-sm text-slate-600">{admin.email}</p>
            <p className="mt-2 text-xs text-slate-400">
              Added {admin.createdAt.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Table layout for larger screens */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
        <table className="w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Added
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {admins.map((admin) => (
              <tr key={admin.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-900">{admin.name || "—"}</td>
                <td className="px-6 py-3 text-slate-600">{admin.email}</td>
                <td className="px-6 py-3 text-slate-600">{admin.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
