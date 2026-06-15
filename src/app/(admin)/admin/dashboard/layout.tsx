import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { NavLink } from "@/components/admin/NavLink";
import { MobileNav } from "@/components/admin/MobileNav";

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
        <nav className="relative mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <Image
            src="/logo-header.png"
            alt="Land of Promise"
            width={5796}
            height={846}
            className="h-8 w-auto sm:h-9"
            priority
          />

          <div className="hidden items-center gap-1 sm:flex">
            <NavLink href="/admin/dashboard">Community Sessions</NavLink>
            <NavLink href="/admin/dashboard/registrations">
              Registrations
            </NavLink>
            <NavLink href="/admin/dashboard/admins">Admins</NavLink>
          </div>

          <form action={logout} className="hidden sm:block">
            <button
              type="submit"
              className="rounded-lg border border-cream/20 px-3 py-1.5 text-sm font-medium text-cream/80 transition hover:border-cream/40 hover:text-cream"
            >
              Sign out
            </button>
          </form>

          <MobileNav logout={logout} />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
