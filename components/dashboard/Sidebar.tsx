"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { clearSession } from "@/lib/auth";
import { useWorkspace } from "@/lib/store";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/menu", label: "Menu editor" },
  { href: "/dashboard/appearance", label: "Appearance" },
  { href: "/dashboard/qr", label: "QR code" },
  { href: "/dashboard/settings", label: "Venue settings" },
  { href: "/dashboard/billing", label: "Billing" },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { restaurant } = useWorkspace();

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  const content = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="px-6 pb-8 pt-6">
          <Link href="/dashboard" className="text-lg font-semibold text-paper">
            Monmenu<span className="text-accent">.</span>
          </Link>
          <p className="mt-1 truncate text-xs text-muted">{restaurant.name}</p>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "block rounded-card px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-ink-soft hover:text-paper"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="space-y-1 border-t border-line px-3 py-4">
        <Link
          href={`/m/${restaurant.slug}`}
          target="_blank"
          className="block rounded-card px-3 py-2.5 text-sm font-medium text-muted hover:bg-ink-soft hover:text-paper"
        >
          View public menu ↗
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="block w-full rounded-card px-3 py-2.5 text-left text-sm font-medium text-muted hover:bg-ink-soft hover:text-paper"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-line lg:bg-ink-soft">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative z-50 h-full w-64 border-r border-line bg-ink-soft">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
