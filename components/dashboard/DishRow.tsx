"use client";

import { Badge } from "@/components/ui/Badge";
import { formatAllergen, formatPrice } from "@/lib/format";
import type { Dish } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DishRowProps {
  dish: Dish;
  currency: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onToggleAvailable: () => void;
  onDelete: () => void;
}

export function DishRow({
  dish,
  currency,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onEdit,
  onToggleAvailable,
  onDelete,
}: DishRowProps) {
  const allergens = dish.allergens ?? [];

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-card border border-line bg-ink-soft p-4 sm:flex-row sm:items-center sm:justify-between",
        !dish.isAvailable && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-1 pt-0.5">
          <button
            type="button"
            aria-label="Move dish up"
            onClick={onMoveUp}
            disabled={isFirst}
            className="text-xs text-muted hover:text-paper disabled:opacity-30"
          >
            ▲
          </button>
          <button
            type="button"
            aria-label="Move dish down"
            onClick={onMoveDown}
            disabled={isLast}
            className="text-xs text-muted hover:text-paper disabled:opacity-30"
          >
            ▼
          </button>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-paper">{dish.name}</p>
            {dish.isSignature && (
              <Badge className="border-accent text-accent">Signature</Badge>
            )}
            {!dish.isAvailable && <Badge>Sold out</Badge>}
          </div>
          {dish.description && (
            <p className="mt-1 max-w-md text-xs text-muted">{dish.description}</p>
          )}
          {allergens.length > 0 && (
            <p className="mt-1 text-xs text-muted">
              Contains: {allergens.map((a) => formatAllergen(a)).join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:flex-shrink-0">
        <p className="text-sm font-semibold text-paper">
          {formatPrice(dish.price, currency as never)}
        </p>
        <button
          type="button"
          onClick={onToggleAvailable}
          className="text-xs font-medium text-accent hover:text-accent-soft"
        >
          {dish.isAvailable ? "Mark sold out" : "Mark available"}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-paper hover:text-accent"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-xs font-medium text-muted hover:text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
