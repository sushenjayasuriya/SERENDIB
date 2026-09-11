import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { WildlifeSpecies } from '../../types/travel';
import { Eye } from 'lucide-react';

export const WildlifeSanctuary: React.FC = () => {
  const { wildlifeSpecies, nationalParks } = useMedia();
  const [activeSpecies, setActiveSpecies] = useState<WildlifeSpecies>(wildlifeSpecies[0]);

  return (
    <section id="wildlife" className="relative py-28 sm:py-36 bg-[#080B09] text-[#F3EFE6] overflow-hidden border-t border-white/5">
      
      {/* Background Safari Atmosphere Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D97706]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#065F46]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1.5px] bg-gradient-to-r from-[#D97706] to-transparent" />
              <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#F59E0B] font-bold">
                BIODIVERSITY HOTSPOT OF ASIA
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight">
              Wild, <span className="italic font-normal text-gold-gradient font-playfair">at heart.</span>
            </h2>
          </div>

          <p className="font-outfit text-xs sm:text-sm text-[#D8CBB5]/80 max-w-md font-light leading-relaxed">
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
                  className={`font-mono text-xs tracking-wider uppercase px-5 py-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] border-[#D97706] text-[#08090A] font-bold shadow-[0_0_20px_rgba(217,119,6,0.35)]'
                      : 'glass-obsidian border-white/10 text-white/70 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{species.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Species Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-obsidian border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            
            {/* Species Cinematic Image */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden group min-h-[340px] sm:min-h-[440px] border border-white/10 shadow-xl">
              <img
                src={activeSpecies.image}
                alt={activeSpecies.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B09] via-[#080B09]/40 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="font-mono text-xs text-[#FDE68A] bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 font-bold">
                  {activeSpecies.sinhalaName}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-xs italic text-[#F59E0B] font-semibold">
                  {activeSpecies.scientificName}
                </p>
                <p className="font-outfit text-xs text-white/90 font-medium mt-0.5">
                  Status: <span className="text-[#34D399] font-bold">{activeSpecies.status}</span>
                </p>
              </div>
            </div>

            {/* Species Narrative & Sighting Dossier */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F59E0B] block mb-1 font-bold">
                  CEYLON BIG FIVE SPOTLIGHT
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-wide">
                  {activeSpecies.name}
                </h3>
              </div>

              <p className="font-outfit text-sm sm:text-base text-[#D8CBB5] leading-relaxed font-light">
                {activeSpecies.description}
              </p>

              {/* Best National Parks to Spot */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-white/70 block font-semibold">
                  Premier Habitat Sanctuaries:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSpecies.bestParks.map((park, i) => (
                    <span
                      key={i}
                      className="font-outfit text-xs px-3.5 py-1.5 rounded-xl glass-obsidian border border-white/15 text-white/95 font-medium"
                    >
                      {park}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sighting Advice Box */}
              <div className="p-4 rounded-2xl glass-obsidian border border-[#F59E0B]/30 flex items-start gap-3 shadow-lg">
                <Eye className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5 animate-pulse" />
                <p className="font-outfit text-xs text-white/90 leading-relaxed font-light">
                  <strong className="text-[#F59E0B] font-bold">Safari Sighting Tip:</strong> {activeSpecies.sightingTips}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Premier National Parks Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[1.5px] bg-gradient-to-r from-[#F59E0B] to-transparent" />
            <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-[#F59E0B] font-bold">
              Premier Safari Sanctuaries
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalParks.map((park) => (
              <div
                key={park.id}
                className="group relative rounded-3xl overflow-hidden border border-white/10 glass-obsidian p-6 flex flex-col justify-between min-h-[340px] transition-all duration-300 hover:border-[#F59E0B]/60 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] shadow-xl cursor-default"
              >
                <img
                  src={park.image}
                  alt={park.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B09] via-[#080B09]/80 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#FDE68A] bg-black/75 px-3 py-0.5 rounded-full border border-white/10 font-bold">
                    {park.area}
                  </span>
                  <span className="font-mono text-[10px] text-white/80 font-medium">
                    {park.region}
                  </span>
                </div>

                <div className="relative z-10 space-y-2">
                  <h4 className="font-display text-xl font-bold text-white group-hover:text-gold-gradient transition-colors">
                    {park.name}
                  </h4>
                  <p className="font-outfit text-xs text-[#D8CBB5]/80 line-clamp-2 font-light">
                    {park.knownFor}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {park.notableFauna.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md glass-obsidian text-white/90 border border-white/10 font-medium">
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
