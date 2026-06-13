"use client";

import { useActionState, useState } from "react";
import { FormField, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { registerForSession } from "@/lib/actions/registration";

export function RegistrationForm({ communitySessionId }: { communitySessionId: number }) {
  const [state, formAction] = useActionState(registerForSession, {});
  const [childCount, setChildCount] = useState(1);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="communitySessionId" value={communitySessionId} />

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Your information</h2>
        <FormField label="Your name" name="parentName" required />
        <FormField label="Email" name="parentEmail" type="email" required />
        <FormField label="Phone" name="parentPhone" type="tel" />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Children</h2>
        {Array.from({ length: childCount }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-md border border-slate-200 p-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <FormField label="Child's full name" name="childFullName" required />
            </div>
            <div className="flex-1">
              <FormField label="Birthdate" name="childBirthdate" type="date" />
            </div>
          </div>
        ))}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setChildCount((count) => count + 1)}
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            + Add another child
          </button>
          {childCount > 1 && (
            <button
              type="button"
              onClick={() => setChildCount((count) => count - 1)}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Remove last child
            </button>
          )}
        </div>
      </div>

      <ErrorMessage message={state.error} />

      <div>
        <SubmitButton pendingText="Registering...">Register</SubmitButton>
      </div>
    </form>
  );
}
