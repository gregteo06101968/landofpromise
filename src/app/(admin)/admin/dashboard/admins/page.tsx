import { listAdmins } from "@/db/queries";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminsTable } from "@/components/admin/AdminsTable";

export default async function AdminsPage() {
  const admins = await listAdmins();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-2xl font-bold text-navy-deep">Admins</h1>

      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-semibold text-navy-deep">
          Existing admins
        </h2>
        <AdminsTable admins={admins} />
      </div>

      <div className="flex max-w-md flex-col gap-3">
        <h2 className="font-display text-lg font-semibold text-navy-deep">Add admin</h2>
        <AdminForm />
      </div>
    </div>
  );
}
