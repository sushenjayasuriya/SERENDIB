import React, { useState } from 'react';
import { ArrowUp, Mail, CheckCircle2, Lock } from 'lucide-react';
import { useMedia } from '../../context/MediaContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setIsAdminOpen } = useMedia();

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
    <footer className="relative bg-[#08090A] border-t border-white/10 text-[#F3EFE6] pt-20 pb-12 overflow-hidden">
      
      {/* Subtle Background Watermark Typography */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none select-none opacity-[0.03] whitespace-nowrap text-[18vw] font-display font-black leading-none tracking-widest text-white">
        SRI LANKA
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-display tracking-[0.25em] text-3xl font-bold text-[#F3EFE6]">
                SERENDIB
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            </div>
            <p className="font-serif italic text-lg text-[#D8CBB5]">
              Sri Lanka · The Island Beyond
            </p>
            <p className="font-sans text-sm text-[#D8CBB5]/70 max-w-md leading-relaxed">
              "One island. A thousand journeys." From misty emerald highlands and wild leopard sanctuaries to ancient 2,500-year-old rock kingdoms and warm Indian Ocean surf.
            </p>
            
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#C5A059]">
              <span>7° 52′ 23″ N</span>
              <span>•</span>
              <span>80° 46′ 19″ E</span>
              <span>•</span>
              <span>INDIAN OCEAN</span>
            </div>
          </div>

          {/* Newsletter / Digital Travel Guide Request */}
          <div className="lg:col-span-7 bg-[#121418] border border-white/10 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl" />
            
            <h4 className="font-serif text-2xl text-[#F3EFE6] mb-2">
              Receive the Curated Ceylon Lookbook
            </h4>
            <p className="font-sans text-xs text-[#D8CBB5]/70 mb-6 max-w-lg">
              Get seasonal travel insights, secret train routes, culinary stories, and photography directly to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-3 bg-[#1B382B]/60 border border-[#C5A059]/40 text-[#C5A059] px-5 py-4 rounded-xl">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#C5A059]" />
                <p className="font-sans text-xs">
                  Thank you. The curated Sri Lanka Travel Edition has been sent to your email.
                </p>
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
                    placeholder="Enter your email address"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#C5A059] text-white text-xs pl-11 pr-4 py-3.5 rounded-xl outline-none transition-colors font-sans placeholder:text-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md"
                >
                  Get Travel Guide
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Sitemaps & Socials */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16 border-b border-white/10">
          
          <div>
            <h5 className="font-display text-xs tracking-[0.2em] uppercase text-[#C5A059] mb-5">
              Explore
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80">
              <li><a href="#destinations" className="hover:text-[#C5A059] transition-colors">Destinations</a></li>
              <li><a href="#map" className="hover:text-[#C5A059] transition-colors">Interactive Island Map</a></li>
              <li><a href="#beaches" className="hover:text-[#C5A059] transition-colors">Indian Ocean Beaches</a></li>
              <li><a href="#highlands" className="hover:text-[#C5A059] transition-colors">Highlands & Tea Country</a></li>
              <li><a href="#wildlife" className="hover:text-[#C5A059] transition-colors">Wildlife & Safaris</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs tracking-[0.2em] uppercase text-[#C5A059] mb-5">
              Culture & Soul
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80">
              <li><a href="#heritage" className="hover:text-[#C5A059] transition-colors">2,500 Years of Stories</a></li>
              <li><a href="#food" className="hover:text-[#C5A059] transition-colors">Ceylon Cuisine & Spices</a></li>
              <li><a href="#experiences" className="hover:text-[#C5A059] transition-colors">10 Bucket-List Moments</a></li>
              <li><a href="#regions" className="hover:text-[#C5A059] transition-colors">The 6 Island Regions</a></li>
              <li><a href="#planner" className="hover:text-[#C5A059] transition-colors">Custom Journey Planner</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs tracking-[0.2em] uppercase text-[#C5A059] mb-5">
              Key Destinations
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80">
              <li><a href="#destinations" className="hover:text-[#C5A059] transition-colors">Sigiriya Citadel</a></li>
              <li><a href="#destinations" className="hover:text-[#C5A059] transition-colors">Ella & Nine Arch</a></li>
              <li><a href="#destinations" className="hover:text-[#C5A059] transition-colors">UNESCO Galle Fort</a></li>
              <li><a href="#destinations" className="hover:text-[#C5A059] transition-colors">Kandy Sacred Tooth</a></li>
              <li><a href="#destinations" className="hover:text-[#C5A059] transition-colors">Yala Leopard Park</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs tracking-[0.2em] uppercase text-[#C5A059] mb-5">
              Travel Information
            </h5>
            <ul className="space-y-3 font-sans text-xs text-[#D8CBB5]/80">
              <li><a href="#travel-guide" className="hover:text-[#C5A059] transition-colors">ETA & Visa Process</a></li>
              <li><a href="#travel-guide" className="hover:text-[#C5A059] transition-colors">Monsoons & Best Seasons</a></li>
              <li><a href="#travel-guide" className="hover:text-[#C5A059] transition-colors">Currency & LKR Guide</a></li>
              <li><a href="#travel-guide" className="hover:text-[#C5A059] transition-colors">Scenic Train Booking</a></li>
              <li><a href="#travel-guide" className="hover:text-[#C5A059] transition-colors">Emergency (119 / 1912)</a></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h5 className="font-display text-xs tracking-[0.2em] uppercase text-[#C5A059] mb-5">
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

        {/* Bottom Bar: Copyright, Admin Access & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-white/50">
          <div className="flex items-center gap-3">
            <p>© 2026 SERENDIB · All Rights Reserved. Crafted for Sri Lanka Tourism Showcase.</p>
            <span className="text-white/20">·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 text-white/30 hover:text-[#C5A059] transition-colors cursor-pointer text-[11px]"
              title="Curatorial Media Admin (Press Ctrl+Shift+A)"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-white/30">Ayubowan · ආයුබෝවන් · வணக்கம்</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/70 hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
