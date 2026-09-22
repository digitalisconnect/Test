"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is there really only one plan?",
    answer:
      "Yes. €9.99 per month covers one venue with unlimited dishes, categories and menu updates. There are no hidden tiers or per-dish fees.",
  },
  {
    question: "Can I cancel any time?",
    answer:
      "Yes, the subscription is month to month with no contract. Cancel from your billing page whenever you like and your menu stays live until the end of the billing period.",
  },
  {
    question: "Do guests need to install an app?",
    answer:
      "No. Guests scan the table QR code with their phone's camera and the menu opens straight in their browser. There is nothing to download.",
  },
  {
    question: "Can I update prices myself?",
    answer:
      "Yes. Every change you make in the menu editor is published instantly, so a price change or a sold-out dish updates on every guest's phone right away.",
  },
  {
    question: "What happens to my menu if I stop paying?",
    answer:
      "Your public menu is taken offline and your dashboard becomes read-only, but your categories, dishes and settings are kept so you can pick up where you left off if you resubscribe.",
  },
  {
    question: "Do you offer a guided setup?",
    answer:
      "Yes. Reach out from the contact page and ask for a guided setup call, and we'll help you build your first menu together.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        Common questions
      </h2>

      <div className="mt-10 divide-y divide-line rounded-card border border-line bg-surface">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="px-6">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-sm font-medium text-paper sm:text-base">
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-accent transition-transform duration-150",
                    isOpen && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
