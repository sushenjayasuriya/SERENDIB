import type { Destination } from '../../types/travel';
import { X, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTrip: (destinationName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanTrip
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#121418] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/40 to-black/60" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-6 right-6 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title Information */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-[#C5A059] bg-[#C5A059]/20 px-2.5 py-0.5 rounded-full border border-[#C5A059]/40">
                  {destination.number}
                </span>
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#D8CBB5]">
                  {destination.region}
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-wider">
                {destination.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-white/70">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>
                {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <div>
              <span className="text-white/40 uppercase tracking-widest block text-[10px] mb-1">Climate</span>
              <span className="font-semibold text-white">{destination.climate}</span>
            </div>
            <div>
              <span className="text-white/40 uppercase tracking-widest block text-[10px] mb-1">Elevation</span>
              <span className="font-semibold text-white">{destination.elevation}</span>
            </div>
            <div>
              <span className="text-white/40 uppercase tracking-widest block text-[10px] mb-1">Ideal Stay</span>
              <span className="font-semibold text-white">{destination.recommendedStay}</span>
            </div>
            <div>
              <span className="text-white/40 uppercase tracking-widest block text-[10px] mb-1">Vibe</span>
              <span className="font-semibold text-[#C5A059] uppercase">{destination.tags.join(' • ')}</span>
            </div>
          </div>

          {/* Description & Story */}
          <div>
            <h4 className="font-serif italic text-xl text-[#C5A059] mb-3">
              "{destination.tagline}"
            </h4>
            <p className="font-sans text-sm sm:text-base text-[#D8CBB5] leading-relaxed">
              {destination.description}
            </p>
            {destination.culturalSignificance && (
              <p className="mt-3 font-sans text-xs sm:text-sm text-white/60 italic border-l-2 border-[#C5A059] pl-4">
                {destination.culturalSignificance}
              </p>
            )}
          </div>

          {/* Key Highlights */}
          <div>
            <h5 className="font-display text-xs tracking-[0.2em] uppercase text-white mb-4">
              Curated Highlights & Experiences
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.keyHighlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-[#F3EFE6] leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Known For Badges */}
          <div>
            <h5 className="font-display text-xs tracking-[0.2em] uppercase text-white mb-3">
              Iconic Attractions
            </h5>
            <div className="flex flex-wrap gap-2">
              {destination.bestKnownFor.map((item, i) => (
                <span
                  key={i}
                  className="font-sans text-xs px-3 py-1.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-white/10 bg-[#0C0D0E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D8CBB5]/60">
              EXPLORE SRI LANKA WITH SERENDIB
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-xs font-sans font-medium text-white hover:bg-white/10 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onPlanTrip(destination.name);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-all shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add to Itinerary</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
