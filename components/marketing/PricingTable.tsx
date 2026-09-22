import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const included = [
  "One venue with unlimited dishes and categories",
  "Unlimited menu updates, published instantly",
  "Branded public menu page with your colours and photos",
  "Downloadable, print-ready table QR code",
  "Allergen and availability information for every dish",
  "Opening hours, contact details and multi-language basics",
];

export function PricingTable() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Card className="overflow-hidden">
        <CardBody className="p-8 sm:p-12">
          <div className="flex flex-col items-center text-center">
            <Badge>Single plan, no surprises</Badge>
            <h2 className="mt-6 text-2xl font-semibold text-paper">
              Everything Monmenu.fr offers, for every venue
            </h2>
            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight text-paper">
                €9.99
              </span>
              <span className="pb-1 text-muted">/ month</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              One venue per subscription. Cancel any time, no contract.
            </p>

            <Button href="/signup" size="lg" className="mt-8">
              Start your demo workspace
            </Button>
          </div>

          <div className="mt-12 border-t border-line pt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              What's included
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-paper">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs text-accent">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
