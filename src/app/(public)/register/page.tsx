import { getActiveClassSessions } from "@/db/queries";
import { LandingCard } from "@/components/LandingCard";
import { SessionPicker } from "@/components/registration/SessionPicker";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const sessions = await getActiveClassSessions();

  return (
    <LandingCard className="max-w-2xl text-center">
      <span className="mb-4 inline-flex rounded-2xl bg-gold/15 px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-gold sm:text-xs sm:tracking-widest">
        Child&apos;s Information Program
      </span>
      <h1 className="font-display text-3xl font-bold text-navy-deep">
        Register for a Class Session
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Choose a class session below to register your child.
      </p>
      <div className="mt-6 text-left">
        <SessionPicker sessions={sessions} />
      </div>
    </LandingCard>
  );
}
