import { Compass, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onExplore: () => void;
  onPlan: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExplore, onPlan }) => {
  return (
    <section className="relative py-32 sm:py-44 overflow-hidden flex items-center justify-center text-center">
      
      {/* Spectacular Sunset / Ocean Backdrop */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=90"
        alt="Sri Lanka Indian Ocean Sunset"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Atmospheric Multi-layer Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/70 to-[#08090A]/85" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0C0D0E]/50 to-[#08090A]" />

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-[#C5A059]">
            THE EXPEDITION AWAITS
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl font-light text-[#F3EFE6] tracking-tight leading-tight mb-6">
          Your island story{' '}
          <span className="italic font-normal text-[#C5A059]">starts here.</span>
        </h2>

        <p className="font-serif italic text-2xl sm:text-3xl text-[#D8CBB5] font-light mb-10">
          "Sri Lanka is waiting."
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] font-sans font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[#C5A059]/25 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE DESTINATIONS</span>
          </button>

          <button
            onClick={onPlan}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-[#F3EFE6] backdrop-blur-md border border-white/20 font-sans font-medium text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:border-[#C5A059] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>PLAN YOUR JOURNEY</span>
          </button>
        </div>

      </div>
    </section>
  );
};
