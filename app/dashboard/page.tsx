"use client";

import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { EmptyState } from "@/components/ui/EmptyState";
import { useWorkspace } from "@/lib/store";
import { formatDate } from "@/lib/format";

export default function DashboardOverviewPage() {
  const { restaurant, categories, dishes, scanActivity } = useWorkspace();

  const visibleCategories = categories.filter((c) => c.isVisible);
  const availableDishes = dishes.filter((d) => d.isAvailable);
  const missingPhotos = dishes.filter((d) => !d.imageUrl).length;
  const totalScans = scanActivity.reduce((sum, e) => sum + e.count, 0);
  const lastScanDay = scanActivity[scanActivity.length - 1];

  const quickActions = [
    {
      href: "/dashboard/menu",
      title: "Edit menu",
      description: "Add dishes, reorder categories, mark items sold out.",
    },
    {
      href: "/dashboard/appearance",
      title: "Customise appearance",
      description: "Pick colours, fonts and layout for the public menu.",
    },
    {
      href: "/dashboard/qr",
      title: "Get your QR code",
      description: "Download the table code and share the menu link.",
    },
    {
      href: "/dashboard/settings",
      title: "Venue settings",
      description: "Update address, hours and contact details.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-paper">Overview</h1>
          <p className="mt-1 text-sm text-muted">
            A quick look at {restaurant.name}&apos;s digital menu.
          </p>
        </div>
        <Badge className={restaurant.isPublished ? "border-accent-soft text-accent" : ""}>
          {restaurant.isPublished ? "Live at /m/" + restaurant.slug : "Draft, not published"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Categories" value={String(visibleCategories.length)} hint={`${categories.length} total`} />
        <StatCard label="Dishes available" value={String(availableDishes.length)} hint={`${dishes.length} total`} />
        <StatCard
          label="Missing photos"
          value={String(missingPhotos)}
          hint="Photos help guests decide faster"
          tone={missingPhotos > 0 ? "warning" : "default"}
        />
        <StatCard label="Scans this week" value={String(totalScans)} hint="Across all QR placements" tone="accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-paper">Scan activity</h2>
              {lastScanDay && (
                <span className="text-xs text-muted">Updated {formatDate(lastScanDay.date)}</span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">
              Table QR scans recorded over the last seven days.
            </p>
            <div className="mt-6">
              <ActivityList events={scanActivity} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex h-full flex-col">
            <h2 className="text-base font-semibold text-paper">Menu health</h2>
            <p className="mt-1 text-sm text-muted">Things worth a quick check.</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start justify-between gap-3">
                <span className="text-muted">Hidden categories</span>
                <span className="font-medium text-paper">
                  {categories.length - visibleCategories.length}
                </span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span className="text-muted">Sold out dishes</span>
                <span className="font-medium text-paper">
                  {dishes.length - availableDishes.length}
                </span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span className="text-muted">Signature dishes</span>
                <span className="font-medium text-paper">
                  {dishes.filter((d) => d.isSignature).length}
                </span>
              </li>
            </ul>
            <div className="mt-auto pt-6">
              <Button href="/dashboard/menu" variant="secondary" className="w-full">
                Review menu
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="mb-4 text-base font-semibold text-paper">Quick actions</h2>
        {quickActions.length === 0 ? (
          <EmptyState title="Nothing to do yet" description="Your quick actions will show up here." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Card className="h-full transition-colors hover:border-accent-soft">
                  <CardBody>
                    <p className="text-sm font-semibold text-paper">{action.title}</p>
                    <p className="mt-2 text-xs text-muted">{action.description}</p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
