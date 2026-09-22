import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/signup", label: "Create account" },
      { href: "/login", label: "Sign in" },
    ],
  },
  {
    title: "Company",
    links: [{ href: "/contact", label: "Contact" }],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/privacy", label: "Privacy policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-card bg-accent text-white">
                M
              </span>
              <span>Monmenu.fr</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Digital menus for independent restaurants. Build it once, update
              it forever, share it with a QR code.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-paper">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Monmenu.fr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
