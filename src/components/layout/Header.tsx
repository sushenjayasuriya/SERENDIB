import React, { useState, useEffect } from 'react';
import { Menu, X, Clock, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenPlanner: () => void;
  onOpenMobileMenu: () => void;
  mobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPlanner,
  onOpenMobileMenu,
  mobileMenuOpen
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [slTime, setSlTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update live Sri Lanka time (Asia/Colombo UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setSlTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'DESTINATIONS', href: '#destinations' },
    { label: 'MAP', href: '#map' },
    { label: 'BEACHES', href: '#beaches' },
    { label: 'HIGHLANDS', href: '#highlands' },
    { label: 'WILDLIFE', href: '#wildlife' },
    { label: 'HERITAGE', href: '#heritage' },
    { label: 'CUISINE', href: '#food' },
    { label: 'EXPERIENCES', href: '#experiences' },
    { label: 'GUIDE', href: '#travel-guide' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-obsidian border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#" className="group flex flex-col items-start focus:outline-none flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-display tracking-[0.24em] text-lg sm:text-2xl font-black text-[#F3EFE6] group-hover:text-[#C5A059] transition-colors">
              SERENDIB
            </span>
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse shadow-[0_0_8px_#C5A059]" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#D8CBB5]/60 -mt-0.5 font-medium">
            Sri Lanka · The Island Beyond
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-sans font-semibold tracking-[0.18em] text-[#F3EFE6]/75 hover:text-[#C5A059] transition-all duration-200 py-1 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#C5A059] to-[#F3E5AB] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          
          {/* Live Colombo Time Pill */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#D8CBB5]/80 glass-obsidian border border-white/10 px-3.5 py-1.5 rounded-full shadow-md">
            <Clock className="w-3 h-3 text-[#C5A059]" />
            <span className="text-white/95 font-medium">COLOMBO {slTime}</span>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenPlanner}
            className="flex items-center gap-2 bg-gradient-to-r from-[#C5A059] via-[#E2C785] to-[#C5A059] hover:from-[#b08b43] hover:to-[#C5A059] text-[#08090A] font-sans font-bold text-[11px] tracking-[0.16em] uppercase px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(197,160,89,0.35)] cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLAN JOURNEY</span>
          </button>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            className="xl:hidden p-2.5 rounded-full glass-obsidian hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/15"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
