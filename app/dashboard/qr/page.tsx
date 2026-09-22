"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QrPreview } from "@/components/dashboard/QrPreview";
import { TableCard } from "@/components/dashboard/TableCard";
import { useWorkspace } from "@/lib/store";

export default function QrCodePage() {
  const { restaurant } = useWorkspace();
  const [printing, setPrinting] = useState(false);

  function handlePrint() {
    setPrinting(true);
    window.setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 50);
  }

  return (
    <div className="flex flex-col gap-8">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #table-card, #table-card * {
            visibility: visible;
          }
          #table-card {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>

      <div>
        <h1 className="text-2xl font-semibold text-paper">QR code and sharing</h1>
        <p className="mt-1 text-sm text-muted">
          Every table gets the same QR code. Guests scan it to open your live public menu — no
          app to install.
        </p>
      </div>

      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-paper">Your menu QR code</h2>
          <p className="mt-1 text-sm text-muted">
            This code always points to your current public menu at{" "}
            <span className="text-paper">/m/{restaurant.slug}</span>. Updates you publish appear
            instantly, so the same printed code never goes out of date.
          </p>
          <div className="mt-6">
            <QrPreview slug={restaurant.slug} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-paper">Printable table card</h2>
              <p className="mt-1 text-sm text-muted">
                A ready-to-print card for the dining room. Print it, cut along the edges and
                place one on every table.
              </p>
            </div>
            <Button onClick={handlePrint} disabled={printing} className="self-start sm:self-auto">
              {printing ? "Preparing…" : "Print table card"}
            </Button>
          </div>

          <div className="mt-8 rounded-card border border-line bg-ink-soft p-6 sm:p-10">
            <TableCard
              restaurantName={restaurant.name}
              tagline={restaurant.tagline}
              slug={restaurant.slug}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
