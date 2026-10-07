const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'assets');

const folders = [
  'images/hero',
  'images/energy',
  'images/infrastructure',
  'images/geopolitics',
  'videos/hero',
  'videos/energy',
  'maps',
];

folders.forEach((folder) => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log('Created directory:', dirPath);
  }
});

function createSvgPlaceholder(title, dimensions, filename, targetPath) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect width="100%" height="100%" fill="#0D1117"/>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#161B22" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="40" y="40" width="1840" height="1000" fill="none" stroke="#2A313B" stroke-width="2" stroke-dasharray="10 10"/>
  <circle cx="960" cy="460" r="60" fill="#161B22" stroke="#4C8ED9" stroke-width="2"/>
  <text x="960" y="468" fill="#4C8ED9" font-family="monospace" font-size="32" font-weight="bold" text-anchor="middle">GeoRisk AI</text>
  <text x="960" y="580" fill="#F2F4F7" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle">${title}</text>
  <text x="960" y="630" fill="#A7AFBA" font-family="monospace" font-size="22" text-anchor="middle">FILENAME: ${filename} | RECOMMENDED: ${dimensions}</text>
  <text x="960" y="670" fill="#707986" font-family="monospace" font-size="18" text-anchor="middle">Replace file in /public/assets/ to update visual asset</text>
</svg>`;

  fs.writeFileSync(targetPath, svgContent, 'utf8');
  console.log('Created placeholder:', targetPath);
}

const assetsToCreate = [
  { folder: 'images/hero', file: 'energy-infrastructure.jpg', title: 'Global Energy Infrastructure Hero', dim: '3840 x 2160 px (16:9)' },
  { folder: 'images/hero', file: 'geopolitical-map.jpg', title: 'Geopolitical Risk Map Baseline', dim: '3840 x 2160 px (16:9)' },
  { folder: 'images/hero', file: 'control-center.jpg', title: 'Analyst Workstation Control Center', dim: '2560 x 1440 px (16:9)' },
  
  { folder: 'images/energy', file: 'refinery.jpg', title: 'Petroleum Refinery Complex', dim: '2560 x 1440 px (16:9)' },
  { folder: 'images/energy', file: 'oil-tanker.jpg', title: 'Crude Oil Tanker (VLCC)', dim: '2560 x 1440 px (16:9)' },
  { folder: 'images/energy', file: 'lng-terminal.jpg', title: 'Liquefied Natural Gas (LNG) Terminal', dim: '2560 x 1440 px (16:9)' },
  { folder: 'images/energy', file: 'crude-storage.jpg', title: 'Strategic Petroleum Reserve Storage', dim: '1920 x 1080 px (16:9)' },
  
  { folder: 'images/infrastructure', file: 'pipeline.jpg', title: 'Cross-Country Petroleum Pipeline', dim: '2560 x 1440 px (16:9)' },
  { folder: 'images/infrastructure', file: 'port.jpg', title: 'Deep-Water Crude Export Port', dim: '2560 x 1440 px (16:9)' },
  { folder: 'images/infrastructure', file: 'chokepoint.jpg', title: 'Strategic Maritime Chokepoint', dim: '2560 x 1440 px (16:9)' },
  { folder: 'images/infrastructure', file: 'maritime-route.jpg', title: 'Arabian Sea Maritime Shipping Corridor', dim: '1920 x 1080 px (16:9)' },
  
  { folder: 'images/geopolitics', file: 'hormuz-satellite.jpg', title: 'Strait of Hormuz Satellite Capture', dim: '2560 x 1600 px (16:10)' },
  { folder: 'images/geopolitics', file: 'bab-el-mandeb.jpg', title: 'Bab-el-Mandeb Strait Satellite View', dim: '1920 x 1080 px (16:9)' },
  { folder: 'images/geopolitics', file: 'malacca-strait.jpg', title: 'Malacca Strait Satellite Overview', dim: '1920 x 1080 px (16:9)' },
];

assetsToCreate.forEach((item) => {
  const filePath = path.join(baseDir, item.folder, item.file);
  createSvgPlaceholder(item.title, item.dim, item.file, filePath);
});

// Create placeholder json files for maps
const worldMapJson = JSON.stringify({ type: "FeatureCollection", features: [], title: "World Dark Basemap Placeholder" }, null, 2);
fs.writeFileSync(path.join(baseDir, 'maps', 'world-dark.json'), worldMapJson, 'utf8');

const chokepointsJson = JSON.stringify({ type: "FeatureCollection", features: [], title: "Chokepoints Overlay Placeholder" }, null, 2);
fs.writeFileSync(path.join(baseDir, 'maps', 'chokepoints.json'), chokepointsJson, 'utf8');

// Create README files in videos explaining video placement
fs.writeFileSync(path.join(baseDir, 'videos', 'hero', 'global-energy.mp4.txt'), 'Place global-energy.mp4 video file in this directory (3840x2160, 15s loop)');
fs.writeFileSync(path.join(baseDir, 'videos', 'energy', 'tanker.mp4.txt'), 'Place tanker.mp4 video file in this directory (2560x1440, 10s loop)');
fs.writeFileSync(path.join(baseDir, 'videos', 'energy', 'refinery.mp4.txt'), 'Place refinery.mp4 video file in this directory (2560x1440, 10s loop)');

console.log('All asset folders and placeholder links created successfully!');
