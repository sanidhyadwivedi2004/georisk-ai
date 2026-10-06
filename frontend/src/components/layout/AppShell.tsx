"use client";

import { useState, createContext, useContext } from "react";
import { LeftRail } from "./LeftRail";
import { GlobalHeader } from "./GlobalHeader";
import { EvidenceDrawer } from "../intelligence/EvidenceDrawer";
import { AssetInspectorDrawer } from "../map/AssetInspectorDrawer";
import { EvidenceItem, SupplyChainNode } from "@/types";
import { MOCK_EVENTS, MOCK_SUPPLY_CHAIN_NODES } from "@/lib/mock-data";
import { assets } from "@/config/assets";
import { Video } from "lucide-react";

interface ShellContextType {
  openEvidenceDrawer: (evidenceList?: EvidenceItem[], title?: string) => void;
  openAssetInspector: (node: SupplyChainNode) => void;
  activeVideoFeed: string;
  setActiveVideoFeed: (feed: string) => void;
  isVideoEnabled: boolean;
  setIsVideoEnabled: (enabled: boolean) => void;
}

const ShellContext = createContext<ShellContextType>({
  openEvidenceDrawer: () => {},
  openAssetInspector: () => {},
  activeVideoFeed: assets.videos.globalEnergyHero,
  setActiveVideoFeed: () => {},
  isVideoEnabled: true,
  setIsVideoEnabled: () => {},
});

export const useShell = () => useContext(ShellContext);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [activeEvidenceList, setActiveEvidenceList] = useState<EvidenceItem[]>(
    MOCK_EVENTS[0].evidenceList
  );
  const [evidenceTitle, setEvidenceTitle] = useState(MOCK_EVENTS[0].title);
  const [activeAssetNode, setActiveAssetNode] = useState<SupplyChainNode | null>(null);

  // Background Video State
  const [activeVideoFeed, setActiveVideoFeed] = useState<string>(assets.videos.globalEnergyHero);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);

  const openEvidenceDrawer = (evidenceList?: EvidenceItem[], title?: string) => {
    if (evidenceList) setActiveEvidenceList(evidenceList);
    if (title) setEvidenceTitle(title);
    setEvidenceOpen(true);
  };

  const openAssetInspector = (node: SupplyChainNode) => {
    setActiveAssetNode(node);
  };

  return (
    <ShellContext.Provider
      value={{
        openEvidenceDrawer,
        openAssetInspector,
        activeVideoFeed,
        setActiveVideoFeed,
        isVideoEnabled,
        setIsVideoEnabled,
      }}
    >
      <div className="relative min-h-screen bg-[#0B0E14] text-[#F2F4F7] flex font-sans antialiased selection:bg-primary/30">
        {/* ── Global Full-Screen Background Video Atmosphere Layer ────────── */}
        {isVideoEnabled && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <video
              key={activeVideoFeed}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter contrast-125 brightness-50 opacity-20 transition-opacity duration-1000"
            >
              <source src={activeVideoFeed} type="video/mp4" />
            </video>
            
            {/* Vignette Overlay for Crisp Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14]/90 via-[#0B0E14]/75 to-[#0B0E14]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B0E14]/40 to-[#0B0E14]" />
          </div>
        )}

        {/* Left Navigation Rail */}
        <div className="relative z-40">
          <LeftRail />
        </div>

        {/* Main Content Workspace Area */}
        <div className="relative z-10 flex-1 ml-56 flex flex-col min-w-0">
          <GlobalHeader />

          {/* Real-time Ticker Bar */}
          <div className="flex items-center justify-between border-b border-border/80 bg-[#0D1117]/80 px-6 py-1.5 text-[11px] font-mono backdrop-blur-md">
            <div className="flex items-center gap-6 overflow-x-auto text-muted-foreground whitespace-nowrap">
              <span className="flex items-center gap-1.5 text-foreground font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE SPOT MARKET:
              </span>
              <span>Brent Crude: <strong className="text-emerald-400 font-bold">$78.40</strong> ▲ 1.2%</span>
              <span>Arab Light: <strong className="text-emerald-400 font-bold">$79.10</strong> ▲ 1.4%</span>
              <span>LNG Asia: <strong className="text-emerald-400 font-bold">$13.20</strong> ▲ 2.1%</span>
              <span>Hormuz Disruption Index: <strong className="text-red-400 font-bold">82 / 100 HIGH</strong></span>
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0 text-[10px] text-muted-foreground">
              <span>ATMOSPHERE FEED:</span>
              <button
                onClick={() => setActiveVideoFeed(assets.videos.globalEnergyHero)}
                className={`hover:text-foreground cursor-pointer ${
                  activeVideoFeed === assets.videos.globalEnergyHero ? "text-primary font-bold" : ""
                }`}
              >
                PORT
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveVideoFeed(assets.videos.tankerTransit)}
                className={`hover:text-foreground cursor-pointer ${
                  activeVideoFeed === assets.videos.tankerTransit ? "text-primary font-bold" : ""
                }`}
              >
                TANKER
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveVideoFeed(assets.videos.refineryOperations)}
                className={`hover:text-foreground cursor-pointer ${
                  activeVideoFeed === assets.videos.refineryOperations ? "text-primary font-bold" : ""
                }`}
              >
                REFINERY
              </button>
            </div>
          </div>

          <main className="flex-1 p-6 space-y-6 max-w-[1800px] w-full mx-auto">
            {children}
          </main>

          {/* Institutional Footer */}
          <footer className="border-t border-border bg-[#0B0E14]/90 backdrop-blur-md px-6 py-4 text-xs font-mono text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              <span className="font-semibold text-foreground">GeoRisk AI</span>
              <span>· Decision Intelligence Platform</span>
            </div>
            <div className="text-[11px] text-muted-foreground/80 text-center">
              Sources: GDELT · EIA · OPEC · UN Comtrade · OFAC · OSM · GEM
            </div>
            <div className="text-[10px] text-muted-foreground/60">
              © 2026 GeoRisk AI · Institutional Intelligence Workstation
            </div>
          </footer>
        </div>

        {/* Drawers */}
        <EvidenceDrawer
          isOpen={evidenceOpen}
          onClose={() => setEvidenceOpen(false)}
          evidenceList={activeEvidenceList}
          eventTitle={evidenceTitle}
        />

        <AssetInspectorDrawer
          node={activeAssetNode}
          onClose={() => setActiveAssetNode(null)}
        />
      </div>
    </ShellContext.Provider>
  );
}
