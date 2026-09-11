import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { RegionInfo } from '../../types/travel';
import { Sparkles, Compass, Sun, MapPin } from 'lucide-react';

export const RegionalOverview: React.FC = () => {
  const { regions } = useMedia();
  const [activeRegion, setActiveRegion] = useState<RegionInfo>(regions[1]); // Default to South Coast

  return (
    <section id="regions" className="relative py-32 sm:py-40 bg-[#090A0D] text-[#F3EFE6] overflow-hidden border-t border-[#C5A059]/20">
      
      {/* Radiant Glows */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#193746]/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#9C4B33]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono tracking-[0.25em] uppercase mb-6 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Territorial Panorama</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            The Six <span className="italic font-normal text-gold-gradient font-serif">Island Realms.</span>
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5]/80 leading-relaxed font-light">
            Each geographic province preserves a sovereign soul — distinct micro-climates, culinary lineages, and world wonders.
          </p>
        </div>

        {/* Region Horizontal Tabs */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 mb-10 justify-start sm:justify-center">
          {regions.map((reg) => {
            const isActive = reg.id === activeRegion.id;
            return (
              <button
                key={reg.id}
                onClick={() => setActiveRegion(reg)}
                className={`font-sans text-xs tracking-wider uppercase px-6 py-3.5 rounded-full border transition-all duration-500 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E6CA85] to-[#C5A059] border-[#E6CA85] text-[#0C0D0E] font-bold shadow-[0_10px_25px_rgba(197,160,89,0.3)] scale-105'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-[#C5A059]/50 hover:bg-white/[0.08]'
                }`}
              >
                {reg.name}
              </button>
            );
          })}
        </div>

        {/* Active Region Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-gradient-to-b from-[#13161F]/90 to-[#0A0C10]/95 border border-[#C5A059]/20 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
          
          {/* Left Column: Image with Ken-Burns */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[460px] shadow-2xl group">
            <img
              key={activeRegion.id}
              src={activeRegion.image}
              alt={activeRegion.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-black/30 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-white bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
                <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
                {activeRegion.weatherSummary}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-1">
                Province Dossier
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
                {activeRegion.name}
              </h3>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <p className="font-serif italic text-2xl sm:text-3xl text-gold-gradient font-light mb-3 leading-snug">
                "{activeRegion.tagline}"
              </p>
              <p className="font-sans text-sm sm:text-base text-[#D8CBB5]/80 leading-relaxed font-light">
                {activeRegion.landscape}
              </p>
            </div>

            {/* Key Destinations in Region */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E6CA85] flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> Featured Waypoints:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {activeRegion.destinations.map((d, i) => (
                  <span
                    key={i}
                    className="font-sans text-xs px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#E6CA85] border border-[#C5A059]/30 backdrop-blur-sm"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Regional Signatures */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E6CA85] flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Regional Signatures:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeRegion.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/5 text-xs text-stone-300 hover:bg-white/[0.08] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0" />
                    <span className="font-light">{h}</span>
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
