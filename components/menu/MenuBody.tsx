import type { Category, Dish, MenuTheme, Restaurant } from "@/lib/types";
import { DishCard } from "@/components/menu/DishCard";

interface CategoryWithDishes extends Category {
  dishes: Dish[];
}

interface MenuBodyProps {
  restaurant: Restaurant;
  theme: MenuTheme;
  categories: Category[];
  dishes: Dish[];
}

function fontClass(fontStyle: string): string {
  switch (fontStyle) {
    case "modern":
      return "font-sans";
    case "playful":
      return "font-sans tracking-wide";
    default:
      return "font-serif";
  }
}

function backgroundClass(background: string): { wrap: string; tone: "light" | "dark" } {
  switch (background) {
    case "dark":
      return { wrap: "bg-ink text-white", tone: "dark" };
    case "cream":
      return { wrap: "bg-[#faf6ee] text-ink", tone: "light" };
    default:
      return { wrap: "bg-white text-ink", tone: "light" };
  }
}

export function MenuBody({ restaurant, theme, categories, dishes }: MenuBodyProps) {
  const { wrap, tone } = backgroundClass(theme.background);
  const font = fontClass(theme.fontStyle);
  const isDark = tone === "dark";

  const grouped: CategoryWithDishes[] = [...categories]
    .filter((c) => c.isVisible)
    .sort((a, b) => a.position - b.position)
    .map((category) => ({
      ...category,
      dishes: dishes
        .filter((d) => d.categoryId === category.id)
        .sort((a, b) => a.position - b.position),
    }))
    .filter((category) => category.dishes.length > 0);

  return (
    <div className={`min-h-full w-full ${wrap} ${font}`}>
      <div className="relative">
        {restaurant.coverImageUrl && (
          <div className="h-40 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={restaurant.coverImageUrl}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="px-5 py-6">
          <h1
            className={
              theme.fontStyle === "playful"
                ? "text-2xl font-bold uppercase"
                : "text-2xl font-semibold"
            }
          >
            {restaurant.name}
          </h1>
          {restaurant.tagline && (
            <p className={`mt-1 text-sm ${isDark ? "text-white/60" : "text-ink/60"}`}>
              {restaurant.tagline}
            </p>
          )}
          <div
            className="mt-4 h-px w-16"
            style={{ backgroundColor: theme.accentColor }}
          />
        </div>
      </div>

      <div className="space-y-8 px-5 pb-12">
        {grouped.length === 0 && (
          <p className={`text-sm ${isDark ? "text-white/60" : "text-ink/60"}`}>
            No dishes to show yet.
          </p>
        )}
        {grouped.map((category) => (
          <section key={category.id}>
            <h2
              className="text-lg font-semibold"
              style={{ color: theme.accentColor }}
            >
              {category.name}
            </h2>
            {category.description && (
              <p className={`mt-1 text-sm ${isDark ? "text-white/60" : "text-ink/60"}`}>
                {category.description}
              </p>
            )}
            <div
              className={
                theme.layout === "cards"
                  ? "mt-4 grid grid-cols-1 gap-5"
                  : "mt-2 divide-y divide-black/5"
              }
              style={
                theme.layout === "cards"
                  ? undefined
                  : { borderColor: isDark ? "rgba(255,255,255,0.1)" : undefined }
              }
            >
              {category.dishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  currency={restaurant.currency}
                  showPrices={theme.showPrices}
                  showAllergens={theme.showAllergens}
                  accentColor={theme.accentColor}
                  layout={theme.layout}
                  tone={tone}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
