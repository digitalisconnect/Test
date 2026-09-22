"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { buildQrImageUrl, getPublicMenuUrl } from "@/lib/qr";

interface QrPreviewProps {
  slug: string;
  size?: number;
}

export function QrPreview({ slug, size = 280 }: QrPreviewProps) {
  const [url, setUrl] = useState<string>(() => getPublicMenuUrl(slug));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(getPublicMenuUrl(slug));
  }, [slug]);

  const qrImageUrl = buildQrImageUrl(url, size);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
      <div className="rounded-card bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrImageUrl}
          alt={`QR code linking to the public menu at ${url}`}
          width={size}
          height={size}
          className="block"
        />
      </div>

      <div className="flex w-full flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-paper">Public menu link</p>
          <p className="mt-1 break-all rounded-card border border-line bg-ink-soft px-3 py-2 text-sm text-muted">
            {url}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? "Link copied" : "Copy link"}
          </Button>
          <a
            href={qrImageUrl}
            download={`monmenu-qr-${slug}.png`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-card border border-line bg-surface px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-150 hover:border-accent-soft"
          >
            Download QR code
          </a>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-card px-5 py-2.5 text-sm font-medium text-accent hover:text-accent-soft"
          >
            Open public menu ↗
          </a>
        </div>
      </div>
    </div>
  );
}
