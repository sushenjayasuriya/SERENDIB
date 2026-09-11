import { Compass } from 'lucide-react';

export const EditorialIntro = () => {
  const stats = [
    {
      value: '65,610',
      unit: 'km²',
      label: 'Island Area',
      description: 'Compressing eight micro-climates within hours of travel'
    },
    {
      value: '8',
      unit: 'Sites',
      label: 'UNESCO World Heritage',
      description: '6 Cultural Ancient Kingdoms & 2 Natural Cloud Forest Sanctuaries'
    },
    {
      value: '1,340',
      unit: 'km',
      label: 'Tropical Coastline',
      description: 'Continuous golden beaches, coral atolls and ocean point breaks'
    },
    {
      value: '2,500+',
      unit: 'Years',
      label: 'Recorded History',
      description: 'Chronicles documented in the ancient Mahavamsa since antiquity'
    }
  ];

  return (
    <section id="introduction" className="relative py-28 sm:py-36 bg-[#08090A] text-[#F3EFE6] overflow-hidden border-t border-white/5">
      
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F382A]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-[1.5px] bg-gradient-to-r from-[#C5A059] to-transparent" />
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#C5A059] font-bold">
            The Phenomenon of Serendib
          </span>
        </div>

        {/* Major Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 sm:mb-28">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.12] tracking-tight text-[#F3EFE6]">
              An island that transforms{' '}
              <span className="italic font-normal text-gold-gradient font-playfair">every few hours.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:pt-4 space-y-4 border-l border-[#C5A059]/30 pl-6 lg:pl-8">
            <p className="font-outfit text-sm sm:text-base text-[#D8CBB5] leading-relaxed font-light">
              From warm southern reef breaks to misty tea country peaks, Sri Lanka compresses an astonishing diversity of climates, ancient citadels, and wildlife into a singular island realm.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] tracking-wider">
              <Compass className="w-4 h-4 text-[#C5A059] animate-spin" style={{ animationDuration: '12s' }} />
              <span className="font-semibold">PEARL OF THE INDIAN OCEAN</span>
            </div>
          </div>
        </div>

        {/* Editorial Asymmetric Image + Storytelling Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 sm:mb-28 items-center">
          
          <div className="md:col-span-7 relative group overflow-hidden rounded-3xl border border-white/15 glass-obsidian shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1400&q=85"
              alt="Sigiriya Citadel"
              loading="lazy"
              className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 inline-block mb-2 font-semibold">
                  Cultural Triangle · Sigiriya
                </span>
                <p className="font-display text-xl sm:text-3xl text-white font-bold tracking-wide">
                  5th-Century Citadel in the Clouds
                </p>
              </div>
              <span className="hidden sm:inline font-mono text-xs text-[#F3E5AB]/70 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                07° 57′ N · UNESCO 1982
              </span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-6 pl-0 md:pl-4">
            <div className="relative group overflow-hidden rounded-3xl border border-white/15 glass-obsidian shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80"
                alt="Highland Tea Estate"
                loading="lazy"
                className="w-full h-[240px] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#34D399] bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 inline-block mb-1 font-semibold">
                  Central Highlands · 1,868m
                </span>
                <p className="font-display text-lg text-white font-bold">
                  Emerald Ceylon Tea Estates
                </p>
              </div>
            </div>

            <p className="font-outfit text-xs sm:text-sm text-[#D8CBB5]/80 leading-relaxed font-light">
              Nowhere else on the globe can you awake at dawn on a palm-fringed reef surf break, travel by vintage blue locomotive through mist-veiled cloud forests by midday, and track wild leopards across dry-zone savanna by sunset.
            </p>
          </div>

        </div>

        {/* Elegant Animated Metrics Grid with Glassmorphic Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative p-7 sm:p-8 rounded-3xl glass-obsidian border border-white/10 hover:border-[#C5A059]/50 hover:shadow-[0_0_30px_rgba(197,160,89,0.2)] transition-all duration-300 group hover:-translate-y-1.5 cursor-default"
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#F3EFE6] group-hover:text-gold-gradient transition-all duration-300">
                  {stat.value}
                </span>
                <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                  {stat.unit}
                </span>
              </div>
              <h3 className="font-display text-xs tracking-[0.2em] uppercase text-white font-bold mb-2">
                {stat.label}
              </h3>
              <p className="font-outfit text-xs text-[#D8CBB5]/70 leading-relaxed font-light">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
