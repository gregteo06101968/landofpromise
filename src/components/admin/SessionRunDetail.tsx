import { StatCard } from "@/components/admin/StatCard";

type SessionRunDetailRow = {
  registrationId: number;
  childName: string;
  present: boolean | null;
  note: string | null;
  checkedReviewQuestionIds: number[];
};

type ReviewQuestion = {
  id: number;
  question: string;
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
  reviewQuestions,
}: {
  startedAt: Date;
  endedAt: Date;
  durationSeconds: number;
  rows: SessionRunDetailRow[];
  reviewQuestions: ReviewQuestion[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Started" value={new Date(startedAt).toLocaleString()} />
        <StatCard label="Ended" value={new Date(endedAt).toLocaleString()} />
        <StatCard label="Duration" value={formatDuration(durationSeconds)} />
      </div>

      {/* Card layout for small screens */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map((row) => (
          <div key={row.registrationId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-slate-900">{row.childName}</p>
              <span className={`text-sm font-medium ${row.present ? "text-green-600" : "text-slate-400"}`}>
                {row.present ? "Present" : "Absent"}
              </span>
            </div>
            {row.note && <p className="mt-2 text-sm text-slate-600">{row.note}</p>}
            {reviewQuestions.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
                {reviewQuestions.map((question) => (
                  <li key={question.id} className="flex items-center gap-2">
                    <span aria-hidden>
                      {row.checkedReviewQuestionIds.includes(question.id) ? "☑" : "☐"}
                    </span>
                    {question.question}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Table layout for larger screens */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
        <table className="w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Child</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Remark</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Checklist</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.registrationId} className="transition hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-900">{row.childName}</td>
                <td className="px-6 py-3 text-slate-600">{row.present ? "Present" : "Absent"}</td>
                <td className="px-6 py-3 text-slate-600">{row.note || "—"}</td>
                <td className="px-6 py-3 text-slate-600">
                  {reviewQuestions.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {reviewQuestions.map((question) => (
                        <li key={question.id} className="flex items-center gap-2">
                          <span aria-hidden>
                            {row.checkedReviewQuestionIds.includes(question.id) ? "☑" : "☐"}
                          </span>
                          {question.question}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
