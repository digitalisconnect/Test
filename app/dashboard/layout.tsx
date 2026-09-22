"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkspaceProvider } from "@/lib/store";
import { getSession, type Session } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | "loading">("loading");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const current = getSession();
    if (!current) {
      router.replace("/login");
      return;
    }
    setSession(current);
  }, [router]);

  if (session === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-ink">
        <p className="text-sm text-muted">Loading dashboard…</p>
      </div>
    );
  }

  if (session === null) {
    return null;
  }

  return (
    <WorkspaceProvider>
      <div className="min-h-dvh bg-ink lg:flex">
        <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <div className="flex min-h-dvh flex-1 flex-col lg:pl-64">
          <Topbar session={session} onOpenMobileNav={() => setMobileNavOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
