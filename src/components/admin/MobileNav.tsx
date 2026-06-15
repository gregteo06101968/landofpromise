"use client";

import { useState } from "react";
import { NavLink } from "./NavLink";

export function MobileNav({
  logout,
}: {
  logout: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-cream/20 text-cream/80 transition hover:border-cream/40 hover:text-cream"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-cream/10 bg-navy-deep px-4 py-3 shadow-lg">
          <NavLink href="/admin/dashboard" onNavigate={() => setOpen(false)}>
            Community Sessions
          </NavLink>
          <NavLink
            href="/admin/dashboard/registrations"
            onNavigate={() => setOpen(false)}
          >
            Registrations
          </NavLink>
          <NavLink
            href="/admin/dashboard/admins"
            onNavigate={() => setOpen(false)}
          >
            Admins
          </NavLink>
          <form action={logout}>
            <button
              type="submit"
              className="mt-1 w-full rounded-lg border border-cream/20 px-3 py-2 text-left text-sm font-medium text-cream/80 transition hover:border-cream/40 hover:text-cream"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
