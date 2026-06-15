import Image from "next/image";
import Link from "next/link";
import { SkyBackground } from "@/components/SkyBackground";
import { LandingCard } from "@/components/LandingCard";

export default function Home() {
  return (
    <SkyBackground>
      <LandingCard className="flex flex-col items-center text-center">
        <span className="mb-6 inline-flex rounded-2xl bg-gold/15 px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-gold sm:text-xs sm:tracking-widest">
          Child&apos;s Information Program
        </span>

        <Image
          src="/logo.png"
          alt="Land of Promise"
          width={6000}
          height={1173}
          className="mb-6 h-auto w-64 max-w-full sm:w-72"
          priority
        />

        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
          <span className="block text-navy-deep">Land of</span>
          <span className="block text-gold">Promise</span>
        </h1>

        <p className="mt-4 max-w-sm text-sm text-slate-600 sm:text-base">
          Nurturing young hearts in faith. Register your child for an
          upcoming community session.
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
