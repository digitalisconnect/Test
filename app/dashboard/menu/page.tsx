"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { CategoryForm } from "@/components/dashboard/CategoryForm";
import { CategoryPanel } from "@/components/dashboard/CategoryPanel";
import { DishForm } from "@/components/dashboard/DishForm";
import type { DishFormValues } from "@/components/dashboard/DishForm";
import { categoriesWithDishes, useWorkspace } from "@/lib/store";
import type { Category, Dish } from "@/lib/types";

type CategoryModalState =
  | { mode: "create" }
  | { mode: "edit"; category: Category }
  | null;

type DishModalState =
  | { mode: "create"; categoryId: string }
  | { mode: "edit"; dish: Dish }
  | null;

type DeleteState =
  | { type: "category"; category: Category }
  | { type: "dish"; dish: Dish }
  | null;

export default function MenuEditorPage() {
  const workspace = useWorkspace();
  const {
    restaurant,
    addCategory,
    updateCategory,
    removeCategory,
    reorderCategories,
    addDish,
    updateDish,
    removeDish,
    reorderDishes,
  } = workspace;

  const categories = categoriesWithDishes(workspace);

  const [categoryModal, setCategoryModal] = useState<CategoryModalState>(null);
  const [dishModal, setDishModal] = useState<DishModalState>(null);
  const [pendingDelete, setPendingDelete] = useState<DeleteState>(null);

  function moveCategory(id: string, direction: -1 | 1) {
    const orderedIds = categories.map((c) => c.id);
    const index = orderedIds.indexOf(id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= orderedIds.length) return;
    const next = [...orderedIds];
    const swap = next[index];
    next[index] = next[target];
    next[target] = swap;
    reorderCategories(next);
  }

  function moveDish(categoryId: string, dishId: string, direction: -1 | 1) {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;
    const orderedIds = category.dishes.map((d) => d.id);
    const index = orderedIds.indexOf(dishId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= orderedIds.length) return;
    const next = [...orderedIds];
    const swap = next[index];
    next[index] = next[target];
    next[target] = swap;
    reorderDishes(categoryId, next);
  }

  function handleCategorySubmit(values: {
    name: string;
    description: string;
    isVisible: boolean;
  }) {
    if (categoryModal && categoryModal.mode === "edit") {
      updateCategory(categoryModal.category.id, values);
    } else {
      const created = addCategory(values.name);
      updateCategory(created.id, {
        description: values.description,
        isVisible: values.isVisible,
      });
    }
    setCategoryModal(null);
  }

  function handleDishSubmit(values: DishFormValues) {
    const patch: Partial<Dish> = { ...values };
    if (dishModal && dishModal.mode === "edit") {
      updateDish(dishModal.dish.id, patch);
    } else if (dishModal && dishModal.mode === "create") {
      const created = addDish(dishModal.categoryId, values.name);
      updateDish(created.id, patch);
    }
    setDishModal(null);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    if (pendingDelete.type === "category") {
      removeCategory(pendingDelete.category.id);
    } else {
      removeDish(pendingDelete.dish.id);
    }
    setPendingDelete(null);
  }

  const totalDishes = categories.reduce((sum, c) => sum + c.dishes.length, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-paper">Menu editor</h1>
          <p className="mt-1 text-sm text-muted">
            {categories.length} categories and {totalDishes} dishes on {restaurant.name}&apos;s
            public menu. Changes are saved instantly.
          </p>
        </div>
        <Button onClick={() => setCategoryModal({ mode: "create" })}>+ Add category</Button>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardBody>
            <EmptyState
              title="No categories yet"
              description="Start by creating a category such as Starters or Main Courses."
              action={
                <Button onClick={() => setCategoryModal({ mode: "create" })}>
                  + Add category
                </Button>
              }
            />
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-6">
          {categories.map((category, index) => (
            <CategoryPanel
              key={category.id}
              category={category}
              currency={restaurant.currency}
              isFirst={index === 0}
              isLast={index === categories.length - 1}
              onMoveUp={() => moveCategory(category.id, -1)}
              onMoveDown={() => moveCategory(category.id, 1)}
              onEdit={() => setCategoryModal({ mode: "edit", category })}
              onToggleVisible={() =>
                updateCategory(category.id, { isVisible: !category.isVisible })
              }
              onDelete={() => setPendingDelete({ type: "category", category })}
              onAddDish={() => setDishModal({ mode: "create", categoryId: category.id })}
              onEditDish={(dish) => setDishModal({ mode: "edit", dish })}
              onDeleteDish={(dish) => setPendingDelete({ type: "dish", dish })}
              onToggleDishAvailable={(dish) =>
                updateDish(dish.id, { isAvailable: !dish.isAvailable })
              }
              onMoveDishUp={(dish) => moveDish(category.id, dish.id, -1)}
              onMoveDishDown={(dish) => moveDish(category.id, dish.id, 1)}
            />
          ))}
        </div>
      )}

      <Modal
        open={categoryModal !== null}
        onClose={() => setCategoryModal(null)}
        title={categoryModal && categoryModal.mode === "edit" ? "Edit category" : "New category"}
      >
        <CategoryForm
          initial={
            categoryModal && categoryModal.mode === "edit" ? categoryModal.category : undefined
          }
          onSubmit={handleCategorySubmit}
          onCancel={() => setCategoryModal(null)}
          submitLabel={
            categoryModal && categoryModal.mode === "edit" ? "Save changes" : "Create category"
          }
        />
      </Modal>

      <Modal
        open={dishModal !== null}
        onClose={() => setDishModal(null)}
        title={dishModal && dishModal.mode === "edit" ? "Edit dish" : "New dish"}
      >
        <DishForm
          initial={dishModal && dishModal.mode === "edit" ? dishModal.dish : undefined}
          onSubmit={handleDishSubmit}
          onCancel={() => setDishModal(null)}
          submitLabel={dishModal && dishModal.mode === "edit" ? "Save changes" : "Add dish"}
        />
      </Modal>

      <Modal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title={
          pendingDelete && pendingDelete.type === "category" ? "Delete category" : "Delete dish"
        }
      >
        <div className="space-y-5">
          <p className="text-sm text-muted">
            {pendingDelete === null
              ? ""
              : pendingDelete.type === "category"
                ? `This removes "${pendingDelete.category.name}" and all of its dishes from the menu. This cannot be undone.`
                : `This removes "${pendingDelete.dish.name}" from the menu. This cannot be undone.`}
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
