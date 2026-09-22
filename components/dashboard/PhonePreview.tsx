import type { Category, Dish, MenuTheme, Restaurant } from "@/lib/types";
import { MenuBody } from "@/components/menu/MenuBody";

interface PhonePreviewProps {
  restaurant: Restaurant;
  theme: MenuTheme;
  categories: Category[];
  dishes: Dish[];
}

export function PhonePreview({ restaurant, theme, categories, dishes }: PhonePreviewProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-[2.5rem] border border-line bg-ink-soft p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="relative h-[640px] w-[320px] overflow-hidden rounded-[1.8rem] bg-ink">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/60" />
          <div className="h-full w-full overflow-y-auto">
            <MenuBody
              restaurant={restaurant}
              theme={theme}
              categories={categories}
              dishes={dishes}
            />
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Live preview — updates instantly as you change appearance settings.
      </p>
    </div>
  );
}
