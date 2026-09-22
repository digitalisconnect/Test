"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full max-w-lg rounded-card border border-line bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
          className
        )}
      >
        {title && <h2 className="text-lg font-semibold text-paper">{title}</h2>}
        <div className={cn(title && "mt-4")}>{children}</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted hover:text-paper"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
