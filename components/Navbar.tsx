"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/jobs", label: "Job Matches" },
  { href: "/roadmap", label: "Roadmap" }
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-accent-teal to-accent-violet" />
          <span className="text-lg font-bold tracking-tight">ProHire</span>
        </Link>

        {session && (
          <div className="hidden gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-surfaceLight text-textPrimary"
                    : "text-textMuted hover:text-textPrimary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <div>
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-lg border border-border px-4 py-2 text-sm text-textMuted transition-colors hover:text-textPrimary"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-accent-teal px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
