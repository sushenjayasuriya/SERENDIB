import React from 'react';
import { useMedia } from '../../context/MediaContext';
import { Award, MapPin } from 'lucide-react';

export const HeritageTimeline: React.FC = () => {
  const { heritageSites } = useMedia();
  return (
    <section id="heritage" className="relative py-28 sm:py-36 bg-[#120F0C] text-[#F3EFE6] overflow-hidden">
      
      {/* Warm Earth Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#9C4B33]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C5A059]">
              LIVING ANCIENT CHRONICLES
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            2,500 years <span className="italic font-normal text-[#C5A059]">of stories.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
            From the 5th-century palace in the sky to the sacred tooth relic of Buddha and colossal brick stupas that rivaled the pyramids of Giza.
          </p>
        </div>

        {/* Heritage Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heritageSites.map((site) => (
            <div
              key={site.id}
              className="group bg-[#1A1612] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#C5A059]/50"
            >
              {/* Photo Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-transparent to-transparent" />

                {site.unescoYear && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#C5A059] text-[#0C0D0E] font-sans font-bold text-[10px] px-3 py-1 rounded-full shadow-lg">
                    <Award className="w-3 h-3" />
                    <span>UNESCO {site.unescoYear}</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white/70 font-mono text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{site.location}</span>
                </div>
              </div>

              {/* Site Details Body */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#C5A059] block mb-1">
                    {site.period}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#C5A059] transition-colors">
                    {site.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#D8CBB5]/80 mt-3 leading-relaxed">
                    {site.significance}
                  </p>
                </div>

                {/* Architectural Wonder & Tip */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <p className="font-sans text-xs text-white/70">
                    <strong className="text-[#C5A059]">Marvel:</strong> {site.architecturalWonder}
                  </p>
                  <p className="font-sans text-[11px] text-white/50 italic">
                    Tip: {site.visitorTip}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
