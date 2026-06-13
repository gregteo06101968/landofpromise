import { getAllCommunitySessions } from "@/db/queries";
import { ManualRegistrationForm } from "@/components/admin/ManualRegistrationForm";

export default async function NewRegistrationPage() {
  const sessions = await getAllCommunitySessions();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-navy-deep">
        New Registration
      </h1>
      <ManualRegistrationForm sessions={sessions} />
    </div>
  );
}
