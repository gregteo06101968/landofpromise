import { SessionForm } from "@/components/admin/SessionForm";
import { createClassSession } from "@/lib/actions/sessions";

export default function NewClassSessionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        New Class Session
      </h1>
      <SessionForm action={createClassSession} />
    </div>
  );
}
