"use client";

import { useActionState, useRef, useEffect } from "react";
import { FormField, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { createAdmin } from "@/lib/actions/admins";

export function AdminForm() {
  const [state, formAction] = useActionState(createAdmin, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <FormField label="Name" name="name" />
      <FormField label="Email" name="email" type="email" required />
      <FormField label="Password" name="password" type="password" required />
      <ErrorMessage message={state.error} />
      {state.success && (
        <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          Admin account created.
        </p>
      )}
      <div>
        <SubmitButton pendingText="Creating...">Add admin</SubmitButton>
      </div>
    </form>
  );
}
