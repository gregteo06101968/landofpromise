import Link from "next/link";
import { getActiveCommunitySessions } from "@/db/queries";
import { LandingCard } from "@/components/LandingCard";
import { SessionPicker } from "@/components/registration/SessionPicker";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const sessions = await getActiveCommunitySessions();

  return (
    <LandingCard className="max-w-2xl text-center">
      <Link
        href="/"
        className="mb-4 flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-navy-deep"
      >
        ← Back to home
      </Link>
      <span className="mb-6 inline-flex rounded-2xl bg-gold/15 px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-gold sm:text-xs sm:tracking-widest">
        Child&apos;s Information Program
      </span>
      <h1 className="font-display text-3xl font-bold text-navy-deep">
        Register for a Community Session
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Choose a community session below to register your child.
      </p>
      <div className="mt-6 text-left">
        <SessionPicker sessions={sessions} />
      </div>
    </LandingCard>
  );
}
