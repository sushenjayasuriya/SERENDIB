import React from 'react';
import { useMedia } from '../../context/MediaContext';
import { Clock, MapPin, Sparkles, Compass, Quote } from 'lucide-react';

export const OceanExperiences: React.FC = () => {
  const { experiences } = useMedia();

  return (
    <section id="experiences" className="relative py-32 sm:py-40 bg-[#06080B] text-[#F3EFE6] overflow-hidden">
      
      {/* Ocean Radiant Nebulae */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-[#193746]/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#C5A059]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-950/20 via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono tracking-[0.25em] uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The 10 Quintessential Expeditions</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Rituals Worth <span className="italic font-normal text-gold-gradient font-serif">Crossing an Ocean For.</span>
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5]/80 leading-relaxed font-light">
            Timeless experiences distilled over centuries of island wanderlust — each etched into memory long after the sea salt fades.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
            <span className="font-mono text-[11px] text-[#C5A059] tracking-widest uppercase flex items-center gap-1.5">
              <Compass className="w-3 h-3" /> The Curated Serendib Bucket List
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
          </div>
        </div>

        {/* 10 Bucket List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group relative rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#C5A059]/60 bg-gradient-to-b from-[#0E131C]/90 to-[#070A0F]/95 backdrop-blur-xl shadow-2xl transition-all duration-700 hover:-translate-y-2.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-black/25 to-transparent" />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-mono text-sm font-bold text-[#0C0D0E] bg-gradient-to-br from-[#E6CA85] to-[#C5A059] shadow-lg">
                    {exp.number}
                  </span>
                </div>

                <div className="absolute bottom-3 left-5 flex items-center gap-2 text-white/90 font-mono text-xs backdrop-blur-md bg-black/50 px-3.5 py-1 rounded-full border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-gold-gradient transition-colors leading-snug">
                    {exp.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#D8CBB5]/80 mt-3 leading-relaxed font-light line-clamp-3">
                    {exp.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-4 bg-white/[0.02] -mx-7 -mb-7 p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-white/70">
                    <span className="flex items-center gap-1.5 text-stone-300">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      {exp.bestTime}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-stone-400">
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <Quote className="w-4 h-4 text-[#C5A059] shrink-0 rotate-180 opacity-60" />
                    <p className="font-serif italic text-xs text-[#E6CA85]/90 leading-relaxed font-normal">
                      "{exp.quote}"
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
