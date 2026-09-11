import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { CulinaryDish } from '../../types/travel';
import { Coffee, Flame, Sparkles } from 'lucide-react';

export const CulinaryExplorer: React.FC = () => {
  const { culinaryDishes } = useMedia();
  const [selectedDish, setSelectedDish] = useState<CulinaryDish>(culinaryDishes[0]);

  return (
    <section id="food" className="relative py-28 sm:py-36 bg-[#0A0806] text-[#F3EFE6] overflow-hidden border-t border-white/5">
      
      {/* Warm Terracotta & Cinnamon Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#C85A32]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#C5A059]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1.5px] bg-gradient-to-r from-[#C5A059] to-transparent" />
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#F3E5AB] font-bold">
              CEYLON SPICE & STREET RHAPSODY
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Taste the <span className="italic font-normal text-gold-gradient font-playfair">island.</span>
          </h2>
          <p className="font-outfit text-sm sm:text-base text-[#D8CBB5] leading-relaxed font-light">
            Where freshly scraped coconut, pure Ceylon cinnamon, hand-roasted curry powders, and aromatic pandan leaves transform every clay-pot meal into an unforgettable sensory feast.
          </p>
        </div>

        {/* Interactive Food Showcase Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 glass-obsidian border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Active Dish Large Image with Wispy Steam Accent */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[460px] group border border-white/10 shadow-xl">
            <img
              key={selectedDish.id}
              src={selectedDish.image}
              alt={selectedDish.name}
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806] via-[#0A0806]/40 to-transparent" />
            
            {/* Animated Steam Plume Accent */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none opacity-40">
              <div className="w-24 h-24 bg-white/20 rounded-full blur-xl animate-steam" />
            </div>

            <div className="absolute top-4 left-4">
              <span className="font-mono text-xs text-[#F3E5AB] bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 font-bold">
                {selectedDish.sinhalaName}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] block mb-1 font-bold">
                ICONIC CEYLON SPECIALTY
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white drop-shadow-md">
                {selectedDish.name}
              </h3>
            </div>
          </div>

          {/* Active Dish Narrative & Flavors */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="font-serif italic text-xl sm:text-2xl text-gold-gradient font-light mb-2">
                "{selectedDish.tagline}"
              </p>
              <p className="font-outfit text-sm sm:text-base text-[#D8CBB5] leading-relaxed font-light">
                {selectedDish.description}
              </p>
            </div>

            {/* Flavor Characteristics */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] block mb-2 font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
                Flavor Profile:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDish.flavorProfile.map((flv, i) => (
                  <span
                    key={i}
                    className="font-outfit text-xs px-3.5 py-1.5 rounded-full glass-gold text-[#F3E5AB] border border-[#C5A059]/40 font-medium"
                  >
                    {flv}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Ingredients */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/70 block mb-2 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                Artisanal Key Ingredients:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDish.keyIngredients.map((ing, i) => (
                  <span
                    key={i}
                    className="font-outfit text-xs px-3 py-1 rounded-xl glass-obsidian border border-white/15 text-white/90 font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Pairing */}
            <div className="p-4 rounded-2xl glass-obsidian border border-[#C5A059]/30 flex items-center gap-3.5 shadow-lg">
              <Coffee className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
              <p className="font-outfit text-xs text-white/90 leading-relaxed font-light">
                <strong className="text-[#F3E5AB] font-bold">Perfect Island Pairing:</strong> {selectedDish.pairing}
              </p>
            </div>

          </div>

        </div>

        {/* 8 Dish Interactive Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {culinaryDishes.map((dish) => {
            const isSelected = dish.id === selectedDish.id;
            return (
              <button
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className={`group relative rounded-3xl overflow-hidden border p-4 text-left transition-all duration-300 cursor-pointer min-h-[170px] flex flex-col justify-end shadow-xl ${
                  isSelected
                    ? 'border-[#C5A059] bg-[#C5A059]/15 shadow-[0_0_25px_rgba(197,160,89,0.3)] scale-[1.02]'
                    : 'border-white/10 glass-obsidian hover:border-white/30 hover:-translate-y-1'
                }`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-70 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806] via-[#0A0806]/85 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <span className="font-mono text-[9.5px] text-[#F3E5AB] font-semibold block">
                    {dish.sinhalaName}
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-gold-gradient transition-colors leading-tight">
                    {dish.name.split('(')[0]}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

