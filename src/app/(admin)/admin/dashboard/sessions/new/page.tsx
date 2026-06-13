import { SessionForm } from "@/components/admin/SessionForm";
import { createCommunitySession } from "@/lib/actions/sessions";

export default function NewCommunitySessionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        New Community Session
      </h1>
      <SessionForm action={createCommunitySession} />
    </div>
  );
}
