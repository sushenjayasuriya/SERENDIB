import React, { useState, useEffect } from 'react';
import { useMedia } from '../../context/MediaContext';
import { Compass, ArrowDown, Sparkles } from 'lucide-react';

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
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlay, heroSlides.length]);

  return (
    <section className="relative w-full h-[100svh] min-h-[720px] flex flex-col justify-between overflow-hidden">
      
      {/* Background Slides with Slow Zoom & Dissolve */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id || slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionDuration: '1600ms' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0E] via-[#0C0D0E]/40 to-black/60" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0C0D0E]/20 to-[#0C0D0E]/80" />
        </div>
      ))}

      {/* Subtle floating film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />

      {/* Spacer for Top Header */}
      <div className="w-full h-24 pointer-events-none" />

      {/* Hero Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center my-auto flex flex-col items-center">
        
        {/* Subtle Overline Tag */}
        <div className="inline-flex items-center gap-3 mb-4 sm:mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#C5A059]">
            The Island Beyond
          </span>
        </div>

        {/* Regal Display Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.15em] text-[#F3EFE6] leading-none mb-4 select-none drop-shadow-2xl">
          SRI LANKA
        </h1>

        {/* Core Tagline */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-5xl text-[#D8CBB5] font-light max-w-3xl leading-tight mb-5 sm:mb-6">
          "One island. A thousand journeys."
        </p>

        {/* Supporting Narrative */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#F3EFE6]/80 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10 px-4">
          Ancient kingdoms, endless coastlines, mist-covered mountains and wild places — all within one extraordinary island.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] font-sans font-semibold text-xs tracking-[0.18em] uppercase px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[#C5A059]/25 cursor-pointer whitespace-nowrap"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            <span>EXPLORE THE ISLAND</span>
          </button>

          <button
            onClick={onPlan}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-[#F3EFE6] backdrop-blur-md border border-white/20 font-sans font-medium text-xs tracking-[0.18em] uppercase px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:border-[#C5A059] cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>PLAN YOUR JOURNEY</span>
          </button>
        </div>

      </div>

      {/* Slide Indicators & Mini Preview Bar (Bottom Bar - Perfectly Aligned) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Active Scene Metadata */}
        {heroSlides[activeSlide] && (
          <div className="hidden md:flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
            <span className="font-mono text-xs text-[#C5A059] font-semibold">
              0{activeSlide + 1} / 0{heroSlides.length}
            </span>
            <div className="w-[1px] h-3.5 bg-white/20" />
            <div className="text-left flex items-baseline gap-2">
              <span className="font-sans text-xs font-semibold text-white tracking-wide">
                {heroSlides[activeSlide].title}
              </span>
              <span className="font-sans text-[10px] text-[#D8CBB5]/70">
                ({heroSlides[activeSlide].region})
              </span>
            </div>
          </div>
        )}

        {/* Slide Dots */}
        <div className="flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveSlide(i);
                setIsAutoPlay(false);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === activeSlide ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll Down Cue */}
        <a
          href="#introduction"
          aria-label="Scroll to introduction"
          className="group flex items-center gap-2 text-[10.5px] font-sans tracking-[0.2em] uppercase text-[#D8CBB5]/70 hover:text-[#C5A059] transition-colors"
        >
          <span className="hidden sm:inline">Scroll to Discover</span>
          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
            <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform animate-bounce" />
          </div>
        </a>

      </div>

    </section>
  );
};
