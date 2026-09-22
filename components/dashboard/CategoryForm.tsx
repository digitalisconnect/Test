"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";

interface CategoryFormValues {
  name: string;
  description: string;
  isVisible: boolean;
}

interface CategoryFormProps {
  initial?: { name: string; description?: string; isVisible: boolean };
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function CategoryForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save category",
}: CategoryFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [isVisible, setIsVisible] = useState(initial?.isVisible ?? true);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(initial?.name ?? "");
    setDescription(initial?.description ?? "");
    setIsVisible(initial?.isVisible ?? true);
    setError("");
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    onSubmit({ name: name.trim(), description: description.trim(), isVisible });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Category name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Starters"
        error={error}
      />
      <Textarea
        label="Description (optional)"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="A short line guests will see under the category title"
        rows={3}
      />
      <Toggle
        checked={isVisible}
        onChange={setIsVisible}
        label="Visible on public menu"
        description="Hide a category to keep it out of guests' view without deleting it."
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
