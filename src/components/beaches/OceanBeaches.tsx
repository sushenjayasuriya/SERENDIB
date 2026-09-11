import React, { useRef } from 'react';
import { useMedia } from '../../context/MediaContext';
import { Waves, ChevronLeft, ChevronRight, Droplets } from 'lucide-react';

export const OceanBeaches: React.FC = () => {
  const { beaches } = useMedia();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="beaches" className="relative py-28 sm:py-36 bg-[#08121A] text-[#F3EFE6] overflow-hidden border-y border-white/10">
      
      {/* Ocean Glow Layer */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#193746]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#20637A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 mb-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#20B2AA]" />
              <span className="font-display text-xs tracking-[0.3em] uppercase text-[#20B2AA]">
                1,340 KM OF TROPICAL SHORES
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight">
              Meet the <span className="italic font-normal text-[#64D2EC]">Indian Ocean.</span>
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer hover:border-[#64D2EC]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer hover:border-[#64D2EC]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Horizontal Draggable / Scrollable Ocean Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-4 sm:px-8 lg:px-16 pb-8 snap-x snap-mandatory scroll-smooth"
      >
        {beaches.map((beach) => (
          <div
            key={beach.id}
            className="flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] snap-start group relative rounded-3xl overflow-hidden border border-white/15 bg-[#0F1C24] shadow-2xl flex flex-col justify-between min-h-[520px] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#64D2EC]/60"
          >
            {/* Background Image */}
            <img
              src={beach.image}
              alt={beach.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Ocean Blue Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08121A] via-[#08121A]/60 to-transparent" />

            {/* Top Badges */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#64D2EC] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {beach.region}
              </span>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-white/80 font-mono">
                <Droplets className="w-3.5 h-3.5 text-[#64D2EC]" />
                <span>{beach.waterTemp.split('·')[0]}</span>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="font-display text-3xl font-bold text-white tracking-wide group-hover:text-[#64D2EC] transition-colors">
                  {beach.name}
                </h3>
                <p className="font-serif italic text-sm text-[#D8CBB5] mt-1">
                  "{beach.bestKnownFor}"
                </p>
              </div>

              {/* Surf & Seasonal Conditions */}
              <div className="p-3.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#64D2EC]">
                  <Waves className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{beach.surfSeason}</span>
                </div>
                <p className="font-sans text-[11px] text-white/70">
                  <strong className="text-white/90">Atmosphere:</strong> {beach.atmosphere}
                </p>
              </div>

              {/* Highlight Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {beach.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-sans text-[10px] px-2.5 py-1 rounded-md bg-white/10 text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
