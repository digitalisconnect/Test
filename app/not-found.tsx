import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-ink px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            404
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-paper sm:text-4xl">
            This page isn&apos;t on the menu.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The page you were looking for doesn&apos;t exist, or the link may be out of
            date. Check the address, or head back to somewhere we know.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" size="md">
              Back to home
            </Button>
            <Button href="/contact" variant="secondary" size="md">
              Contact us
            </Button>
          </div>
          <p className="mt-8 text-xs text-muted">
            Looking for a specific restaurant&apos;s menu? Ask them for their QR code or{" "}
            <Link href="/" className="text-accent hover:underline">
              visit the homepage
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
