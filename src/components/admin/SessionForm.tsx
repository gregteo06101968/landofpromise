"use client";

import { useActionState } from "react";
import { FormField, FormTextArea, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { ActionState } from "@/lib/actions/types";
import type { communitySessions } from "@/db/schema";

type CommunitySession = typeof communitySessions.$inferSelect;

export function SessionForm({
  action,
  session,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  session?: CommunitySession;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <FormField
        label="Title"
        name="title"
        required
        defaultValue={session?.title}
      />
      <FormTextArea
        label="Description"
        name="description"
        defaultValue={session?.description}
      />
      <FormField
        label="Schedule"
        name="schedule"
        placeholder="e.g. Sundays 9:00-10:00 AM"
        defaultValue={session?.schedule}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Start date"
          name="startDate"
          type="date"
          defaultValue={session?.startDate}
        />
        <FormField
          label="End date"
          name="endDate"
          type="date"
          defaultValue={session?.endDate}
        />
      </div>
      <FormField
        label="Capacity"
        name="capacity"
        type="number"
        placeholder="Leave blank for unlimited"
        defaultValue={session?.capacity}
      />
      <label className="flex items-center gap-2 text-sm font-medium text-navy-deep">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={session?.isActive ?? true}
          className="h-4 w-4 rounded border-slate-300 accent-gold"
        />
        Active (visible for parent registration)
      </label>
      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton>
          {session ? "Save changes" : "Create session"}
        </SubmitButton>
      </div>
    </form>
  );
}
