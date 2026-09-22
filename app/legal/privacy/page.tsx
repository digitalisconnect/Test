import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy — Monmenu.fr",
  description:
    "What Monmenu.fr stores about your venue and your guests, and how that data is used.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-ink">
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-paper sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: June 2024</p>

          <Card className="mt-10">
            <CardBody className="space-y-8 text-sm leading-relaxed text-muted">
              <section>
                <h2 className="text-base font-semibold text-paper">1. Data we store about your venue</h2>
                <p className="mt-2">
                  When you create an account, we store your restaurant&apos;s name, slug,
                  address, contact details, opening hours, currency, appearance settings,
                  and the categories and dishes that make up your menu. We also store the
                  owner name and email associated with the account, and billing records
                  such as invoices and subscription status.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">2. Data we store about guests</h2>
                <p className="mt-2">
                  Guests who scan your table QR code and view your public menu do not need
                  to create an account, log in, or submit any personal information. We may
                  record anonymous, aggregate scan activity (such as the number of menu
                  views per day) to show you scan statistics in your dashboard. This
                  activity is not tied to an individual guest&apos;s identity.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">3. How we use this data</h2>
                <p className="mt-2">
                  We use venue data to render your dashboard and your published public
                  menu, to generate your QR code, and to send billing and account
                  notifications. We do not sell venue or guest data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">4. Where data is stored</h2>
                <p className="mt-2">
                  Venue data is stored securely with providers that support our
                  infrastructure. We keep only what is necessary to operate the dashboard
                  and public menu features described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">5. Your rights</h2>
                <p className="mt-2">
                  You can review, update or delete most of your venue&apos;s information
                  directly from the dashboard at any time. To request a full export or
                  deletion of your account data, contact us using the details below.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">6. Cookies</h2>
                <p className="mt-2">
                  The dashboard uses a minimal session identifier so you stay signed in
                  between visits. The public guest-facing menu does not set tracking
                  cookies.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-paper">7. Contact</h2>
                <p className="mt-2">
                  For any question about this policy or your data, reach out through our{" "}
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
