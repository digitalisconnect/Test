import type { ScanEvent } from "@/lib/types";
import { formatDate } from "@/lib/format";

interface ActivityListProps {
  events: ScanEvent[];
}

export function ActivityList({ events }: ActivityListProps) {
  const max = Math.max(...events.map((e) => e.count), 1);

  return (
    <ul className="space-y-3">
      {events.map((event) => (
        <li key={event.date} className="flex items-center gap-4">
          <span className="w-20 shrink-0 text-xs text-muted">{formatDate(event.date)}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-soft">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.max((event.count / max) * 100, 6)}%` }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-xs font-medium text-paper">
            {event.count}
          </span>
        </li>
      ))}
    </ul>
  );
}
