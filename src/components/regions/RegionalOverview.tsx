import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { RegionInfo } from '../../types/travel';
import { Sparkles } from 'lucide-react';

export const RegionalOverview: React.FC = () => {
  const { regions } = useMedia();
  const [activeRegion, setActiveRegion] = useState<RegionInfo>(regions[1]); // Default to South Coast

  return (
    <section id="regions" className="relative py-28 sm:py-36 bg-[#0B0C0E] text-[#F3EFE6] overflow-hidden border-t border-white/10">
      
      {/* Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#193746]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#9C4B33]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C5A059]">
              TERRITORIAL DIVERSITY
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            The six <span className="italic font-normal text-[#C5A059]">island provinces.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
            Each region holds a distinct soul, architectural lineage, climate, and geographic wonders.
          </p>
        </div>

        {/* Region Horizontal Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          {regions.map((reg) => {
            const isActive = reg.id === activeRegion.id;
            return (
              <button
                key={reg.id}
                onClick={() => setActiveRegion(reg)}
                className={`font-sans text-xs tracking-wider uppercase px-5 py-3 rounded-2xl border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#0C0D0E] font-bold shadow-lg'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                {reg.name}
              </button>
            );
          })}
        </div>

        {/* Active Region Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121418] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[440px] group">
            <img
              key={activeRegion.id}
              src={activeRegion.image}
              alt={activeRegion.name}
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="font-mono text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {activeRegion.weatherSummary}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-display text-3xl font-bold text-white">
                {activeRegion.name}
              </h3>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="font-serif italic text-2xl text-[#C5A059] mb-2">
                "{activeRegion.tagline}"
              </p>
              <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
                {activeRegion.landscape}
              </p>
            </div>

            {/* Key Destinations in Region */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                Featured Destinations:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeRegion.destinations.map((d, i) => (
                  <span
                    key={i}
                    className="font-sans text-xs px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                Regional Signatures:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeRegion.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white/90"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
