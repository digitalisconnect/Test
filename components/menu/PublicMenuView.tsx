"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, Dish, MenuTheme, Restaurant } from "@/lib/types";
import { MenuCover } from "@/components/menu/MenuCover";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { DishDetail } from "@/components/menu/DishDetail";
import { VenueInfo } from "@/components/menu/VenueInfo";
import { formatPrice } from "@/lib/format";

interface PublicMenuViewProps {
  restaurant: Restaurant;
  theme: MenuTheme;
  categories: Category[];
  dishes: Dish[];
}

type DietaryFilter = "vegetarian" | "vegan" | "halal" | "glutenFree";

const FILTERS: Array<{ id: DietaryFilter; label: string }> = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "halal", label: "Halal" },
  { id: "glutenFree", label: "Gluten-free" },
];

function dishMatchesFilter(dish: Dish, filter: DietaryFilter): boolean {
  if (dish.dietary?.[filter]) return true;
  // Fallback for dishes tagged the old way, e.g. tags: ["vegan"].
  const label = filter === "glutenFree" ? "gluten-free" : filter;
  return dish.tags?.some((tag) => tag.toLowerCase() === label) ?? false;
}

export function PublicMenuView({ restaurant, theme, categories, dishes }: PublicMenuViewProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<DietaryFilter[]>([]);

  const visibleCategories = useMemo(
    () => categories.filter((c) => c.isVisible).sort((a, b) => a.position - b.position),
    [categories]
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      if (dish.isHidden) return false;
      if (normalizedQuery) {
        const haystack = `${dish.name} ${dish.description}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      if (activeFilters.length > 0) {
        const matchesAll = activeFilters.every((filter) => dishMatchesFilter(dish, filter));
        if (!matchesAll) return false;
      }
      return true;
    });
  }, [dishes, normalizedQuery, activeFilters]);

  const dishesByCategory = useMemo(() => {
    const map = new Map<string, Dish[]>();
    for (const category of visibleCategories) {
      map.set(
        category.id,
        filteredDishes
          .filter((d) => d.categoryId === category.id)
          .sort((a, b) => a.position - b.position)
      );
    }
    return map;
  }, [visibleCategories, filteredDishes]);

  const nonEmptyCategories = visibleCategories.filter(
    (c) => (dishesByCategory.get(c.id) ?? []).length > 0
  );

  const [activeId, setActiveId] = useState<string | null>(nonEmptyCategories[0]?.id ?? null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const id = visible[0].target.getAttribute("data-category-id");
          if (id) setActiveId(id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 }
    );

    for (const category of nonEmptyCategories) {
      const el = sectionRefs.current[category.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonEmptyCategories.map((c) => c.id).join(",")]);

  function handleSelectCategory(id: string) {
    setActiveId(id);
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function toggleFilter(filter: DietaryFilter) {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  }

  const isCards = theme.layout === "cards";
  const hasActiveSearch = normalizedQuery.length > 0 || activeFilters.length > 0;

  return (
    <div className="min-h-dvh bg-white text-ink">
      <MenuCover restaurant={restaurant} accentColor={theme.accentColor} />

      <div className="sticky top-0 z-20 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-5 pt-3 sm:px-8">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-full border border-black/10 bg-black/[0.03] px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-black/20"
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => toggleFilter(filter.id)}
                  className={
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
                    (isActive
                      ? "border-transparent text-white"
                      : "border-black/10 text-ink/60 hover:border-black/20")
                  }
                  style={isActive ? { backgroundColor: theme.accentColor } : undefined}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <CategoryNav
        categories={nonEmptyCategories}
        activeId={activeId}
        onSelect={handleSelectCategory}
        accentColor={theme.accentColor}
      />

      <main className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
        {nonEmptyCategories.length === 0 && (
          <p className="text-center text-sm text-ink/50">
            {hasActiveSearch
              ? "No dishes match your search or filters."
              : "This menu has no published dishes yet."}
          </p>
        )}

        <div className="flex flex-col gap-12">
          {nonEmptyCategories.map((category) => {
            const items = dishesByCategory.get(category.id) ?? [];
            return (
              <section
                key={category.id}
                data-category-id={category.id}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="scroll-mt-24"
              >
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-ink">{category.name}</h2>
                  {category.description && (
                    <p className="mt-1 text-sm text-ink/50">{category.description}</p>
                  )}
                </div>

                <div className={isCards ? "flex flex-col gap-4" : "flex flex-col divide-y divide-black/5"}>
                  {items.map((dish) => (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => setSelectedDish(dish)}
                      className={
                        isCards
                          ? "flex w-full items-stretch gap-4 rounded-card border border-black/5 bg-white p-3 text-left shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]"
                          : "flex w-full items-start gap-4 py-4 text-left"
                      }
                    >
                      {isCards && dish.imageUrl && (
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[0.75rem] bg-ink-soft sm:h-24 sm:w-24">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className={
                              "h-full w-full object-cover" +
                              (dish.isAvailable ? "" : " grayscale opacity-60")
                            }
                          />
                        </div>
                      )}

                      <div className="flex min-w-0 flex-1 flex-col gap-1 py-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-ink">{dish.name}</p>
                            {dish.isSignature && (
                              <span
                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                                style={{
                                  backgroundColor: `${theme.accentColor}1a`,
                                  color: theme.accentColor,
                                }}
                              >
                                Signature
                              </span>
                            )}
                            {dish.isPopular && (
                              <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink/60">
                                Popular
                              </span>
                            )}
                            {dish.isNew && (
                              <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink/60">
                                New
                              </span>
                            )}
                          </div>
                          {theme.showPrices && (
                            <div className="flex shrink-0 items-baseline gap-2">
                              {dish.promoPrice != null && dish.promoPrice < dish.price && (
                                <p className="text-xs text-ink/40 line-through">
                                  {formatPrice(dish.price, restaurant.currency)}
                                </p>
                              )}
                              <p className="font-medium text-ink/80">
                                {formatPrice(
                                  dish.promoPrice != null && dish.promoPrice < dish.price
                                    ? dish.promoPrice
                                    : dish.price,
                                  restaurant.currency
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                        {dish.description && (
                          <p className="line-clamp-2 text-sm text-ink/50">{dish.description}</p>
                        )}
                        {!dish.isAvailable && (
                          <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                            Sold out
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <VenueInfo restaurant={restaurant} />

      <DishDetail
        dish={selectedDish}
        currency={restaurant.currency}
        showPrices={theme.showPrices}
        showAllergens={theme.showAllergens}
        accentColor={theme.accentColor}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
}
