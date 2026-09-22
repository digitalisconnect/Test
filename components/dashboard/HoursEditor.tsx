"use client";

import type { OpeningHoursDay } from "@/lib/types";
import { Toggle } from "@/components/ui/Toggle";

interface HoursEditorProps {
  value: OpeningHoursDay[];
  onChange: (value: OpeningHoursDay[]) => void;
}

export function HoursEditor({ value, onChange }: HoursEditorProps) {
  function updateDay(index: number, patch: Partial<OpeningHoursDay>) {
    const next = value.map((day, i) => (i === index ? { ...day, ...patch } : day));
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      {value.map((day, index) => (
        <div
          key={day.day}
          className="flex flex-col gap-3 rounded-card border border-line bg-ink-soft p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center justify-between gap-4 sm:w-40 sm:justify-start">
            <span className="text-sm font-medium text-paper">{day.day}</span>
            <Toggle
              checked={!day.closed}
              onChange={(checked) => updateDay(index, { closed: !checked })}
            />
          </div>

          {day.closed ? (
            <p className="text-sm text-muted sm:flex-1">Closed</p>
          ) : (
            <div className="flex items-center gap-3 sm:flex-1">
              <input
                type="time"
                value={day.open}
                onChange={(e) => updateDay(index, { open: e.target.value })}
                className="w-full rounded-card border border-line bg-ink px-3 py-2 text-sm text-paper focus-visible:border-accent-soft sm:w-32"
                aria-label={`${day.day} opening time`}
              />
              <span className="text-sm text-muted">to</span>
              <input
                type="time"
                value={day.close}
                onChange={(e) => updateDay(index, { close: e.target.value })}
                className="w-full rounded-card border border-line bg-ink px-3 py-2 text-sm text-paper focus-visible:border-accent-soft sm:w-32"
                aria-label={`${day.day} closing time`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
