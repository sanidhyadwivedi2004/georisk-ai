"use client";

import { Separator } from "@/components/ui/separator";

interface IntelligenceHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "dashboard", label: "Decision Dashboard" },
  { id: "event", label: "Event Intelligence" },
  { id: "supply-chain", label: "Supply Chain" },
  { id: "scenarios", label: "Scenarios" },
];

export function IntelligenceHeader({
  activeTab,
  onTabChange,
}: IntelligenceHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      {/* ── Top Bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold tracking-tight text-foreground">
                GEORISK AI
              </span>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Global Energy Risk Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            System Online
          </span>
          <Separator orientation="vertical" className="hidden h-3 sm:block" />
          <span className="hidden sm:inline">
            Demo Mode
          </span>
          <span
            className="inline-flex items-center rounded border border-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-amber-500"
          >
            Demo
          </span>
        </div>
      </div>

      {/* ── Navigation Tabs ────────────────────────────────── */}
      <nav className="flex gap-0 px-6" role="tablist" aria-label="Dashboard sections">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.06em]
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
              ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }
            `}
          >
            {tab.label}
            {/* Active indicator */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-4 right-4 h-px bg-foreground" />
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
