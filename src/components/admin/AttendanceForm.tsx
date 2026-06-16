type AttendanceRow = {
  registrationId: number;
  childName: string;
  present: boolean | null;
};

export function AttendanceForm({
  rows,
}: {
  communitySessionId: number;
  attendanceDate: string;
  rows: AttendanceRow[];
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-slate-500">No registered children for this session.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Child</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.registrationId} className="transition hover:bg-slate-50">
              <td className="px-6 py-3 font-medium text-slate-900">{row.childName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
