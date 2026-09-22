"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DishRow } from "@/components/dashboard/DishRow";
import type { Category, Dish } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CategoryPanelProps {
  category: Category & { dishes: Dish[] };
  currency: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  onAddDish: () => void;
  onEditDish: (dish: Dish) => void;
  onDeleteDish: (dish: Dish) => void;
  onToggleDishAvailable: (dish: Dish) => void;
  onMoveDishUp: (dish: Dish) => void;
  onMoveDishDown: (dish: Dish) => void;
}

export function CategoryPanel({
  category,
  currency,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onEdit,
  onToggleVisible,
  onDelete,
  onAddDish,
  onEditDish,
  onDeleteDish,
  onToggleDishAvailable,
  onMoveDishUp,
  onMoveDishDown,
}: CategoryPanelProps) {
  return (
    <section
      className={cn(
        "rounded-card border border-line bg-surface p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:p-6",
        !category.isVisible && "opacity-70"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex flex-col gap-1 pt-1">
            <button
              type="button"
              aria-label="Move category up"
              onClick={onMoveUp}
              disabled={isFirst}
              className="text-xs text-muted hover:text-paper disabled:opacity-30"
            >
              ▲
            </button>
            <button
              type="button"
              aria-label="Move category down"
              onClick={onMoveDown}
              disabled={isLast}
              className="text-xs text-muted hover:text-paper disabled:opacity-30"
            >
              ▼
            </button>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-paper">{category.name}</h2>
              {!category.isVisible && <Badge>Hidden</Badge>}
              <Badge>
                {category.dishes.length} {category.dishes.length === 1 ? "dish" : "dishes"}
              </Badge>
            </div>
            {category.description && (
              <p className="mt-1 text-sm text-muted">{category.description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onToggleVisible}>
            {category.isVisible ? "Hide" : "Show"}
          </Button>
          <Button variant="secondary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="ghost" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {category.dishes.length === 0 ? (
          <EmptyState
            title="No dishes yet"
            description="Add the first dish for this category."
          />
        ) : (
          category.dishes.map((dish, index) => (
            <DishRow
              key={dish.id}
              dish={dish}
              currency={currency}
              isFirst={index === 0}
              isLast={index === category.dishes.length - 1}
              onMoveUp={() => onMoveDishUp(dish)}
              onMoveDown={() => onMoveDishDown(dish)}
              onEdit={() => onEditDish(dish)}
              onToggleAvailable={() => onToggleDishAvailable(dish)}
              onDelete={() => onDeleteDish(dish)}
            />
          ))
        )}
      </div>

      <div className="mt-4">
        <Button variant="secondary" onClick={onAddDish}>
          + Add dish
        </Button>
      </div>
    </section>
  );
}
