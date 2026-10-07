import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MapPlaceholder() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Geospatial View
        </h2>
        <Badge
          variant="outline"
          className="text-[10px] uppercase tracking-wider text-muted-foreground"
        >
          Pending Integration
        </Badge>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            className="relative flex items-center justify-center bg-muted/30"
            style={{ minHeight: "360px" }}
          >
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), " +
                  "linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center gap-3 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-muted-foreground/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  MapLibre GL JS Integration Pending
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  Geospatial visualization of events, assets, routes, and
                  chokepoints will be rendered here.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
