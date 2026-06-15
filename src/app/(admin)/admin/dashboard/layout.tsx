import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
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
          <Link href="/admin/dashboard" className="flex-shrink-0">
            <Image
              src="/logo-header.png"
              alt="Land of Promise"
              width={6000}
              height={1173}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          <MobileNav logout={logout} />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
