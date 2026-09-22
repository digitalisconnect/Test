"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  number: string;
  title: string;
  description: string;
  illustration: (active: boolean) => React.ReactNode;
};

function PaperMenuIllustration({ active }: { active: boolean }) {
  return (
    <div
      className={`relative flex h-24 w-20 flex-col gap-2 rounded-[6px] border border-line bg-ink/40 p-3 shadow-sm transition-transform duration-300 ${
        active ? "-rotate-1" : ""
      }`}
    >
      <span className="h-1.5 w-10 rounded-full bg-paper/70" />
      <span className="h-1 w-14 rounded-full bg-muted/60" />
      <span className="h-1 w-12 rounded-full bg-muted/40" />
      <span className="mt-2 h-1 w-14 rounded-full bg-muted/60" />
      <span className="h-1 w-9 rounded-full bg-muted/40" />
      <span className="mt-2 h-1 w-11 rounded-full bg-muted/60" />
    </div>
  );
}

function PhotoCaptureIllustration({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-24 w-20 items-center justify-center">
      <div
        className={`flex h-20 w-16 flex-col gap-2 rounded-[6px] border border-line bg-ink/40 p-3 transition-transform duration-300 ${
          active ? "scale-95" : ""
        }`}
      >
        <span className="h-1.5 w-9 rounded-full bg-paper/70" />
        <span className="h-1 w-12 rounded-full bg-muted/60" />
        <span className="mt-1 h-1 w-10 rounded-full bg-muted/40" />
      </div>
      {/* corner scan brackets */}
      <span className="absolute -left-1 -top-1 h-4 w-4 rounded-tl-[4px] border-l-2 border-t-2 border-accent" />
      <span className="absolute -right-1 -top-1 h-4 w-4 rounded-tr-[4px] border-r-2 border-t-2 border-accent" />
      <span className="absolute -bottom-1 -left-1 h-4 w-4 rounded-bl-[4px] border-b-2 border-l-2 border-accent" />
      <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-br-[4px] border-b-2 border-r-2 border-accent" />
    </div>
  );
}

function AiAnalysisIllustration({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-24 w-20 items-center justify-center">
      <span
        className={`absolute h-14 w-14 rounded-full border border-dashed border-accent/50 transition-transform duration-500 ${
          active ? "rotate-180" : ""
        }`}
      />
      <span className="absolute h-2 w-2 rounded-full bg-accent" style={{ top: "6px", left: "30px" }} />
      <span className="absolute h-1.5 w-1.5 rounded-full bg-accent/70" style={{ bottom: "10px", left: "12px" }} />
      <span className="absolute h-1.5 w-1.5 rounded-full bg-accent/70" style={{ bottom: "14px", right: "10px" }} />
      <span className="absolute h-1 w-1 rounded-full bg-accent/50" style={{ top: "20px", right: "16px" }} />
      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-card bg-accent/15 text-accent">
        <span className="text-xs font-bold">AI</span>
      </div>
    </div>
  );
}

function DigitalMenuIllustration() {
  return (
    <div className="flex h-24 w-24 flex-col gap-2 rounded-card border border-line bg-ink/40 p-2.5">
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 shrink-0 rounded-[6px] bg-accent/20" />
        <div className="min-w-0 flex-1 space-y-1">
          <span className="block h-1.5 w-full rounded-full bg-paper/70" />
          <span className="block h-1 w-3/4 rounded-full bg-muted/50" />
        </div>
        <span className="shrink-0 text-[9px] font-semibold text-accent">12€</span>
      </div>
      <span className="h-px w-full bg-line" />
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 shrink-0 rounded-[6px] bg-accent/10" />
        <div className="min-w-0 flex-1 space-y-1">
          <span className="block h-1.5 w-2/3 rounded-full bg-paper/60" />
          <span className="block h-1 w-1/2 rounded-full bg-muted/40" />
        </div>
        <span className="shrink-0 text-[9px] font-semibold text-accent">9€</span>
      </div>
    </div>
  );
}

