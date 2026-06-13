import { deleteObservation } from "@/lib/actions/observations";

type ObservationRow = {
  id: number;
  note: string;
  createdAt: Date;
  createdByName: string | null;
  createdByEmail: string | null;
};

export function ObservationsList({
  observations,
  sessionId,
  registrationId,
}: {
  observations: ObservationRow[];
  sessionId: number;
  registrationId: number;
}) {
  if (observations.length === 0) {
    return <p className="text-sm text-slate-500">No observations recorded yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {observations.map((observation) => (
        <li key={observation.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-slate-900">{observation.note}</p>
            <form action={deleteObservation.bind(null, observation.id, sessionId, registrationId)}>
              <button type="submit" className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700">
                Delete
              </button>
            </form>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {observation.createdAt.toLocaleString()}
            {observation.createdByName || observation.createdByEmail
              ? ` · ${observation.createdByName || observation.createdByEmail}`
              : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
