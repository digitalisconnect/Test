import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-accent/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Badge>Digital menus for independent restaurants</Badge>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            A beautiful digital menu, live on every table in minutes.
          </h1>
          <p className="mt-6 text-lg text-muted">
            Manage categories, dishes, prices and allergens from a simple
            dashboard, then publish a branded menu guests open with a single
            scan. No app to install, no printing, updates in real time.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/signup" size="lg">
              Create your menu — free demo
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">
            €9.99 / month per venue. Unlimited dishes and updates.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-card border border-line bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-card bg-ink-soft p-5">
                <p className="text-xs uppercase tracking-wide text-muted">Menu scans</p>
                <p className="mt-2 text-3xl font-semibold">248</p>
                <p className="mt-1 text-xs text-accent">+18% this week</p>
              </div>
              <div className="rounded-card bg-ink-soft p-5">
                <p className="text-xs uppercase tracking-wide text-muted">Dishes live</p>
                <p className="mt-2 text-3xl font-semibold">36</p>
                <p className="mt-1 text-xs text-muted">Across 6 categories</p>
              </div>
              <div className="rounded-card bg-ink-soft p-5">
                <p className="text-xs uppercase tracking-wide text-muted">Menu health</p>
                <p className="mt-2 text-3xl font-semibold">Great</p>
                <p className="mt-1 text-xs text-muted">All prices up to date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
