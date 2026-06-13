type SessionRunDetailRow = {
  registrationId: number;
  childName: string;
  present: boolean | null;
  note: string | null;
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

export function SessionRunDetail({
  startedAt,
  endedAt,
  durationSeconds,
  rows,
}: {
  startedAt: Date;
  endedAt: Date;
  durationSeconds: number;
  rows: SessionRunDetailRow[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Started</p>
          <p className="font-medium text-navy-deep">{new Date(startedAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Ended</p>
          <p className="font-medium text-navy-deep">{new Date(endedAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Duration</p>
          <p className="font-medium text-navy-deep">{formatDuration(durationSeconds)}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-navy-deep/5">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Child</th>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Attendance</th>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Remark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.registrationId}>
                <td className="px-4 py-2 font-medium text-slate-900">{row.childName}</td>
                <td className="px-4 py-2 text-slate-600">{row.present ? "Present" : "Absent"}</td>
                <td className="px-4 py-2 text-slate-600">{row.note || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
