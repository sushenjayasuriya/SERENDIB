import React, { useState, useEffect } from 'react';
import { useMedia } from '../../context/MediaContext';
import { Compass, ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import { InteractiveParticles } from '../ui/InteractiveParticles';
import { LiveIslandClock } from '../ui/LiveIslandClock';

interface HeroProps {
  onExplore: () => void;
  onPlan: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onPlan }) => {
  const { heroSlides } = useMedia();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveSlide((prev: number) => (prev + 1) % heroSlides.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isAutoPlay, heroSlides.length]);

  return (
    <section className="relative w-full h-[100svh] min-h-[740px] flex flex-col justify-between overflow-hidden bg-[#08090A]">
      
      {/* Background Slides with Slow Cinematic Ken-Burns Zoom & Dissolve */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id || slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
          }`}
          style={{ transitionDuration: '2000ms' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out transform"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#08090A]/30 to-[#08090A]/90" />
        </div>
      ))}

      {/* Interactive Atmospheric Gold & Amber Particles */}
      <InteractiveParticles density={45} glowColor="gold" />

      {/* Subtle floating film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-35" />

      {/* Spacer for Top Header */}
      <div className="w-full h-24 pointer-events-none relative z-20" />

      {/* Hero Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center my-auto flex flex-col items-center">
        
        {/* Real-Time Sri Lanka Clock & Solar Ticker */}
        <div className="mb-6 animate-float">
          <LiveIslandClock />
        </div>

        {/* Regal Overline Tag */}
        <div className="inline-flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full glass-gold shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.35em] text-[#F3E5AB]">
            The Emerald Jewel of the Indian Ocean
          </span>
        </div>

        {/* Regal Display Title with Cinzel & Gold Glow */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.18em] text-[#F3EFE6] leading-none mb-4 select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          <span className="text-gold-gradient drop-shadow-xl">SERENDIB</span>
        </h1>

        {/* Core Tagline with Playfair / Cormorant Italic */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-5xl text-[#F3EFE6] font-light max-w-3xl leading-tight mb-5 drop-shadow-lg">
          "One island. <span className="text-[#C5A059] font-normal not-italic font-display">A thousand</span> journeys."
        </p>

        {/* Supporting Narrative with Outfit typography */}
        <p className="font-outfit text-xs sm:text-sm md:text-base text-[#D8CBB5]/90 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 px-4">
          Where 2,500 years of ancient royal citadels, mist-covered Ceylon tea mountains, wild leopard sanctuaries, and turquoise surf bays converge in perpetual harmony.
        </p>

        {/* Action CTAs with Glowing Micro-Physics */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#C5A059] via-[#E2C785] to-[#C5A059] text-[#08090A] font-sans font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(197,160,89,0.45)] hover:shadow-[0_0_45px_rgba(197,160,89,0.7)] cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <Compass className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            <span>EXPLORE CITADELS & COASTS</span>
            <ChevronRight className="w-3.5 h-3.5 -ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onPlan}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 glass-obsidian hover:glass-gold text-[#F3EFE6] hover:text-[#F3E5AB] border border-white/20 hover:border-[#C5A059]/60 font-sans font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
            <span>BUILD CUSTOM ITINERARY</span>
          </button>
        </div>

      </div>

      {/* Slide Indicators & Mini Preview Bar (Bottom Bar) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Active Scene Metadata Badge */}
        {heroSlides[activeSlide] && (
          <div className="hidden md:flex items-center gap-3 glass-obsidian px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <span className="font-mono text-xs text-[#C5A059] font-bold">
              0{activeSlide + 1} / 0{heroSlides.length}
            </span>
            <div className="w-[1px] h-3.5 bg-white/20" />
            <div className="text-left flex items-baseline gap-2">
              <span className="font-sans text-xs font-semibold text-white tracking-wide">
                {heroSlides[activeSlide].title}
              </span>
              <span className="font-mono text-[10px] text-[#C5A059]/90 font-medium">
                [{heroSlides[activeSlide].region}]
              </span>
            </div>
          </div>
        )}

        {/* Slide Progress Dots */}
        <div className="flex items-center gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveSlide(i);
                setIsAutoPlay(false);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === activeSlide
                  ? 'w-10 bg-gradient-to-r from-[#C5A059] to-[#F3E5AB] shadow-[0_0_10px_rgba(197,160,89,0.8)]'
                  : 'w-2 bg-white/25 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll Down Cue */}
        <a
          href="#introduction"
          aria-label="Scroll to introduction"
          className="group flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase text-[#D8CBB5]/70 hover:text-[#C5A059] transition-colors"
        >
          <span className="hidden sm:inline">DISCOVER THE ISLAND</span>
          <div className="w-8 h-8 rounded-full glass-obsidian border border-white/20 flex items-center justify-center group-hover:border-[#C5A059] group-hover:scale-110 transition-all duration-300">
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-y-0.5 transition-transform animate-bounce" />
          </div>
        </a>

      </div>

    </section>
  );
};

