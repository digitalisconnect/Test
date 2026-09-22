import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PricingTable } from "@/components/marketing/PricingTable";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { CallToAction } from "@/components/marketing/CallToAction";

export const metadata: Metadata = {
  title: "Pricing — Monmenu.fr",
  description:
    "One simple plan at €9.99 per month covers one venue with unlimited dishes and menu updates.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 sm:pt-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple pricing for every independent restaurant
          </h1>
          <p className="mt-4 text-lg text-muted">
            One plan, one price, everything included. No per-dish fees, no
            setup cost, no surprises on your invoice.
          </p>
        </section>

        <PricingTable />
        <FaqAccordion />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
