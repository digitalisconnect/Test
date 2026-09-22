// ---------------------------------------------------------------------------
// QR code helpers for the demo workspace.
//
// SEAM FOR A REAL BACKEND:
// This uses a public, key-less QR image generation endpoint so the demo
// works without adding a dependency. In production you would likely render
// QR codes server-side (e.g. with a small canvas-based library) and cache
// the resulting image per restaurant, or generate a signed short link that
// tracks scans before redirecting to the public menu.
// ---------------------------------------------------------------------------

export function getMenuPath(slug: string): string {
  return `/m/${slug}`;
}

/**
 * Builds the full, shareable URL for a restaurant's public menu.
 * Falls back to a placeholder origin when called outside the browser.
 */
export function getPublicMenuUrl(slug: string, origin?: string): string {
  const base =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "https://monmenu.fr");
  return `${base}${getMenuPath(slug)}`;
}

/**
 * Builds an image URL that renders a QR code encoding the given text.
 * Uses a free, key-less third-party QR rendering endpoint.
 */
export function buildQrImageUrl(data: string, size: number = 320): string {
  const params = new URLSearchParams({
    size: `${size}x${size}`,
    data,
    margin: "2",
  });
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}
