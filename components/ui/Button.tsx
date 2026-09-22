import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-card font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-soft",
  secondary: "bg-surface text-paper border border-line hover:border-accent-soft",
  ghost: "text-paper hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton
  extends CommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  children: React.ReactNode;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, children } = props;
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonAsButton;
  return <button className={classes} {...rest} />;
}
