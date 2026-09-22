import { Card, CardBody } from "@/components/ui/Card";

const features = [
  {
    title: "Build it in minutes",
    description:
      "Add categories and dishes with prices, photos, allergens and tags from a clean dashboard designed for busy owners.",
  },
  {
    title: "Publish instantly",
    description:
      "Every change goes live the moment you save. No reprinting, no waiting on a designer for a price change.",
  },
  {
    title: "One QR code per table",
    description:
      "Generate a branded QR code guests scan to open your menu on their own phone. Download it print-ready in seconds.",
  },
  {
    title: "On-brand appearance",
    description:
      "Pick an accent colour, cover photo, font style and layout so the public menu feels like your restaurant, not a template.",
  },
  {
    title: "Allergens and availability",
    description:
      "Mark allergens clearly and hide a dish the moment it sells out, without touching a single printed page.",
  },
  {
    title: "Built for phones",
    description:
      "The guest-facing menu is fast and typographic, letting photos and prices breathe like a well-designed printed menu.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything a menu needs. Nothing it doesn't.
        </h2>
        <p className="mt-4 text-muted">
          One focused tool for the whole life of your menu, from first draft
          to the QR code on your last table.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardBody>
              <div className="flex h-10 w-10 items-center justify-center rounded-card bg-accent/15 text-accent">
                <span className="text-lg font-semibold">•</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
