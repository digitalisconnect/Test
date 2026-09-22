"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { AllergenPicker } from "@/components/dashboard/AllergenPicker";
import type { Allergen } from "@/lib/types";

export interface DishFormValues {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  allergens: Allergen[];
  tags: string[];
  isAvailable: boolean;
  isSignature: boolean;
}

interface DishFormProps {
  initial?: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    allergens: string[];
    tags: string[];
    isAvailable: boolean;
    isSignature: boolean;
  };
  onSubmit: (values: DishFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function DishForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save dish",
}: DishFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [allergens, setAllergens] = useState<string[]>(initial?.allergens ?? []);
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [isAvailable, setIsAvailable] = useState(initial?.isAvailable ?? true);
  const [isSignature, setIsSignature] = useState(initial?.isSignature ?? false);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    setName(initial?.name ?? "");
    setDescription(initial?.description ?? "");
    setPrice(initial ? String(initial.price) : "");
    setImageUrl(initial?.imageUrl ?? "");
    setAllergens(initial?.allergens ?? []);
    setTags((initial?.tags ?? []).join(", "));
    setIsAvailable(initial?.isAvailable ?? true);
    setIsSignature(initial?.isSignature ?? false);
    setNameError("");
    setPriceError("");
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const priceValue = Number(price.replace(",", "."));
    let valid = true;

    if (!name.trim()) {
      setNameError("Dish name is required.");
      valid = false;
    } else {
      setNameError("");
    }

    if (!price.trim() || Number.isNaN(priceValue) || priceValue < 0) {
      setPriceError("Enter a valid price.");
      valid = false;
    } else {
      setPriceError("");
    }

    if (!valid) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: priceValue,
      imageUrl: imageUrl.trim(),
      allergens: allergens.filter((a): a is Allergen =>
        [
          "gluten",
          "dairy",
          "eggs",
          "nuts",
          "peanuts",
          "soy",
          "fish",
          "shellfish",
          "celery",
          "mustard",
          "sulphites",
        ].includes(a)
      ),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isAvailable,
      isSignature,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-5 overflow-y-auto pr-1">
      <Input
        label="Dish name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Beef Bourguignon"
        error={nameError}
      />
      <Textarea
        label="Description (optional)"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short, appetising description guests will see"
        rows={3}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Price"
          name="price"
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="12.50"
          error={priceError}
        />
        <Input
          label="Image URL (optional)"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>
      <Input
        label="Tags (optional, comma separated)"
        name="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="vegetarian, spicy"
      />
      <AllergenPicker value={allergens} onChange={setAllergens} />
      <div className="space-y-4 rounded-card border border-line bg-ink-soft p-4">
        <Toggle
          checked={isAvailable}
          onChange={setIsAvailable}
          label="Available"
          description="Turn off to hide this dish temporarily, for example when sold out."
        />
        <Toggle
          checked={isSignature}
          onChange={setIsSignature}
          label="Signature dish"
          description="Highlight this dish with a badge on the public menu."
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
