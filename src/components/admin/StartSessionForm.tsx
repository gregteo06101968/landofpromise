"use client";

import { useActionState, useEffect, useState } from "react";
import { ErrorMessage, FormTextArea } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { saveSessionRun } from "@/lib/actions/sessionRuns";

type AttendanceRow = {
  registrationId: number;
  childName: string;
  present: boolean | null;
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function StartSessionForm({
  communitySessionId,
  sessionObjectiveId,
  rows,
}: {
  communitySessionId: number;
  sessionObjectiveId: number;
  rows: AttendanceRow[];
}) {
  const [state, formAction] = useActionState(
    saveSessionRun.bind(null, communitySessionId, sessionObjectiveId),
    {},
  );
  const [startedAt] = useState(() => new Date().toISOString());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const start = new Date(startedAt).getTime();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  if (rows.length === 0) {
    return <p className="text-sm text-slate-500">No registered children for this session.</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="text-sm font-medium text-navy-deep">Session timer</span>
        <span className="font-display text-2xl font-bold text-navy-deep">
          {formatDuration(elapsedSeconds)}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div
            key={row.registrationId}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <input type="hidden" name="registrationId" value={row.registrationId} />
            <label className="flex items-center gap-2 text-sm font-medium text-navy-deep">
              <input
                type="checkbox"
                name="present"
                value={row.registrationId}
                defaultChecked={row.present ?? false}
                className="h-4 w-4 rounded border-slate-300 text-gold focus:ring-gold"
              />
              {row.childName}
            </label>
            <FormTextArea label="Remark" name={`remark-${row.registrationId}`} rows={2} />
          </div>
        ))}
      </div>

      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton pendingText="Saving...">Save session</SubmitButton>
      </div>
    </form>
  );
}
