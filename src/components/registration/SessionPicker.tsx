import Link from "next/link";
import type { communitySessions } from "@/db/schema";

type CommunitySession = typeof communitySessions.$inferSelect;

export function SessionPicker({ sessions }: { sessions: CommunitySession[] }) {
  if (sessions.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        There are no community sessions open for registration right now. Please
        check back later.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <h2 className="font-display text-lg font-semibold text-navy-deep">
            {session.title}
          </h2>
          {session.schedule && (
            <p className="text-sm text-slate-600">{session.schedule}</p>
          )}
          {session.description && (
            <p className="text-sm text-slate-600">{session.description}</p>
          )}
          <Link
            href={`/register/${session.id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy-deep to-navy-light px-6 py-3 text-sm font-semibold text-cream shadow-lg transition hover:opacity-90 sm:text-base"
          >
            <span aria-hidden>✦</span> Register
          </Link>
        </div>
      ))}
    </div>
  );
}
