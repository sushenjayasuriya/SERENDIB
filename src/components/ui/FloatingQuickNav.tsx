import React, { useState, useEffect } from 'react';
import { ArrowUp, Map, Waves, Mountain, ShieldCheck, Utensils, Calendar, Sparkles } from 'lucide-react';

export const FloatingQuickNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }

      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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

  if (!isVisible) return null;

  const quickLinks = [
    { id: 'destinations', label: 'Citadels', icon: <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> },
    { id: 'map', label: 'Island Map', icon: <Map className="w-3.5 h-3.5 text-[#38BDF8]" /> },
    { id: 'beaches', label: 'Ocean Bays', icon: <Waves className="w-3.5 h-3.5 text-[#22D3EE]" /> },
    { id: 'highlands', label: 'Tea Peaks', icon: <Mountain className="w-3.5 h-3.5 text-[#34D399]" /> },
    { id: 'wildlife', label: 'Big 5 Safari', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" /> },
    { id: 'food', label: 'Ceylon Flavors', icon: <Utensils className="w-3.5 h-3.5 text-[#FB7185]" /> },
    { id: 'planner', label: 'Trip Planner', icon: <Calendar className="w-3.5 h-3.5 text-[#A78BFA]" /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      
      {/* Expanded Quick Jump Drawer */}
      {isExpanded && (
        <div className="glass-obsidian border border-white/15 p-2 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col gap-1 min-w-[170px] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-mono tracking-widest text-white/50 uppercase">
            Quick Navigation
          </div>
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-left cursor-pointer"
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Trigger & Back to Top Cluster */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Quick Navigation"
          className="px-3.5 py-2 rounded-full glass-obsidian border border-white/15 text-xs font-mono text-[#C5A059] hover:border-[#C5A059]/40 hover:bg-white/10 transition-all duration-300 shadow-xl flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="hidden sm:inline">Explore</span>
        </button>

        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="relative w-11 h-11 rounded-full glass-obsidian border border-white/15 hover:border-[#C5A059]/60 flex items-center justify-center text-[#F3EFE6] hover:text-[#C5A059] transition-all duration-300 shadow-xl group cursor-pointer backdrop-blur-md"
        >
          {/* Circular Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#C5A059] transition-all duration-150 ease-out"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>

          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>

    </div>
  );
};
