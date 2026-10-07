"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Bot,
  ShieldAlert,
  GitMerge,
  FlaskConical,
  Database,
  Activity,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import { DataClassificationBadge } from "./DataClassificationBadge";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home Hub", icon: Home, exact: true },
  { href: "/dashboard", label: "Risk Dashboard", icon: LayoutDashboard },
  { href: "/ai-chat", label: "AI Assistant", icon: Bot },
  { href: "/events", label: "Event Intelligence", icon: ShieldAlert },
  { href: "/supply-chain", label: "Supply Lineage", icon: GitMerge },
  { href: "/scenarios", label: "Scenario Lab", icon: FlaskConical },
  { href: "/risk-analysis", label: "Risk Methodology", icon: Calculator },
  { href: "/sources", label: "Data Sources", icon: Database },
];

export function LeftRail() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 flex w-56 flex-col border-r border-border bg-[#0B0E14] text-foreground select-none">
      {/* --- Brand Header --- */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 border border-primary/20 text-primary">
          <Activity className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-xs font-bold tracking-tight text-foreground uppercase">
            GEORISK AI
          </h1>
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Decision Intelligence
          </p>
        </div>
      </div>

      {/* --- Main Navigation --- */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
          Navigation Hub
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 rounded px-3 py-2 text-xs font-medium transition-all
                ${
                  isActive
                    ? "bg-[#161B22] text-foreground border-l-2 border-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-[#161B22]/60 hover:text-foreground"
                }
              `}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* --- System Provenance & Health Footer --- */}
      <div className="border-t border-border bg-[#0D1117] p-3 space-y-2 text-[11px]">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
            Data Status
          </div>
          <DataClassificationBadge classification="VERIFIED" size="sm" />
        </div>

        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-muted-foreground text-[10px] font-mono">
            <span>PIPELINE HEALTH</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> ACTIVE
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
