import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-card bg-accent text-white">
            M
          </span>
          <span>Monmenu.fr</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/login" variant="ghost" size="md" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button href="/signup" variant="primary" size="md">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
