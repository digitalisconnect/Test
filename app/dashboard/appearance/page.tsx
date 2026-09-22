"use client";

import { useWorkspace } from "@/lib/store";
import { ThemePicker } from "@/components/dashboard/ThemePicker";
import { PhonePreview } from "@/components/dashboard/PhonePreview";
import { Card, CardBody } from "@/components/ui/Card";

export default function AppearancePage() {
  const { restaurant, theme, categories, dishes, updateTheme } = useWorkspace();

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-paper">Appearance</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Choose the colours, font and layout guests see when they scan your
          table QR code. Every change appears instantly in the preview on the
          right.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardBody>
            <ThemePicker theme={theme} onChange={updateTheme} />
          </CardBody>
        </Card>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <PhonePreview
            restaurant={restaurant}
            theme={theme}
            categories={categories}
            dishes={dishes}
          />
        </div>
      </div>
    </div>
  );
}
