import Link from "next/link";

export default function RegistrationSuccessPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">
        Registration received!
      </h1>
      <p className="text-sm text-slate-600">
        Thank you for registering. We look forward to seeing your child at
        the community session.
      </p>
      <Link
        href="/register"
        className="text-sm font-medium text-slate-700 hover:text-slate-900"
      >
        Back to community sessions
      </Link>
    </main>
  );
}
