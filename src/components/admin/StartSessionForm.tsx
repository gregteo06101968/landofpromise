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

type ReviewQuestion = {
  id: number;
  question: string;
};

export function StartSessionForm({
  communitySessionId,
  sessionObjectiveId,
  rows,
  reviewQuestions,
}: {
  communitySessionId: number;
  sessionObjectiveId: number;
  rows: AttendanceRow[];
  reviewQuestions: ReviewQuestion[];
}) {
  const [state, formAction] = useActionState(
    saveSessionRun.bind(null, communitySessionId, sessionObjectiveId),
    {},
  );
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
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
      {startedAt && <input type="hidden" name="startedAt" value={startedAt} />}

      {!startedAt ? (
        <button
          type="button"
          onClick={() => setStartedAt(new Date().toISOString())}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-navy-deep to-navy-light px-4 py-3 text-sm font-semibold text-cream shadow-sm transition hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M8 5v14l11-7z" />
          </svg>
          Start Observation
        </button>
      ) : (
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <span className="text-sm font-medium text-navy-deep">Observation in progress</span>
            <span className="ml-auto font-mono text-xs text-slate-400">{formatDuration(elapsedSeconds)}</span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-navy-deep via-gold to-navy-light" />
          </div>
        </div>
      )}

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
            {reviewQuestions.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-navy-deep">Checklist</span>
                {reviewQuestions.map((question) => (
                  <label key={question.id} className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      name={`reviewQuestion-${row.registrationId}-${question.id}`}
                      className="h-4 w-4 rounded border-slate-300 text-gold focus:ring-gold"
                    />
                    {question.question}
                  </label>
                ))}
              </div>
            )}
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
