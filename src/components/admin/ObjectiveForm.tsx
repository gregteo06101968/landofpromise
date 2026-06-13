"use client";

import { useActionState, useEffect, useRef } from "react";
import { FormField, FormTextArea, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { createObjective } from "@/lib/actions/objectives";

export function ObjectiveForm({ communitySessionId }: { communitySessionId: number }) {
  const [state, formAction] = useActionState(createObjective, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="communitySessionId" value={communitySessionId} />
      <FormField label="Week number" name="weekNumber" type="number" required />
      <FormField label="Title" name="title" required />
      <FormTextArea label="Description" name="description" />
      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton pendingText="Adding...">Add objective</SubmitButton>
      </div>
    </form>
  );
}
