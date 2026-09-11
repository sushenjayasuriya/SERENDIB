import { useState } from 'react';
import { useMedia, type HeroSlide } from '../../context/MediaContext';
import type { Destination, BeachDestination, MountainFeature, WildlifeSpecies, NationalPark, HeritageSite, CulinaryDish, BucketListExperience, RegionInfo } from '../../types/travel';
import { X, Upload, RefreshCw, Check, Search, Image as ImageIcon, Copy, ExternalLink, Shield, LogOut, KeyRound, AlertCircle } from 'lucide-react';

interface EditableItem {
  id: string;
  category: string;
  categoryLabel: string;
  name: string;
  subtitle?: string;
  currentImage: string;
  presets?: string[];
}

// Curated authentic alternative presets for quick 1-click replacement
const ALTERNATIVE_PRESETS: Record<string, string[]> = {
  sigiriya: [
    'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85'
  ],
  ella: [
    'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=85'
  ],
  galle: [
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=85'
  ],
  mirissa: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85'
  ],
  'arugam-bay': [
    'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
  ],
  jaffna: [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=85'
  ],
  trincomalee: [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
  ],
  'sri-lankan-leopard': [
    'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1600&q=85'
  ],
  'asian-elephant': [
    'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1581852017103-68accd55096a?auto=format&fit=crop&w=1600&q=85'
  ],
  'rice-and-curry': [
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1600&q=85'
  ],
  hoppers: [
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85'
  ]
};

