import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { WildlifeSpecies } from '../../types/travel';
import { Eye } from 'lucide-react';

export const WildlifeSanctuary: React.FC = () => {
  const { wildlifeSpecies, nationalParks } = useMedia();
  const [activeSpecies, setActiveSpecies] = useState<WildlifeSpecies>(wildlifeSpecies[0]);

  return (
    <section id="wildlife" className="relative py-28 sm:py-36 bg-[#0B0D0B] text-[#F3EFE6] overflow-hidden">
      
      {/* Background Safari Atmosphere Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#9C4B33]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#183526]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#D4A373]" />
              <span className="font-display text-xs tracking-[0.3em] uppercase text-[#D4A373]">
                BIODIVERSITY HOTSPOT OF ASIA
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight">
              Wild, <span className="italic font-normal text-[#D4A373]">at heart.</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#D8CBB5]/80 max-w-md">
            Sri Lanka harbors the highest density of wild leopards and Asian elephants on earth, alongside pristine coral atolls and ocean trenches where Blue Whales breach at sunrise.
          </p>
        </div>

        {/* Species Interactive Dossier */}
        <div className="mb-20">
          
          {/* Species Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
            {wildlifeSpecies.map((species) => {
              const isActive = species.id === activeSpecies.id;
              return (
                <button
                  key={species.id}
                  onClick={() => setActiveSpecies(species)}
                  className={`font-sans text-xs tracking-wider uppercase px-5 py-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D4A373] border-[#D4A373] text-[#0C0D0E] font-bold shadow-lg shadow-[#D4A373]/20'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{species.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Species Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141714] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            
            {/* Species Cinematic Image */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden group min-h-[340px] sm:min-h-[420px]">
              <img
                src={activeSpecies.image}
                alt={activeSpecies.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="font-mono text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {activeSpecies.sinhalaName}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-xs italic text-[#D4A373]">
                  {activeSpecies.scientificName}
                </p>
                <p className="font-sans text-xs text-white/80 font-medium">
                  Status: {activeSpecies.status}
                </p>
              </div>
            </div>

            {/* Species Narrative & Sighting Dossier */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A373] block mb-1">
                  CEYLON BIG FIVE SPOTLIGHT
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-wide">
                  {activeSpecies.name}
                </h3>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
                {activeSpecies.description}
              </p>

              {/* Best National Parks to Spot */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                  Premier Habitat Sanctuaries:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSpecies.bestParks.map((park, i) => (
                    <span
                      key={i}
                      className="font-sans text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white"
                    >
                      {park}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sighting Advice Box */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
                <Eye className="w-5 h-5 text-[#D4A373] flex-shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  <strong className="text-[#D4A373]">Safari Sighting Tip:</strong> {activeSpecies.sightingTips}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Premier National Parks Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-[1px] bg-[#D4A373]" />
            <h3 className="font-display text-xs tracking-[0.25em] uppercase text-[#D4A373]">
              Premier Safari Sanctuaries
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalParks.map((park) => (
              <div
                key={park.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121418] p-6 flex flex-col justify-between min-h-[320px] transition-all duration-300 hover:border-[#D4A373]/50 hover:-translate-y-1 shadow-xl"
              >
                <img
                  src={park.image}
                  alt={park.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0E] via-[#0C0D0E]/80 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#D4A373] bg-black/70 px-2.5 py-0.5 rounded-full">
                    {park.area}
                  </span>
                  <span className="font-sans text-[10px] text-white/70">
                    {park.region}
                  </span>
                </div>

                <div className="relative z-10 space-y-2">
                  <h4 className="font-display text-xl font-bold text-white group-hover:text-[#D4A373] transition-colors">
                    {park.name}
                  </h4>
                  <p className="font-sans text-xs text-[#D8CBB5]/80 line-clamp-2">
                    {park.knownFor}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {park.notableFauna.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/90">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
