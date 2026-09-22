import type { Restaurant } from "@/lib/types";

interface MenuCoverProps {
  restaurant: Restaurant;
  accentColor: string;
}

export function MenuCover({ restaurant, accentColor }: MenuCoverProps) {
  return (
    <div className="relative w-full">
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        {restaurant.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.coverImageUrl}
            alt={`${restaurant.name} cover photo`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-ink-soft" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="relative -mt-10 px-5 sm:px-8">
        <div className="rounded-card bg-white px-5 py-6 shadow-[0_10px_35px_rgba(0,0,0,0.15)] sm:px-8">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            Menu
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
            {restaurant.name}
          </h1>
          {restaurant.tagline && (
            <p className="mt-2 text-sm text-ink/60">{restaurant.tagline}</p>
          )}
          {(restaurant.address || restaurant.city) && (
            <p className="mt-3 text-xs text-ink/45">
              {[restaurant.address, restaurant.city].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
