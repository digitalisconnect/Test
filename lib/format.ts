import type { Currency } from "@/lib/types";

export function formatPrice(amount: number, currency: Currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatAllergen(allergen: string): string {
  const map: Record<string, string> = {
    gluten: "Gluten",
    dairy: "Dairy",
    eggs: "Eggs",
    nuts: "Tree nuts",
    peanuts: "Peanuts",
    soy: "Soy",
    fish: "Fish",
    shellfish: "Shellfish",
    celery: "Celery",
    mustard: "Mustard",
    sulphites: "Sulphites",
  };
  return map[allergen] ?? allergen;
}
