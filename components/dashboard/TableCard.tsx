"use client";

import { useEffect, useState } from "react";
import { buildQrImageUrl, getPublicMenuUrl } from "@/lib/qr";

interface TableCardProps {
  restaurantName: string;
  tagline?: string;
  slug: string;
}

export function TableCard({ restaurantName, tagline, slug }: TableCardProps) {
  const [url, setUrl] = useState<string>(() => getPublicMenuUrl(slug));

  useEffect(() => {
    setUrl(getPublicMenuUrl(slug));
  }, [slug]);

  const qrImageUrl = buildQrImageUrl(url, 240);

  return (
    <div
      id="table-card"
      className="mx-auto flex w-full max-w-xs flex-col items-center gap-5 rounded-card border border-line bg-white px-8 py-10 text-center text-ink shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
        Scan to view our menu
      </p>
      <h3 className="text-xl font-semibold text-ink">{restaurantName}</h3>
      {tagline && <p className="text-sm text-ink/60">{tagline}</p>}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrImageUrl}
        alt={`QR code linking to the menu for ${restaurantName}`}
        width={200}
        height={200}
        className="block"
      />

      <p className="break-all text-xs text-ink/50">{url}</p>
      <p className="text-xs text-ink/40">Powered by Monmenu.fr</p>
    </div>
  );
}
