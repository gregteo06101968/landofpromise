import Link from "next/link";
import type { classSessions } from "@/db/schema";

type ClassSession = typeof classSessions.$inferSelect;

export function SessionPicker({ sessions }: { sessions: ClassSession[] }) {
  if (sessions.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        There are no class sessions open for registration right now. Please
        check back later.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex flex-col gap-2 rounded-md border border-slate-200 p-4"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            {session.title}
          </h2>
          {session.schedule && (
            <p className="text-sm text-slate-600">{session.schedule}</p>
          )}
          {session.description && (
            <p className="text-sm text-slate-600">{session.description}</p>
          )}
          <div>
            <Link
              href={`/register/${session.id}`}
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Register
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
