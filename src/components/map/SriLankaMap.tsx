import { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { Destination } from '../../types/travel';
import { Compass, Sparkles, ChevronRight, MapPin, Train, Layers } from 'lucide-react';

interface SriLankaMapProps {
  onSelectDestination: (destName: string) => void;
  onOpenPlanner: () => void;
}

// Geographic bounds of Sri Lanka for standard Mercator/Equirectangular projection
const GEO_BOUNDS = {
  minLat: 5.75,
  maxLat: 9.95,
  minLng: 79.40,
  maxLng: 82.05,
};

const SVG_WIDTH = 380;
const SVG_HEIGHT = 560;
const PADDING = { top: 35, bottom: 35, left: 30, right: 30 };

// Geographically accurate coordinate projector
export function projectCoordinates(lat: number, lng: number): { x: number; y: number } {
  const innerW = SVG_WIDTH - PADDING.left - PADDING.right;
  const innerH = SVG_HEIGHT - PADDING.top - PADDING.bottom;
  const x = PADDING.left + ((lng - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng)) * innerW;
  const y = PADDING.top + ((GEO_BOUNDS.maxLat - lat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)) * innerH;
  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

// Major iconic landmarks & scenic train stations
const SCENIC_TRAIN_ROUTE = [
  { name: 'Colombo Fort', lat: 6.9344, lng: 79.8500 },
  { name: 'Polgahawela', lat: 7.3328, lng: 80.3006 },
  { name: 'Peradeniya / Kandy', lat: 7.2700, lng: 80.5950 },
  { name: 'Hatton', lat: 6.8967, lng: 80.5958 },
  { name: 'Nanu Oya (Nuwara Eliya)', lat: 6.9450, lng: 80.7450 },
  { name: 'Pattipola (Highest Station 1,897m)', lat: 6.8550, lng: 80.8350 },
  { name: 'Haputale', lat: 6.7681, lng: 80.9575 },
  { name: 'Ella (Demodara Nine Arch)', lat: 6.8667, lng: 81.0466 },
  { name: 'Badulla Terminus', lat: 6.9895, lng: 81.0557 }
];

export const SriLankaMap: React.FC<SriLankaMapProps> = ({
  onSelectDestination,
  onOpenPlanner
}) => {
  const { destinations } = useMedia();
  const [activePin, setActivePin] = useState<Destination | null>(destinations[4] || destinations[0]);
  const [mapCategory, setMapCategory] = useState<'all' | 'coastal' | 'highland' | 'heritage' | 'wildlife'>('all');
  const [showTrainRoute, setShowTrainRoute] = useState(true);
  const [showHighlandsRelief, setShowHighlandsRelief] = useState(true);

  const visibleDestinations = destinations.filter((dest) => {
    if (mapCategory === 'all') return true;
    return dest.tags.includes(mapCategory);
  });

  // Calculate train route SVG path
  const trainPathD = SCENIC_TRAIN_ROUTE.map((stop, i) => {
    const pt = projectCoordinates(stop.lat, stop.lng);
    return `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }).join(' ');

  // Smart label placement offsets to prevent clipping & overlap
  const getLabelConfig = (dest: Destination) => {
    const { lat, lng } = dest.coordinates;
    const pt = projectCoordinates(lat, lng);
    
    // West coast labels (Colombo, Galle)
    if (lng < 80.3 && lat < 7.5) {
      return { x: pt.x - 12, y: pt.y + 4, anchor: 'end' as const };
    }
    // South coast (Mirissa)
    if (lat < 6.1 && lng >= 80.3) {
      return { x: pt.x + 8, y: pt.y + 16, anchor: 'start' as const };
    }
    // Jaffna (North)
    if (lat > 9.3) {
      return { x: pt.x - 12, y: pt.y + 4, anchor: 'end' as const };
    }
    // Trincomalee / Arugam Bay (East)
    if (lng > 81.1) {
      return { x: pt.x + 12, y: pt.y + 4, anchor: 'start' as const };
    }
    // Central hills
    return { x: pt.x + 12, y: pt.y + 4, anchor: 'start' as const };
  };

  return (
    <section id="map" className="relative py-28 sm:py-36 bg-[#08090A] text-[#F3EFE6] overflow-hidden border-t border-white/5">
      
      {/* Background Subtle Ambient Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C5A059]/10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-10 h-[1.5px] bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#C5A059] font-bold">
              True Cartography of Serendib
            </span>
            <span className="w-10 h-[1.5px] bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#F3EFE6] mb-4">
            Small island. <span className="italic font-normal text-gold-gradient font-playfair">Endless directions.</span>
          </h2>
          <p className="font-outfit text-xs sm:text-sm text-[#D8CBB5]/80 max-w-xl mx-auto font-light leading-relaxed">
            Geographically calibrated vector cartography. Explore UNESCO citadels, coastal surf breaks, tea mountain corridors, and wildlife frontiers.
          </p>

          {/* Map Layer Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { key: 'all', label: 'All Destinations' },
              { key: 'coastal', label: 'Coastal & Surf' },
              { key: 'highland', label: 'Highlands & Tea' },
              { key: 'heritage', label: 'UNESCO Heritage' },
              { key: 'wildlife', label: 'Wildlife Corridors' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMapCategory(tab.key as any)}
                className={`font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  mapCategory === tab.key
                    ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C785] border-[#C5A059] text-[#08090A] font-bold shadow-[0_0_15px_rgba(197,160,89,0.35)]'
                    : 'glass-obsidian border-white/10 text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Layer toggles */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs font-mono text-white/60">
            <button
              onClick={() => setShowTrainRoute(!showTrainRoute)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                showTrainRoute ? 'border-[#C5A059]/60 text-[#F3E5AB] bg-[#C5A059]/10' : 'border-white/10 text-white/40 hover:text-white/70'
              }`}
            >
              <Train className="w-3 h-3 text-[#C5A059]" />
              <span>Main Line Railway</span>
            </button>
            <button
              onClick={() => setShowHighlandsRelief(!showHighlandsRelief)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                showHighlandsRelief ? 'border-[#38BDF8]/60 text-[#38BDF8] bg-[#38BDF8]/10' : 'border-white/10 text-white/40 hover:text-white/70'
              }`}
            >
              <Layers className="w-3 h-3 text-[#38BDF8]" />
              <span>Topographic Relief</span>
            </button>
          </div>
        </div>

        {/* Map & Card Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: True Vector Cartography */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div className="relative w-full max-w-[500px] aspect-[380/560] p-4 sm:p-6 glass-obsidian border border-white/15 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
              
              {/* Compass Rose */}
              <div className="absolute top-5 right-5 opacity-40 text-[#C5A059] pointer-events-none animate-spin" style={{ animationDuration: '90s' }}>
                <Compass className="w-9 h-9" />
              </div>

              {/* Geographic Coordinates Readout Overlay */}
              <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-[10px] font-mono text-[#C5A059]/70 tracking-wider">
                <span>GULF OF MANNAR</span>
                <span className="text-white/40">79°40'E — 82°05'E · 5°45'N — 9°55'N</span>
                <span>BAY OF BENGAL</span>
              </div>

              {/* Real Accurate Sri Lanka Map SVG */}
              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                className="w-full h-full filter drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)] select-none"
              >
                <defs>
                  {/* Subtle oceanic gradient */}
                  <radialGradient id="oceanGlow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#0B232E" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#08090A" stopOpacity="0.2" />
                  </radialGradient>

                  {/* Island Landmass Gradient */}
                  <linearGradient id="landmassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#132B20" />
                    <stop offset="50%" stopColor="#10241A" />
                    <stop offset="100%" stopColor="#0E1D15" />
                  </linearGradient>

                  {/* Central Highlands Elevation Gradient */}
                  <radialGradient id="highlandsGradient" cx="45%" cy="55%" r="60%">
                    <stop offset="0%" stopColor="#306846" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#1E472E" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10241A" stopOpacity="0" />
                  </radialGradient>

                  {/* Highland Peaks Glow */}
                  <radialGradient id="peakGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#285437" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ocean Shelf Ambient Underlay */}
                <ellipse cx="190" cy="300" rx="165" ry="245" fill="url(#oceanGlow)" />

                {/* Graticule / Latitude & Longitude Coordinate Lines */}
                <g stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3,6">
                  {/* Latitudes: 9°N, 8°N, 7°N, 6°N */}
                  <line x1="20" y1={projectCoordinates(9.0, 79.4).y} x2="360" y2={projectCoordinates(9.0, 82.05).y} />
                  <line x1="20" y1={projectCoordinates(8.0, 79.4).y} x2="360" y2={projectCoordinates(8.0, 82.05).y} />
                  <line x1="20" y1={projectCoordinates(7.0, 79.4).y} x2="360" y2={projectCoordinates(7.0, 82.05).y} />
                  <line x1="20" y1={projectCoordinates(6.0, 79.4).y} x2="360" y2={projectCoordinates(6.0, 82.05).y} />
                  {/* Longitudes: 80°E, 81°E */}
                  <line x1={projectCoordinates(9.95, 80.0).x} y1="30" x2={projectCoordinates(5.75, 80.0).x} y2="530" />
                  <line x1={projectCoordinates(9.95, 81.0).x} y1="30" x2={projectCoordinates(5.75, 81.0).x} y2="530" />
                </g>

                {/* Graticule Labels */}
                <g fill="#C5A059" fillOpacity="0.35" fontSize="8" fontFamily="monospace">
                  <text x="25" y={projectCoordinates(9.0, 79.4).y - 3}>9°N</text>
                  <text x="25" y={projectCoordinates(8.0, 79.4).y - 3}>8°N</text>
                  <text x="25" y={projectCoordinates(7.0, 79.4).y - 3}>7°N</text>
                  <text x="25" y={projectCoordinates(6.0, 79.4).y - 3}>6°N</text>
                  <text x={projectCoordinates(9.95, 80.0).x + 3} y="45">80°E</text>
                  <text x={projectCoordinates(9.95, 81.0).x + 3} y="45">81°E</text>
                </g>

                {/* Historical Maritime Silk Road Routes */}
                <path
                  d="M 30 420 C 80 500, 160 550, 240 545 C 320 540, 360 460, 365 340"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeDasharray="4,6"
                  opacity="0.3"
                />

                {/* Coastal Outer Halo Glow */}
                <path
                  d="M 152 81.2 L 165.2 101.4 L 200.3 111 L 209.9 125.2 L 218.4 143.1 L 228 157.4 L 237.7 171.7 L 247.4 180 L 249.8 192.3 L 246.2 195.5 L 252.2 202.6 L 263.1 208.6 L 265.5 199 L 273.9 220.5 L 282.4 244.3 L 288.4 266.9 L 292 271.7 L 295.7 282.4 L 307.7 295.5 L 318.6 315.7 L 323.4 331.2 L 325.8 351.4 L 327.1 366.9 L 329.5 378.8 L 323.9 399.8 L 321 411 L 315 426.4 L 307.7 440.7 L 290.8 455 L 281.2 466.9 L 263.1 475.2 L 253.4 478.8 L 237.7 486 L 217.2 489.5 L 197.8 497.9 L 188.2 503.8 L 173.5 509.4 L 167.7 507.4 L 159.4 506.4 L 153.2 503.8 L 143.5 501.4 L 129.1 493.9 L 114.5 483.6 L 108.5 472.9 L 102.1 449.5 L 100 439.5 L 97.6 431.2 L 91.6 414.5 L 86.8 401.4 L 85.7 389.9 L 86.8 371.7 L 83.1 356.2 L 80.7 338.3 L 77.1 313.3 L 78.3 291.9 L 74.7 264.5 L 69.8 262.1 L 67.4 234.8 L 79.5 220.5 L 85.5 208 L 92.8 184.8 L 92.8 161 L 91.6 145.5 L 108.5 125.2 L 116.9 107.4 L 124.2 89.5 L 131.4 83.6 L 152 81.2 Z"
                  fill="#0E3329"
                  opacity="0.35"
                  stroke="#38BDF8"
                  strokeWidth="6"
                  strokeOpacity="0.1"
                  strokeLinejoin="round"
                />

                {/* --- SRI LANKA MAINLAND COASTLINE (Accurate GIS Path) --- */}
                <path
                  d="M 152 81.2 L 165.2 101.4 L 200.3 111 L 209.9 125.2 L 218.4 143.1 L 228 157.4 L 237.7 171.7 L 247.4 180 L 249.8 192.3 L 246.2 195.5 L 252.2 202.6 L 263.1 208.6 L 265.5 199 L 273.9 220.5 L 282.4 244.3 L 288.4 266.9 L 292 271.7 L 295.7 282.4 L 307.7 295.5 L 318.6 315.7 L 323.4 331.2 L 325.8 351.4 L 327.1 366.9 L 329.5 378.8 L 323.9 399.8 L 321 411 L 315 426.4 L 307.7 440.7 L 290.8 455 L 281.2 466.9 L 263.1 475.2 L 253.4 478.8 L 237.7 486 L 217.2 489.5 L 197.8 497.9 L 188.2 503.8 L 173.5 509.4 L 167.7 507.4 L 159.4 506.4 L 153.2 503.8 L 143.5 501.4 L 129.1 493.9 L 114.5 483.6 L 108.5 472.9 L 102.1 449.5 L 100 439.5 L 97.6 431.2 L 91.6 414.5 L 86.8 401.4 L 85.7 389.9 L 86.8 371.7 L 83.1 356.2 L 80.7 338.3 L 77.1 313.3 L 78.3 291.9 L 74.7 264.5 L 69.8 262.1 L 67.4 234.8 L 79.5 220.5 L 85.5 208 L 92.8 184.8 L 92.8 161 L 91.6 145.5 L 108.5 125.2 L 116.9 107.4 L 124.2 89.5 L 131.4 83.6 L 152 81.2 Z"
                  fill="url(#landmassGradient)"
                  stroke="#C5A059"
                  strokeWidth="1.6"
                  strokeOpacity="0.75"
                  strokeLinejoin="round"
                />

                {/* --- JAFFNA PENINSULA & POINT PEDRO --- */}
                <path
                  d="M 152 81.2 L 156.8 74 L 144.7 53.8 L 131.4 43.7 L 116.9 46.7 L 104.9 50.2 L 92.8 55 L 105.5 64.3 L 120.6 71.7 L 152 81.2 Z"
                  fill="url(#landmassGradient)"
                  stroke="#C5A059"
                  strokeWidth="1.4"
                  strokeOpacity="0.75"
                  strokeLinejoin="round"
                />

                {/* Northern Islands (Delft, Velanai/Kayts) */}
                <circle cx="85" cy="62" r="4" fill="#132B20" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.6" />
                <circle cx="64" cy="78" r="3.2" fill="#132B20" stroke="#C5A059" strokeWidth="0.9" strokeOpacity="0.6" />

                {/* --- MANNAR ISLAND (Adam's Bridge Causeway) --- */}
                <path
                  d="M 91.6 145.5 L 80.7 139.5 L 68.6 131.2 L 71.1 134.8 L 85.5 143.1 L 91.6 145.5 Z"
                  fill="#132B20"
                  stroke="#C5A059"
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                />
                {/* Adam's Bridge Shoals connecting towards Rameswaram */}
                <line x1="68.6" y1="131.2" x2="35" y2="115" stroke="#C5A059" strokeWidth="0.8" strokeDasharray="2,3" strokeOpacity="0.4" />

                {/* --- TOPOGRAPHIC RELIEF (Central Highlands & Knuckles) --- */}
                {showHighlandsRelief && (
                  <g className="transition-opacity duration-500">
                    {/* Outer Highland Ring (300m - 1000m) */}
                    <path
                      d="M 193 319.3 L 205.1 331.2 L 201.5 345.5 L 217.2 363.3 L 235.3 383.6 L 228.8 397.1 L 211.1 414.5 L 193 411 L 162.8 403.9 L 156.8 387.1 L 165.2 363.3 L 179 346.6 L 180.9 327.6 L 193 319.3 Z"
                      fill="url(#highlandsGradient)"
                      stroke="#C5A059"
                      strokeWidth="0.8"
                      strokeDasharray="2,2"
                      strokeOpacity="0.45"
                    />

                    {/* High Montane Plateau (> 1,500m: Horton Plains, Nuwara Eliya, Pidurutalagala) */}
                    <ellipse cx="197" cy="387" rx="24" ry="18" fill="#245137" stroke="#C5A059" strokeWidth="0.7" strokeOpacity="0.6" />
                    <ellipse cx="197" cy="387" rx="12" ry="9" fill="url(#peakGlow)" />

                    {/* Knuckles Mountain Range */}
                    <path d="M 188 322 Q 198 318 208 328 Q 198 332 188 322 Z" fill="#245137" stroke="#C5A059" strokeWidth="0.6" strokeOpacity="0.5" />
                    
                    {/* Adam's Peak / Sri Pada Sacred Peak Pinnacle */}
                    <polygon points="163,390 160,396 166,396" fill="#F3E5AB" stroke="#C5A059" strokeWidth="0.5" />
                  </g>
                )}

                {/* --- ANCIENT IRRIGATION RESERVOIRS (Wewas & Lakes) --- */}
                <g fill="#0284C7" opacity="0.85">
                  {/* Parakrama Samudra (Polonnaruwa) */}
                  <ellipse cx="225" cy="270" rx="4.5" ry="3.5" />
                  {/* Minneriya Wewa */}
                  <circle cx="203" cy="258" r="3.2" />
                  {/* Kala Wewa (Dambulla/Anuradhapura) */}
                  <ellipse cx="163" cy="262" rx="3.8" ry="2.8" />
                  {/* Tissa Wewa & Yala Water Holes */}
                  <circle cx="260" cy="465" r="3" />
                  {/* Senanayake Samudra (Gal Oya) */}
                  <ellipse cx="270" cy="370" rx="5" ry="3.5" />
                  {/* Victoria Reservoir (Kandy / Mahaweli) */}
                  <path d="M 188 344 Q 198 350 205 345" stroke="#0284C7" strokeWidth="1.5" fill="none" />
                </g>

                {/* --- CEYLON SCENIC MAIN LINE RAILWAY ROUTE --- */}
                {showTrainRoute && (
                  <g className="transition-opacity duration-500">
                    <path
                      d={trainPathD}
                      fill="none"
                      stroke="#C5A059"
                      strokeWidth="1.8"
                      strokeDasharray="4,3"
                      className="animate-pulse"
                    />
                    {/* Train Route Stops */}
                    {SCENIC_TRAIN_ROUTE.map((stop, idx) => {
                      const pt = projectCoordinates(stop.lat, stop.lng);
                      return (
                        <circle
                          key={idx}
                          cx={pt.x}
                          cy={pt.y}
                          r="2.2"
                          fill="#F3E5AB"
                          stroke="#08090A"
                          strokeWidth="0.8"
                        >
                          <title>{stop.name}</title>
                        </circle>
                      );
                    })}
                  </g>
                )}

                {/* --- INTERACTIVE DESTINATION PINS (Geographically Exact) --- */}
                {visibleDestinations.map((dest) => {
                  const pt = projectCoordinates(dest.coordinates.lat, dest.coordinates.lng);
                  const isSelected = activePin?.id === dest.id;
                  const labelCfg = getLabelConfig(dest);

                  return (
                    <g
                      key={dest.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`Explore ${dest.name}`}
                      className="cursor-pointer group focus:outline-none"
                      onClick={() => setActivePin(dest)}
                      onMouseEnter={() => setActivePin(dest)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActivePin(dest);
                        }
                      }}
                    >
                      {/* Radar Ping Wave for Active Destination */}
                      {isSelected && (
                        <>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="18"
                            fill="none"
                            stroke="#C5A059"
                            strokeWidth="1.5"
                            className="animate-ping opacity-60 origin-center"
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="28"
                            fill="none"
                            stroke="#C5A059"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            className="opacity-40"
                          />
                        </>
                      )}

                      {/* Outer Pin Halo Glow */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? '8' : '5'}
                        fill={isSelected ? '#C5A059' : '#F3EFE6'}
                        className="transition-all duration-300 group-hover:scale-125 shadow-xl"
                      />

                      {/* Inner Contrast Dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="2.2"
                        fill="#08090A"
                      />

                      {/* Destination Label Text */}
                      <text
                        x={labelCfg.x}
                        y={labelCfg.y}
                        textAnchor={labelCfg.anchor}
                        fill={isSelected ? '#C5A059' : '#F3EFE6'}
                        fontSize="9"
                        fontFamily="Cinzel, serif"
                        fontWeight={isSelected ? 'bold' : '600'}
                        letterSpacing="0.08em"
                        className="pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-colors duration-300"
                      >
                        {dest.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Scale Bar Legend */}
              <div className="absolute bottom-9 right-6 flex flex-col items-end pointer-events-none opacity-60">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-mono text-[8px] text-[#C5A059]">0</span>
                  <div className="w-12 h-[2px] bg-[#C5A059]" />
                  <span className="font-mono text-[8px] text-[#C5A059]">100 km</span>
                </div>
                <span className="font-mono text-[7px] text-white/50 uppercase tracking-widest">Scale Calibration</span>
              </div>

            </div>
          </div>

          {/* Right Column: Active Destination Interactive Dossier */}
          <div className="lg:col-span-5">
            {activePin ? (
              <div className="glass-obsidian border border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
                
                {/* Photo Preview */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden">
                  <img
                    src={activePin.image}
                    alt={activePin.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs font-bold text-[#C5A059] bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
                      {activePin.number} · {activePin.region}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                      {activePin.climate}
                    </span>
                    <span className="font-mono text-xs text-[#F3E5AB] bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 font-bold">
                      {activePin.elevation}
                    </span>
                  </div>
                </div>

                {/* Dossier Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wide">
                      {activePin.name}
                    </h3>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-white/70">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{activePin.coordinates.lat.toFixed(2)}°N, {activePin.coordinates.lng.toFixed(2)}°E</span>
                    </div>
                  </div>

                  <p className="font-serif italic text-lg text-[#F3E5AB]/90 font-light">
                    "{activePin.tagline}"
                  </p>

                  <p className="font-outfit text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {activePin.description}
                  </p>

                  {/* Highlights Pill Badges */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block font-semibold">
                      Core Highlights & Landmarks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activePin.bestKnownFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="font-outfit text-xs px-3 py-1 rounded-full glass-obsidian border border-white/15 text-[#F3EFE6] font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => onSelectDestination(activePin.name)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#C5A059] to-[#E2C785] hover:from-[#b08b43] hover:to-[#C5A059] text-[#08090A] font-sans font-bold text-xs tracking-wider uppercase py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg"
                    >
                      <span>Explore {activePin.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onOpenPlanner}
                      className="p-3.5 rounded-full glass-obsidian hover:glass-gold text-white hover:text-[#C5A059] transition-colors cursor-pointer border border-white/20"
                      title="Add to Itinerary"
                      aria-label="Add to Itinerary"
                    >
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    </button>
                  </div>

                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
};
