import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { Destination } from '../../types/travel';
import { DestinationModal } from './DestinationModal';
import { ArrowUpRight, MapPin, Sparkles, ChevronRight } from 'lucide-react';

interface DestinationSelectorProps {
  onPlanTrip: (destinationName: string) => void;
}

export const DestinationSelector: React.FC<DestinationSelectorProps> = ({ onPlanTrip }) => {
  const { destinations } = useMedia();
  const [selectedDestId, setSelectedDestId] = useState<string>(destinations[0]?.id || 'colombo');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [modalDest, setModalDest] = useState<Destination | null>(null);

  const filteredDestinations = destinations.filter((dest) => {
    if (activeFilter === 'all') return true;
    return dest.tags.includes(activeFilter as any);
  });

  const activeDestination =
    destinations.find((d) => d.id === selectedDestId) || filteredDestinations[0] || destinations[0];

  const filterTabs = [
    { key: 'all', label: 'ALL DESTINATIONS' },
    { key: 'coastal', label: 'COASTAL & SURF' },
    { key: 'highland', label: 'TEA & HIGHLANDS' },
    { key: 'heritage', label: 'ANCIENT KINGDOMS' },
    { key: 'wildlife', label: 'SAFARI & WILD' },
  ];

  return (
    <section id="destinations" className="relative py-28 sm:py-36 bg-[#08090A] text-[#F3EFE6] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#193746]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9C4B33]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C5A059]">
                Discovery Engine
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight">
              Where will <span className="italic font-normal text-[#C5A059]">you go?</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveFilter(tab.key);
                  const first = destinations.find((d) => tab.key === 'all' || d.tags.includes(tab.key as any));
                  if (first) setSelectedDestId(first.id);
                }}
                className={`font-sans text-[11px] tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#0C0D0E] font-semibold shadow-lg shadow-[#C5A059]/20'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Split-Screen Interactive Experience */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[640px]">
          
          {/* Left Column: Interactive Destination List */}
          <div className="col-span-5 flex flex-col justify-between space-y-1 glass-obsidian p-4 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="space-y-1.5 overflow-y-auto max-h-[600px] pr-2 no-scrollbar">
              {filteredDestinations.map((dest) => {
                const isActive = dest.id === activeDestination.id;
                return (
                  <button
                    key={dest.id}
                    onMouseEnter={() => setSelectedDestId(dest.id)}
                    onClick={() => setSelectedDestId(dest.id)}
                    className={`w-full group text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#C5A059]/25 via-white/5 to-transparent border-[#C5A059]/60 shadow-lg shadow-[#C5A059]/10'
                        : 'border-transparent hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs tracking-wider transition-colors ${
                          isActive ? 'text-[#C5A059] font-bold' : 'text-white/40 group-hover:text-white/70'
                        }`}
                      >
                        {dest.number}
                      </span>
                      <div>
                        <h3
                          className={`font-display text-lg tracking-wider transition-all duration-300 ${
                            isActive ? 'text-white font-black translate-x-1.5' : 'text-[#D8CBB5]/80 group-hover:text-white'
                          }`}
                        >
                          {dest.name}
                        </h3>
                        <p className="font-outfit text-[11px] text-[#D8CBB5]/60 truncate max-w-[220px] font-light">
                          {dest.region}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'text-[#C5A059] translate-x-1 -translate-y-1 opacity-100'
                          : 'text-white/20 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Cinematic Screen */}
          <div className="col-span-7 relative rounded-3xl overflow-hidden border border-white/20 group shadow-2xl flex flex-col justify-end p-8 sm:p-12 glass-obsidian">
            
            {/* Cinematic Background Image */}
            <img
              key={activeDestination.id}
              src={activeDestination.image}
              alt={activeDestination.name}
              className="absolute inset-0 w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700 transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090A]/70 via-transparent to-transparent" />

            {/* Top Info Bar */}
            <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 glass-obsidian px-4 py-1.5 rounded-full border border-white/15 text-xs font-mono text-[#C5A059] shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>
                  {activeDestination.coordinates.lat.toFixed(4)}° N, {activeDestination.coordinates.lng.toFixed(4)}° E
                </span>
              </div>
              <span className="glass-obsidian px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono text-white/90 shadow-lg">
                {activeDestination.elevation}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#C5A059] bg-[#C5A059]/20 px-3 py-0.5 rounded-full border border-[#C5A059]/40">
                  {activeDestination.number}
                </span>
                <span className="font-display text-xs tracking-[0.3em] uppercase text-[#D8CBB5] font-semibold">
                  {activeDestination.region}
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-6xl font-black text-white tracking-wide drop-shadow-lg">
                {activeDestination.name}
              </h3>

              <p className="font-serif italic text-lg sm:text-xl text-[#F3E5AB]/95 max-w-xl font-light">
                "{activeDestination.tagline}"
              </p>

              <p className="font-outfit text-xs sm:text-sm text-white/85 max-w-xl line-clamp-2 leading-relaxed font-light">
                {activeDestination.description}
              </p>

              {/* Best Known For Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeDestination.bestKnownFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-outfit text-xs px-3 py-1 rounded-full glass-obsidian border border-white/15 text-[#F3EFE6] font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => setModalDest(activeDestination)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#C5A059] to-[#E2C785] hover:from-[#b08b43] hover:to-[#C5A059] text-[#08090A] font-sans font-bold text-xs tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                >
                  <span>Explore Citadel Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onPlanTrip(activeDestination.name)}
                  className="flex items-center gap-2 glass-obsidian hover:glass-gold text-white border border-white/20 font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Plan Route</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Mobile / Tablet Swipeable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="relative rounded-3xl overflow-hidden border border-white/15 glass-obsidian group flex flex-col justify-end min-h-[440px] p-6 shadow-2xl"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/60 to-transparent" />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C5A059] bg-[#C5A059]/20 px-2.5 py-0.5 rounded-full border border-[#C5A059]/40 font-bold">
                    {dest.number}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-[#D8CBB5] tracking-wider font-semibold">
                    {dest.region}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-extrabold text-white">
                  {dest.name}
                </h3>

                <p className="font-outfit text-xs text-[#D8CBB5] line-clamp-2 font-light">
                  {dest.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setModalDest(dest)}
                    className="font-sans font-bold text-xs tracking-wider uppercase text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onPlanTrip(dest.name)}
                    className="p-2.5 rounded-full glass-gold text-white hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-dive modal */}
      <DestinationModal
        destination={modalDest}
        onClose={() => setModalDest(null)}
        onPlanTrip={onPlanTrip}
      />

    </section>
  );
};
