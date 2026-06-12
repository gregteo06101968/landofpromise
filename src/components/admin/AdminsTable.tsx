type AdminRow = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
};

export function AdminsTable({ admins }: { admins: AdminRow[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-slate-600">
              Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-600">
              Email
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-600">
              Added
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="px-4 py-2 font-medium text-slate-900">
                {admin.name || "—"}
              </td>
              <td className="px-4 py-2 text-slate-600">{admin.email}</td>
              <td className="px-4 py-2 text-slate-600">
                {admin.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
