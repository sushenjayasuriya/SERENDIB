import React, { useState } from 'react';
import { travelGuideTopics } from '../../data/travelGuide';
import { ChevronDown, ChevronUp, Sun, FileCheck, Coins, Languages, Train, Clock, ShieldAlert, Calculator, ArrowRightLeft } from 'lucide-react';

export const PracticalGuide: React.FC = () => {
  const [openTopicId, setOpenTopicId] = useState<string>(travelGuideTopics[0].id);
  
  // Interactive Currency Estimator state
  const [amount, setAmount] = useState<number>(100);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  const rates: Record<string, number> = {
    USD: 305.5,
    EUR: 332.0,
    GBP: 395.0,
  };

  const convertedLKR = Math.round(amount * rates[currency]).toLocaleString();

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-[#C5A059]" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-[#C5A059]" />;
      case 'Coins': return <Coins className="w-5 h-5 text-[#C5A059]" />;
      case 'Languages': return <Languages className="w-5 h-5 text-[#C5A059]" />;
      case 'Train': return <Train className="w-5 h-5 text-[#C5A059]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[#C5A059]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#C5A059]" />;
      default: return <Sun className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <section id="travel-guide" className="relative py-28 sm:py-36 bg-[#08090C] text-[#F3EFE6] overflow-hidden border-t border-white/10">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#193746]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C5A059]">
              PRACTICAL COMPENDIUM
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Essential <span className="italic font-normal text-[#C5A059]">travel guidance.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
            Everything you need for seamless entry, seasonal monsoons, high-speed rail reservations, and emergency assistance.
          </p>
        </div>

        {/* Currency Quick-Converter Widget */}
        <div className="mb-16 bg-[#121418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#C5A059] font-mono text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Currency Exchange Estimator</span>
              </div>
              <h3 className="font-serif text-2xl text-white">
                Sri Lankan Rupee (LKR) Conversion
              </h3>
              <p className="font-sans text-[11px] text-white/50">
                Indicative rate: 1 USD ≈ 305 LKR (subject to daily market fluctuations)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 gap-2">
                <input
                  type="number"
                  min="1"
                  aria-label="Currency amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-24 bg-transparent text-white font-mono text-lg font-bold px-2 py-1 outline-none text-right"
                />
                <select
                  value={currency}
                  aria-label="Select currency"
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="bg-black/60 border border-white/15 text-[#C5A059] font-mono text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <ArrowRightLeft className="w-4 h-4 text-white/40" />

              <div className="bg-[#C5A059]/15 border border-[#C5A059]/30 rounded-2xl px-5 py-3">
                <span className="text-[10px] font-mono uppercase text-[#C5A059] block">Estimated LKR</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F3EFE6]">
                  ₨ {convertedLKR} <span className="text-xs text-[#C5A059]">LKR</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Accordion Topics */}
        <div className="space-y-4">
          {travelGuideTopics.map((topic) => {
            const isOpen = openTopicId === topic.id;
            return (
              <div
                key={topic.id}
                className="bg-[#121418] border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenTopicId(isOpen ? '' : topic.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                        {topic.title}
                      </h4>
                      <p className="font-sans text-xs text-[#D8CBB5]/70 mt-0.5">
                        {topic.shortSummary}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 rounded-full bg-white/5 text-white/60">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#C5A059]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-6 animate-in fade-in duration-300">
                    <p className="font-sans text-sm text-[#D8CBB5] leading-relaxed">
                      {topic.content}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topic.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1"
                        >
                          <span className="font-mono text-[10px] text-[#C5A059] uppercase block tracking-wider">
                            {detail.label}
                          </span>
                          <span className="font-sans text-xs text-white/90 font-medium">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
