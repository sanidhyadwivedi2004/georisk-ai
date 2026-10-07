/**
 * GeoRisk AI — Centralized Asset Configuration
 *
 * Maps to high-resolution photographic and video media assets in public/assets/
 */

export interface AssetGroup {
  hero: {
    energyInfrastructure: string;
    geopoliticalMap: string;
    controlCenter: string;
  };
  energy: {
    refinery: string;
    oilTanker: string;
    lngTerminal: string;
    crudeStorage: string;
  };
  infrastructure: {
    pipeline: string;
    port: string;
    chokepoint: string;
    maritimeRoute: string;
  };
  geopolitics: {
    hormuzSatellite: string;
    babElMandeb: string;
    malaccaStrait: string;
  };
  videos: {
    globalEnergyHero: string;
    tankerTransit: string;
    refineryOperations: string;
  };
  maps: {
    worldDarkBasemap: string;
    chokepointsOverlay: string;
  };
}

export const assets: AssetGroup = {
  hero: {
    energyInfrastructure: "/assets/images/hero/energy-infrastructure-clean.png",
    geopoliticalMap: "/assets/images/hero/geopolitical-map-clean.png",
    controlCenter: "/assets/images/hero/control-center.png",
  },
  energy: {
    refinery: "/assets/images/energy/refinery-clean.png",
    oilTanker: "/assets/images/energy/oil-tanker-clean.png",
    lngTerminal: "/assets/images/energy/lng-terminal-clean.png",
    crudeStorage: "/assets/images/energy/crude-storage.png",
  },
  infrastructure: {
    pipeline: "/assets/images/infrastructure/pipeline.png",
    port: "/assets/images/infrastructure/port-clean.png",
    chokepoint: "/assets/images/infrastructure/chokepoint-clean.png",
    maritimeRoute: "/assets/images/infrastructure/maritime-route.png",
  },
  geopolitics: {
    hormuzSatellite: "/assets/images/geopolitics/hormuz-satellite.png",
    babElMandeb: "/assets/images/geopolitics/bab-el-mandeb.png",
    malaccaStrait: "/assets/images/geopolitics/malacca-strait.png",
  },
  videos: {
    globalEnergyHero: "/assets/videos/hero/global-energy.mp4",
    tankerTransit: "/assets/videos/energy/tanker.mp4",
    refineryOperations: "/assets/videos/energy/refinery.mp4",
  },
  maps: {
    worldDarkBasemap: "/assets/maps/world-dark.json",
    chokepointsOverlay: "/assets/maps/chokepoints.json",
  },
};

/** Helper function to return node-specific photographic asset path */
export function getAssetForNodeType(nodeType: string): string {
  switch (nodeType) {
    case "import_port":
    case "export_terminal":
      return assets.infrastructure.port;
    case "refinery":
      return assets.energy.refinery;
    case "chokepoint":
      return assets.infrastructure.chokepoint;
    case "maritime_route":
      return assets.infrastructure.maritimeRoute;
    case "supplier":
      return assets.energy.crudeStorage;
    default:
      return assets.hero.energyInfrastructure;
  }
}
