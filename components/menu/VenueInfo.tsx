import type { Restaurant } from "@/lib/types";

interface VenueInfoProps {
  restaurant: Restaurant;
}

export function VenueInfo({ restaurant }: VenueInfoProps) {
  const hours = restaurant.openingHours ?? [];

  return (
    <div className="border-t border-black/5 bg-ink-soft/5 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-md">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/40">
          Visit us
        </h2>

        <div className="mt-4 flex flex-col gap-2 text-sm text-ink/70">
          {(restaurant.address || restaurant.city) && (
            <p>{[restaurant.address, restaurant.city].filter(Boolean).join(", ")}</p>
          )}
          {restaurant.phone && <p>{restaurant.phone}</p>}
          {restaurant.email && <p>{restaurant.email}</p>}
          {restaurant.website && (
            <a
              href={restaurant.website}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink underline underline-offset-2"
            >
              {restaurant.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>

        {hours.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
              Opening hours
            </h3>
            <dl className="mt-3 flex flex-col gap-1.5 text-sm">
              {hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between">
                  <dt className="text-ink/50">{h.day}</dt>
                  <dd className="font-medium text-ink/80">
                    {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-ink/30">Powered by Monmenu.fr</p>
      </div>
    </div>
  );
}
