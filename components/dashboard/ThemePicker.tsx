"use client";

import type { MenuTheme, FontStyle, MenuLayout } from "@/lib/types";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";

interface ThemePickerProps {
  theme: MenuTheme;
  onChange: (patch: Partial<MenuTheme>) => void;
}

const ACCENT_PRESETS = [
  { label: "Violet", value: "#8b5cf6" },
  { label: "Lavender", value: "#a78bfa" },
  { label: "Plum", value: "#6d28d9" },
  { label: "Rose", value: "#d84a6b" },
  { label: "Charcoal", value: "#2b2f3a" },
];

const BACKGROUNDS: { label: string; value: string; hint: string }[] = [
  { label: "Paper", value: "paper", hint: "Clean white background" },
  { label: "Cream", value: "cream", hint: "Warm off-white background" },
  { label: "Dark", value: "dark", hint: "Deep violet background" },
];

const FONTS: { label: string; value: string; hint: string }[] = [
  { label: "Classic", value: "classic", hint: "Serif, printed-menu feel" },
  { label: "Modern", value: "modern", hint: "Clean sans-serif" },
  { label: "Playful", value: "playful", hint: "Bold, casual sans-serif" },
];

const LAYOUTS: { label: string; value: string; hint: string }[] = [
  { label: "Cards", value: "cards", hint: "Photos and generous spacing" },
  { label: "List", value: "list", hint: "Compact text list" },
];

function SegmentedField({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: { label: string; value: string; hint: string }[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-paper">{label}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                "rounded-card border px-4 py-3 text-left text-sm transition-colors",
                active
                  ? "border-accent-soft bg-ink-soft text-paper"
                  : "border-line bg-ink-soft/40 text-muted hover:border-accent-soft"
              )}
            >
              <span className="block font-medium text-paper">{option.label}</span>
              <span className="mt-1 block text-xs text-muted">{option.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ThemePicker({ theme, onChange }: ThemePickerProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-paper">Accent colour</p>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              aria-label={preset.label}
              title={preset.label}
              onClick={() => onChange({ accentColor: preset.value })}
              className={cn(
                "h-10 w-10 rounded-full border-2 transition-transform",
                theme.accentColor.toLowerCase() === preset.value.toLowerCase()
                  ? "border-white scale-110"
                  : "border-line"
              )}
              style={{ backgroundColor: preset.value }}
            />
          ))}
          <label className="flex items-center gap-2 rounded-card border border-line bg-ink-soft px-3 py-2 text-xs text-muted">
            Custom
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
            />
          </label>
        </div>
      </div>

      <SegmentedField
        label="Background"
        options={BACKGROUNDS}
        value={theme.background}
        onSelect={(value) => onChange({ background: value })}
      />

      <SegmentedField
        label="Font style"
        options={FONTS}
        value={theme.fontStyle}
        onSelect={(value) => onChange({ fontStyle: value as FontStyle })}
      />

      <SegmentedField
        label="Layout"
        options={LAYOUTS}
        value={theme.layout}
        onSelect={(value) => onChange({ layout: value as MenuLayout })}
      />

      <div className="space-y-4 border-t border-line pt-6">
        <Toggle
          checked={theme.showPrices}
          onChange={(checked) => onChange({ showPrices: checked })}
          label="Show prices"
          description="Display dish prices on the public menu"
        />
        <Toggle
          checked={theme.showAllergens}
          onChange={(checked) => onChange({ showAllergens: checked })}
          label="Show allergens"
          description="Display allergen information under each dish"
        />
      </div>
    </div>
  );
}
