"use client";

import { Badge } from "@/components/ui/Badge";
import { useWorkspace } from "@/lib/store";
import type { Session } from "@/lib/auth";

interface TopbarProps {
  session: Session;
  onOpenMobileNav: () => void;
}

export function Topbar({ session, onOpenMobileNav }: TopbarProps) {
  const { restaurant } = useWorkspace();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-line bg-ink px-4 py-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-card border border-line text-paper lg:hidden"
        >
          <span className="sr-only">Open navigation</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-4 bg-paper" />
            <span className="block h-0.5 w-4 bg-paper" />
            <span className="block h-0.5 w-4 bg-paper" />
          </div>
        </button>
        <div>
          <p className="text-sm font-semibold text-paper">{restaurant.name}</p>
          <p className="text-xs text-muted">Signed in as {session.ownerName}</p>
        </div>
      </div>
      <Badge className={restaurant.isPublished ? "border-accent-soft text-accent" : ""}>
        {restaurant.isPublished ? "Menu published" : "Not published yet"}
      </Badge>
    </header>
  );
}
