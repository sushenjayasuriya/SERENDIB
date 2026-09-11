import React from 'react';
import { useMedia } from '../../context/MediaContext';
import { Mountain, CheckCircle2 } from 'lucide-react';
import { InteractiveParticles } from '../ui/InteractiveParticles';

export const HighlandsStory: React.FC = () => {
  const { mountainFeatures } = useMedia();
  return (
    <section id="highlands" className="relative py-28 sm:py-36 bg-[#08140E] text-[#F3EFE6] overflow-hidden border-t border-white/5">
      
      {/* Highland Mist Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#10B981]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#059669]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Atmospheric Emerald Highland Particles */}
      <InteractiveParticles density={30} glowColor="emerald" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1.5px] bg-gradient-to-r from-[#34D399] to-transparent" />
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#34D399] font-bold">
              CENTRAL MOUNTAIN ESCARPMENT
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Into the <span className="italic font-normal text-emerald-gradient font-playfair">highlands.</span>
          </h2>
          <p className="font-outfit text-sm sm:text-base text-[#D8CBB5] leading-relaxed font-light">
            Where the air turns crisp and eucalyptus-scented, morning mist floats above emerald tea terraces, and century-old blue locomotives snake across stone viaducts high in the clouds.
          </p>
        </div>

        {/* Vertical Storytelling Sequence with Alternating Asymmetric Panels */}
        <div className="space-y-24 sm:space-y-32">
          {mountainFeatures.map((feat, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={feat.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Column */}
                <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}>
                  <div className="relative group rounded-3xl overflow-hidden border border-white/15 glass-emerald shadow-2xl">
                    <img
                      src={feat.image}
                      alt={feat.name}
                      className="w-full h-[360px] sm:h-[480px] object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08140E] via-[#08140E]/30 to-transparent" />
                    
                    {/* Floating Altitude Pill */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-xs font-mono text-[#34D399] shadow-lg">
                      <Mountain className="w-3.5 h-3.5 text-[#34D399]" />
                      <span className="font-bold">{feat.altitude}</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-xs text-[#34D399] font-bold block mb-1">
                        HIGHLANDS CHAPTER 0{index + 1}
                      </span>
                      <h4 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
                        {feat.name}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Text Narrative Column */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#34D399] tracking-widest uppercase font-semibold">
                      0{index + 1} // Mountain Odyssey
                    </span>
                    <h3 className="font-serif italic text-2xl sm:text-4xl text-white font-light leading-snug">
                      "{feat.tagline}"
                    </h3>
                  </div>

                  <p className="font-outfit text-sm sm:text-base text-[#D8CBB5]/90 leading-relaxed font-light">
                    {feat.story}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {feat.keyFeatures.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-3 rounded-2xl glass-obsidian border border-white/10"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] flex-shrink-0" />
                        <span className="font-outfit text-xs text-white/95 font-medium truncate">
                          {item}
                        </span>
                      </div>
                    ))}
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

