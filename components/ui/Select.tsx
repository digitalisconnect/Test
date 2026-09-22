import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  hint,
  error,
  id,
  className,
  options,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-2 block text-sm font-medium text-paper">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full rounded-card border border-line bg-ink-soft px-4 py-2.5 text-sm text-paper",
          "focus-visible:border-accent-soft",
          error && "border-red-400",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && !error && <p className="mt-2 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
