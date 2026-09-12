import React, { useState, useEffect } from 'react';
import { useMedia } from '../../context/MediaContext';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Shield,
  AlertCircle,
  RefreshCw,
  Search,
  ExternalLink,
  Download,
  Upload,
  Image as ImageIcon,
  Edit3,
  Activity,
  Sliders,
  Eye,
  EyeOff,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import type { Destination } from '../../types/travel';
import type { HeroSlide } from '../../context/MediaContext';

// Curated high-res fallback presets for quick swap
const ALTERNATIVE_PRESETS: Record<string, string[]> = {
  sigiriya: [
    'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
  ],
  colombo: [
    'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
  ],
  galle: [
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
  ],
  ella: [
    'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=85'
  ],
  kandy: [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=85'
  ],
  yala: [
    'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1600&q=85'
  ]
};

interface EditableItem {
  id: string;
  category: string;
  categoryLabel: string;
  name: string;
  subtitle: string;
  currentImage: string;
  presets: string[];
}

export const MediaAdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    lockoutRemainingSeconds,
    attemptsRemaining,
    changeMasterPasscode,
    isStealthMode,
    setIsStealthMode,
    totalCustomOverridesCount,
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
    updateDestination,
    resetSingleItem,
    resetAllToDefault,
    exportConfigurationJSON,
    importConfigurationJSON
  } = useMedia();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'media' | 'content' | 'health' | 'backup' | 'security'>('media');

  // Auth gate state
  const [passcode, setPasscode] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Media Tab State
  const [mediaCategory, setMediaCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingUrls, setEditingUrls] = useState<Record<string, string>>({});

  // Editorial Content Tab State
  const [selectedDestId, setSelectedDestId] = useState<string>(destinations[0]?.id || 'colombo');
  const [destForm, setDestForm] = useState<Partial<Destination>>({});

  // Backup Tab State
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Security Tab State
  const [oldPasscode, setOldPasscode] = useState<string>('');
  const [newPasscode, setNewPasscode] = useState<string>('');
  const [confirmPasscode, setConfirmPasscode] = useState<string>('');
  const [passcodeChangeStatus, setPasscodeChangeStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Health Scan State
  const [scanning, setScanning] = useState<boolean>(false);
  const [healthResults, setHealthResults] = useState<Array<{ id: string; name: string; url: string; status: 'ok' | 'error'; latencyMs: number }>>([]);

  // Sync destination form when selected destination changes
  useEffect(() => {
    const found = destinations.find((d) => d.id === selectedDestId);
    if (found) {
      setDestForm({
        name: found.name,
        tagline: found.tagline,
        region: found.region,
        climate: found.climate,
        elevation: found.elevation,
        recommendedStay: found.recommendedStay,
        description: found.description,
        keyHighlights: [...found.keyHighlights],
        bestKnownFor: [...found.bestKnownFor]
      });
    }
  }, [selectedDestId, destinations]);

  if (!isAdminOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    try {
      const result = await loginAdmin(passcode);
      if (!result.success) {
        setAuthError(result.message || 'Incorrect passcode.');
      } else {
        setPasscode('');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // ----------------------------------------------------
  // PASSCODE SECURITY GATE MODAL
  // ----------------------------------------------------
  if (!isAdminAuthenticated) {
    const isLockedOut = lockoutRemainingSeconds > 0;

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
            <h3 className="font-display text-2xl font-bold text-white tracking-wide mb-1">
              Curatorial Studio Vault
            </h3>
            <p className="font-sans text-xs text-[#D8CBB5]/70 leading-relaxed max-w-xs mx-auto">
              Cryptographically secured workspace. Enter the master administrator passcode to modify live site content and media.
            </p>
          </div>

          {/* Lockout Warning Banner */}
          {isLockedOut ? (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs text-center space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2 font-mono font-bold text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span>SECURITY LOCKOUT ACTIVE</span>
              </div>
              <p>Too many invalid attempts. Authentication is temporarily suspended.</p>
              <div className="font-mono text-base font-bold text-red-300 bg-red-900/40 py-1.5 rounded-lg border border-red-500/30">
                Cooldown: {Math.floor(lockoutRemainingSeconds / 60)}m {lockoutRemainingSeconds % 60}s
              </div>
            </div>
          ) : (
            /* Passcode Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-semibold">
                    Admin Passcode
                  </label>
                  <span className="text-[10px] font-mono text-white/50">
                    {attemptsRemaining} attempt{attemptsRemaining === 1 ? '' : 's'} remaining
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoFocus
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter passcode..."
                    className="w-full bg-[#14171E] border border-white/15 focus:border-[#C5A059] rounded-xl pl-10 pr-10 py-3 text-white text-sm outline-none transition-all placeholder:text-white/30 font-mono tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                disabled={isAuthenticating || !passcode.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E2C785] hover:brightness-110 disabled:opacity-50 text-[#0C0D0E] font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg shadow-[#C5A059]/20 flex items-center justify-center gap-2"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Hash...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Authenticate & Enter Studio</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
            <span>SHA-256 Salted Vault</span>
            <span>Auto-lock: 30m</span>
          </div>

        </div>
      </div>
    );
  }

  // Flatten all editable media assets for the Media Tab
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
      categoryLabel: 'Top Destinations',
      name: d.name,
      subtitle: `${d.region} · ${d.tagline}`,
      currentImage: d.image,
      presets: ALTERNATIVE_PRESETS[d.id] || []
    })),
    ...beaches.map((b) => ({
      id: b.id,
      category: 'beaches',
      categoryLabel: 'Coastal & Beaches',
      name: b.name,
      subtitle: `${b.region} · ${b.atmosphere}`,
      currentImage: b.image,
      presets: []
    })),
    ...mountainFeatures.map((m) => ({
      id: m.id,
      category: 'mountains',
      categoryLabel: 'Highlands & Peaks',
      name: m.name,
      subtitle: `${m.altitude} · ${m.tagline}`,
      currentImage: m.image,
      presets: []
    })),
    ...wildlifeSpecies.map((w) => ({
      id: w.id,
      category: 'wildlife',
      categoryLabel: 'Wildlife Species',
      name: w.name,
      subtitle: `${w.sinhalaName} · ${w.scientificName}`,
      currentImage: w.image,
      presets: []
    })),
    ...nationalParks.map((p) => ({
      id: p.id,
      category: 'parks',
      categoryLabel: 'National Parks',
      name: p.name,
      subtitle: `${p.region} · ${p.knownFor}`,
      currentImage: p.image,
      presets: []
    })),
    ...heritageSites.map((h) => ({
      id: h.id,
      category: 'heritage',
      categoryLabel: 'UNESCO Heritage',
      name: h.name,
      subtitle: `${h.period} · ${h.location}`,
      currentImage: h.image,
      presets: []
    })),
    ...culinaryDishes.map((f) => ({
      id: f.id,
      category: 'food',
      categoryLabel: 'Cuisine & Gastronomy',
      name: f.name,
      subtitle: `${f.sinhalaName} · ${f.tagline}`,
      currentImage: f.image,
      presets: []
    })),
    ...experiences.map((e) => ({
      id: e.id,
      category: 'experiences',
      categoryLabel: 'Curated Experiences',
      name: e.title,
      subtitle: `${e.location} · ${e.duration}`,
      currentImage: e.image,
      presets: []
    })),
    ...regions.map((r) => ({
      id: r.id,
      category: 'regions',
      categoryLabel: 'Island Regions',
      name: r.name,
      subtitle: `${r.tagline} · ${r.landscape}`,
      currentImage: r.image,
      presets: []
    }))
  ];

  // Filter media items
  const filteredMediaItems = allItems.filter((item) => {
    const matchesCat = mediaCategory === 'all' || item.category === mediaCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Run Health Link Scan
  const runHealthScan = async () => {
    setScanning(true);
    const results: Array<{ id: string; name: string; url: string; status: 'ok' | 'error'; latencyMs: number }> = [];

    for (const item of allItems) {
      const start = performance.now();
      try {
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = item.currentImage;
        });
        const latency = Math.round(performance.now() - start);
        results.push({ id: item.id, name: item.name, url: item.currentImage, status: 'ok', latencyMs: latency });
      } catch {
        const latency = Math.round(performance.now() - start);
        results.push({ id: item.id, name: item.name, url: item.currentImage, status: 'error', latencyMs: latency });
      }
    }

    setHealthResults(results);
    setScanning(false);
  };

  // Save Destination Form Changes
  const handleSaveDestinationContent = () => {
    if (!selectedDestId) return;
    updateDestination(selectedDestId, destForm);
    alert(`Updated content for ${destForm.name || selectedDestId}`);
  };

  // Download Backup JSON
  const handleDownloadBackup = () => {
    const json = exportConfigurationJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `serendib-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Passcode Update
  const handlePasscodeChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeChangeStatus(null);

    if (newPasscode !== confirmPasscode) {
      setPasscodeChangeStatus({ success: false, message: 'New passcodes do not match.' });
      return;
    }

    const res = await changeMasterPasscode(oldPasscode, newPasscode);
    setPasscodeChangeStatus(res);
    if (res.success) {
      setOldPasscode('');
      setNewPasscode('');
      setConfirmPasscode('');
    }
  };

  // ----------------------------------------------------
  // AUTHENTICATED STUDIO INTERFACE
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[92vh] bg-[#0E1015] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Studio Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#12151B] flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                  SERENDIB Curatorial Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                  AUTH ACTIVE
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#D8CBB5]/60">
                Live CMS & Digital Asset Management
              </p>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2">
            {totalCustomOverridesCount > 0 && (
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#F3E5AB]">
                {totalCustomOverridesCount} active override{totalCustomOverridesCount === 1 ? '' : 's'}
              </span>
            )}

            <button
              onClick={() => {
                if (confirm('Reset all site imagery and custom edits back to original defaults?')) {
                  resetAllToDefault();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 hover:border-red-500/40 hover:bg-red-500/10 text-white/70 hover:text-red-300 text-xs font-mono transition-all cursor-pointer"
              title="Reset all overrides"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#C5A059]/30 bg-[#C5A059]/10 hover:bg-red-500/20 hover:border-red-500/40 text-[#F3E5AB] hover:text-red-300 text-xs font-mono transition-all cursor-pointer"
              title="Lock Studio"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Studio</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 border-b border-white/10 bg-[#0B0D11] flex items-center gap-2 overflow-x-auto flex-shrink-0">
          {[
            { key: 'media', label: 'Visual Assets', icon: ImageIcon },
            { key: 'content', label: 'Editorial Copy', icon: Edit3 },
            { key: 'health', label: 'Link Health Scanner', icon: Activity },
            { key: 'backup', label: 'Backup & Code Sync', icon: FileCode },
            { key: 'security', label: 'Vault & Privacy', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 py-3.5 px-4 font-mono text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#C5A059] text-[#F3E5AB] font-bold bg-white/5'
                    : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.02]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0E1015]">

          {/* ---------------------------------------------------------------- */}
          {/* TAB 1: VISUAL ASSETS (MEDIA STUDIO) */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              
              {/* Category Filter & Search Bar */}
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
                  {[
                    { key: 'all', label: 'All Assets' },
                    { key: 'hero', label: 'Hero' },
                    { key: 'destinations', label: 'Destinations' },
                    { key: 'beaches', label: 'Beaches' },
                    { key: 'mountains', label: 'Highlands' },
                    { key: 'wildlife', label: 'Wildlife' },
                    { key: 'parks', label: 'Parks' },
                    { key: 'heritage', label: 'Heritage' },
                    { key: 'food', label: 'Cuisine' },
                    { key: 'experiences', label: 'Experiences' },
                    { key: 'regions', label: 'Regions' }
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setMediaCategory(cat.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        mediaCategory === cat.key
                          ? 'bg-[#C5A059] text-[#08090A] font-bold shadow-md'
                          : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter assets..."
                    className="w-full bg-[#14171E] border border-white/15 focus:border-[#C5A059] rounded-xl pl-9 pr-3 py-2 text-white text-xs outline-none transition-all placeholder:text-white/30 font-mono"
                  />
                </div>
              </div>

              {/* Media Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMediaItems.map((item) => {
                  const inputVal = editingUrls[item.id] !== undefined ? editingUrls[item.id] : item.currentImage;
                  const isDirty = inputVal !== item.currentImage;

                  return (
                    <div
                      key={item.id}
                      className="bg-[#14171E] border border-white/15 hover:border-white/25 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all group"
                    >
                      <div>
                        {/* Image Preview with Aspect Ratio */}
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/50 mb-3 border border-white/10">
                          <img
                            src={inputVal || item.currentImage}
                            alt={item.name}
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="font-mono text-[10px] font-bold text-[#C5A059] bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
                              {item.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <h4 className="font-display font-bold text-sm text-white">{item.name}</h4>
                        <p className="font-sans text-xs text-white/50 line-clamp-1">{item.subtitle}</p>
                      </div>

                      {/* URL Edit Form */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={inputVal}
                            onChange={(e) =>
                              setEditingUrls((prev) => ({ ...prev, [item.id]: e.target.value }))
                            }
                            placeholder="Paste image URL..."
                            className="flex-1 bg-black/50 border border-white/15 focus:border-[#C5A059] rounded-lg px-2.5 py-1.5 text-white text-[11px] font-mono outline-none"
                          />
                          <button
                            onClick={() => {
                              updateImage(item.category, item.id, inputVal);
                              setEditingUrls((prev) => {
                                const copy = { ...prev };
                                delete copy[item.id];
                                return copy;
                              });
                            }}
                            disabled={!isDirty}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                              isDirty
                                ? 'bg-[#C5A059] text-black hover:brightness-110 shadow-md'
                                : 'bg-white/10 text-white/30 cursor-not-allowed'
                            }`}
                          >
                            Apply
                          </button>
                        </div>

                        {/* Reset per item */}
                        <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-white/40">
                          <button
                            onClick={() => resetSingleItem(item.category, item.id)}
                            className="hover:text-red-400 transition-colors cursor-pointer"
                          >
                            Reset default
                          </button>
                          <a
                            href={item.currentImage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-[#C5A059]"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 2: EDITORIAL CONTENT (TEXT & COPY EDITOR) */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'content' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Sidebar Destination Selector */}
              <div className="lg:col-span-4 bg-[#14171E] border border-white/15 rounded-2xl p-4 space-y-2 h-fit">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#C5A059] font-bold mb-3">
                  Select Destination
                </h3>
                <div className="space-y-1.5 max-h-[60vh] overflow-y-auto">
                  {destinations.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDestId(d.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-sans flex items-center justify-between transition-all cursor-pointer ${
                        selectedDestId === d.id
                          ? 'bg-[#C5A059] text-black font-bold shadow-md'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{d.name}</span>
                      <span className="font-mono text-[10px] opacity-70">{d.region}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Form Editor */}
              <div className="lg:col-span-8 bg-[#14171E] border border-white/15 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      Editing: {destForm.name}
                    </h3>
                    <p className="font-mono text-xs text-[#C5A059]">ID: {selectedDestId}</p>
                  </div>
                  <button
                    onClick={handleSaveDestinationContent}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E2C785] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Destination Name
                    </label>
                    <input
                      type="text"
                      value={destForm.name || ''}
                      onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-sans outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Province / Region
                    </label>
                    <input
                      type="text"
                      value={destForm.region || ''}
                      onChange={(e) => setDestForm({ ...destForm, region: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-sans outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Poetic Tagline
                    </label>
                    <input
                      type="text"
                      value={destForm.tagline || ''}
                      onChange={(e) => setDestForm({ ...destForm, tagline: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-sans outline-none italic"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Climate & Temperature
                    </label>
                    <input
                      type="text"
                      value={destForm.climate || ''}
                      onChange={(e) => setDestForm({ ...destForm, climate: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Elevation & Stay
                    </label>
                    <input
                      type="text"
                      value={destForm.elevation || ''}
                      onChange={(e) => setDestForm({ ...destForm, elevation: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-mono outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Editorial Description
                    </label>
                    <textarea
                      rows={4}
                      value={destForm.description || ''}
                      onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl p-3 text-white text-xs font-sans outline-none leading-relaxed"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 3: ASSET HEALTH & BROKEN LINK SCANNER */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              <div className="bg-[#14171E] border border-white/15 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    Automated Media Integrity & Broken Link Scanner
                  </h3>
                  <p className="font-sans text-xs text-white/60 max-w-xl">
                    Tests every active photography asset across the entire site by firing non-blocking image verification probes.
                  </p>
                </div>
                <button
                  onClick={runHealthScan}
                  disabled={scanning}
                  className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#b08b43] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {scanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Scanning ({healthResults.length}/{allItems.length})...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4" />
                      <span>Run Health Scan</span>
                    </>
                  )}
                </button>
              </div>

              {healthResults.length > 0 && (
                <div className="bg-[#14171E] border border-white/15 rounded-2xl overflow-hidden">
                  <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/50 bg-black/20">
                    <span>Target Asset</span>
                    <span>Status & Latency</span>
                  </div>
                  <div className="divide-y divide-white/5 max-h-[50vh] overflow-y-auto">
                    {healthResults.map((res) => (
                      <div key={res.id} className="px-6 py-3 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-3">
                          {res.status === 'ok' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          )}
                          <div>
                            <span className="text-white font-bold block">{res.name}</span>
                            <span className="text-white/40 text-[10px] line-clamp-1">{res.url}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                              res.status === 'ok' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {res.status.toUpperCase()} ({res.latencyMs}ms)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 4: BACKUP & CODE SYNC */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'backup' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Export Panel */}
              <div className="bg-[#14171E] border border-white/15 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Download className="w-5 h-5" />
                  <h3 className="font-display font-bold text-base text-white">Export Configuration</h3>
                </div>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  Download the current state of all custom images, destinations, and content as a portable JSON snapshot.
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="w-full py-3 rounded-xl bg-[#C5A059] hover:bg-[#b08b43] text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  Download .JSON Backup
                </button>
              </div>

              {/* Import Panel */}
              <div className="bg-[#14171E] border border-white/15 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#38BDF8]">
                  <Upload className="w-5 h-5" />
                  <h3 className="font-display font-bold text-base text-white">Import Configuration</h3>
                </div>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste JSON configuration text here..."
                  className="w-full bg-black/40 border border-white/15 focus:border-[#38BDF8] rounded-xl p-3 text-white text-xs font-mono outline-none"
                />
                {importStatus && (
                  <div
                    className={`p-2.5 rounded-xl text-xs font-mono ${
                      importStatus.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {importStatus.message}
                  </div>
                )}
                <button
                  onClick={() => {
                    const res = importConfigurationJSON(importJsonText);
                    setImportStatus(res);
                  }}
                  disabled={!importJsonText.trim()}
                  className="w-full py-3 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] disabled:opacity-40 text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  Restore From JSON
                </button>
              </div>

            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 5: VAULT & PRIVACY SETTINGS */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Stealth Mode Toggle */}
              <div className="bg-[#14171E] border border-white/15 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-base text-white mb-1">
                    Public Stealth Mode
                  </h3>
                  <p className="font-sans text-xs text-white/60">
                    Hides the "Admin" button from the public footer. When enabled, Studio can only be opened via <span className="font-mono text-[#C5A059]">Ctrl + Shift + A</span>, <span className="font-mono text-[#C5A059]">?admin=true</span>, or triple-clicking the footer logo emblem.
                  </p>
                </div>
                <button
                  onClick={() => setIsStealthMode(!isStealthMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isStealthMode
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'bg-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {isStealthMode ? 'STEALTH: ON' : 'STEALTH: OFF'}
                </button>
              </div>

              {/* Change Master Passcode */}
              <form onSubmit={handlePasscodeChange} className="bg-[#14171E] border border-white/15 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <KeyRound className="w-5 h-5" />
                  <h3 className="font-display font-bold text-base text-white">Update Master Passcode</h3>
                </div>
                <p className="font-sans text-xs text-white/60">
                  Sets a custom salted SHA-256 hash. Passcode is never stored in plain-text.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 uppercase mb-1">
                      Current Passcode
                    </label>
                    <input
                      type="password"
                      value={oldPasscode}
                      onChange={(e) => setOldPasscode(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 uppercase mb-1">
                      New Passcode (min. 8 characters)
                    </label>
                    <input
                      type="password"
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/60 uppercase mb-1">
                      Confirm New Passcode
                    </label>
                    <input
                      type="password"
                      value={confirmPasscode}
                      onChange={(e) => setConfirmPasscode(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#C5A059] rounded-xl px-3 py-2 text-white text-xs font-mono outline-none"
                    />
                  </div>
                </div>

                {passcodeChangeStatus && (
                  <div
                    className={`p-2.5 rounded-xl text-xs font-mono ${
                      passcodeChangeStatus.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {passcodeChangeStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!oldPasscode || !newPasscode}
                  className="w-full py-3 rounded-xl bg-[#C5A059] hover:bg-[#b08b43] disabled:opacity-40 text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  Save New Master Passcode
                </button>
              </form>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
