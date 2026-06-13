import { deleteProgressAssessment } from "@/lib/actions/progress";

type ProgressRow = {
  id: number;
  rating: string;
  notes: string | null;
  createdAt: Date;
  createdByName: string | null;
  createdByEmail: string | null;
};

const ratingLabels: Record<string, string> = {
  needs_improvement: "Needs Improvement",
  developing: "Developing",
  meets_expectations: "Meets Expectations",
  exceeds_expectations: "Exceeds Expectations",
};

export function ProgressList({
  assessments,
  sessionId,
  registrationId,
}: {
  assessments: ProgressRow[];
  sessionId: number;
  registrationId: number;
}) {
  if (assessments.length === 0) {
    return <p className="text-sm text-slate-500">No progress assessments recorded yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {assessments.map((assessment) => (
        <li key={assessment.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-navy-deep">
                {ratingLabels[assessment.rating] ?? assessment.rating}
              </p>
              {assessment.notes && <p className="mt-1 text-sm text-slate-900">{assessment.notes}</p>}
            </div>
            <form action={deleteProgressAssessment.bind(null, assessment.id, sessionId, registrationId)}>
              <button type="submit" className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700">
                Delete
              </button>
            </form>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {assessment.createdAt.toLocaleString()}
            {assessment.createdByName || assessment.createdByEmail
              ? ` · ${assessment.createdByName || assessment.createdByEmail}`
              : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
