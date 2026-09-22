import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { CallToAction } from "@/components/marketing/CallToAction";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Features — Monmenu.fr",
  description:
    "Everything you need to turn a paper menu into a fast, beautiful, always up-to-date digital menu: QR codes, live editing, allergen tags, custom branding and simple analytics.",
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-ink">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 pb-16 pt-20 text-center sm:px-8">
          <Badge>Built for independent restaurants</Badge>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-paper sm:text-5xl">
            Everything a menu needs, nothing it doesn&apos;t
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
            Monmenu.fr replaces printed menus with a page that updates the
            instant you change a price, hides a sold-out dish in one tap, and
            looks like it was designed for your restaurant — not a template.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/signup" size="lg">
              Start free
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </div>
        </section>

        <FeatureGrid />

        <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureDetail
              title="One QR code, always current"
              body="Print your table QR code once. Every edit you make in the dashboard goes live on the public menu immediately — no reprinting, ever."
            />
            <FeatureDetail
              title="Allergens and dietary tags"
              body="Mark gluten, dairy, nuts and more per dish, and flag vegetarian, vegan or halal options so guests can decide with confidence."
            />
            <FeatureDetail
              title="Sold out, in one tap"
              body="Toggle a dish unavailable from your phone during service. It disappears from the guest view instantly, no deletion needed."
            />
            <FeatureDetail
              title="On-brand appearance"
              body="Pick an accent colour, background and layout that match your restaurant. Preview every change on a real phone frame before publishing."
            />
            <FeatureDetail
              title="Categories that make sense"
              body="Group dishes into starters, mains, desserts or drinks, reorder them freely, and hide a category without losing its dishes."
            />
            <FeatureDetail
              title="Simple, transparent billing"
              body="One plan, one monthly invoice, cancel any time. No per-table fees and no surprise charges as your menu grows."
            />
          </div>
        </section>

        <HowItWorks />
        <Testimonials />
        <FaqAccordion />
        <CallToAction />
      </main>

      <SiteFooter />
    </div>
  );
}

function FeatureDetail({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-6">
      <h3 className="text-base font-semibold text-paper">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}
