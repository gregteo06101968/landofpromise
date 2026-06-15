"use client";

import { useActionState } from "react";
import { FormField, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { updateRegistration } from "@/lib/actions/registration";

type RegistrationEditDetail = {
  childName: string;
  childBirthdate: string | null;
  parentName: string;
  parentEmail: string;
  parentPhone: string | null;
};

export function RegistrationEditForm({
  registrationId,
  registration,
}: {
  registrationId: number;
  registration: RegistrationEditDetail;
}) {
  const [state, formAction] = useActionState(updateRegistration.bind(null, registrationId), {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-navy-deep">Child</h2>
        <FormField
          label="Full name"
          name="childFullName"
          required
          defaultValue={registration.childName}
        />
        <FormField
          label="Birthdate"
          name="childBirthdate"
          type="date"
          defaultValue={registration.childBirthdate}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-navy-deep">Parent</h2>
        <FormField label="Name" name="parentName" required defaultValue={registration.parentName} />
        <FormField
          label="Email"
          name="parentEmail"
          type="email"
          required
          defaultValue={registration.parentEmail}
        />
        <FormField label="Phone" name="parentPhone" type="tel" defaultValue={registration.parentPhone} />
      </div>

      <ErrorMessage message={state.error} />

      <div>
        <SubmitButton pendingText="Saving...">Save changes</SubmitButton>
      </div>
    </form>
  );
}
