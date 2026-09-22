import { Button } from "@/components/ui/Button";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-16 text-center sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-accent/10" />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Give your tables a menu worth scanning.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Start with a demo workspace, edit your first menu today, and
            publish it whenever you're ready. €9.99 a month, cancel any time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/signup" size="lg">
              Get started
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book a guided setup call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
