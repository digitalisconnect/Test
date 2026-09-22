"use client";

import Link from "next/link";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-soft p-10 lg:flex">
        <Link href="/" className="text-lg font-semibold tracking-tight text-paper">
          Monmenu<span className="text-accent">.fr</span>
        </Link>

        <div className="max-w-sm space-y-6">
          <p className="text-3xl font-semibold leading-tight text-paper">
            A branded digital menu, live on every table in minutes.
          </p>
          <p className="text-sm text-muted">
            Manage categories, dishes and prices from one calm dashboard, then
            share a single QR code that always points to your latest menu.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4 text-sm text-muted">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            ✓
          </span>
          <span>Trusted by independent restaurants across France.</span>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="text-lg font-semibold tracking-tight text-paper">
              Monmenu<span className="text-accent">.fr</span>
            </Link>
          </div>

          <h1 className="text-2xl font-semibold text-paper">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-sm text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
