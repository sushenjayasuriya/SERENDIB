import React, { useState, useRef } from 'react';
import { ArrowUp, Mail, CheckCircle2, Lock, Sparkles, Compass } from 'lucide-react';
import { useMedia } from '../../context/MediaContext';
import { navigateToSection } from '../../utils/navigation';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<number | null>(null);
  const { setIsAdminOpen, isAdminAuthenticated, isStealthMode } = useMedia();

  const handleLogoClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      setIsAdminOpen(true);
      clickCountRef.current = 0;
      if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
      return;
    }
    if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateToSection(path);
  };

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigateToSection('/');
  };

  return (
    <footer className="relative bg-[#050608] border-t border-[#C5A059]/20 text-[#F3EFE6] pt-24 pb-14 overflow-hidden">
      
      {/* Background Watermark Typography */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none select-none opacity-[0.02] whitespace-nowrap text-[20vw] font-serif font-bold leading-none tracking-widest text-white">
        SERENDIB
      </div>

      {/* Radiant Glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#C5A059]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-5 space-y-6">
            <div
              onClick={handleLogoClick}
              className="inline-flex items-center gap-3 cursor-pointer select-none group"
              title="SERENDIB — Sri Lanka"
            >
              <span className="font-serif tracking-[0.25em] text-3xl font-black text-[#F3EFE6] group-hover:text-gold-gradient transition-colors">
                SERENDIB
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6CA85] animate-pulse shadow-[0_0_12px_#C5A059]" />
            </div>
            
            <p className="font-serif italic text-lg text-[#D8CBB5]/90 max-w-md">
              "One island. A thousand journeys."
            </p>
            
            <p className="font-sans text-xs text-[#D8CBB5]/65 leading-relaxed max-w-md font-light">
              Where 2,500 years of ancient royal citadels, mist-covered Ceylon tea mountains, wild leopard sanctuaries, and turquoise surf bays converge in perpetual harmony.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-4">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Curated Island Gazette
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                Receive Private Expeditions & Seasonal Dispatches
              </h4>
            </div>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center gap-3 text-sm text-[#E6CA85]">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>Thank you. You have been added to the private Serendib Lookbook registry.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email address..."
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/15 focus:border-[#C5A059] focus:outline-none text-sm text-white placeholder:text-white/30 transition-all font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#E6CA85] to-[#C5A059] hover:from-[#C5A059] hover:to-[#b08b43] text-[#0C0D0E] font-sans font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-[0_10px_25px_rgba(197,160,89,0.25)]"
                >
                  Join Lookbook
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Sitemaps & Socials */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16 border-b border-white/10">
          
          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" /> Explore
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80 font-light">
              <li><a href="/destinations" onClick={(e) => handleLinkClick(e, '/destinations')} className="hover:text-gold-gradient transition-colors cursor-pointer">Destinations</a></li>
              <li><a href="/map" onClick={(e) => handleLinkClick(e, '/map')} className="hover:text-gold-gradient transition-colors cursor-pointer">Interactive Map</a></li>
              <li><a href="/beaches" onClick={(e) => handleLinkClick(e, '/beaches')} className="hover:text-gold-gradient transition-colors cursor-pointer">Ocean Beaches & Surf</a></li>
              <li><a href="/highlands" onClick={(e) => handleLinkClick(e, '/highlands')} className="hover:text-gold-gradient transition-colors cursor-pointer">Highlands & Tea</a></li>
              <li><a href="/wildlife" onClick={(e) => handleLinkClick(e, '/wildlife')} className="hover:text-gold-gradient transition-colors cursor-pointer">Big 5 Wildlife Sanctuaries</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5">
              Culture & Soul
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80 font-light">
              <li><a href="/heritage" onClick={(e) => handleLinkClick(e, '/heritage')} className="hover:text-gold-gradient transition-colors cursor-pointer">2,500 Years Heritage</a></li>
              <li><a href="/cuisine" onClick={(e) => handleLinkClick(e, '/cuisine')} className="hover:text-gold-gradient transition-colors cursor-pointer">Ceylon Culinary & Spices</a></li>
              <li><a href="/experiences" onClick={(e) => handleLinkClick(e, '/experiences')} className="hover:text-gold-gradient transition-colors cursor-pointer">10 Bucket-List Moments</a></li>
              <li><a href="/regions" onClick={(e) => handleLinkClick(e, '/regions')} className="hover:text-gold-gradient transition-colors cursor-pointer">The 6 Island Realms</a></li>
              <li><a href="/planner" onClick={(e) => handleLinkClick(e, '/planner')} className="hover:text-gold-gradient transition-colors cursor-pointer">Journey Architect</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5">
              Key Wonders
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80 font-light">
              <li><a href="/destinations" onClick={(e) => handleLinkClick(e, '/destinations')} className="hover:text-gold-gradient transition-colors cursor-pointer">Sigiriya Citadel</a></li>
              <li><a href="/destinations" onClick={(e) => handleLinkClick(e, '/destinations')} className="hover:text-gold-gradient transition-colors cursor-pointer">Nine Arch Bridge</a></li>
              <li><a href="/destinations" onClick={(e) => handleLinkClick(e, '/destinations')} className="hover:text-gold-gradient transition-colors cursor-pointer">UNESCO Galle Fort</a></li>
              <li><a href="/destinations" onClick={(e) => handleLinkClick(e, '/destinations')} className="hover:text-gold-gradient transition-colors cursor-pointer">Kandy Sacred Temple</a></li>
              <li><a href="/destinations" onClick={(e) => handleLinkClick(e, '/destinations')} className="hover:text-gold-gradient transition-colors cursor-pointer">Yala Leopard Range</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5">
              Information
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80 font-light">
              <li><a href="/guide" onClick={(e) => handleLinkClick(e, '/guide')} className="hover:text-gold-gradient transition-colors cursor-pointer">ETA & Visa Process</a></li>
              <li><a href="/guide" onClick={(e) => handleLinkClick(e, '/guide')} className="hover:text-gold-gradient transition-colors cursor-pointer">Monsoon Best Seasons</a></li>
              <li><a href="/guide" onClick={(e) => handleLinkClick(e, '/guide')} className="hover:text-gold-gradient transition-colors cursor-pointer">Currency & LKR Guide</a></li>
              <li><a href="/guide" onClick={(e) => handleLinkClick(e, '/guide')} className="hover:text-gold-gradient transition-colors cursor-pointer">Scenic Train Booking</a></li>
              <li><a href="/guide" onClick={(e) => handleLinkClick(e, '/guide')} className="hover:text-gold-gradient transition-colors cursor-pointer">Emergency Hotlines</a></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5">
              Connect
            </h5>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 font-sans text-xs text-[#D8CBB5]/80 hover:text-[#C5A059] transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center text-[#C5A059] font-bold">📸</span>
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 font-sans text-xs text-[#D8CBB5]/80 hover:text-[#C5A059] transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center text-[#C5A059] font-bold">▶</span>
                <span>YouTube</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 font-sans text-xs text-[#D8CBB5]/80 hover:text-[#C5A059] transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center text-[#C5A059] font-bold">f</span>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Commercial Accreditations & Payment Badges */}
        <div className="py-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[11px] text-white/50">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <span className="text-[#C5A059] font-bold">INDEPENDENT LUXURY EXPEDITION GUIDE</span>
            <span>•</span>
            <a href="tel:+94713912972" className="hover:text-[#C5A059] transition-colors">
              24/7 ISLAND CONCIERGE: +94 71 391 2972
            </a>
            <span>•</span>
            <span>FIELD-RESEARCHED IN SRI LANKA</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-white/40">
            <span className="mr-1 text-white/60">Accepted Currencies & Cards:</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">VISA</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">MASTERCARD</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">AMEX</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">APPLE PAY</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Admin Access & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-white/50 font-light">
          <div className="flex items-center gap-3">
            <p>© 2026 SERENDIB Expeditions Ltd. All Rights Reserved.</p>
            {(!isStealthMode || isAdminAuthenticated) && (
              <>
                <span className="text-white/20">·</span>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className={`inline-flex items-center gap-1 transition-colors cursor-pointer text-[11px] ${
                    isAdminAuthenticated ? 'text-[#C5A059] font-bold' : 'text-white/30 hover:text-[#C5A059]'
                  }`}
                  title="Curatorial Studio (Ctrl+Shift+A)"
                >
                  <Lock className="w-3 h-3" />
                  <span>{isAdminAuthenticated ? 'Studio Active' : 'Admin'}</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-white/40 font-serif italic text-sm">
              Ayubowan · ආයුබෝවන් · வணக்கம்
            </span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A059]/60 hover:bg-[#C5A059]/10 text-white/80 hover:text-[#E6CA85] transition-all duration-300 shadow-md cursor-pointer"
            >
              <span className="font-mono text-xs font-medium">Back to Top</span>
              <div className="w-6 h-6 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-[#0C0D0E] transition-all duration-300">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform animate-soar" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
