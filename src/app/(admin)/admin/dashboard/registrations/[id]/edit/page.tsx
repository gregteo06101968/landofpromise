import { notFound } from "next/navigation";
import { RegistrationEditForm } from "@/components/admin/RegistrationEditForm";
import { getRegistrationForEdit } from "@/db/queries";

export default async function EditRegistrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const registrationId = Number(id);

  if (!Number.isInteger(registrationId)) {
    notFound();
  }

  const registration = await getRegistrationForEdit(registrationId);

  if (!registration) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-deep">Edit Registration</h1>
        <p className="mt-1 text-sm text-slate-500">
          Update the child and parent details for this registration.
        </p>
      </div>
      <RegistrationEditForm registrationId={registrationId} registration={registration} />
    </div>
  );
}
