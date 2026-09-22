"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ExtractedMenu } from "@/lib/types";

export type MenuMethod = "manual" | "import" | "sample";

// ---------------------------------------------------------------------------
// SEAM FOR A REAL AI BACKEND
// ---------------------------------------------------------------------------
// In production this should upload the file to a server route (for example
// POST /api/menu-import) which forwards it to an OCR + language model that
// returns structured menu data: categories, dishes, descriptions, prices,
// supplements and allergen/dietary information. Keep the API key on the
// server (an environment variable such as MENU_IMPORT_API_KEY) and never
// call a third-party AI provider directly from the browser.
//
// The local implementation below simulates that round trip so the
// "review before import" experience is real today.
// ---------------------------------------------------------------------------
async function extractMenuFromFile(file: File): Promise<ExtractedMenu> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";
  if (!isImage && !isPdf) {
    throw new Error("Unsupported file type. Please upload a PDF, JPG or PNG.");
  }

  return {
    sourceFileName: file.name,
    confidence: "medium",
    categories: [
      {
        name: "Starters",
        dishes: [
          {
            name: "Soup of the day",
            description: "Ask your server about today's selection.",
            price: 7.5,
            allergens: [],
            dietary: { vegetarian: true },
          },
          {
            name: "Burrata & tomato",
            description: "Creamy burrata, heirloom tomato, basil oil.",
            price: 11,
            allergens: ["dairy"],
            dietary: { vegetarian: true, glutenFree: true },
          },
        ],
      },
      {
        name: "Main Courses",
        dishes: [
          {
            name: "Grilled chicken breast",
            description: "Free-range chicken, seasonal vegetables, jus.",
            price: 18,
            allergens: [],
            dietary: { halal: true, glutenFree: true },
          },
          {
            name: "Mushroom risotto",
            description: "Arborio rice, wild mushrooms, parmesan.",
            price: 16,
            allergens: ["dairy"],
            dietary: { vegetarian: true },
          },
        ],
      },
    ],
  };
}

interface MenuSetupStepProps {
  method: MenuMethod | null;
  onSelectMethod: (method: MenuMethod) => void;
  extracted: ExtractedMenu | null;
  onExtracted: (menu: ExtractedMenu) => void;
}

const OPTIONS: Array<{ id: MenuMethod; title: string; description: string }> = [
  {
    id: "manual",
    title: "Build it manually",
    description: "Start from a blank menu and add categories and dishes yourself.",
  },
  {
    id: "import",
    title: "Import an existing menu",
    description: "Upload a PDF, JPG or PNG. We'll extract the content automatically.",
  },
  {
    id: "sample",
    title: "Start with a sample menu",
    description: "Get a fully populated example menu you can edit right away.",
  },
];

export function MenuSetupStep({
  method,
  onSelectMethod,
  extracted,
  onExtracted,
}: MenuSetupStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setIsProcessing(true);
    try {
      const result = await extractMenuFromFile(file);
      onExtracted(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this file.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectMethod(option.id)}
            className={
              "flex flex-col gap-2 rounded-card border p-5 text-left transition-colors " +
              (method === option.id
                ? "border-accent bg-ink-soft"
                : "border-line bg-ink-soft/60 hover:border-accent/60")
            }
          >
            <span className="text-sm font-semibold text-paper">{option.title}</span>
            <span className="text-xs leading-relaxed text-muted">{option.description}</span>
          </button>
        ))}
      </div>

      {method === "import" && (
        <div className="rounded-card border border-dashed border-line bg-ink-soft p-6">
          <p className="text-sm text-paper">Upload your menu file</p>
          <p className="mt-1 text-xs text-muted">Accepted formats: PDF, JPG, PNG.</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <div className="mt-4 flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              {isProcessing ? "Analysing…" : "Choose file"}
            </Button>
            {isProcessing && (
              <span className="text-xs text-muted">
                Reading categories, dishes, prices and allergens…
              </span>
            )}
          </div>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          {extracted && !isProcessing && (
            <div className="mt-6 space-y-4 border-t border-line pt-5">
              <p className="text-sm font-medium text-paper">
                Review before importing — from {extracted.sourceFileName}
              </p>
              <p className="text-xs text-muted">
                Extraction confidence: {extracted.confidence}. Check every dish carefully
                before publishing, especially prices and allergens.
              </p>
              <div className="space-y-4">
                {extracted.categories.map((category) => (
                  <div key={category.name} className="rounded-card border border-line p-4">
                    <p className="text-sm font-semibold text-paper">{category.name}</p>
                    <ul className="mt-2 space-y-2">
                      {category.dishes.map((dish) => (
                        <li key={dish.name} className="text-xs text-muted">
                          <span className="font-medium text-paper">{dish.name}</span> —{" "}
                          {dish.description} ({dish.price.toFixed(2)}€)
                          {dish.allergens.length > 0 && (
                            <span> · Allergens: {dish.allergens.join(", ")}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {method === "sample" && (
        <div className="rounded-card border border-line bg-ink-soft p-6">
          <p className="text-sm text-paper">
            We&apos;ll pre-fill your dashboard with a complete sample menu (starters, mains,
            desserts and drinks) so you can see the editor and public page in action, then
            replace it with your own dishes whenever you&apos;re ready.
          </p>
        </div>
      )}

      {method === "manual" && (
        <div className="rounded-card border border-line bg-ink-soft p-6">
          <p className="text-sm text-paper">
            You&apos;ll land straight in the menu editor with an empty menu, ready for your
            first category.
          </p>
        </div>
      )}
    </div>
  );
}
