import Link from "next/link";
import { SkyBackground } from "@/components/SkyBackground";
import { LandingCard } from "@/components/LandingCard";

export default function Home() {
  return (
    <SkyBackground>
      <LandingCard className="flex flex-col items-center text-center">
        <span className="mb-6 rounded-full bg-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Child&apos;s Information Program
        </span>

        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/40 text-4xl">
          📖
        </div>

        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
          <span className="block text-navy-deep">Land of</span>
          <span className="block text-gold">Promise</span>
        </h1>

        <p className="mt-4 max-w-sm text-sm text-slate-600 sm:text-base">
          Nurturing young hearts in faith. Register your child for an
          upcoming class.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy-deep to-navy-light px-6 py-3 text-sm font-semibold text-cream shadow-lg transition hover:opacity-90 sm:text-base"
        >
          <span aria-hidden>✦</span> Register Your Child
        </Link>

        <div className="my-5 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs uppercase tracking-wide text-slate-400">
            or
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <Link
          href="/admin/login"
          className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-navy-deep transition hover:bg-slate-50 sm:text-base"
        >
          Admin Login
        </Link>
      </LandingCard>
    </SkyBackground>
  );
}
