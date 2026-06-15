import Link from "next/link";
import { getAllRegistrations } from "@/db/queries";
import { RegistrationsTable } from "@/components/admin/RegistrationsTable";

export default async function RegistrationsPage() {
  const registrations = await getAllRegistrations();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-deep">
            Registrations
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            All registrations submitted across every session.
          </p>
        </div>
        <Link
          href="/admin/dashboard/registrations/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-navy-deep to-navy-light px-4 py-2 text-sm font-semibold text-cream shadow-md transition hover:opacity-90"
        >
          <span aria-hidden>+</span> New registration
        </Link>
      </div>
      <RegistrationsTable registrations={registrations} />
    </div>
  );
}
