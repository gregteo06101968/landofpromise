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
        <h1 className="text-2xl font-semibold text-slate-900">
          Edit Class Session
        </h1>
        <form action={setClassSessionActive.bind(null, sessionId, !session.isActive)}>
          <button
            type="submit"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {session.isActive ? "Deactivate" : "Activate"}
          </button>
        </form>
      </div>

      <SessionForm action={updateClassSession.bind(null, sessionId)} session={session} />

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Registrations ({registrations.length})
        </h2>
        {registrations.length === 0 ? (
          <p className="text-sm text-slate-500">No registrations yet.</p>
        ) : (
          <div className="overflow-hidden rounded-md border border-slate-200">
            <table className="w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">
                    Child
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">
                    Birthdate
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">
                    Parent
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">
                    Contact
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">
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
