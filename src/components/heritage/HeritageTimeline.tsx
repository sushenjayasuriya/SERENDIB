import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import { Award, MapPin, Sparkles, Compass, Clock, Info } from 'lucide-react';

export const HeritageTimeline: React.FC = () => {
  const { heritageSites } = useMedia();
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  return (
    <section id="heritage" className="relative py-32 sm:py-40 bg-[#0E0B08] text-[#F3EFE6] overflow-hidden">
      
      {/* Ancient Earth & Gold Radiant Nebulae */}
      <div className="absolute top-10 left-1/4 w-[650px] h-[650px] bg-[#9C4B33]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[700px] h-[700px] bg-[#C5A059]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono tracking-[0.25em] uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>2,500 Years of Royal Chronicles</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Monuments of <span className="italic font-normal text-gold-gradient font-serif">Dynasties & Gods.</span>
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5]/80 leading-relaxed font-light">
            From the 5th-century palace citadel rising in the clouds to sacred relics encased in stupas that rivaled the grand pyramids of Giza.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
            <span className="font-mono text-[11px] text-[#C5A059] tracking-widest uppercase flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Ancient Ceylon UNESCO Heritage Trail
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
          </div>
        </div>

        {/* Heritage Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heritageSites.map((site, index) => {
            const isSelected = selectedSiteId === site.id;
            return (
              <div
                key={site.id}
                onClick={() => setSelectedSiteId(isSelected ? null : site.id)}
                className={`group relative rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-700 cursor-pointer border ${
                  isSelected 
                    ? 'border-[#C5A059] shadow-[0_0_40px_rgba(197,160,89,0.3)] scale-[1.02]' 
                    : 'border-white/10 hover:border-[#C5A059]/60 hover:-translate-y-2.5 shadow-2xl'
                } bg-gradient-to-b from-[#18130E]/90 to-[#0F0C09]/95 backdrop-blur-xl`}
              >
                {/* Photo Header */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C09] via-black/30 to-transparent" />

                  {/* Period Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-[#C5A059]/40 text-[#E6CA85] font-mono text-[10px] px-3 py-1.5 rounded-full tracking-wider">
                    {site.period}
                  </div>

                  {/* UNESCO Badge */}
                  {site.unescoYear && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA85] text-[#0C0D0E] font-sans font-bold text-[10px] px-3.5 py-1.5 rounded-full shadow-xl tracking-wider uppercase">
                      <Award className="w-3.5 h-3.5" />
                      <span>UNESCO {site.unescoYear}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-5 flex items-center gap-2 text-white/90 font-mono text-xs backdrop-blur-sm bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{site.location}</span>
                  </div>
                </div>

                {/* Site Details Body */}
                <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#C5A059]/80 tracking-widest uppercase">
                        Chronicle #{index + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-gold-gradient transition-colors">
                      {site.name}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#D8CBB5]/80 mt-3 leading-relaxed font-light line-clamp-3">
                      {site.significance}
                    </p>
                  </div>

                  {/* Architectural Wonder & Tip */}
                  <div className="pt-4 border-t border-[#C5A059]/15 space-y-3 bg-[#C5A059]/[0.02] -mx-7 -mb-7 p-6">
                    <div className="flex items-start gap-2.5">
                      <Compass className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <p className="font-sans text-xs text-stone-300 leading-snug">
                        <strong className="text-[#E6CA85] font-semibold">Architectural Marvel:</strong> {site.architecturalWonder}
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                      <p className="font-sans text-[11px] text-stone-400 italic leading-snug">
                        {site.visitorTip}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
