import Link from "next/link";
import { getAllClassSessions } from "@/db/queries";
import { SessionsTable } from "@/components/admin/SessionsTable";

export default async function AdminDashboardPage() {
  const sessions = await getAllClassSessions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy-deep">
          Class Sessions
        </h1>
        <Link
          href="/admin/dashboard/sessions/new"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-navy-deep to-navy-light px-4 py-2 text-sm font-semibold text-cream shadow-md transition hover:opacity-90"
        >
          New session
        </Link>
      </div>
      <SessionsTable sessions={sessions} />
    </div>
  );
}
