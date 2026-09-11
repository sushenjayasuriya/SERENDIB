import React from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onExplore: () => void;
  onPlan: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExplore, onPlan }) => {
  return (
    <section className="relative py-36 sm:py-48 overflow-hidden flex items-center justify-center text-center">
      
      {/* Spectacular Sunset / Ocean Backdrop */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=90"
        alt="Sri Lanka Indian Ocean Sunset"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-in fade-in duration-1000"
      />

      {/* Atmospheric Multi-layer Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-[#060709]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/15 via-[#0C0D0E]/60 to-[#060709]" />

      {/* Floating Radiant Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A059]/15 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A059]/40 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#E6CA85] animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-gold-gradient">
            THE ANCIENT EXPEDITION AWAITS
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-7xl md:text-8xl font-light text-[#F3EFE6] tracking-tight leading-none mb-6">
          Your Island Chronicle{' '}
          <span className="italic font-normal text-gold-gradient font-serif block sm:inline">Begins Now.</span>
        </h2>

        <p className="font-serif italic text-2xl sm:text-4xl text-[#D8CBB5]/90 font-light mb-12 max-w-2xl leading-relaxed">
          "Between the Indian Ocean and the mist of ancient peaks, Serendib calls."
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto px-6">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#E6CA85] to-[#C5A059] hover:from-[#C5A059] hover:to-[#b08b43] text-[#0C0D0E] font-sans font-bold text-xs tracking-[0.2em] uppercase px-9 py-4.5 rounded-full transition-all duration-500 transform hover:scale-105 shadow-[0_15px_35px_rgba(197,160,89,0.35)] cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE DESTINATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onPlan}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-[#F3EFE6] backdrop-blur-md border border-white/25 font-sans font-semibold text-xs tracking-[0.2em] uppercase px-9 py-4.5 rounded-full transition-all duration-500 hover:border-[#C5A059] hover:shadow-[0_0_25px_rgba(197,160,89,0.2)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>CUSTOM JOURNEY PLANNER</span>
          </button>
        </div>

      </div>
    </section>
  );
};
