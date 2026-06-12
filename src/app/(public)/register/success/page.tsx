import Link from "next/link";
import { LandingCard } from "@/components/LandingCard";

export default function RegistrationSuccessPage() {
  return (
    <LandingCard className="flex flex-col items-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/40 text-4xl">
        ✦
      </div>
      <h1 className="font-display text-3xl font-bold text-navy-deep">
        Registration received!
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Thank you for registering. We look forward to seeing your child at
        the class session.
      </p>
      <Link
        href="/register"
        className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-navy-deep transition hover:bg-slate-50"
      >
        Back to class sessions
      </Link>
    </LandingCard>
  );
}
