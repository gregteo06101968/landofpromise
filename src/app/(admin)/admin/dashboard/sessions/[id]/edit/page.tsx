import { notFound } from "next/navigation";
import { SessionForm } from "@/components/admin/SessionForm";
import { getClassSessionById, getRegistrationsForSession } from "@/db/queries";
import { setClassSessionActive, updateClassSession } from "@/lib/actions/sessions";

export default async function EditClassSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionId = Number(id);

  const [session, registrations] = await Promise.all([
    getClassSessionById(sessionId),
    getRegistrationsForSession(sessionId),
  ]);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy-deep">
          Edit Class Session
        </h1>
        <form action={setClassSessionActive.bind(null, sessionId, !session.isActive)}>
          <button
            type="submit"
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-navy-deep hover:bg-slate-50"
          >
            {session.isActive ? "Deactivate" : "Activate"}
          </button>
        </form>
      </div>

      <SessionForm action={updateClassSession.bind(null, sessionId)} session={session} />

      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-semibold text-navy-deep">
          Registrations ({registrations.length})
        </h2>
        {registrations.length === 0 ? (
          <p className="text-sm text-slate-500">No registrations yet.</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-navy-deep/5">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-navy-deep">
                    Child
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-navy-deep">
                    Birthdate
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-navy-deep">
                    Parent
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-navy-deep">
                    Contact
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-navy-deep">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td className="px-4 py-2 font-medium text-slate-900">
                      {registration.childName}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {registration.childBirthdate || "—"}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {registration.parentName}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      <div>{registration.parentEmail}</div>
                      {registration.parentPhone && (
                        <div>{registration.parentPhone}</div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-slate-600 capitalize">
                      {registration.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
