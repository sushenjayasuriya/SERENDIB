import React, { useState } from 'react';
import { travelGuideTopics } from '../../data/travelGuide';
import { ChevronDown, ChevronUp, Sun, FileCheck, Coins, Languages, Train, Clock, ShieldAlert, Calculator, ArrowRightLeft, PhoneCall, Sparkles } from 'lucide-react';

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
    <section id="travel-guide" className="relative py-32 sm:py-40 bg-[#07080B] text-[#F3EFE6] overflow-hidden border-t border-[#C5A059]/20">
      
      {/* Background Radiant Glows */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#193746]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#C5A059]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono tracking-[0.25em] uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Practical Compendium</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Essential <span className="italic font-normal text-gold-gradient font-serif">Island Intel.</span>
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5]/80 leading-relaxed font-light">
            Everything for effortless passage — visa formalities, monsoon cycles, high-speed rail reservations, and 24/7 tourist assistance.
          </p>
        </div>

        {/* Emergency Hotlines Strip */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0F1410] border border-[#234B36] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <div>
                <span className="font-mono text-[10px] text-[#4ADE80] uppercase tracking-wider block">Tourist Police Helpline</span>
                <span className="font-serif text-lg font-normal text-white">Dial 1912</span>
              </div>
            </div>
            <a href="tel:1912" className="p-2 rounded-full bg-[#234B36]/60 text-[#4ADE80] hover:bg-[#234B36]">
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#14100E] border border-[#59301A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
              <div>
                <span className="font-mono text-[10px] text-[#F59E0B] uppercase tracking-wider block">Suwa Seriya Free Ambulance</span>
                <span className="font-serif text-lg font-normal text-white">Dial 1990</span>
              </div>
            </div>
            <a href="tel:1990" className="p-2 rounded-full bg-[#59301A]/60 text-[#F59E0B] hover:bg-[#59301A]">
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#101217] border border-[#1E3A5F] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <div>
                <span className="font-mono text-[10px] text-[#38BDF8] uppercase tracking-wider block">National Emergency Police</span>
                <span className="font-serif text-lg font-normal text-white">Dial 119</span>
              </div>
            </div>
            <a href="tel:119" className="p-2 rounded-full bg-[#1E3A5F]/60 text-[#38BDF8] hover:bg-[#1E3A5F]">
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Currency Quick-Converter Widget */}
        <div className="mb-14 bg-gradient-to-b from-[#13161F]/90 to-[#0A0C10]/95 border border-[#C5A059]/25 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#E6CA85] font-mono text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-[#C5A059]" />
                <span>Currency Exchange Estimator</span>
              </div>
              <h3 className="font-serif text-2xl text-white font-light">
                Sri Lankan Rupee (LKR) Valuation
              </h3>
              <p className="font-sans text-[11px] text-stone-400">
                Indicative bank rate: 1 USD ≈ 305.50 LKR (live market estimate)
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
                  className="bg-black/60 border border-white/15 text-[#E6CA85] font-mono text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <ArrowRightLeft className="w-4 h-4 text-white/40" />

              <div className="bg-[#C5A059]/15 border border-[#C5A059]/40 rounded-2xl px-6 py-3 shadow-inner">
                <span className="text-[10px] font-mono uppercase text-[#E6CA85] block tracking-wider">Estimated LKR</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-gold-gradient">
                  ₨ {convertedLKR} <span className="text-xs text-[#E6CA85]">LKR</span>
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
                className={`border rounded-2xl overflow-hidden transition-all duration-500 backdrop-blur-xl ${
                  isOpen 
                    ? 'bg-[#11141B]/95 border-[#C5A059]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                    : 'bg-[#0E1015]/80 border-white/10 hover:border-white/25'
                }`}
              >
                <button
                  onClick={() => setOpenTopicId(isOpen ? '' : topic.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl font-normal text-white">
                        {topic.title}
                      </h4>
                      <p className="font-sans text-xs text-[#D8CBB5]/70 mt-0.5 font-light">
                        {topic.shortSummary}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-full bg-white/5 border border-white/5 text-white/60">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#C5A059]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-6 animate-in fade-in duration-300">
                    <p className="font-sans text-sm text-[#D8CBB5]/90 leading-relaxed font-light">
                      {topic.content}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topic.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 hover:bg-white/[0.06] transition-colors"
                        >
                          <span className="font-mono text-[10px] text-[#E6CA85] uppercase block tracking-wider font-semibold">
                            {detail.label}
                          </span>
                          <span className="font-sans text-xs text-stone-200 font-normal">
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
