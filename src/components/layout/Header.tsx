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
          ? 'bg-[#0C0D0E]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#" className="group flex flex-col items-start focus:outline-none flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-display tracking-[0.22em] text-lg sm:text-xl font-bold text-[#F3EFE6] group-hover:text-[#C5A059] transition-colors">
              SERENDIB
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
          </div>
          <span className="font-sans text-[8.5px] tracking-[0.25em] uppercase text-[#D8CBB5]/60 -mt-0.5">
            Sri Lanka · The Island Beyond
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10.5px] font-medium tracking-[0.16em] text-[#F3EFE6]/75 hover:text-[#C5A059] transition-colors py-1 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          
          {/* Live Colombo Time Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#D8CBB5]/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Clock className="w-3 h-3 text-[#C5A059]" />
            <span className="text-white/90 font-medium">COLOMBO {slTime}</span>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenPlanner}
            className="flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] font-sans font-semibold text-[11px] tracking-[0.14em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md shadow-[#C5A059]/20 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLAN YOUR JOURNEY</span>
          </button>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            className="xl:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
