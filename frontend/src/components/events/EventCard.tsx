import type { GeoEvent } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EventCardProps {
  event: GeoEvent;
}

const SEVERITY_COLORS: Record<string, string> = {
  low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
};

function getSeverityLabel(severity: number): string {
  if (severity <= 3) return "low";
  if (severity <= 5) return "moderate";
  if (severity <= 7) return "high";
  return "critical";
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  conflict: "Armed Conflict",
  sanctions: "Sanctions",
  infrastructure: "Infrastructure",
  political: "Political",
};

export function EventCard({ event }: EventCardProps) {
  const severityLabel = getSeverityLabel(event.severity);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight">
            {event.title}
          </CardTitle>
          <Badge
            variant="outline"
            className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            Mock
          </Badge>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {EVENT_TYPE_LABELS[event.type] ?? event.type}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${SEVERITY_COLORS[severityLabel]}`}
          >
            Severity {event.severity}/10
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{event.location}</span>
        </div>

        {/* Confidence */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-medium">
              {Math.round(event.confidence * 100)}%
            </span>
          </div>
          <Progress value={event.confidence * 100} className="h-1.5" />
        </div>

        {/* Summary */}
        <p className="leading-relaxed text-muted-foreground">{event.summary}</p>

        {/* Timestamp */}
        <div className="text-xs text-muted-foreground">
          {new Date(event.timestamp).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      </CardContent>
    </Card>
  );
}
