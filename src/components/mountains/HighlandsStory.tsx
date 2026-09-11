import React from 'react';
import { useMedia } from '../../context/MediaContext';
import { Mountain, CheckCircle2 } from 'lucide-react';

export const HighlandsStory: React.FC = () => {
  const { mountainFeatures } = useMedia();
  return (
    <section id="highlands" className="relative py-28 sm:py-36 bg-[#0E1A14] text-[#F3EFE6] overflow-hidden">
      
      {/* Highland Mist Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#183526]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#2E543D]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#78C28A]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#78C28A]">
              CENTRAL MOUNTAIN ESCARPMENT
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Into the <span className="italic font-normal text-[#98E2AA]">highlands.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
            Where the air turns crisp and eucalyptus-scented, morning mist floats above emerald tea terraces, and century-old blue locomotives snake across stone viaducts high in the clouds.
          </p>
        </div>

        {/* Vertical Storytelling Sequence with Alternating Asymmetric Panels */}
        <div className="space-y-24">
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
                  <div className="relative group rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                    <img
                      src={feat.image}
                      alt={feat.name}
                      className="w-full h-[360px] sm:h-[480px] object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Floating Altitude Pill */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-xs font-mono text-[#98E2AA]">
                      <Mountain className="w-3.5 h-3.5" />
                      <span>{feat.altitude}</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-xs text-[#98E2AA] block mb-1">
                        HIGHLANDS CHAPTER 0{index + 1}
                      </span>
                      <h4 className="font-display text-2xl sm:text-3xl font-bold text-white">
                        {feat.name}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Text Narrative Column */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#78C28A] tracking-wider uppercase">
                      0{index + 1} // Mountain Experience
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-snug">
                      "{feat.tagline}"
                    </h3>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
                    {feat.story}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {feat.keyFeatures.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#78C28A] flex-shrink-0" />
                        <span className="font-sans text-xs text-white/90 truncate">
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
