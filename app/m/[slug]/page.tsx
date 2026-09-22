import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PublicMenuView } from "@/components/menu/PublicMenuView";
import {
  seedCategories,
  seedDishes,
  seedRestaurant,
  seedTheme,
} from "@/lib/seed-data";

// ---------------------------------------------------------------------------
// SEAM FOR A REAL BACKEND:
// This demo only knows about a single seeded restaurant. In production,
// replace this lookup with a fetch to your API (e.g. GET /api/restaurants/:slug)
// that returns the restaurant, its theme, categories and dishes, and call
// notFound() when the venue does not exist or is unpublished.
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getVenueBySlug(slug: string) {
  if (slug !== seedRestaurant.slug) return null;
  if (!seedRestaurant.isPublished) return null;
  return {
    restaurant: seedRestaurant,
    theme: seedTheme,
    categories: seedCategories,
    dishes: seedDishes,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) {
    return { title: "Menu not found — Monmenu.fr" };
  }
  return {
    title: `${venue.restaurant.name} — Menu`,
    description: venue.restaurant.tagline || `Digital menu for ${venue.restaurant.name}`,
  };
}

export default async function PublicMenuPage({ params }: PageProps) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  return (
    <PublicMenuView
      restaurant={venue.restaurant}
      theme={venue.theme}
      categories={venue.categories}
      dishes={venue.dishes}
    />
  );
}
