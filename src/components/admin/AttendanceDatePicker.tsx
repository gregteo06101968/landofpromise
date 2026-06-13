"use client";

import { useRouter } from "next/navigation";

export function AttendanceDatePicker({
  sessionId,
  date,
}: {
  sessionId: number;
  date: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="attendance-date" className="text-sm font-medium text-navy-deep">
        Date
      </label>
      <input
        id="attendance-date"
        type="date"
        defaultValue={date}
        onChange={(e) =>
          router.push(`/admin/dashboard/sessions/${sessionId}/attendance?date=${e.target.value}`)
        }
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
    </div>
  );
}
