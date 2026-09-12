import React, { useState, useRef } from 'react';
import { ArrowUp, Mail, CheckCircle2, Lock, Sparkles, Compass } from 'lucide-react';
import { useMedia } from '../../context/MediaContext';

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <span className="font-serif tracking-[0.25em] text-3xl sm:text-4xl font-light text-[#F3EFE6] group-hover:text-gold-gradient transition-colors">
                SERENDIB
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E6CA85] animate-pulse" />
            </div>
            <p className="font-serif italic text-lg text-gold-gradient font-light">
              Sri Lanka · The Island Beyond
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#D8CBB5]/75 max-w-md leading-relaxed font-light">
              "One island. A thousand journeys." From misty emerald tea highlands and wild leopard sanctuaries to ancient 2,500-year-old rock palaces and warm Indian Ocean surf.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#E6CA85]/80">
              <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">7° 52′ 23″ N</span>
              <span>•</span>
              <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">80° 46′ 19″ E</span>
              <span>•</span>
              <span className="text-[#C5A059] font-bold">INDIAN OCEAN</span>
            </div>
          </div>

          {/* Newsletter / Lookbook */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#12151D]/90 to-[#0A0C10]/95 border border-[#C5A059]/25 p-8 sm:p-10 rounded-3xl relative overflow-hidden backdrop-blur-xl shadow-2xl">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-3xl" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 text-[#E6CA85] text-[10px] font-mono tracking-widest uppercase mb-3 border border-[#C5A059]/30">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Exclusive Island Dispatch</span>
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl text-white font-light mb-2">
              Receive the Curated Ceylon Lookbook
            </h4>
            <p className="font-sans text-xs text-[#D8CBB5]/70 mb-6 max-w-lg font-light leading-relaxed">
              Seasonal travel intelligence, secret train routes, heritage culinary secrets, and high-resolution photography delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-3 bg-[#1B382B]/80 border border-[#78C28A]/40 text-[#78C28A] px-5 py-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="font-sans text-xs">
                  Thank you! The curated Sri Lanka Collector's Lookbook has been dispatched to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for the Lookbook"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#C5A059] text-white text-xs pl-11 pr-4 py-4 rounded-2xl outline-none transition-all font-sans placeholder:text-stone-500 shadow-inner"
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
              <li><a href="#destinations" className="hover:text-gold-gradient transition-colors">Destinations</a></li>
              <li><a href="#map" className="hover:text-gold-gradient transition-colors">Interactive Map</a></li>
              <li><a href="#beaches" className="hover:text-gold-gradient transition-colors">Ocean Beaches & Surf</a></li>
              <li><a href="#highlands" className="hover:text-gold-gradient transition-colors">Highlands & Tea</a></li>
              <li><a href="#wildlife" className="hover:text-gold-gradient transition-colors">Big 5 Wildlife Sanctuaries</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5">
              Culture & Soul
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80 font-light">
              <li><a href="#heritage" className="hover:text-gold-gradient transition-colors">2,500 Years Heritage</a></li>
              <li><a href="#food" className="hover:text-gold-gradient transition-colors">Ceylon Culinary & Spices</a></li>
              <li><a href="#experiences" className="hover:text-gold-gradient transition-colors">10 Bucket-List Moments</a></li>
              <li><a href="#regions" className="hover:text-gold-gradient transition-colors">The 6 Island Realms</a></li>
              <li><a href="#planner" className="hover:text-gold-gradient transition-colors">Journey Architect</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5">
              Key Wonders
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80 font-light">
              <li><a href="#destinations" className="hover:text-gold-gradient transition-colors">Sigiriya Citadel</a></li>
              <li><a href="#destinations" className="hover:text-gold-gradient transition-colors">Nine Arch Bridge</a></li>
              <li><a href="#destinations" className="hover:text-gold-gradient transition-colors">UNESCO Galle Fort</a></li>
              <li><a href="#destinations" className="hover:text-gold-gradient transition-colors">Kandy Sacred Temple</a></li>
              <li><a href="#destinations" className="hover:text-gold-gradient transition-colors">Yala Leopard Range</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6CA85] mb-5">
              Information
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80 font-light">
              <li><a href="#travel-guide" className="hover:text-gold-gradient transition-colors">ETA & Visa Process</a></li>
              <li><a href="#travel-guide" className="hover:text-gold-gradient transition-colors">Monsoon Best Seasons</a></li>
              <li><a href="#travel-guide" className="hover:text-gold-gradient transition-colors">Currency & LKR Guide</a></li>
              <li><a href="#travel-guide" className="hover:text-gold-gradient transition-colors">Scenic Train Booking</a></li>
              <li><a href="#travel-guide" className="hover:text-gold-gradient transition-colors">Emergency Hotlines</a></li>
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
            <span className="text-[#C5A059] font-bold">SLTDA REGISTRATION: SLTDA/SQA/TA/2026/089</span>
            <span>•</span>
            <span>24/7 COLOMBO HOTLINE: +94 11 234 5678</span>
            <span>•</span>
            <span>IATA & PATA ACCREDITED</span>
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
