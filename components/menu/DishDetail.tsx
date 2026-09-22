"use client";

import { useEffect } from "react";
import type { Dish } from "@/lib/types";
import { formatAllergen, formatPrice } from "@/lib/format";
import type { Currency } from "@/lib/types";

interface DishDetailProps {
  dish: Dish | null;
  currency: Currency;
  showPrices: boolean;
  showAllergens: boolean;
  accentColor: string;
  onClose: () => void;
}

export function DishDetail({
  dish,
  currency,
  showPrices,
  showAllergens,
  accentColor,
  onClose,
}: DishDetailProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (dish) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-t-card bg-white sm:rounded-card sm:max-h-[85vh]"
      >
        <div className="relative h-56 w-full shrink-0 bg-ink-soft">
          {dish.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dish.imageUrl}
              alt={dish.name}
              className="h-full w-full object-cover"
            />
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold text-ink">{dish.name}</h3>
            {showPrices && (
              <p className="shrink-0 text-lg font-semibold" style={{ color: accentColor }}>
                {formatPrice(dish.price, currency)}
              </p>
            )}
          </div>

          {!dish.isAvailable && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-500">
              Currently unavailable
            </p>
          )}

          {dish.description && (
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{dish.description}</p>
          )}

          {showAllergens && dish.allergens.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Allergens
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {dish.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs text-ink/60"
                  >
                    {formatAllergen(allergen)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dish.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-medium capitalize"
                  style={{ backgroundColor: `${accentColor}1a`, color: accentColor }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
