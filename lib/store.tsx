"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Account,
  Category,
  Dish,
  Invoice,
  MenuTheme,
  Restaurant,
} from "@/lib/types";
import {
  seedAccount,
  seedCategories,
  seedDishes,
  seedInvoices,
  seedRestaurant,
  seedScanActivity,
  seedTheme,
} from "@/lib/seed-data";
import { slugify, uid } from "@/lib/slug";

// ---------------------------------------------------------------------------
// This store holds the whole demo workspace in memory (persisted to
// localStorage for continuity across reloads in the browser).
//
// SEAM FOR A REAL BACKEND:
// Replace the body of each mutator below with a call to your API
// (e.g. `await fetch("/api/categories", { method: "POST", ... })`) and swap
// the seed arrays for data fetched on load. The shape of the context value
// is designed to stay stable so screens do not need to change when this
// happens.
// ---------------------------------------------------------------------------

interface WorkspaceState {
  restaurant: Restaurant;
  theme: MenuTheme;
  categories: Category[];
  dishes: Dish[];
  account: Account;
  invoices: Invoice[];
  scanActivity: { date: string; count: number }[];
}

const STORAGE_KEY = "monmenu_workspace_v1";

function defaultState(): WorkspaceState {
  return {
    restaurant: seedRestaurant,
    theme: seedTheme,
    categories: seedCategories,
    dishes: seedDishes,
    account: seedAccount,
    invoices: seedInvoices,
    scanActivity: seedScanActivity,
  };
}

interface WorkspaceContextValue extends WorkspaceState {
  updateRestaurant: (patch: Partial<Restaurant>) => void;
  updateTheme: (patch: Partial<MenuTheme>) => void;
  addCategory: (name: string) => Category;
  updateCategory: (id: string, patch: Partial<Category>) => void;
  removeCategory: (id: string) => void;
  reorderCategories: (orderedIds: string[]) => void;
  addDish: (categoryId: string, name: string) => Dish;
  updateDish: (id: string, patch: Partial<Dish>) => void;
  removeDish: (id: string) => void;
  reorderDishes: (categoryId: string, orderedIds: string[]) => void;
  createDemoWorkspace: (input: { restaurantName: string; ownerName: string; email: string }) => void;
  resetToSeed: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(() => defaultState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WorkspaceState;
        setState(parsed);
      }
    } catch {
      // ignore corrupt storage, fall back to seed state
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage may be unavailable (private browsing, quota) — safe to ignore
    }
  }, [state, hydrated]);

  const updateRestaurant = useCallback((patch: Partial<Restaurant>) => {
    setState((prev) => ({ ...prev, restaurant: { ...prev.restaurant, ...patch } }));
  }, []);

  const updateTheme = useCallback((patch: Partial<MenuTheme>) => {
    setState((prev) => ({ ...prev, theme: { ...prev.theme, ...patch } }));
  }, []);

  const addCategory = useCallback((name: string): Category => {
    let created: Category;
    setState((prev) => {
      created = {
        id: uid("cat"),
        restaurantId: prev.restaurant.id,
        name: name.trim() || "New category",
        description: "",
        position: prev.categories.length,
        isVisible: true,
      };
      return { ...prev, categories: [...prev.categories, created] };
    });
    return created!;
  }, []);

  const updateCategory = useCallback((id: string, patch: Partial<Category>) => {
    setState((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const removeCategory = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
      dishes: prev.dishes.filter((d) => d.categoryId !== id),
    }));
  }, []);

  const reorderCategories = useCallback((orderedIds: string[]) => {
    setState((prev) => ({
      ...prev,
      categories: prev.categories
        .map((c) => ({ ...c, position: orderedIds.indexOf(c.id) }))
        .sort((a, b) => a.position - b.position),
    }));
  }, []);

  const addDish = useCallback((categoryId: string, name: string): Dish => {
    let created: Dish;
    setState((prev) => {
      const siblingCount = prev.dishes.filter((d) => d.categoryId === categoryId).length;
      created = {
        id: uid("dish"),
        categoryId,
        name: name.trim() || "New dish",
        description: "",
        price: 0,
        imageUrl: "",
        allergens: [],
        tags: [],
        isAvailable: true,
        isSignature: false,
        position: siblingCount,
      };
      return { ...prev, dishes: [...prev.dishes, created] };
    });
    return created!;
  }, []);

  const updateDish = useCallback((id: string, patch: Partial<Dish>) => {
    setState((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    }));
  }, []);

  const removeDish = useCallback((id: string) => {
    setState((prev) => ({ ...prev, dishes: prev.dishes.filter((d) => d.id !== id) }));
  }, []);

  const reorderDishes = useCallback((categoryId: string, orderedIds: string[]) => {
    setState((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) =>
        d.categoryId === categoryId ? { ...d, position: orderedIds.indexOf(d.id) } : d
      ),
    }));
  }, []);

  const createDemoWorkspace = useCallback(
    (input: { restaurantName: string; ownerName: string; email: string }) => {
      const slug = slugify(input.restaurantName);
      setState((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          name: input.restaurantName || prev.restaurant.name,
          slug,
          email: input.email || prev.restaurant.email,
          isPublished: false,
        },
        account: {
          ...prev.account,
          ownerName: input.ownerName || prev.account.ownerName,
          email: input.email || prev.account.email,
        },
      }));
    },
    []
  );

  const resetToSeed = useCallback(() => {
    setState(defaultState());
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      ...state,
      updateRestaurant,
      updateTheme,
      addCategory,
      updateCategory,
      removeCategory,
      reorderCategories,
      addDish,
      updateDish,
      removeDish,
      reorderDishes,
      createDemoWorkspace,
      resetToSeed,
    }),
    [
      state,
      updateRestaurant,
      updateTheme,
      addCategory,
      updateCategory,
      removeCategory,
      reorderCategories,
      addDish,
      updateDish,
      removeDish,
      reorderDishes,
      createDemoWorkspace,
      resetToSeed,
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return ctx;
}

export function categoriesWithDishes(state: WorkspaceState) {
  return [...state.categories]
    .sort((a, b) => a.position - b.position)
    .map((category) => ({
      ...category,
      dishes: state.dishes
        .filter((d) => d.categoryId === category.id)
        .sort((a, b) => a.position - b.position),
    }));
}
