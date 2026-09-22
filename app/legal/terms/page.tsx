import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Terms of Service — Monmenu.fr",
  description:
    "The plain-language terms covering your Monmenu.fr subscription and acceptable use of the service.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-ink">
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-paper sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: June 2024</p>

          <Card className="mt-10">
            <CardBody className="space-y-8 text-sm leading-relaxed text-muted">
              <section>
                <h2 className="text-base font-semibold text-paper">1. What Monmenu.fr is</h2>
                <p className="mt-2">
                  Monmenu.fr lets an independent restaurant owner build a digital menu for a
                  single venue and share it with guests through a public link and a table
                  QR code. By creating an account, you agree to these terms on behalf of
                  yourself and the venue you manage.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">2. Your subscription</h2>
                <p className="mt-2">
                  The service is billed at €9.99 per month for one venue with unlimited
                  dishes and unlimited menu updates. Subscriptions renew automatically each
                  month until cancelled. You can cancel at any time from the billing page
                  in your dashboard; your menu stays live until the end of the current
                  billing period.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">3. Your content</h2>
                <p className="mt-2">
                  You are responsible for the accuracy of everything you publish, including
                  dish names, descriptions, prices and allergen information. Guests rely on
                  your menu to make food choices, so please keep allergen and availability
                  information up to date. You retain ownership of the content you upload;
                  you grant us a licence to host and display it as part of your published
                  menu.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">4. Acceptable use</h2>
                <p className="mt-2">
                  You may not use Monmenu.fr to publish content that is unlawful,
                  misleading, or infringes someone else&apos;s rights, and you may not
                  attempt to disrupt the service or access another venue&apos;s dashboard.
                  We may suspend accounts that violate these rules.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">5. Availability</h2>
                <p className="mt-2">
                  We aim to keep the dashboard and public menu pages available at all
                  times, but we do not guarantee uninterrupted service. We may perform
                  maintenance from time to time and will try to keep disruption minimal.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">6. Cancellation and refunds</h2>
                <p className="mt-2">
                  You may cancel your subscription at any time. We do not provide refunds
                  for partial billing periods, unless required by applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">7. Changes to these terms</h2>
                <p className="mt-2">
                  We may update these terms from time to time to reflect changes to the
                  product. If we make material changes, we will let you know by email or
                  inside the dashboard.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">8. Contact</h2>
                <p className="mt-2">
                  Questions about these terms can be sent through our{" "}
                  <Link href="/contact" className="text-accent hover:underline">
                    contact page
                  </Link>
                  .
                </p>
              </section>
            </CardBody>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
