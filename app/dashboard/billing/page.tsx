"use client";

import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InvoiceTable } from "@/components/dashboard/InvoiceTable";
import { useWorkspace } from "@/lib/store";
import { formatDate } from "@/lib/format";

export default function BillingPage() {
  const { account, invoices } = useWorkspace();
  const lastInvoice = invoices[0];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-paper">Billing</h1>
        <p className="mt-1 text-sm text-muted">
          Review your subscription, payment method and past invoices.
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-paper">Standard plan</h2>
              <Badge className="text-accent-soft border-accent-soft/40">Active</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              One venue, unlimited dishes and menu updates, a branded public menu page and a
              printable QR code.
            </p>
            {lastInvoice && (
              <p className="mt-2 text-xs text-muted">
                Last billed {formatDate(lastInvoice.issuedAt)}. Renews automatically each month.
              </p>
            )}
          </div>
          <div className="text-left sm:text-right">
            <p className="text-3xl font-semibold text-paper">
              €9.99<span className="text-base font-normal text-muted"> / month</span>
            </p>
            <p className="mt-1 text-xs text-muted">Owner: {account.ownerName}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-paper">Payment method</h2>
            <p className="mt-1 text-sm text-muted">
              Visa ending in 4242 · Expires 12/2027
            </p>
            <p className="mt-1 text-xs text-muted">
              This is a placeholder in the demo. A real integration would connect a payment
              provider here.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => window.alert("Updating your payment method is a placeholder in this demo.")}
          >
            Update payment method
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-paper">Invoice history</h2>
          </div>
          <InvoiceTable invoices={invoices} />
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-paper">Cancel subscription</h2>
            <p className="mt-1 text-sm text-muted">
              Your public menu stays live until the end of the current billing period.
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => window.alert("Cancelling is a placeholder in this demo.")}
            className="text-red-300 hover:text-red-200"
          >
            Cancel plan
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
