import React, { useState, useEffect } from 'react';
import { ArrowUp, Map, Waves, Mountain, ShieldCheck, Utensils, Calendar, Sparkles, Compass } from 'lucide-react';

export const FloatingQuickNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          
          if (scrollY > 120) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            setIsExpanded(false);
          }

          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  const quickLinks = [
    { id: 'destinations', label: 'Citadels & Coasts', icon: <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> },
    { id: 'map', label: 'Interactive Map', icon: <Map className="w-3.5 h-3.5 text-[#38BDF8]" /> },
    { id: 'beaches', label: 'Ocean Bays & Surf', icon: <Waves className="w-3.5 h-3.5 text-[#22D3EE]" /> },
    { id: 'highlands', label: 'Tea Peaks & Rail', icon: <Mountain className="w-3.5 h-3.5 text-[#34D399]" /> },
    { id: 'wildlife', label: 'Big 5 Safari', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" /> },
    { id: 'heritage', label: '2,500 Yrs Heritage', icon: <Compass className="w-3.5 h-3.5 text-[#E6CA85]" /> },
    { id: 'food', label: 'Ceylon Gastronomy', icon: <Utensils className="w-3.5 h-3.5 text-[#FB7185]" /> },
    { id: 'planner', label: 'Trip Architect', icon: <Calendar className="w-3.5 h-3.5 text-[#A78BFA]" /> },
  ];

  return (
    <aside
      aria-label="Quick Page Navigation"
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' : 'opacity-0 translate-y-8 pointer-events-none scale-90'
      }`}
    >
      
      {/* Expanded Quick Jump Drawer */}
      {isExpanded && (
        <div className="bg-[#0D0F14]/95 border border-[#C5A059]/40 p-2.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col gap-1 min-w-[200px] animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-300">
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#E6CA85] uppercase">
            <span>Island Waypoints</span>
            <span className="text-[#C5A059] font-bold">{Math.round(scrollProgress)}%</span>
          </div>
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="flex items-center gap-3 px-3 py-2 text-xs text-stone-200 hover:text-white hover:bg-[#C5A059]/15 hover:border-[#C5A059]/30 rounded-xl transition-all duration-200 text-left cursor-pointer border border-transparent"
            >
              {link.icon}
              <span className="font-normal">{link.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Trigger & Back to Top Cluster */}
      <div className="flex items-center gap-2.5">
        
        {/* Explore Drawer Trigger */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Quick Navigation Drawer"
          className={`px-4 py-2.5 rounded-full bg-[#0E1117]/90 border text-xs font-mono transition-all duration-300 shadow-2xl flex items-center gap-2 cursor-pointer backdrop-blur-xl ${
            isExpanded
              ? 'border-[#C5A059] text-gold-gradient shadow-[0_0_20px_rgba(197,160,89,0.4)]'
              : 'border-white/15 text-[#E6CA85] hover:border-[#C5A059]/60 hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline font-medium">Waypoints</span>
        </button>

        {/* Back to Top Floating Orb with Animated Progress Ring & Glowing Aura */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Scroll back to top of page"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
          className="relative w-12 h-12 rounded-full bg-[#0E1117]/95 border border-[#C5A059]/50 hover:border-[#C5A059] flex items-center justify-center text-[#F3EFE6] hover:text-[#E6CA85] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group cursor-pointer backdrop-blur-xl hover:scale-110 animate-beacon"
        >
          {/* Animated Circular Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#C5A059] transition-all duration-200 ease-out"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>

          {/* Soaring Arrow Icon with radiant bounce */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <ArrowUp className={`w-4 h-4 text-[#E6CA85] transition-transform duration-300 ${
              isHovered ? '-translate-y-1 scale-110 text-white' : 'animate-soar'
            }`} />
          </div>

          {/* Tooltip on hover */}
          {isHovered && (
            <span className="absolute -top-8 px-2.5 py-1 rounded-md bg-[#0C0D0E] border border-[#C5A059]/40 text-[10px] font-mono text-[#E6CA85] whitespace-nowrap shadow-xl animate-in fade-in duration-200">
              Top · {Math.round(scrollProgress)}%
            </span>
          )}
        </button>
      </div>

    </aside>
  );
};
