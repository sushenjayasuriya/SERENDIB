import React, { useState, useEffect } from 'react';
import { useMedia } from '../../context/MediaContext';
import { Compass, ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import { InteractiveParticles } from '../ui/InteractiveParticles';
import { LiveIslandClock } from '../ui/LiveIslandClock';
import { navigateToSection } from '../../utils/navigation';

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
    <section className="relative w-full h-screen min-h-[600px] max-h-[1080px] flex flex-col justify-between overflow-hidden bg-[#060709] pt-20 sm:pt-24 pb-4 sm:pb-6">
      
      {/* Background Slides with Hardware Accelerated Ken-Burns Zoom & Dissolve */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id || slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-transform ${
            idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionDuration: '1500ms', transform: 'translateZ(0)' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out transform"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/55 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#060709]/30 to-[#060709]/90" />
        </div>
      ))}

      {/* Interactive Atmospheric Gold Particles */}
      <InteractiveParticles density={30} glowColor="gold" />

      {/* Subtle floating film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-25" />

      {/* Top Ambient Status Pill (Sri Lanka Live Clock) */}
      <div className="relative z-20 w-full flex justify-center px-4">
        <LiveIslandClock />
      </div>

      {/* Hero Central Content (Proportionally Scaled for Perfect Viewport Fit) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto py-2">
        
        {/* Regal Overline Tag */}
        <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-3.5 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 shadow-lg backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E6CA85] animate-pulse" />
          <span className="text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-[0.3em] text-[#E6CA85]">
            The Emerald Jewel of the Indian Ocean
          </span>
        </div>

        {/* Regal Display Title with Cinzel & Gold Glow */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.14em] text-[#F3EFE6] leading-none mb-2 sm:mb-3 select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          <span className="text-gold-gradient drop-shadow-xl font-serif">SERENDIB</span>
        </h1>

        {/* Core Tagline with Playfair / Cormorant Italic */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#F3EFE6] font-light max-w-2xl leading-tight mb-3 drop-shadow-lg">
          "One island. <span className="text-gold-gradient font-normal not-italic font-serif">A thousand</span> journeys."
        </p>

        {/* Supporting Narrative with Outfit typography */}
        <p className="font-sans text-xs sm:text-sm text-[#D8CBB5]/85 max-w-xl font-light leading-relaxed mb-6 sm:mb-8 px-4">
          Where 2,500 years of ancient royal citadels, mist-covered Ceylon tea mountains, wild leopard sanctuaries, and turquoise surf bays converge in perpetual harmony.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto group relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#E6CA85] to-[#C5A059] hover:from-[#C5A059] hover:to-[#b08b43] text-[#08090A] font-sans font-bold text-[11px] sm:text-xs tracking-[0.18em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_rgba(197,160,89,0.35)] cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <Compass className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            <span>EXPLORE CITADELS & COASTS</span>
            <ChevronRight className="w-3.5 h-3.5 -ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onPlan}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-[#F3EFE6] hover:text-[#F3E5AB] border border-white/20 hover:border-[#C5A059]/60 font-sans font-semibold text-[11px] sm:text-xs tracking-[0.18em] uppercase px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
            <span>BUILD CUSTOM ITINERARY</span>
          </button>
        </div>

      </div>

      {/* Slide Indicators & Mini Preview Bar (Bottom Bar) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        
        {/* Active Scene Metadata Badge */}
        {heroSlides[activeSlide] && (
          <div className="hidden sm:flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            <span className="font-mono text-[11px] text-[#E6CA85] font-bold">
              0{activeSlide + 1} / 0{heroSlides.length}
            </span>
            <div className="w-[1px] h-3 bg-white/20" />
            <div className="text-left flex items-baseline gap-1.5">
              <span className="font-sans text-xs font-semibold text-white tracking-wide">
                {heroSlides[activeSlide].title}
              </span>
              <span className="font-mono text-[9px] text-[#C5A059]/90 font-medium">
                [{heroSlides[activeSlide].region}]
              </span>
            </div>
          </div>
        )}

        {/* Slide Progress Dots */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveSlide(i);
                setIsAutoPlay(false);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === activeSlide
                  ? 'w-8 sm:w-10 bg-gradient-to-r from-[#E6CA85] to-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.8)]'
                  : 'w-2 bg-white/25 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll Down Cue */}
        <a
          href="/about"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection('/about');
          }}
          aria-label="Scroll to introduction"
          className="group flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#D8CBB5]/70 hover:text-[#C5A059] transition-colors cursor-pointer"
        >
          <span className="hidden md:inline">DISCOVER THE ISLAND</span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:border-[#C5A059] group-hover:scale-110 transition-all duration-300">
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-y-0.5 transition-transform animate-bounce" />
          </div>
        </a>

      </div>

    </section>
  );
};

