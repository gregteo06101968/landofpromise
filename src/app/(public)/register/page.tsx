import { getActiveCommunitySessions } from "@/db/queries";
import { SessionPicker } from "@/components/registration/SessionPicker";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const sessions = await getActiveCommunitySessions();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-12">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Register for a Community Session
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Choose a community session below to register your child.
        </p>
      </div>
      <SessionPicker sessions={sessions} />
    </main>
  );
}
