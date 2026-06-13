"use client";

import { useActionState, useEffect, useRef } from "react";
import { FormTextArea, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { addObservation } from "@/lib/actions/observations";

export function ObservationForm({
  sessionId,
  registrationId,
}: {
  sessionId: number;
  registrationId: number;
}) {
  const [state, formAction] = useActionState(addObservation.bind(null, sessionId), {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="registrationId" value={registrationId} />
      <FormTextArea label="Observation" name="note" />
      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton pendingText="Adding...">Add observation</SubmitButton>
      </div>
    </form>
  );
}
