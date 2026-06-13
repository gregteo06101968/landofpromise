"use client";

import { useActionState, useEffect, useRef } from "react";
import { FormField, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { uploadMedia } from "@/lib/actions/media";

export function MediaUploadForm({ communitySessionId }: { communitySessionId: number }) {
  const [state, formAction] = useActionState(uploadMedia, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="communitySessionId" value={communitySessionId} />
      <FormField label="Photo or video" name="file" type="file" required />
      <FormField label="Caption" name="caption" />
      <ErrorMessage message={state.error} />
      <div>
        <SubmitButton pendingText="Uploading...">Upload</SubmitButton>
      </div>
    </form>
  );
}
