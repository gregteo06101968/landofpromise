import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="bg-gradient-to-r from-navy-deep to-navy-light">
        <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg font-semibold text-cream">
              Land of <span className="text-gold">Promise</span> Admin
            </span>
            <Link
              href="/admin/dashboard"
              className="text-sm text-cream/80 hover:text-cream"
            >
              Class Sessions
            </Link>
            <Link
              href="/admin/dashboard/admins"
              className="text-sm text-cream/80 hover:text-cream"
            >
              Admins
            </Link>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-cream/80 hover:text-cream"
            >
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
