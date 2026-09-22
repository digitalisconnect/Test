"use client";

import { cn } from "@/lib/utils";
import { formatAllergen } from "@/lib/format";

export const ALLERGENS = [
  "gluten",
  "dairy",
  "eggs",
  "nuts",
  "peanuts",
  "soy",
  "fish",
  "shellfish",
  "celery",
  "mustard",
  "sulphites",
];

interface AllergenPickerProps {
  value: string[];
  onChange: (next: string[]) => void;
}

export function AllergenPicker({ value, onChange }: AllergenPickerProps) {
  function toggle(allergen: string) {
    if (value.includes(allergen)) {
      onChange(value.filter((a) => a !== allergen));
    } else {
      onChange([...value, allergen]);
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-paper">Allergens</p>
      <div className="flex flex-wrap gap-2">
        {ALLERGENS.map((allergen) => {
          const active = value.includes(allergen);
          return (
            <button
              key={allergen}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(allergen)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-ink-soft text-muted hover:border-accent-soft"
              )}
            >
              {formatAllergen(allergen)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
