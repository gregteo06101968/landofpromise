import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { NavLink } from "@/components/admin/NavLink";

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
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-navy-deep to-navy-light shadow-md">
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1 sm:gap-6">
            <span className="font-display mr-2 hidden text-lg font-semibold text-cream sm:block">
              Land of <span className="text-gold">Promise</span>
            </span>
            <div className="flex items-center gap-1">
              <NavLink href="/admin/dashboard">Community Sessions</NavLink>
              <NavLink href="/admin/dashboard/registrations">
                Registrations
              </NavLink>
              <NavLink href="/admin/dashboard/admins">Admins</NavLink>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-cream/20 px-3 py-1.5 text-sm font-medium text-cream/80 transition hover:border-cream/40 hover:text-cream"
            >
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
