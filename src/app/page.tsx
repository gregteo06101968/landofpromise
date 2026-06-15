import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-slate-950 px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-[8%] top-[14%] h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="absolute left-[20%] top-[58%] h-1 w-1 rounded-full bg-white/15" />
        <span className="absolute right-[12%] top-[22%] h-1 w-1 rounded-full bg-white/20" />
        <span className="absolute right-[22%] top-[72%] h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="absolute left-[12%] bottom-[12%] h-1 w-1 rounded-full bg-white/20" />
        <span className="absolute right-[10%] bottom-[20%] h-2 w-2 rounded-full bg-white/10" />
        <span className="absolute right-[16%] top-[44%] text-lg text-amber-300/40">
          ✦
        </span>
        <span className="absolute left-[14%] top-[40%] text-sm text-amber-300/30">
          ✦
        </span>
      </div>

      <div className="relative w-full max-w-md rounded-3xl bg-amber-50 px-8 py-10 text-center shadow-2xl">
        <span className="inline-flex items-center rounded-full bg-amber-200/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
          Child&apos;s Information Program
        </span>

        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-200/70 text-3xl">
          📖
        </div>

        <h1
          className={`${playfair.className} mt-6 text-4xl leading-tight font-extrabold text-slate-900`}
        >
          Land of
          <span className="block text-amber-500">Promise</span>
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
          Nurturing young hearts in faith. Register your child for an
          upcoming community session.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-900 to-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:from-blue-800 hover:to-slate-800"
          >
            <span aria-hidden>✦</span> Register Your Child
          </Link>

          <div className="flex items-center gap-3 text-xs font-medium tracking-wide text-slate-400 uppercase">
            <span className="h-px flex-1 bg-slate-200" />
            Or
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </main>
  );
}
