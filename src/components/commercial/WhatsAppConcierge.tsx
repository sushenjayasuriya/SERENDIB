import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

interface WhatsAppConciergeProps {
  onOpenConcierge: () => void;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({ onOpenConcierge }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-40 font-sans select-none animate-in fade-in slide-in-from-bottom-6 duration-700">
      {isOpen ? (
        <div className="bg-[#0B0E14] border border-[#C5A059]/40 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] max-w-xs w-80 backdrop-blur-2xl text-[#F3EFE6] space-y-3.5 animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-bold text-xs">
                  LK
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0E14]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-white">Colombo Concierge</h4>
                <p className="font-mono text-[9px] text-emerald-400">Available · Avg. reply 15m</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body message preview */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#D8CBB5]/90 font-light leading-relaxed">
            "Ayubowan! Planning a private journey through Sri Lanka? We assist with bespoke villa bookings, luxury chauffeur-guides, and customized itineraries."
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConcierge();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E6CA85] to-[#C5A059] hover:brightness-110 text-[#08090A] font-sans font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inquire With Concierge</span>
            </button>

            <a
              href="https://wa.me/94770000000?text=Hello%20SERENDIB%20Expeditions,%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20journey%20to%20Sri%20Lanka."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-mono text-[10.5px] tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

        </div>
      ) : (
        /* Floating Trigger Pill */
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0B0E14]/95 border border-[#C5A059]/50 hover:border-[#C5A059] shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl text-white transition-all duration-300 transform hover:scale-105 cursor-pointer"
          title="Chat with Island Concierge"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 text-[#C5A059]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-[#F3E5AB]">
            Concierge
          </span>
        </button>
      )}
    </div>
  );
};
