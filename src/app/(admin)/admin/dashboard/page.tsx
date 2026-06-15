import Link from "next/link";
import { getAllCommunitySessions } from "@/db/queries";
import { SessionsTable } from "@/components/admin/SessionsTable";
import { StatCard } from "@/components/admin/StatCard";

export default async function AdminDashboardPage() {
  const sessions = await getAllCommunitySessions();
  const activeCount = sessions.filter((session) => session.isActive).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-deep">
            Community Sessions
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the sessions families can register their children for.
          </p>
        </div>
        <Link
          href="/admin/dashboard/sessions/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-navy-deep to-navy-light px-4 py-2 text-sm font-semibold text-cream shadow-md transition hover:opacity-90"
        >
          <span aria-hidden>+</span> New session
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Total" value={sessions.length} />
        <StatCard label="Active" value={activeCount} accent="text-green-600" />
        <StatCard
          label="Inactive"
          value={sessions.length - activeCount}
          accent="text-slate-400"
        />
      </div>

      <SessionsTable sessions={sessions} />
    </div>
  );
}
