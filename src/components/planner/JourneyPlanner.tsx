import React, { useState } from 'react';
import { getCustomItinerary } from '../../data/itineraries';
import type { GeneratedItinerary } from '../../types/travel';
import { Sparkles, Check, BookmarkCheck, ArrowRight, Printer, Hotel, Compass, Calendar, MapPin, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const INTERESTS = [
  { id: 'BEACH', label: 'BEACH & SURF', icon: '🏖️' },
  { id: 'WILDLIFE', label: 'WILDLIFE & SAFARI', icon: '🐆' },
  { id: 'CULTURE', label: 'ANCIENT CULTURE', icon: '🏛️' },
  { id: 'MOUNTAINS', label: 'TEA & HIGHLANDS', icon: '⛰️' },
  { id: 'FOOD', label: 'CEYLON GASTRONOMY', icon: '🍛' },
  { id: 'ADVENTURE', label: 'TRAINS & HIKING', icon: '🧗' },
  { id: 'RELAXATION', label: 'AYURVEDA & LUXURY', icon: '🌿' },
];

const DURATIONS = [
  { days: 3, label: '3 Days', desc: 'Express Stopover' },
  { days: 7, label: '7 Days', desc: 'Classic Essential' },
  { days: 10, label: '10 Days', desc: 'Ocean & Safari' },
  { days: 14, label: '14 Days', desc: 'Grand Odyssey' },
];

export const JourneyPlanner: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['BEACH', 'CULTURE', 'MOUNTAINS']);
  const [saved, setSaved] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const itinerary: GeneratedItinerary = getCustomItinerary(selectedDuration, selectedInterests);

  const handleSaveItinerary = () => {
    setSaved(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#C5A059', '#F3EFE6', '#20637A', '#1B382B', '#E6CA85']
    });
    setTimeout(() => setSaved(false), 4000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `SERENDIB ${itinerary.duration}-Day Expedition: ${itinerary.themeTitle}`,
        text: itinerary.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="planner" className="relative py-32 sm:py-40 bg-[#08090C] text-[#F3EFE6] overflow-hidden border-t border-[#C5A059]/20">
      
      {/* Background Decorative Radiant Glows */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#C5A059]/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-[#193746]/25 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono tracking-[0.25em] uppercase mb-6 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Interactive Expedition Architect</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Build Your <span className="italic font-normal text-gold-gradient font-serif">Sri Lanka Odyssey.</span>
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5]/80 leading-relaxed font-light">
            Select your journey duration and passions to craft a bespoke, day-by-day expedition route across the emerald isle.
          </p>
        </div>

        {/* Step 1 & 2 Controls Container */}
        <div className="bg-gradient-to-b from-[#13161C]/90 to-[#0C0E12]/95 border border-[#C5A059]/20 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl backdrop-blur-xl space-y-10">
          
          {/* Duration Selector */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <label className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Step 01 // Select Trip Duration
              </label>
              <span className="font-mono text-[11px] text-white/40">
                {selectedDuration} Days Chosen
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {DURATIONS.map((dur) => {
                const isActive = selectedDuration === dur.days;
                return (
                  <button
                    key={dur.days}
                    onClick={() => setSelectedDuration(dur.days)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-500 cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-to-br from-[#E6CA85] to-[#C5A059] border-[#E6CA85] text-[#0C0D0E] font-bold shadow-[0_10px_30px_rgba(197,160,89,0.3)] scale-[1.02]'
                        : 'bg-white/5 border-white/10 text-white hover:border-[#C5A059]/50 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="font-serif text-3xl block mb-1">
                      {dur.label}
                    </span>
                    <span className={`text-xs font-sans tracking-wide ${isActive ? 'text-[#0C0D0E]/90 font-semibold' : 'text-white/60'}`}>
                      {dur.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interests Selector */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <label className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Step 02 // Select Your Island Passions
              </label>
              <span className="font-mono text-[11px] text-white/40">
                {selectedInterests.length} Selected
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-full border text-xs font-sans tracking-wider transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#E6CA85] font-semibold shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span className="text-base">{interest.icon}</span>
                    <span>{interest.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Generated Itinerary Output Showcase */}
        <div className="bg-gradient-to-b from-[#141822]/95 to-[#0B0E14]/95 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-10 print:bg-white print:text-black print:p-0">
          
          {/* Itinerary Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-white/10 gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[#0C0D0E] font-bold bg-gradient-to-r from-[#E6CA85] to-[#C5A059] px-3.5 py-1 rounded-full shadow">
                  {itinerary.duration} DAYS CURATED VOYAGE
                </span>
                <span className="font-sans text-xs text-white/70 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C5A059]" /> Ideal for: {itinerary.idealFor}
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
                {itinerary.themeTitle}
              </h3>
              <p className="font-serif italic text-base sm:text-lg text-[#D8CBB5]/90 mt-3 max-w-3xl leading-relaxed">
                "{itinerary.summary}"
              </p>
            </div>

            {/* Actions: Save, Share & Print */}
            <div className="flex items-center gap-3 shrink-0 print:hidden">
              <button
                onClick={handleShare}
                className="p-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                title={shared ? "Link Copied!" : "Share Itinerary"}
                aria-label="Share Itinerary"
              >
                {shared ? <Check className="w-4 h-4 text-[#4ADE80]" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handlePrint}
                className="p-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                title="Print or Save PDF"
                aria-label="Print or Save PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleSaveItinerary}
                className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  saved
                    ? 'bg-[#1B382B] text-[#78C28A] border border-[#78C28A]'
                    : 'bg-gradient-to-r from-[#E6CA85] to-[#C5A059] hover:from-[#C5A059] hover:to-[#b08b43] text-[#0C0D0E] shadow-[0_10px_25px_rgba(197,160,89,0.3)]'
                }`}
              >
                {saved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Saved to My Trip!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Save This Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Route Flow Ribbon */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-[#E6CA85] uppercase tracking-widest flex-shrink-0 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> EXPEDITION TRAIL:
            </span>
            {itinerary.routeStops.map((stop, i) => (
              <React.Fragment key={i}>
                <span className="font-sans text-xs font-semibold text-white whitespace-nowrap px-3 py-1.5 rounded-lg bg-white/10 border border-white/5 shadow-sm">
                  {stop}
                </span>
                {i < itinerary.routeStops.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Day by Day Cards Sequence */}
          <div className="space-y-6">
            {itinerary.days.map((dayItem, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-7 rounded-2xl bg-[#0B0D11]/90 border border-white/10 hover:border-[#C5A059]/50 transition-all duration-500 shadow-xl"
              >
                {/* Day Marker & Image */}
                <div className="md:col-span-4 relative rounded-xl overflow-hidden min-h-[180px] shadow-lg group">
                  <img
                    src={dayItem.image}
                    alt={dayItem.destination}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-xs font-bold text-[#0C0D0E] bg-gradient-to-r from-[#E6CA85] to-[#C5A059] px-3.5 py-1 rounded-full shadow">
                      {dayItem.day}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-serif text-xl font-normal text-white">
                      {dayItem.destination}
                    </p>
                    <p className="font-sans text-[11px] text-stone-300">
                      {dayItem.region}
                    </p>
                  </div>
                </div>

                {/* Day Schedule Details */}
                <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-2xl font-light text-white mb-4">
                      {dayItem.title}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:bg-white/[0.07] transition-colors">
                        <span className="text-[10px] font-mono text-[#E6CA85] uppercase block font-semibold tracking-wider">
                          🌅 Morning
                        </span>
                        <p className="font-sans text-stone-300 leading-relaxed font-light">{dayItem.morning}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:bg-white/[0.07] transition-colors">
                        <span className="text-[10px] font-mono text-[#E6CA85] uppercase block font-semibold tracking-wider">
                          ☀️ Afternoon
                        </span>
                        <p className="font-sans text-stone-300 leading-relaxed font-light">{dayItem.afternoon}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:bg-white/[0.07] transition-colors">
                        <span className="text-[10px] font-mono text-[#E6CA85] uppercase block font-semibold tracking-wider">
                          🌙 Evening
                        </span>
                        <p className="font-sans text-stone-300 leading-relaxed font-light">{dayItem.evening}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stay Recommendation Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#D8CBB5]/80 gap-2">
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-[#C5A059]" />
                      <span><strong className="text-white">Sanctuary:</strong> {dayItem.stayRecommendation}</span>
                    </div>
                    {dayItem.travelTime && (
                      <span className="font-mono text-[11px] text-stone-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        ⏱ {dayItem.travelTime}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
