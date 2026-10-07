import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              GeoRisk AI
            </h1>
            <Badge
              variant="outline"
              className="text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              Demo
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Geopolitical Energy Supply Chain Decision Intelligence
          </p>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground sm:mt-0">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            System Online
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span>Last updated: Demo mode</span>
        </div>
      </div>
    </header>
  );
}
