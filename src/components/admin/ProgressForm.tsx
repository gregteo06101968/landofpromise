"use client";

import { useActionState, useEffect, useRef } from "react";
import { FormSelect, FormTextArea, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { addProgressAssessment } from "@/lib/actions/progress";

export function ProgressForm({
  sessionId,
  registrationId,
}: {
  sessionId: number;
  registrationId: number;
}) {
  const [state, formAction] = useActionState(addProgressAssessment.bind(null, sessionId), {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="registrationId" value={registrationId} />
      <FormSelect label="Rating" name="rating" required>
        <option value="needs_improvement">Needs Improvement</option>
        <option value="developing">Developing</option>
        <option value="meets_expectations">Meets Expectations</option>
        <option value="exceeds_expectations">Exceeds Expectations</option>
      </FormSelect>
      <FormTextArea label="Notes" name="notes" />
      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton pendingText="Adding...">Add assessment</SubmitButton>
      </div>
    </form>
  );
}
