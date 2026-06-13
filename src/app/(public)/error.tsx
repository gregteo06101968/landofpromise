"use client";

import { useEffect } from "react";
import { ErrorFallback } from "@/components/ui/ErrorFallback";

export default function PublicError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-12">
      <ErrorFallback
        title="Registration is temporarily unavailable"
        message="We're having trouble loading class sessions right now. Please try again in a moment."
        onRetry={unstable_retry}
      />
    </main>
  );
}
