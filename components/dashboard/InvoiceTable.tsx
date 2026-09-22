import type { Invoice } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const statusStyles: Record<Invoice["status"], string> = {
  paid: "text-accent-soft border-accent-soft/40",
  pending: "text-amber-300 border-amber-300/40",
  failed: "text-red-300 border-red-300/40",
};

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  if (invoices.length === 0) {
    return <p className="text-sm text-muted">No invoices yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
            <th className="py-3 pr-4 font-medium">Reference</th>
            <th className="py-3 pr-4 font-medium">Date</th>
            <th className="py-3 pr-4 font-medium">Amount</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 pr-0 font-medium text-right">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-line last:border-0">
              <td className="py-3 pr-4 text-paper">{invoice.reference}</td>
              <td className="py-3 pr-4 text-muted">{formatDate(invoice.issuedAt)}</td>
              <td className="py-3 pr-4 text-paper">{formatPrice(invoice.amount)}</td>
              <td className="py-3 pr-4">
                <Badge className={cn("capitalize", statusStyles[invoice.status])}>
                  {invoice.status}
                </Badge>
              </td>
              <td className="py-3 pr-0 text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-accent-soft hover:text-accent"
                  onClick={() => window.alert("Invoice download is a placeholder in this demo.")}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
