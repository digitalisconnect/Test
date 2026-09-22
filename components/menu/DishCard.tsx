import type { Dish } from "@/lib/types";
import { formatAllergen, formatPrice } from "@/lib/format";

interface DishCardProps {
  dish: Dish;
  currency: string;
  showPrices: boolean;
  showAllergens: boolean;
  accentColor: string;
  layout: string;
  tone: "light" | "dark";
}

export function DishCard({
  dish,
  currency,
  showPrices,
  showAllergens,
  accentColor,
  layout,
  tone,
}: DishCardProps) {
  const isDark = tone === "dark";
  const bodyText = isDark ? "text-white/70" : "text-ink/60";
  const titleText = isDark ? "text-white" : "text-ink";
  const isCompact = layout === "compact";
  const isList = layout === "list";

  return (
    <div
      className={
        isList || isCompact
          ? "flex items-start justify-between gap-4 py-4"
          : "overflow-hidden rounded-card"
      }
    >
      {!isCompact && !isList && dish.imageUrl && (
        <div className="aspect-[4/3] w-full overflow-hidden rounded-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className={!isCompact && !isList ? "mt-3" : "min-w-0 flex-1"}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className={`text-base font-semibold ${titleText}`}>{dish.name}</h4>
              {dish.isSignature && (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  Signature
                </span>
              )}
              {!dish.isAvailable && (
                <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-500">
                  Sold out
                </span>
              )}
            </div>
            {dish.description && (
              <p className={`mt-1 text-sm leading-relaxed ${bodyText}`}>{dish.description}</p>
            )}
            {showAllergens && dish.allergens && dish.allergens.length > 0 && (
              <p className={`mt-1 text-xs ${bodyText}`}>
                Contains: {dish.allergens.map(formatAllergen).join(", ")}
              </p>
            )}
          </div>
          {showPrices && (
            <span
              className="shrink-0 whitespace-nowrap text-sm font-semibold"
              style={{ color: accentColor }}
            >
              {formatPrice(dish.price, currency as never)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
