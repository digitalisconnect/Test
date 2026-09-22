import { Card, CardBody } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "accent" | "warning";
}

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-paper",
  accent: "text-accent",
  warning: "text-amber-400",
};

export function StatCard({ label, value, hint, tone = "default" }: StatCardProps) {
  return (
    <Card>
      <CardBody>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
        <p className={cn("mt-3 text-3xl font-semibold", toneClasses[tone])}>{value}</p>
        {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
      </CardBody>
    </Card>
  );
}
