import { listAdmins } from "@/db/queries";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminsTable } from "@/components/admin/AdminsTable";

export default async function AdminsPage() {
  const admins = await listAdmins();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-slate-900">Admins</h1>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Existing admins
        </h2>
        <AdminsTable admins={admins} />
      </div>

      <div className="flex max-w-md flex-col gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Add admin</h2>
        <AdminForm />
      </div>
    </div>
  );
}
