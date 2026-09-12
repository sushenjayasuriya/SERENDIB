import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send
} from 'lucide-react';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestination?: string;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({
  isOpen,
  onClose,
  selectedDestination
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'United States',
    travelers: '2 Adults',
    duration: '7–10 Days',
    season: 'Dec–Apr (High Season / South Coast)',
    tier: 'Signature Luxury ($450–$750/day)',
    transport: 'Private Chauffeur-Guide (Mercedes/Prado)',
    interests: ['Tea Estates & Hills', 'UNESCO Citadels', 'Leopard Safari'],
    specialRequests: selectedDestination ? `Inquiry focused on bespoke exploration of ${selectedDestination}.` : '',
    currency: 'USD'
  });

  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SRN-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setStep('success');
  };

  const toggleInterest = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0A0C10] border border-[#C5A059]/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-[#F3EFE6]">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-white/10 bg-[#0F1218] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                  SERENDIB BESPOKE CONCIERGE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#F3E5AB] font-mono text-[9px]">
                  SLTDA LICENSED #2026/089
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-normal text-white">
                Request a Curated Sri Lanka Expedition
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0A0C10]">
          
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Introduction Callout */}
              <div className="p-4 rounded-2xl bg-[#141720] border border-white/10 flex items-start gap-3 text-xs text-[#D8CBB5]/80 leading-relaxed font-light">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <p>
                  Every SERENDIB private journey includes a dedicated English-speaking chauffeur-guide, luxury private vehicles, handpicked boutique heritage properties, VIP airport arrival handling, and 24/7 on-island concierge assistance.
                </p>
              </div>

              {/* Traveler Details */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#C5A059] font-semibold">
                  1. Traveler & Contact Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Lord & Lady Hamilton"
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. reservations@domain.com"
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Country of Residence</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. United Kingdom"
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Journey Specifications */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#C5A059] font-semibold">
                  2. Expedition Parameters & Comfort Tier
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Party Size</label>
                    <select
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2.5 text-white text-xs outline-none font-sans cursor-pointer"
                    >
                      <option>1 Traveler (Solo Bespoke)</option>
                      <option>2 Adults (Couples Luxury)</option>
                      <option>Family (3–5 Guests)</option>
                      <option>Private Group (6+ Guests)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Duration</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2.5 text-white text-xs outline-none font-sans cursor-pointer"
                    >
                      <option>3–5 Days (Highlights)</option>
                      <option>7–10 Days (Signature Grand Tour)</option>
                      <option>12–14 Days (Complete Immersion)</option>
                      <option>15+ Days (Extended Private Estate)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Preferred Travel Window</label>
                    <select
                      value={formData.season}
                      onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2.5 text-white text-xs outline-none font-sans cursor-pointer"
                    >
                      <option>Dec–Apr (High Season / South Coast)</option>
                      <option>May–Sep (East Coast / Pigeon Island)</option>
                      <option>Oct–Nov (Lush Shoulder Season)</option>
                      <option>Flexible Dates (Best Weather Route)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Accommodation Class</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2.5 text-white text-xs outline-none font-sans cursor-pointer"
                    >
                      <option>Signature Luxury ($450–$750/day)</option>
                      <option>Ultra-Luxe & Relais & Châteaux ($800–$1,500/day)</option>
                      <option>Private Tea Bungalows & Villas ($1,500+/day)</option>
                      <option>Curated Boutique Heritage ($300–$450/day)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">Ground & Air Transport</label>
                    <select
                      value={formData.transport}
                      onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                      className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2.5 text-white text-xs outline-none font-sans cursor-pointer"
                    >
                      <option>Private Chauffeur-Guide (Mercedes/Prado)</option>
                      <option>Luxury SUV & Scenic Train 1st Class</option>
                      <option>Helicopter Transfers & Luxury Chauffeur</option>
                      <option>Luxury VIP Mercedes Sprinter (Groups)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bespoke Interest Tags */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-semibold">
                  3. Key Curatorial Passions (Select All That Apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'UNESCO Citadels & Sigiriya',
                    'Tea Estates & Ceylon Rails',
                    'Wild Leopard & Elephant Safaris',
                    'Blue Whale Deep Expeditions',
                    'Geoffrey Bawa Architectural Heritage',
                    'Ayurvedic Wellness & Yoga Spas',
                    'Private Spice Gardens & Cooking',
                    'Surfing & Coastal Coves'
                  ].map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer border ${
                        formData.interests.includes(interest)
                          ? 'bg-[#C5A059] border-[#C5A059] text-black font-semibold shadow-md'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <label className="block text-[11px] font-mono text-white/60 uppercase">
                  Specific Requests, Dietary Preferences or Desired Milestones
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Celebrating 25th anniversary, require gluten-free meals, wish to arrange private tea tasting with resident master..."
                  className="w-full bg-[#12151D] border border-white/15 focus:border-[#C5A059] rounded-xl p-3 text-white text-xs outline-none font-sans leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-white/50">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Guaranteed response within 12 hours from Colombo</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E6CA85] via-[#C5A059] to-[#b08b43] hover:brightness-110 text-[#08090A] font-sans font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_4px_25px_rgba(197,160,89,0.4)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Bespoke Request</span>
                </button>
              </div>

            </form>
          ) : (
            /* Success Confirmation Screen */
            <div className="py-12 px-4 text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(197,160,89,0.35)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] block font-bold mb-1">
                  Bespoke Inquiry Received
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  Ayubowan, {formData.fullName || 'Guest'}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#141720] border border-[#C5A059]/30 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Reservation Reference:</span>
                  <span className="text-[#C5A059] font-bold">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Party Size:</span>
                  <span className="text-white">{formData.travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Duration & Season:</span>
                  <span className="text-white">{formData.duration} ({formData.season.split(' ')[0]})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Assigned Specialist:</span>
                  <span className="text-[#E6CA85]">Colombo Head Curator</span>
                </div>
              </div>

              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Your expedition parameters have been transmitted to our Colombo headquarters. A Senior Sri Lanka Travel Specialist will formulate your customized itinerary with private villa availability within 12 hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Return to Island Guide
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
