import { Card, CardBody } from "@/components/ui/Card";

const quotes = [
  {
    quote:
      "We changed our whole lunch menu on a Sunday night and it was live before we opened Monday morning. No calls to a printer, no waiting.",
    name: "Léa Fontaine",
    role: "Owner, Bistro du Marché",
  },
  {
    quote:
      "Guests scan the code and the menu just looks like us. The photos, the colours, all of it. It feels like a much bigger investment than it was.",
    name: "Marco Ferretti",
    role: "Owner, Trattoria Sorriso",
  },
  {
    quote:
      "Marking a dish as sold out takes five seconds from my phone in the kitchen. That alone was worth switching.",
    name: "Amline Haddad",
    role: "Owner, Le Comptoir Vert",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Trusted by independent restaurants
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {quotes.map((item) => (
          <Card key={item.name}>
            <CardBody>
              <p className="text-sm leading-relaxed text-paper">“{item.quote}”</p>
              <div className="mt-6">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted">{item.role}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
