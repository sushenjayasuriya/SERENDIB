import { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { navigateToSection } from '../../utils/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenPlanner }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  const menuItems = [
    {
      num: '01',
      label: 'Destinations',
      subtitle: '10 Iconic Regions & Royal Citadels',
      path: '/destinations',
      image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02',
      label: 'Interactive Map',
      subtitle: 'Island Vector Cartography & Rail',
      path: '/map',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03',
      label: 'Beaches & Surf',
      subtitle: 'Indian Ocean Coastlines',
      path: '/beaches',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04',
      label: 'Highlands & Tea',
      subtitle: 'Misty Mountains & Blue Train',
      path: '/highlands',
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05',
      label: 'Wildlife Sanctuaries',
      subtitle: 'Leopards, Elephants & Whales',
      path: '/wildlife',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '06',
      label: 'Heritage & Kingdoms',
      subtitle: '2,500 Years of Stories',
      path: '/heritage',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '07',
      label: 'Taste the Island',
      subtitle: 'Ceylon Spices & Night Street Rhapsody',
      path: '/cuisine',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '08',
      label: 'Bucket-List Moments',
      subtitle: '10 Things Worth Crossing an Ocean For',
      path: '/experiences',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '09',
      label: 'Travel Guide',
      subtitle: 'Visas, Monsoons, Currency & Hotlines',
      path: '/guide',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80'
    }
  ];

  if (!isOpen) return null;

  const handleItemClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onClose();
    navigateToSection(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0C0D0E] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      
      {/* Dynamic Background Image Preview (Desktop/Tablet) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 overflow-hidden">
        {hoveredIdx !== null && (
          <img
            src={menuItems[hoveredIdx].image}
            alt="Preview"
            className="w-full h-full object-cover scale-105 transition-transform duration-1000 blur-xs"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0E] via-[#0C0D0E]/80 to-[#0C0D0E]/60" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 px-6 py-6 flex items-center justify-between border-b border-white/10">
        <div
          onClick={(e) => handleItemClick(e, '/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="font-display tracking-[0.25em] text-xl font-bold text-[#F3EFE6]">
            SERENDIB
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Navigation List */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">
        <div className="space-y-4 max-w-xl mx-auto">
          {menuItems.map((item, idx) => (
            <a
              key={item.num}
              href={item.path}
              onClick={(e) => handleItemClick(e, item.path)}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="group flex items-baseline justify-between border-b border-white/5 pb-3 transition-all duration-300 hover:border-[#C5A059]/40 cursor-pointer"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-[#C5A059]/60 group-hover:text-[#C5A059]">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFE6] group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all duration-300">
                    {item.label}
                  </h3>
                  <p className="font-sans text-[11px] text-[#D8CBB5]/60 group-hover:text-[#D8CBB5]/90">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom CTA & Footer */}
      <div className="relative z-10 px-6 py-6 border-t border-white/10 bg-[#0C0D0E]/90 backdrop-blur-md">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenPlanner();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C5A059] text-[#0C0D0E] font-sans font-semibold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:bg-[#b08b43] transition-all shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Your Journey</span>
          </button>
          <div className="text-center sm:text-right">
            <p className="font-serif italic text-xs text-[#D8CBB5]/80">"One island. A thousand journeys."</p>
            <p className="font-sans text-[10px] text-white/40 tracking-wider">SRI LANKA · INDIAN OCEAN</p>
          </div>
        </div>
      </div>
    </div>
  );
};
