"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    (href !== "/admin/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-cream/15 text-cream"
          : "text-cream/70 hover:bg-cream/10 hover:text-cream"
      }`}
    >
      {children}
    </Link>
  );
}