function QrCodeIllustration() {
  // deterministic pseudo-QR pattern, purely decorative
  const cells = [
    1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 1, 0, 1,
    0, 0, 0, 1, 0, 0, 0,
    1, 1, 0, 1, 1, 1, 1,
    1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
  ];
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-card border border-line bg-paper p-2">
      <div className="grid grid-cols-7 grid-rows-7 gap-[1.5px]">
        {cells.map((on, i) => (
          <span
            key={i}
            className={`h-2 w-2 ${on ? "bg-ink" : "bg-paper"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ScanPhoneIllustration({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-24 w-20 items-center justify-center">
      <div className="flex h-24 w-14 flex-col items-center rounded-[10px] border border-line bg-ink/40 p-1.5">
        <div className="flex h-full w-full flex-col gap-1 rounded-[6px] bg-surface p-1.5">
          <span className="h-1 w-6 rounded-full bg-accent/60" />
          <span className="h-4 w-full rounded-[4px] bg-accent/10" />
          <span className="h-1 w-8 rounded-full bg-muted/50" />
          <span className="h-1 w-6 rounded-full bg-muted/40" />
        </div>
      </div>
      <span
        className={`absolute h-14 w-14 rounded-full border-2 border-accent/40 transition-opacity duration-500 ${
          active ? "opacity-100 scale-110" : "opacity-0 scale-90"
        }`}
      />
    </div>
  );
}

const steps: Step[] = [
  {
    number: "01",
    title: "Menu papier",
    description: "Votre carte actuelle",
    illustration: (active) => <PaperMenuIllustration active={active} />,
  },
  {
    number: "02",
    title: "Photo prise",
    description: "Photographiez simplement votre carte",
    illustration: (active) => <PhotoCaptureIllustration active={active} />,
  },
  {
    number: "03",
    title: "IA MonMenu",
    description: "Plats, prix et catégories détectés",
    illustration: (active) => <AiAnalysisIllustration active={active} />,
  },
  {
    number: "04",
    title: "Menu digital",
    description: "Prêt à être personnalisé",
    illustration: () => <DigitalMenuIllustration />,
  },
  {
    number: "05",
    title: "Votre QR Code",
    description: "À placer sur vos tables",
    illustration: () => <QrCodeIllustration />,
  },
  {
    number: "06",
    title: "Vos clients consultent",
    description: "Instantanément, sans application",
    illustration: (active) => <ScanPhoneIllustration active={active} />,
  },
];

function Arrow() {
  return (
    <div className="hidden shrink-0 items-center justify-center lg:flex" style={{ width: "1.5rem" }}>
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="text-muted">
        <path d="M0 5H18M18 5L13 1M18 5L13 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  const [visible, setVisible] = useState<boolean[]>(() => steps.map(() => false));
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => {
                if (prev[index]) return prev;
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            De votre carte au menu digital
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Votre menu digital en quelques minutes.
          </h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Photographiez votre carte. MonMenu s&apos;occupe du reste. Vos clients scannent,
            découvrent votre menu — et vous pouvez le modifier à tout moment.
          </p>
        </div>

        <div
          className="mt-14 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:flex lg:flex-nowrap lg:items-stretch lg:gap-2 lg:overflow-visible"
        >
          {steps.map((step, index) => (
            <div key={step.number} className="flex shrink-0 items-stretch lg:flex-1 lg:basis-0">
              <div
                ref={(el) => {
                  refs.current[index] = el;
                }}
                style={{ transitionDelay: `${index * 90}ms` }}
                className={`group relative w-[220px] shrink-0 snap-start rounded-card border border-line bg-ink/30 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft hover:shadow-md md:w-full ${
                  visible[index]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <span className="absolute left-4 top-4 text-xs font-semibold tracking-wide text-muted">
                  {step.number}
                </span>
                <div className="mt-6 flex h-28 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {step.illustration(visible[index])}
                </div>
                <h3 className="mt-5 text-sm font-semibold text-paper">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.description}</p>
              </div>
              {index < steps.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
