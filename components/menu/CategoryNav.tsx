"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface CategoryNavProps {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string) => void;
  accentColor: string;
}

export function CategoryNav({ categories, activeId, onSelect, accentColor }: CategoryNavProps) {
  if (categories.length === 0) return null;

  return (
    <nav className="sticky top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="flex gap-2 overflow-x-auto px-5 py-3 sm:px-8" style={{ scrollbarWidth: "none" }}>
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150",
                isActive
                  ? "text-white"
                  : "border-black/10 text-ink/60 hover:text-ink"
              )}
              style={
                isActive
                  ? { backgroundColor: accentColor, borderColor: accentColor }
                  : undefined
              }
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
