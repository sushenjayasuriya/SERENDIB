import { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { Destination } from '../../types/travel';
import { Compass, Sparkles, ChevronRight, MapPin } from 'lucide-react';

interface SriLankaMapProps {
  onSelectDestination: (destName: string) => void;
  onOpenPlanner: () => void;
}

export const SriLankaMap: React.FC<SriLankaMapProps> = ({
  onSelectDestination,
  onOpenPlanner
}) => {
  const { destinations } = useMedia();
  const [activePin, setActivePin] = useState<Destination | null>(destinations[4] || destinations[0]);
  const [mapCategory, setMapCategory] = useState<'all' | 'coastal' | 'highland' | 'heritage' | 'wildlife'>('all');

  const visibleDestinations = destinations.filter((dest) => {
    if (mapCategory === 'all') return true;
    return dest.tags.includes(mapCategory);
  });

  return (
    <section id="map" className="relative py-28 sm:py-36 bg-[#08090A] text-[#F3EFE6] overflow-hidden border-t border-white/5">
      
      {/* Background Subtle Ambient Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C5A059]/10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-10 h-[1.5px] bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#C5A059] font-bold">
              Cartography of Serendib
            </span>
            <span className="w-10 h-[1.5px] bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#F3EFE6] mb-4">
            Small island. <span className="italic font-normal text-gold-gradient font-playfair">Endless directions.</span>
          </h2>
          <p className="font-outfit text-xs sm:text-sm text-[#D8CBB5]/80 max-w-xl mx-auto font-light leading-relaxed">
            Click or tap any location marker to inspect regional geography, elevation, climate, and cultural significance.
          </p>

          {/* Map Layer Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { key: 'all', label: 'All Destinations' },
              { key: 'coastal', label: 'Coastal & Surf' },
              { key: 'highland', label: 'Highlands & Tea' },
              { key: 'heritage', label: 'UNESCO Kingdoms' },
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
        </div>

        {/* Map & Card Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Stylized Vector SVG Map */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div className="relative w-full max-w-[460px] aspect-[3/4] p-6 glass-obsidian border border-white/15 rounded-3xl shadow-2xl flex items-center justify-center">
              
              {/* Compass Rose */}
              <div className="absolute top-6 right-6 opacity-35 text-[#C5A059] pointer-events-none animate-spin" style={{ animationDuration: '60s' }}>
                <Compass className="w-10 h-10" />
              </div>

              {/* Geographic Coordinates Overlay */}
              <div className="absolute bottom-4 left-6 text-[10px] font-mono text-[#C5A059]/60 tracking-wider">
                GULF OF MANNAR · INDIAN OCEAN (BAY OF BENGAL)
              </div>

              {/* Accurate Stylized Sri Lanka SVG Silhouette & Contours */}
              <svg
                viewBox="0 0 320 440"
                className="w-full h-full filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] select-none"
              >
                {/* Coastal Shelf Glow */}
                <path
                  d="M 160 22 
                     C 195 24, 215 50, 225 90 
                     C 240 140, 260 190, 260 260 
                     C 260 330, 220 400, 160 418 
                     C 110 400, 75 340, 75 270 
                     C 75 190, 100 130, 115 80 
                     C 125 45, 140 22, 160 22 Z"
                  fill="#0E2F3F"
                  opacity="0.35"
                />

                {/* Ancient Maritime Silk Road Shipping Lines */}
                <path
                  d="M 20 280 C 60 350, 120 430, 190 435 C 260 440, 310 380, 315 280"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeDasharray="4,4"
                  opacity="0.3"
                />

                {/* Island Landmass Silhouette */}
                <path
                  d="M 155 30 
                     C 175 32, 192 48, 205 75 
                     C 215 95, 218 120, 228 150 
                     C 238 180, 248 215, 248 255 
                     C 248 295, 238 335, 215 370 
                     C 190 400, 168 410, 150 410 
                     C 132 410, 110 395, 95 365 
                     C 80 330, 80 295, 82 255 
                     C 85 210, 92 170, 105 130 
                     C 115 95, 130 45, 155 30 Z"
                  fill="#12241A"
                  stroke="#C5A059"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />

                {/* Jaffna Peninsula & Islands */}
                <path
                  d="M 140 22 C 150 15, 165 12, 175 16 C 185 20, 175 32, 160 30 Z"
                  fill="#12241A"
                  stroke="#C5A059"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />

                {/* Central Highlands Topographic Contour Rings */}
                <path
                  d="M 145 220 C 165 210, 185 225, 188 250 C 190 280, 165 305, 142 300 C 125 295, 122 265, 130 240 C 135 225, 140 220, 145 220 Z"
                  fill="#1D3A27"
                  opacity="0.75"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />
                <circle cx="155" cy="260" r="20" fill="#294F36" opacity="0.85" />

                {/* Ancient Irrigation Reservoirs (Wewas) */}
                <circle cx="155" cy="175" r="4.5" fill="#0284C7" />
                <circle cx="185" cy="180" r="4" fill="#0284C7" />
                <circle cx="160" cy="235" r="3.5" fill="#0284C7" />

                {/* Interactive Destination Pins on SVG */}
                {visibleDestinations.map((dest) => {
                  const cx = (dest.mapPosition.x / 100) * 320;
                  const cy = (dest.mapPosition.y / 100) * 440;
                  const isSelected = activePin?.id === dest.id;

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
                      {/* Pulsing Radar Wave on active */}
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="16"
                          fill="none"
                          stroke="#C5A059"
                          strokeWidth="1.5"
                          className="animate-radar opacity-80 origin-center"
                        />
                      )}

                      {/* Outer Pin Glow */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? '8' : '5'}
                        fill={isSelected ? '#C5A059' : '#F3EFE6'}
                        className="transition-all duration-300 group-hover:scale-125 shadow-lg"
                      />

                      {/* Inner Dot */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="2.5"
                        fill="#08090A"
                      />

                      {/* Destination Label */}
                      <text
                        x={cx + 10}
                        y={cy + 4}
                        fill={isSelected ? '#C5A059' : '#F3EFE6'}
                        fontSize="9.5"
                        fontFamily="Cinzel, serif"
                        fontWeight={isSelected ? 'bold' : '600'}
                        letterSpacing="0.08em"
                        className="pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                      >
                        {dest.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

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
