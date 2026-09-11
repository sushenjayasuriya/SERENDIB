import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import type { CulinaryDish } from '../../types/travel';
import { Coffee } from 'lucide-react';

export const CulinaryExplorer: React.FC = () => {
  const { culinaryDishes } = useMedia();
  const [selectedDish, setSelectedDish] = useState<CulinaryDish>(culinaryDishes[0]);

  return (
    <section id="food" className="relative py-28 sm:py-36 bg-[#0E0C0A] text-[#F3EFE6] overflow-hidden border-t border-white/10">
      
      {/* Warm Terracotta & Cinnamon Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#A64B2A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C5A059]">
              CEYLON SPICE & STREET RHAPSODY
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Taste the <span className="italic font-normal text-[#C5A059]">island.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
            Where freshly scraped coconut, pure Ceylon cinnamon, hand-roasted curry powders, and aromatic pandan leaves transform every meal into an unforgettable sensory feast.
          </p>
        </div>

        {/* Interactive Food Showcase Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-[#16120E] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Active Dish Large Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[440px] group">
            <img
              key={selectedDish.id}
              src={selectedDish.image}
              alt={selectedDish.name}
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="font-mono text-xs text-[#C5A059] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {selectedDish.sinhalaName}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60 block">
                ICONIC ISLAND SPECIALTY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {selectedDish.name}
              </h3>
            </div>
          </div>

          {/* Active Dish Narrative & Flavors */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="font-serif italic text-xl text-[#C5A059] mb-2">
                "{selectedDish.tagline}"
              </p>
              <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
                {selectedDish.description}
              </p>
            </div>

            {/* Flavor Notes */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                Flavor Characteristics:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDish.flavorProfile.map((flv, i) => (
                  <span
                    key={i}
                    className="font-sans text-xs px-3 py-1.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30"
                  >
                    {flv}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Ingredients */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 block mb-2">
                Key Spices & Ingredients:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDish.keyIngredients.map((ing, i) => (
                  <span
                    key={i}
                    className="font-sans text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/90"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Pairing */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
              <Coffee className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
              <p className="font-sans text-xs text-white/80">
                <strong className="text-[#C5A059]">Perfect Pairing:</strong> {selectedDish.pairing}
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
                className={`group relative rounded-2xl overflow-hidden border p-4 text-left transition-all duration-300 cursor-pointer min-h-[160px] flex flex-col justify-end ${
                  isSelected
                    ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-lg'
                    : 'border-white/10 bg-[#14100C] hover:border-white/30'
                }`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A] via-[#0E0C0A]/80 to-transparent" />

                <div className="relative z-10">
                  <span className="font-mono text-[9px] text-[#C5A059] block">
                    {dish.sinhalaName}
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-[#C5A059] transition-colors leading-tight">
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
