import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-paper">
          {label}
        </label>
      )}
      <input
        id={inputId}
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
