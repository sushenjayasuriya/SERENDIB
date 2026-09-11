import React from 'react';
import { useMedia } from '../../context/MediaContext';
import { Clock, MapPin } from 'lucide-react';

export const OceanExperiences: React.FC = () => {
  const { experiences } = useMedia();

  return (
    <section id="experiences" className="relative py-28 sm:py-36 bg-[#080A0D] text-[#F3EFE6] overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#193746]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C5A059]">
              THE 10 ICONIC BUCKET-LIST VOYAGES
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Things worth <span className="italic font-normal text-[#C5A059]">crossing an ocean for.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
            Unforgettable island rituals that remain etched in memory long after you return home.
          </p>
        </div>

        {/* 10 Bucket List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-[#11141A] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#C5A059]/50"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-xs font-bold text-[#C5A059] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {exp.number}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white/80 font-mono text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                    {exp.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#D8CBB5]/80 mt-3 leading-relaxed">
                    {exp.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      {exp.bestTime}
                    </span>
                    <span>{exp.duration}</span>
                  </div>

                  <p className="font-serif italic text-xs text-[#C5A059]/90">
                    {exp.quote}
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
