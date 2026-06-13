import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">
        Land of Promise
      </h1>
      <p className="max-w-md text-base text-slate-600">
        Register your child for an upcoming community session.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          Register your child
        </Link>
        <Link
          href="/admin/login"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Admin login
        </Link>
      </div>
    </main>
  );
}
