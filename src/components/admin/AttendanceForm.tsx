"use client";

import { useActionState } from "react";
import { ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { saveAttendance } from "@/lib/actions/attendance";

type AttendanceRow = {
  registrationId: number;
  childName: string;
  present: boolean | null;
};

export function AttendanceForm({
  communitySessionId,
  attendanceDate,
  rows,
}: {
  communitySessionId: number;
  attendanceDate: string;
  rows: AttendanceRow[];
}) {
  const [state, formAction] = useActionState(saveAttendance, {});

  if (rows.length === 0) {
    return <p className="text-sm text-slate-500">No registered children for this session.</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="communitySessionId" value={communitySessionId} />
      <input type="hidden" name="attendanceDate" value={attendanceDate} />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-navy-deep/5">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Child</th>
              <th className="px-4 py-2 text-left font-medium text-navy-deep">Present</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.registrationId}>
                <td className="px-4 py-2 font-medium text-slate-900">{row.childName}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    name="present"
                    value={row.registrationId}
                    defaultChecked={row.present ?? false}
                    className="h-4 w-4 rounded border-slate-300 text-gold focus:ring-gold"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton pendingText="Saving...">Save attendance</SubmitButton>
      </div>
    </form>
  );
}
