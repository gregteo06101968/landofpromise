import { notFound } from "next/navigation";
import { getClassSessionById } from "@/db/queries";
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
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-12">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Register for {session.title}
        </h1>
        {session.schedule && (
          <p className="mt-1 text-sm text-slate-600">{session.schedule}</p>
        )}
      </div>
      <RegistrationForm classSessionId={classSessionId} />
    </main>
  );
}
