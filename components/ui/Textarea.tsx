import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({
  label,
  hint,
  error,
  id,
  className,
  rows = 5,
  ...props
}: TextareaProps) {
  const areaId = id ?? props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={areaId} className="mb-2 block text-sm font-medium text-paper">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        rows={rows}
        className={cn(
          "w-full rounded-card border border-line bg-ink-soft px-4 py-2.5 text-sm text-paper placeholder:text-muted",
          "focus-visible:border-accent-soft",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {hint && !error && <p className="mt-2 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
