import React from 'react';
import { BookOpen, Globe, Shield, RefreshCw, Mail, ExternalLink } from 'lucide-react';

export const AboutSerendib: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-28 sm:py-36 overflow-hidden bg-[#07080A]"
    >
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(197,160,89,0.06),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5">
            <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">Editorial Note</span>
          </div>
          <h2
            id="about-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#F3EFE6] leading-tight mb-6"
          >
            About{' '}
            <span className="italic text-gold-gradient">SERENDIB</span>
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-[#C5A059]/80 max-w-2xl leading-relaxed">
            "Serendib" — the ancient Arabic name for Sri Lanka, first recorded by 9th-century seafarers crossing the Indian Ocean.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">

          {/* Left — primary editorial statement */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-[#D8CBB5] text-lg leading-relaxed font-light">
              SERENDIB is an independent curatorial travel guide dedicated to Sri Lanka — built to be
              a genuinely useful companion for travellers who want more than a generic itinerary.
              This is not an AI content farm. Every section reflects real research, considered editorial
              choices, and a deep respect for the island's history, ecology, and culture.
            </p>
            <p className="text-[#D8CBB5] text-lg leading-relaxed font-light">
              The project was created by{' '}
              <a
                href="https://sushenjayasuriya.org.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A059] hover:text-[#E6CA85] transition-colors duration-200 underline underline-offset-4 decoration-[#C5A059]/40"
              >
                Sushen Jayasuriya
              </a>
              {' '}— a Sri Lankan developer and designer with a personal interest in surfacing the lesser-told
              stories of the island alongside its iconic landmarks. Sri Lanka is routinely underrepresented
              in global travel media. SERENDIB is one attempt to change that.
            </p>
            <p className="text-[#D8CBB5] text-lg leading-relaxed font-light">
              The platform is currently in active development. Content is being expanded progressively,
              starting with the most-visited destinations and working outward toward lesser-known regions
              such as Jaffna, Batticaloa, and the Knuckles Range.
            </p>
          </div>

          {/* Right — quick facts */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <h3 className="font-mono text-[10px] tracking-[0.25em] text-[#C5A059] uppercase mb-4">Site Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#888] font-light">Last updated</dt>
                  <dd className="text-[#F3EFE6] font-mono text-right">September 2026</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#888] font-light">Coverage</dt>
                  <dd className="text-[#F3EFE6] text-right">Island-wide, Sri Lanka</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#888] font-light">Language</dt>
                  <dd className="text-[#F3EFE6] text-right">English</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#888] font-light">Affiliate links</dt>
                  <dd className="text-[#F3EFE6] text-right">None</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#888] font-light">Sponsored content</dt>
                  <dd className="text-[#F3EFE6] text-right">None</dd>
                </div>
              </dl>
            </div>
            <a
              href="mailto:info@sushenjayasuriya.org.lk"
              className="flex items-center gap-3 p-4 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 hover:bg-[#C5A059]/15 hover:border-[#C5A059]/50 transition-all duration-300 group"
            >
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <div className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-0.5">Report an error</div>
                <div className="text-sm text-[#D8CBB5] group-hover:text-white transition-colors">info@sushenjayasuriya.org.lk</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]/50 ml-auto group-hover:text-[#C5A059] transition-colors" />
            </a>
          </div>
        </div>

        {/* Editorial principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10">
          {[
            {
              icon: <Globe className="w-5 h-5 text-[#C5A059]" />,
              title: 'Original Research',
              body: 'Destination information is drawn from primary sources, official tourism bodies, and firsthand accounts — not recycled from generic travel databases.'
            },
            {
              icon: <RefreshCw className="w-5 h-5 text-[#C5A059]" />,
              title: 'Living Document',
              body: 'Travel conditions change. Visa rules, entrance fees, transport, and opening hours are reviewed regularly. Each section carries a last-updated date where time-sensitive.'
            },
            {
              icon: <Shield className="w-5 h-5 text-[#C5A059]" />,
              title: 'Editorial Independence',
              body: 'No affiliate commissions. No paid placements. No sponsored reviews. Recommendations reflect genuine curation, not commercial relationships.'
            }
          ].map(({ icon, title, body }) => (
            <div key={title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-[#C5A059]/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                {icon}
                <h3 className="text-sm font-semibold text-[#F3EFE6] tracking-wide">{title}</h3>
              </div>
              <p className="text-sm text-[#888] leading-relaxed font-light">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
