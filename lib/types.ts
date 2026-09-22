export type Currency = "EUR";

export interface OpeningHoursDay {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  coverImageUrl: string;
  currency: Currency;
  openingHours: OpeningHoursDay[];
  isPublished: boolean;
  createdAt: string;
  // Optional richer onboarding fields — safe to omit on existing data.
  logoUrl?: string;
  cuisineType?: string;
  description?: string;
  instagram?: string;
  language?: string;
}

export type FontStyle = "classic" | "modern" | "playful";
export type MenuLayout = "list" | "cards";

export interface MenuTheme {
  restaurantId: string;
  accentColor: string;
  background: string;
  fontStyle: FontStyle;
  layout: MenuLayout;
  showPrices: boolean;
  showAllergens: boolean;
}

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  position: number;
  isVisible: boolean;
}

export type Allergen =
  | "gluten"
  | "dairy"
  | "eggs"
  | "nuts"
  | "peanuts"
  | "soy"
  | "fish"
  | "shellfish"
  | "celery"
  | "mustard"
  | "sulphites";

export interface DishDietary {
  vegetarian?: boolean;
  vegan?: boolean;
  halal?: boolean;
  glutenFree?: boolean;
}

export interface DishVariant {
  id: string;
  name: string;
  priceDelta: number;
}

export interface DishSupplement {
  id: string;
  name: string;
  price: number;
}

export interface Dish {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  allergens: Allergen[];
  tags: string[];
  isAvailable: boolean;
  isSignature: boolean;
  position: number;
  // Optional richer editor fields — safe to omit on existing/seed data.
  promoPrice?: number;
  dietary?: DishDietary;
  isPopular?: boolean;
  isNew?: boolean;
  isHidden?: boolean;
  variants?: DishVariant[];
  supplements?: DishSupplement[];
}

export type Plan = "standard";

export interface Account {
  id: string;
  ownerName: string;
  email: string;
  restaurantId: string;
  plan: Plan;
  trialEndsAt: string | null;
}

export type InvoiceStatus = "paid" | "pending" | "failed";

export interface Invoice {
  id: string;
  reference: string;
  issuedAt: string;
  amount: number;
  status: InvoiceStatus;
}

export interface ScanEvent {
  date: string;
  count: number;
}

// ---------------------------------------------------------------------------
// Menu import (AI extraction) — see components/onboarding/MenuSetupStep.tsx
// for how this is populated today (a local simulation) and where a real
// backend route should plug in.
// ---------------------------------------------------------------------------

export interface ExtractedDish {
  name: string;
  description: string;
  price: number;
  allergens: string[];
  dietary?: DishDietary;
}

export interface ExtractedCategory {
  name: string;
  dishes: ExtractedDish[];
}

export interface ExtractedMenu {
  sourceFileName: string;
  confidence: "low" | "medium" | "high";
  categories: ExtractedCategory[];
}
