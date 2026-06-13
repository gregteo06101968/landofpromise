"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { FormField, FormSelect, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { adminRegisterForSession } from "@/lib/actions/registration";
import type { communitySessions } from "@/db/schema";

type CommunitySession = typeof communitySessions.$inferSelect;

export function ManualRegistrationForm({ sessions }: { sessions: CommunitySession[] }) {
  const [state, formAction] = useActionState(adminRegisterForSession, {});
  const [childCount, setChildCount] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      <FormSelect label="Community session" name="communitySessionId" required>
        {sessions.map((session) => (
          <option key={session.id} value={session.id}>
            {session.title}
            {!session.isActive ? " (inactive)" : ""}
          </option>
        ))}
      </FormSelect>

      <div className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-navy-deep">
          Parent information
        </h2>
        <FormField label="Parent name" name="parentName" required />
        <FormField label="Email" name="parentEmail" type="email" required />
        <FormField label="Phone" name="parentPhone" type="tel" />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-navy-deep">
          Children
        </h2>
        {Array.from({ length: childCount }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-end"
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
            className="text-sm font-medium text-navy-deep hover:text-navy-light"
          >
            + Add another child
          </button>
          {childCount > 1 && (
            <button
              type="button"
              onClick={() => setChildCount((count) => count - 1)}
              className="text-sm font-medium text-navy-deep hover:text-navy-light"
            >
              Remove last child
            </button>
          )}
        </div>
      </div>

      <ErrorMessage message={state.error} />
      {state.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Registration added.
        </p>
      )}

      <div>
        <SubmitButton pendingText="Registering...">Add registration</SubmitButton>
      </div>
    </form>
  );
}
