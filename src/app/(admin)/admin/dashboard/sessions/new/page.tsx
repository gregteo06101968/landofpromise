import { SessionForm } from "@/components/admin/SessionForm";
import { createClassSession } from "@/lib/actions/sessions";

export default function NewClassSessionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-navy-deep">
        New Class Session
      </h1>
      <SessionForm action={createClassSession} />
    </div>
  );
}
