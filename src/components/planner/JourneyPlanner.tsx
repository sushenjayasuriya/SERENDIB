import React, { useState } from 'react';
import { getCustomItinerary } from '../../data/itineraries';
import type { GeneratedItinerary } from '../../types/travel';
import { Sparkles, Check, BookmarkCheck, ArrowRight, Printer, Hotel } from 'lucide-react';
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

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const itinerary: GeneratedItinerary = getCustomItinerary(selectedDuration, selectedInterests);

  const handleSaveItinerary = () => {
    setSaved(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#C5A059', '#F3EFE6', '#20637A', '#1B382B']
    });
    setTimeout(() => setSaved(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="planner" className="relative py-28 sm:py-36 bg-[#090B0E] text-[#F3EFE6] overflow-hidden border-t border-white/10">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#193746]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C5A059]">
              CUSTOM TRIP ARCHITECT
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F3EFE6] tracking-tight mb-6">
            Build your <span className="italic font-normal text-[#C5A059]">Sri Lanka.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
            Select your journey duration and personal passions to generate a handcrafted day-by-day expedition route across the island.
          </p>
        </div>

        {/* Step 1 & 2 Controls */}
        <div className="bg-[#121418] border border-white/10 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl space-y-8">
          
          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-4">
              Step 01 // Select Trip Duration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {DURATIONS.map((dur) => {
                const isActive = selectedDuration === dur.days;
                return (
                  <button
                    key={dur.days}
                    onClick={() => setSelectedDuration(dur.days)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#C5A059] border-[#C5A059] text-[#0C0D0E] font-bold shadow-lg shadow-[#C5A059]/20'
                        : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                    }`}
                  >
                    <span className="font-display text-2xl block mb-1">
                      {dur.label}
                    </span>
                    <span className={`text-[11px] font-sans ${isActive ? 'text-[#0C0D0E]/80 font-medium' : 'text-white/50'}`}>
                      {dur.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interests Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-4">
              Step 02 // Select Your Passions
            </label>
            <div className="flex flex-wrap gap-2.5">
              {INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-sans tracking-wider transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] font-semibold'
                        : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{interest.icon}</span>
                    <span>{interest.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Generated Itinerary Output Showcase */}
        <div className="bg-[#14171E] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10">
          
          {/* Itinerary Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-white/10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-[#C5A059] bg-[#C5A059]/15 px-3 py-0.5 rounded-full border border-[#C5A059]/30">
                  {itinerary.duration} DAYS CURATED ITINERARY
                </span>
                <span className="font-sans text-xs text-white/60">
                  Ideal for: {itinerary.idealFor}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
                {itinerary.themeTitle}
              </h3>
              <p className="font-serif italic text-base sm:text-lg text-[#D8CBB5] mt-2 max-w-3xl">
                "{itinerary.summary}"
              </p>
            </div>

            {/* Actions: Save & Print */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                title="Print or Save PDF"
                aria-label="Print or Save PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleSaveItinerary}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  saved
                    ? 'bg-[#1B382B] text-[#78C28A] border border-[#78C28A]'
                    : 'bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] shadow-lg shadow-[#C5A059]/20'
                }`}
              >
                {saved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Saved to Trip!</span>
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
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest flex-shrink-0">
              EXPEDITION ROUTE:
            </span>
            {itinerary.routeStops.map((stop, i) => (
              <React.Fragment key={i}>
                <span className="font-sans text-xs font-semibold text-white whitespace-nowrap px-2.5 py-1 rounded-md bg-white/10">
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
                className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl bg-[#0D0F13] border border-white/10 hover:border-[#C5A059]/40 transition-colors"
              >
                {/* Day Marker & Image */}
                <div className="md:col-span-4 relative rounded-xl overflow-hidden min-h-[160px]">
                  <img
                    src={dayItem.image}
                    alt={dayItem.destination}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-xs font-bold text-[#0C0D0E] bg-[#C5A059] px-3 py-1 rounded-full shadow">
                      {dayItem.day}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <p className="font-display text-lg font-bold text-white">
                      {dayItem.destination}
                    </p>
                    <p className="font-sans text-[10px] text-white/70">
                      {dayItem.region}
                    </p>
                  </div>
                </div>

                {/* Day Schedule Details */}
                <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-xl font-normal text-white mb-3">
                      {dayItem.title}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono text-[#C5A059] uppercase block font-semibold">Morning</span>
                        <p className="font-sans text-white/80 leading-relaxed">{dayItem.morning}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono text-[#C5A059] uppercase block font-semibold">Afternoon</span>
                        <p className="font-sans text-white/80 leading-relaxed">{dayItem.afternoon}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono text-[#C5A059] uppercase block font-semibold">Evening</span>
                        <p className="font-sans text-white/80 leading-relaxed">{dayItem.evening}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stay Recommendation Footer */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#D8CBB5]/80 gap-2">
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-[#C5A059]" />
                      <span><strong>Recommended Stay:</strong> {dayItem.stayRecommendation}</span>
                    </div>
                    {dayItem.travelTime && (
                      <span className="font-mono text-[11px] text-white/50">
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
