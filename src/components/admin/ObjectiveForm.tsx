"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { FormField, FormTextArea, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { createObjective } from "@/lib/actions/objectives";

export function ObjectiveForm({ communitySessionId }: { communitySessionId: number }) {
  const [state, formAction] = useActionState(createObjective, {});
  const formRef = useRef<HTMLFormElement>(null);
  const nextFieldKey = useRef(1);
  const [fieldKeys, setFieldKeys] = useState<number[]>([0]);

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

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-navy-deep">Review Questions</span>
        {fieldKeys.map((key, index) => (
          <div key={key} className="flex items-center gap-2">
            <input
              name="reviewQuestions"
              defaultValue=""
              placeholder={`Question ${index + 1}`}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
            {fieldKeys.length > 1 && (
              <button
                type="button"
                onClick={() => setFieldKeys(fieldKeys.filter((k) => k !== key))}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFieldKeys([...fieldKeys, nextFieldKey.current++])}
          className="self-start text-sm font-medium text-navy-deep hover:underline"
        >
          + Add question
        </button>
      </div>

      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton pendingText="Adding...">Add objective</SubmitButton>
      </div>
    </form>
  );
}
