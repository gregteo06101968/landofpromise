import { notFound } from "next/navigation";
import Link from "next/link";
import { ObservationForm } from "@/components/admin/ObservationForm";
import { ObservationsList } from "@/components/admin/ObservationsList";
import { ProgressForm } from "@/components/admin/ProgressForm";
import { ProgressList } from "@/components/admin/ProgressList";
import {
  getObservationsForRegistration,
  getProgressAssessmentsForRegistration,
  getRegistrationDetail,
} from "@/db/queries";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string; registrationId: string }>;
}) {
  const { id, registrationId } = await params;
  const sessionId = Number(id);
  const regId = Number(registrationId);

  const registration = await getRegistrationDetail(regId);

  if (!registration || registration.communitySessionId !== sessionId) {
    notFound();
  }

  const [observations, progressAssessments] = await Promise.all([
    getObservationsForRegistration(regId),
    getProgressAssessmentsForRegistration(regId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={`/admin/dashboard/sessions/${sessionId}/edit`}
          className="text-sm font-medium text-navy-deep hover:underline"
        >
          ← Back to {registration.sessionTitle}
        </Link>
      </div>

      <div>
        <h1 className="font-display text-2xl font-bold text-navy-deep">{registration.childName}</h1>
        <p className="text-sm text-slate-600">Born {registration.childBirthdate || "—"}</p>
        <p className="text-sm text-slate-600">
          Parent: {registration.parentName} · {registration.parentEmail}
          {registration.parentPhone ? ` · ${registration.parentPhone}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-lg font-semibold text-navy-deep">Progress Assessments</h2>
          <ProgressList assessments={progressAssessments} sessionId={sessionId} registrationId={regId} />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ProgressForm sessionId={sessionId} registrationId={regId} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display text-lg font-semibold text-navy-deep">Observations & Feedback</h2>
          <ObservationsList observations={observations} sessionId={sessionId} registrationId={regId} />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ObservationForm sessionId={sessionId} registrationId={regId} />
          </div>
        </div>
      </div>
    </div>
  );
}
