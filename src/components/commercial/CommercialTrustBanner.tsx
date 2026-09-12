import React from 'react';
import { Compass, Award, Leaf, PhoneCall } from 'lucide-react';

export const CommercialTrustBanner: React.FC = () => {
  return (
    <section className="relative py-12 bg-[#060709] border-y border-[#C5A059]/15 text-[#F3EFE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center">
          
          {/* Badge 1: Authentic Independent Curation */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass-obsidian border border-white/10 hover:border-[#C5A059]/40 transition-all group">
            <div className="p-2.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059] group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#C5A059] block font-bold">
                Field Research
              </span>
              <p className="font-sans font-medium text-xs sm:text-sm text-white">
                Authentic Curation
              </p>
              <span className="font-mono text-[9px] text-white/50 block">9 Provinces Surveyed</span>
            </div>
          </div>

          {/* Badge 2: 24/7 Island Concierge */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass-obsidian border border-white/10 hover:border-[#C5A059]/40 transition-all group">
            <div className="p-2.5 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#38BDF8] block font-bold">
                Local Guidance
              </span>
              <p className="font-sans font-medium text-xs sm:text-sm text-white">
                24/7 Island Support
              </p>
              <span className="font-mono text-[9px] text-white/50 block">Direct WhatsApp Concierge</span>
            </div>
          </div>

          {/* Badge 3: Curatorial Excellence */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass-obsidian border border-white/10 hover:border-[#C5A059]/40 transition-all group">
            <div className="p-2.5 rounded-xl bg-[#E6CA85]/15 text-[#E6CA85] group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#E6CA85] block font-bold">
                Luxury Standard
              </span>
              <p className="font-sans font-medium text-xs sm:text-sm text-white">
                Bespoke Itineraries
              </p>
              <span className="font-mono text-[9px] text-white/50 block">100% Tailored Routes</span>
            </div>
          </div>

          {/* Badge 4: Carbon-Neutral Sustainability */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass-obsidian border border-white/10 hover:border-[#C5A059]/40 transition-all group">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-400 block font-bold">
                Responsible Travel
              </span>
              <p className="font-sans font-medium text-xs sm:text-sm text-white">
                Conservation Pledge
              </p>
              <span className="font-mono text-[9px] text-white/50 block">Sinharaja Rainforest Fund</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
