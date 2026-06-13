import Link from "next/link";
import { getAllCommunitySessions } from "@/db/queries";
import { SessionsTable } from "@/components/admin/SessionsTable";

export default async function AdminDashboardPage() {
  const sessions = await getAllCommunitySessions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          Community Sessions
        </h1>
        <Link
          href="/admin/dashboard/sessions/new"
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          New session
        </Link>
      </div>
      <SessionsTable sessions={sessions} />
    </div>
  );
}
