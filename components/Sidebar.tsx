"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard", icon: "◆" },
  { href: "/clients", label: "Clients", icon: "●" },
  { href: "/bookings", label: "Bookings", icon: "▣" },
  { href: "/invoices", label: "Invoices", icon: "▦" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:shrink-0 border-r border-line bg-card">
      <div className="px-6 py-7 border-b border-line">
        <div className="font-display text-2xl tracking-tight text-ink">
          Aperture
        </div>
        <div className="text-xs uppercase tracking-[0.18em] text-muted mt-1">
          Studio CRM
        </div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-clay text-white shadow-soft"
                  : "text-ink/70 hover:bg-paper hover:text-ink"
              }`}
            >
              <span
                className={`text-xs ${active ? "text-white" : "text-clay"}`}
                aria-hidden
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-5 border-t border-line">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-clay-light flex items-center justify-center text-clay-dark font-display text-sm">
            JR
          </div>
          <div>
            <div className="text-sm font-medium text-ink">Jules Renner</div>
            <div className="text-xs text-muted">Renner Photography</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