export const MediaAdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    heroSlides,
    destinations,
    beaches,
    mountainFeatures,
    wildlifeSpecies,
    nationalParks,
    heritageSites,
    culinaryDishes,
    experiences,
    regions,
    updateImage,
    resetAllToDefault
  } = useMedia();

  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [editingUrls, setEditingUrls] = useState<Record<string, string>>({});

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(passcode);
    if (!success) {
      setAuthError('Incorrect passcode. Access is restricted to administrators.');
    } else {
      setPasscode('');
    }
  };

  // If not authenticated, show passcode security gate
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="relative w-full max-w-md bg-[#0E1014] border border-white/15 rounded-3xl p-8 shadow-2xl overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => {
              setIsAdminOpen(false);
              setAuthError('');
              setPasscode('');
            }}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] mb-4">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-wide mb-2">
              Curatorial Admin
            </h3>
            <p className="font-sans text-xs text-[#D8CBB5]/70 leading-relaxed max-w-xs mx-auto">
              Restricted area. Enter the master administrator passcode to modify live site imagery and visual assets.
            </p>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C5A059] mb-2 font-semibold">
                Admin Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter passcode..."
                  className="w-full bg-[#14171E] border border-white/15 focus:border-[#C5A059] rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none transition-all placeholder:text-white/30 font-mono tracking-widest"
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg shadow-[#C5A059]/20"
            >
              Authenticate & Enter Studio
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/40 font-mono">
              Authorized personnel credentials required.
            </p>
          </div>

        </div>
      </div>
    );
  }

  // Flatten all editable media assets
  const allItems: EditableItem[] = [
    ...heroSlides.map((h: HeroSlide) => ({
      id: h.id,
      category: 'hero',
      categoryLabel: 'Hero Carousel',
      name: h.title,
      subtitle: h.region,
      currentImage: h.image,
      presets: ALTERNATIVE_PRESETS[h.id.replace('hero-', '')] || []
    })),
    ...destinations.map((d: Destination) => ({
      id: d.id,
      category: 'destinations',
      categoryLabel: 'Destinations',
      name: d.name,
      subtitle: d.region,
      currentImage: d.image,
      presets: ALTERNATIVE_PRESETS[d.id] || []
    })),
    ...beaches.map((b: BeachDestination) => ({
      id: b.id,
      category: 'beaches',
      categoryLabel: 'Beaches & Surf',
      name: b.name,
      subtitle: b.region,
      currentImage: b.image,
      presets: ALTERNATIVE_PRESETS[b.id.replace('-beach', '').replace('-bay', '')] || []
    })),
    ...mountainFeatures.map((m: MountainFeature) => ({
      id: m.id,
      category: 'mountains',
      categoryLabel: 'Highlands & Tea',
      name: m.name,
      subtitle: m.altitude,
      currentImage: m.image
    })),
    ...wildlifeSpecies.map((w: WildlifeSpecies) => ({
      id: w.id,
      category: 'wildlife',
      categoryLabel: 'Wildlife Species',
      name: w.name,
      subtitle: w.scientificName,
      currentImage: w.image,
      presets: ALTERNATIVE_PRESETS[w.id] || []
    })),
    ...nationalParks.map((p: NationalPark) => ({
      id: p.id,
      category: 'parks',
      categoryLabel: 'National Parks',
      name: p.name,
      subtitle: p.region,
      currentImage: p.image
    })),
    ...heritageSites.map((h: HeritageSite) => ({
      id: h.id,
      category: 'heritage',
      categoryLabel: 'Ancient Heritage',
      name: h.name,
      subtitle: h.location,
      currentImage: h.image,
      presets: ALTERNATIVE_PRESETS[h.id.replace('-citadel', '').replace('-sacred-city', '').replace('-ruins', '').replace('-caves', '').replace('-heritage', '')] || []
    })),
    ...culinaryDishes.map((f: CulinaryDish) => ({
      id: f.id,
      category: 'food',
      categoryLabel: 'Ceylon Cuisine',
      name: f.name,
      subtitle: f.sinhalaName,
      currentImage: f.image,
      presets: ALTERNATIVE_PRESETS[f.id] || []
    })),
    ...experiences.map((e: BucketListExperience) => ({
      id: e.id,
      category: 'experiences',
      categoryLabel: '10 Experiences',
      name: e.title,
      subtitle: e.location,
      currentImage: e.image
    })),
    ...regions.map((r: RegionInfo) => ({
      id: r.id,
      category: 'regions',
      categoryLabel: 'Provinces & Regions',
      name: r.name,
      subtitle: r.weatherSummary,
      currentImage: r.image
    }))
  ];

  const filteredItems = allItems.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleFileUpload = (category: string, id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        updateImage(category, id, base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (id: string, value: string) => {
    setEditingUrls((prev: Record<string, string>) => ({ ...prev, [id]: value }));
  };

  const handleApplyUrl = (category: string, id: string) => {
    const url = editingUrls[id];
    if (url && url.trim()) {
      updateImage(category, id, url.trim());
      setEditingUrls((prev: Record<string, string>) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleExportConfig = () => {
    const fullConfig = {
      heroSlides,
      destinations,
      beaches,
      mountainFeatures,
      wildlifeSpecies,
      nationalParks,
      heritageSites,
      culinaryDishes,
      experiences,
      regions
    };
    navigator.clipboard.writeText(JSON.stringify(fullConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const tabs = [
    { key: 'all', label: 'All Assets' },
    { key: 'hero', label: 'Hero Slides' },
    { key: 'destinations', label: 'Destinations' },
    { key: 'beaches', label: 'Beaches' },
    { key: 'mountains', label: 'Highlands' },
    { key: 'wildlife', label: 'Wildlife' },
    { key: 'heritage', label: 'Heritage' },
    { key: 'food', label: 'Cuisine' },
    { key: 'experiences', label: 'Experiences' },
    { key: 'regions', label: 'Regions' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0E1014] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        
        {/* Admin Header */}
        <div className="p-6 border-b border-white/10 bg-[#12151B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-white tracking-wide">
                  SERENDIB Visual Asset & Media Studio
                </h3>
                <span className="text-[10px] font-mono uppercase bg-[#C5A059] text-[#0C0D0E] font-bold px-2 py-0.5 rounded">
                  Admin
                </span>
              </div>
              <p className="font-sans text-xs text-[#D8CBB5]/70">
                Replace, upload, or paste any image URL to update the live website immediately.
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportConfig}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-sans text-white/90 transition-colors cursor-pointer"
              title="Copy current image configuration JSON to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#C5A059]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Config Copied!' : 'Export Config'}</span>
            </button>

            <button
              onClick={resetAllToDefault}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-sans text-red-300 transition-colors cursor-pointer"
              title="Reset all images to default"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-sans text-amber-300 transition-colors cursor-pointer"
              title="Lock Admin and Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock & Sign Out</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              aria-label="Close Admin Studio"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 border-b border-white/10 bg-[#101216] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-[11px] font-sans tracking-wider uppercase px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#0C0D0E] font-semibold shadow-md'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or place..."
              className="w-full bg-white/5 border border-white/10 text-white text-xs pl-9 pr-3 py-2 rounded-xl outline-none focus:border-[#C5A059] placeholder:text-white/30"
            />
          </div>

        </div>

        {/* Asset Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const hasCustomUrl = editingUrls[item.id] !== undefined;
            const currentUrlInput = editingUrls[item.id] ?? item.currentImage;

            return (
              <div
                key={`${item.category}-${item.id}`}
                className="bg-[#14171E] border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-lg hover:border-white/25 transition-all"
              >
                {/* Top Info & Image Preview */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#C5A059] block">
                        {item.categoryLabel}
                      </span>
                      <h4 className="font-display text-base font-bold text-white leading-snug">
                        {item.name}
                      </h4>
                      {item.subtitle && (
                        <p className="font-sans text-[11px] text-white/50 truncate max-w-[220px]">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
                    <img
                      src={item.currentImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <a
                        href={item.currentImage}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-black/70 text-white hover:text-[#C5A059] transition-colors"
                        title="View Full Resolution"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Edit Controls */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  
                  {/* Image URL Input */}
                  <div>
                    <label className="text-[10px] font-mono text-white/50 block mb-1">
                      Image URL (Paste from Unsplash/Web):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentUrlInput}
                        onChange={(e) => handleUrlChange(item.id, e.target.value)}
                        placeholder="https://..."
                        className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-[11px] px-2.5 py-1.5 rounded-lg outline-none focus:border-[#C5A059]"
                      />
                      {hasCustomUrl && (
                        <button
                          onClick={() => handleApplyUrl(item.category, item.id)}
                          className="bg-[#C5A059] hover:bg-[#b08b43] text-[#0C0D0E] font-sans font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Local File Upload Button */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-1.5 text-xs text-[#D8CBB5] hover:text-[#C5A059] cursor-pointer bg-white/5 border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(item.category, item.id, file);
                        }}
                      />
                    </label>

                    {/* Presets if available */}
                    {item.presets && item.presets.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono text-white/40">Presets:</span>
                        {item.presets.map((presetUrl, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => updateImage(item.category, item.id, presetUrl)}
                            className="w-6 h-6 rounded border border-white/20 overflow-hidden hover:border-[#C5A059] cursor-pointer"
                            title={`Switch to Preset ${pIdx + 1}`}
                          >
                            <img src={presetUrl} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#101216] flex items-center justify-between text-xs font-sans text-white/60">
          <span>Showing {filteredItems.length} editable media items</span>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2 rounded-xl bg-[#C5A059] text-[#0C0D0E] font-semibold hover:bg-[#b08b43] transition-colors cursor-pointer"
          >
            Done & Return to Site
          </button>
        </div>

      </div>
    </div>
  );
};
