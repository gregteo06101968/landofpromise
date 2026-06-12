import { notFound } from "next/navigation";
import { getClassSessionById } from "@/db/queries";
import { LandingCard } from "@/components/LandingCard";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

export const dynamic = "force-dynamic";

export default async function RegisterForSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const classSessionId = Number(sessionId);
  const session = await getClassSessionById(classSessionId);

  if (!session || !session.isActive) {
    notFound();
  }

  return (
    <LandingCard className="max-w-2xl">
      <div className="text-center">
        <span className="mb-4 inline-flex rounded-2xl bg-gold/15 px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-gold sm:text-xs sm:tracking-widest">
          Child&apos;s Information Program
        </span>
        <h1 className="font-display text-3xl font-bold text-navy-deep">
          Register for {session.title}
        </h1>
        {session.schedule && (
          <p className="mt-1 text-sm text-slate-600">{session.schedule}</p>
        )}
      </div>
      <div className="mt-6">
        <RegistrationForm classSessionId={classSessionId} />
      </div>
    </LandingCard>
  );
}
