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
    <section id="beaches" className="relative py-28 sm:py-36 bg-[#061018] text-[#F3EFE6] overflow-hidden border-y border-white/10">
      
      {/* Ocean Glow Layer */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#0284C7]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#06B6D4]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 mb-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1.5px] bg-gradient-to-r from-[#06B6D4] to-transparent" />
              <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#38BDF8] font-bold">
                1,340 KM OF TROPICAL SHORES
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight">
              Meet the <span className="italic font-normal text-ocean-gradient font-playfair">Indian Ocean.</span>
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3.5 rounded-full border border-white/20 glass-obsidian hover:bg-[#0284C7]/30 text-white transition-all duration-300 cursor-pointer hover:border-[#38BDF8] hover:scale-105 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-[#38BDF8]" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3.5 rounded-full border border-white/20 glass-obsidian hover:bg-[#0284C7]/30 text-white transition-all duration-300 cursor-pointer hover:border-[#38BDF8] hover:scale-105 shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-[#38BDF8]" />
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
            className="flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] snap-start group relative rounded-3xl overflow-hidden border border-white/15 glass-ocean shadow-2xl flex flex-col justify-between min-h-[540px] p-7 transition-all duration-500 hover:-translate-y-2.5 hover:border-[#38BDF8]/60 hover:shadow-[0_0_35px_rgba(14,165,233,0.3)] cursor-default"
          >
            {/* Background Image */}
            <img
              src={beach.image}
              alt={beach.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Ocean Blue Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061018] via-[#061018]/65 to-transparent" />

            {/* Top Badges */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#38BDF8] bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow-md">
                {beach.region}
              </span>
              <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-xs text-white/90 font-mono shadow-md">
                <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="font-semibold">{beach.waterTemp.split('·')[0]}</span>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-white tracking-wide group-hover:text-ocean-gradient transition-colors drop-shadow-md">
                  {beach.name}
                </h3>
                <p className="font-serif italic text-base text-[#E0F2FE]/90 mt-1 font-light">
                  "{beach.bestKnownFor}"
                </p>
              </div>

              {/* Surf & Seasonal Conditions */}
              <div className="p-4 rounded-2xl glass-obsidian border border-white/15 space-y-2 text-xs backdrop-blur-xl shadow-lg">
                <div className="flex items-center gap-2 text-[#38BDF8]">
                  <Waves className="w-4 h-4 flex-shrink-0 animate-pulse" />
                  <span className="font-semibold tracking-wide">{beach.surfSeason}</span>
                </div>
                <p className="font-outfit text-xs text-white/80 font-light leading-relaxed">
                  <strong className="text-white/95 font-semibold">Vibe:</strong> {beach.atmosphere}
                </p>
              </div>

              {/* Highlight Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {beach.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-outfit text-xs px-3 py-1 rounded-full glass-obsidian border border-white/10 text-white/95 font-medium"
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
