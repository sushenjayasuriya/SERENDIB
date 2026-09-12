import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { destinations as defaultDestinations } from '../data/destinations';
import { beaches as defaultBeaches } from '../data/beaches';
import { mountainFeatures as defaultMountains } from '../data/mountains';
import { wildlifeSpecies as defaultWildlife, nationalParks as defaultParks } from '../data/wildlife';
import { heritageSites as defaultHeritage } from '../data/culture';
import { culinaryDishes as defaultFood } from '../data/food';
import { experiences as defaultExperiences } from '../data/experiences';
import { regions as defaultRegions } from '../data/regions';
import type {
  Destination,
  BeachDestination,
  MountainFeature,
  WildlifeSpecies,
  NationalPark,
  HeritageSite,
  CulinaryDish,
  BucketListExperience,
  RegionInfo
} from '../types/travel';
import {
  computeSaltedHash,
  generateSessionToken,
  DEFAULT_MASTER_HASHES,
  MAX_AUTH_ATTEMPTS,
  LOCKOUT_DURATION_MS,
  SESSION_INACTIVITY_MS,
  type LockoutState,
  type SessionTokenData
} from '../utils/security';

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  region: string;
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'hero-sigiriya',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=2000&q=90',
    title: 'Sigiriya Rock Fortress',
    subtitle: '5th-century palace in the sky rising above emerald canopy',
    region: 'Cultural Triangle'
  },
  {
    id: 'hero-nine-arch',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=90',
    title: 'Demodara Nine Arch Viaduct',
    subtitle: 'The iconic blue train traversing high-grown tea valleys in Ella',
    region: 'Central Highlands'
  },
  {
    id: 'hero-south-coast',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=90',
    title: 'Southern Coast & Coconut Hill',
    subtitle: 'Golden sunsets over warm turquoise Indian Ocean currents',
    region: 'Southern Province'
  },
  {
    id: 'hero-yala',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=90',
    title: 'Wild Yala Sanctuary',
    subtitle: 'The highest leopard density on earth amidst coastal lagoons',
    region: 'Ruhuna Wilderness'
  }
];

export interface DirectEditTarget {
  category: string;
  id: string;
}

interface MediaContextType {
  // Datasets
  heroSlides: HeroSlide[];
  destinations: Destination[];
  beaches: BeachDestination[];
  mountainFeatures: MountainFeature[];
  wildlifeSpecies: WildlifeSpecies[];
  nationalParks: NationalPark[];
  heritageSites: HeritageSite[];
  culinaryDishes: CulinaryDish[];
  experiences: BucketListExperience[];
  regions: RegionInfo[];

  // Update & Reset Operations
  updateImage: (category: string, id: string, newImageUrl: string) => void;
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  updateDestination: (id: string, updates: Partial<Destination>) => void;
  updateBeach: (id: string, updates: Partial<BeachDestination>) => void;
  updateMountain: (id: string, updates: Partial<MountainFeature>) => void;
  updateWildlife: (id: string, updates: Partial<WildlifeSpecies>) => void;
  updatePark: (id: string, updates: Partial<NationalPark>) => void;
  updateHeritage: (id: string, updates: Partial<HeritageSite>) => void;
  updateFood: (id: string, updates: Partial<CulinaryDish>) => void;
  updateExperience: (id: string, updates: Partial<BucketListExperience>) => void;
  updateRegion: (id: string, updates: Partial<RegionInfo>) => void;
  resetSingleItem: (category: string, id: string) => void;
  resetAllToDefault: () => void;

  // Import / Export
  exportConfigurationJSON: () => string;
  importConfigurationJSON: (jsonString: string) => { success: boolean; message: string };
  totalCustomOverridesCount: number;

  // Security & Admin Auth
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => Promise<{ success: boolean; message?: string }>;
  logoutAdmin: () => void;
  lockoutRemainingSeconds: number;
  attemptsRemaining: number;
  changeMasterPasscode: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;

  // Visibility & Contextual Editing
  isStealthMode: boolean;
  setIsStealthMode: (stealth: boolean) => void;
  directEditTarget: DirectEditTarget | null;
  setDirectEditTarget: (target: DirectEditTarget | null) => void;
}

const STORAGE_KEY = 'SERENDIB_MEDIA_OVERRIDES_V3';
const SESSION_TOKEN_KEY = 'SERENDIB_ADMIN_SESSION_V2';
const LOCKOUT_STORAGE_KEY = 'SERENDIB_ADMIN_LOCKOUT_V1';
const CUSTOM_HASH_KEY = 'SERENDIB_ADMIN_CUSTOM_HASH_V1';
const STEALTH_MODE_KEY = 'SERENDIB_STEALTH_MODE_V1';

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [directEditTarget, setDirectEditTarget] = useState<DirectEditTarget | null>(null);

  // Stealth mode setting for public footer trigger
  const [isStealthMode, setIsStealthModeState] = useState<boolean>(() => {
    return localStorage.getItem(STEALTH_MODE_KEY) === 'true';
  });

  const setIsStealthMode = (stealth: boolean) => {
    setIsStealthModeState(stealth);
    localStorage.setItem(STEALTH_MODE_KEY, stealth ? 'true' : 'false');
  };

  // Lockout rate-limiting state
  const [lockoutState, setLockoutState] = useState<LockoutState>(() => {
    const raw = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (!raw) return { attempts: 0, lockedUntil: null };
    try {
      const parsed = JSON.parse(raw);
      if (parsed.lockedUntil && Date.now() > parsed.lockedUntil) {
        return { attempts: 0, lockedUntil: null };
      }
      return parsed;
    } catch {
      return { attempts: 0, lockedUntil: null };
    }
  });

  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);

  // Update lockout countdown
  useEffect(() => {
    if (!lockoutState.lockedUntil) {
      setLockoutRemainingSeconds(0);
      return;
    }
    const updateCountdown = () => {
      const now = Date.now();
      if (now >= (lockoutState.lockedUntil || 0)) {
        setLockoutState({ attempts: 0, lockedUntil: null });
        localStorage.removeItem(LOCKOUT_STORAGE_KEY);
        setLockoutRemainingSeconds(0);
      } else {
        setLockoutRemainingSeconds(Math.ceil(((lockoutState.lockedUntil || 0) - now) / 1000));
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [lockoutState.lockedUntil]);

  // Session Token Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    const raw = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (!raw) return false;
    try {
      const session: SessionTokenData = JSON.parse(raw);
      if (session.expiresAt && Date.now() < session.expiresAt) {
        return true;
      }
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      return false;
    } catch {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      return false;
    }
  });

  // Session inactivity heartbeat
  const extendSessionActivity = useCallback(() => {
    if (!isAdminAuthenticated) return;
    const raw = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (!raw) return;
    try {
      const session: SessionTokenData = JSON.parse(raw);
      const updated: SessionTokenData = {
        ...session,
        expiresAt: Date.now() + SESSION_INACTIVITY_MS
      };
      sessionStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    if (!isAdminAuthenticated) return;
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handler = () => extendSessionActivity();
    events.forEach((evt) => window.addEventListener(evt, handler, { passive: true }));

    // Check expiry interval
    const interval = setInterval(() => {
      const raw = sessionStorage.getItem(SESSION_TOKEN_KEY);
      if (!raw) {
        setIsAdminAuthenticated(false);
        return;
      }
      try {
        const session: SessionTokenData = JSON.parse(raw);
        if (Date.now() >= session.expiresAt) {
          setIsAdminAuthenticated(false);
          setIsAdminOpen(false);
          sessionStorage.removeItem(SESSION_TOKEN_KEY);
        }
      } catch {
        setIsAdminAuthenticated(false);
      }
    }, 15000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handler));
      clearInterval(interval);
    };
  }, [isAdminAuthenticated, extendSessionActivity]);

  // Authenticate Admin with SHA-256 salted hash & lockout enforcement
  const loginAdmin = async (passcode: string): Promise<{ success: boolean; message?: string }> => {
    const trimmed = passcode.trim();
    if (!trimmed) {
      return { success: false, message: 'Please enter an administrator passcode.' };
    }

    // Check if locked out
    if (lockoutState.lockedUntil && Date.now() < lockoutState.lockedUntil) {
      const remainingMin = Math.ceil((lockoutState.lockedUntil - Date.now()) / 60000);
      return {
        success: false,
        message: `Security Lockout Active. Too many invalid attempts. Try again in ${remainingMin} minute(s).`
      };
    }

    const inputHash = await computeSaltedHash(trimmed);
    const customHash = localStorage.getItem(CUSTOM_HASH_KEY);
    const validHashes = customHash ? [customHash, ...DEFAULT_MASTER_HASHES] : DEFAULT_MASTER_HASHES;

    if (validHashes.includes(inputHash)) {
      // Success: Reset lockout attempts & create session token
      const newSession = generateSessionToken();
      sessionStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(newSession));
      localStorage.removeItem(LOCKOUT_STORAGE_KEY);
      setLockoutState({ attempts: 0, lockedUntil: null });
      setIsAdminAuthenticated(true);
      return { success: true };
    } else {
      // Failed attempt
      const newAttempts = lockoutState.attempts + 1;
      let newLockedUntil: number | null = null;
      if (newAttempts >= MAX_AUTH_ATTEMPTS) {
        newLockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      }
      const updatedLockout = { attempts: newAttempts, lockedUntil: newLockedUntil };
      localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify(updatedLockout));
      setLockoutState(updatedLockout);

      if (newLockedUntil) {
        return {
          success: false,
          message: `Maximum authorization attempts exceeded. Locked out for 15 minutes.`
        };
      }
      const remaining = MAX_AUTH_ATTEMPTS - newAttempts;
      return {
        success: false,
        message: `Incorrect passcode. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining before lockout.`
      };
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    setIsAdminOpen(false);
  };

  const changeMasterPasscode = async (oldPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    if (newPass.trim().length < 8) {
      return { success: false, message: 'New passcode must be at least 8 characters long.' };
    }
    const oldHash = await computeSaltedHash(oldPass);
    const customHash = localStorage.getItem(CUSTOM_HASH_KEY);
    const validHashes = customHash ? [customHash, ...DEFAULT_MASTER_HASHES] : DEFAULT_MASTER_HASHES;

    if (!validHashes.includes(oldHash)) {
      return { success: false, message: 'Current passcode is incorrect.' };
    }

    const newHash = await computeSaltedHash(newPass);
    localStorage.setItem(CUSTOM_HASH_KEY, newHash);
    return { success: true, message: 'Master passcode updated successfully.' };
  };

  // --- Content Datasets with LocalStorage Persistence ---
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_HERO`);
    return saved ? JSON.parse(saved) : defaultHeroSlides;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_DESTINATIONS`);
    return saved ? JSON.parse(saved) : defaultDestinations;
  });

  const [beaches, setBeaches] = useState<BeachDestination[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_BEACHES`);
    return saved ? JSON.parse(saved) : defaultBeaches;
  });

  const [mountainFeatures, setMountainFeatures] = useState<MountainFeature[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_MOUNTAINS`);
    return saved ? JSON.parse(saved) : defaultMountains;
  });

  const [wildlifeSpecies, setWildlifeSpecies] = useState<WildlifeSpecies[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_WILDLIFE`);
    return saved ? JSON.parse(saved) : defaultWildlife;
  });

  const [nationalParks, setNationalParks] = useState<NationalPark[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_PARKS`);
    return saved ? JSON.parse(saved) : defaultParks;
  });

  const [heritageSites, setHeritageSites] = useState<HeritageSite[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_HERITAGE`);
    return saved ? JSON.parse(saved) : defaultHeritage;
  });

  const [culinaryDishes, setCulinaryDishes] = useState<CulinaryDish[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_FOOD`);
    return saved ? JSON.parse(saved) : defaultFood;
  });

  const [experiences, setExperiences] = useState<BucketListExperience[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_EXPERIENCES`);
    return saved ? JSON.parse(saved) : defaultExperiences;
  });

  const [regions, setRegions] = useState<RegionInfo[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_REGIONS`);
    return saved ? JSON.parse(saved) : defaultRegions;
  });

  // Persist overrides to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_HERO`, JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_DESTINATIONS`, JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_BEACHES`, JSON.stringify(beaches));
  }, [beaches]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_MOUNTAINS`, JSON.stringify(mountainFeatures));
  }, [mountainFeatures]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_WILDLIFE`, JSON.stringify(wildlifeSpecies));
  }, [wildlifeSpecies]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_PARKS`, JSON.stringify(nationalParks));
  }, [nationalParks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_HERITAGE`, JSON.stringify(heritageSites));
  }, [heritageSites]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_FOOD`, JSON.stringify(culinaryDishes));
  }, [culinaryDishes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_EXPERIENCES`, JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_REGIONS`, JSON.stringify(regions));
  }, [regions]);

  // Media Image Updater
  const updateImage = (category: string, id: string, newImageUrl: string) => {
    if (!newImageUrl) return;
    switch (category) {
      case 'hero':
        setHeroSlides((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'destinations':
        setDestinations((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'beaches':
        setBeaches((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'mountains':
        setMountainFeatures((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'wildlife':
        setWildlifeSpecies((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'parks':
        setNationalParks((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'heritage':
        setHeritageSites((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'food':
        setCulinaryDishes((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'experiences':
        setExperiences((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      case 'regions':
        setRegions((prev) => prev.map((item) => (item.id === id ? { ...item, image: newImageUrl } : item)));
        break;
      default:
        break;
    }
  };

  // Granular Content Updaters
  const updateHeroSlide = (id: string, updates: Partial<HeroSlide>) => {
    setHeroSlides((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateDestination = (id: string, updates: Partial<Destination>) => {
    setDestinations((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateBeach = (id: string, updates: Partial<BeachDestination>) => {
    setBeaches((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateMountain = (id: string, updates: Partial<MountainFeature>) => {
    setMountainFeatures((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateWildlife = (id: string, updates: Partial<WildlifeSpecies>) => {
    setWildlifeSpecies((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updatePark = (id: string, updates: Partial<NationalPark>) => {
    setNationalParks((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateHeritage = (id: string, updates: Partial<HeritageSite>) => {
    setHeritageSites((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateFood = (id: string, updates: Partial<CulinaryDish>) => {
    setCulinaryDishes((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateExperience = (id: string, updates: Partial<BucketListExperience>) => {
    setExperiences((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const updateRegion = (id: string, updates: Partial<RegionInfo>) => {
    setRegions((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  // Single Item Reset
  const resetSingleItem = (category: string, id: string) => {
    switch (category) {
      case 'hero': {
        const def = defaultHeroSlides.find((x) => x.id === id);
        if (def) setHeroSlides((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'destinations': {
        const def = defaultDestinations.find((x) => x.id === id);
        if (def) setDestinations((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'beaches': {
        const def = defaultBeaches.find((x) => x.id === id);
        if (def) setBeaches((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'mountains': {
        const def = defaultMountains.find((x) => x.id === id);
        if (def) setMountainFeatures((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'wildlife': {
        const def = defaultWildlife.find((x) => x.id === id);
        if (def) setWildlifeSpecies((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'parks': {
        const def = defaultParks.find((x) => x.id === id);
        if (def) setNationalParks((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'heritage': {
        const def = defaultHeritage.find((x) => x.id === id);
        if (def) setHeritageSites((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'food': {
        const def = defaultFood.find((x) => x.id === id);
        if (def) setCulinaryDishes((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'experiences': {
        const def = defaultExperiences.find((x) => x.id === id);
        if (def) setExperiences((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
      case 'regions': {
        const def = defaultRegions.find((x) => x.id === id);
        if (def) setRegions((prev) => prev.map((x) => (x.id === id ? def : x)));
        break;
      }
    }
  };

  // Reset Everything to default
  const resetAllToDefault = () => {
    setHeroSlides(defaultHeroSlides);
    setDestinations(defaultDestinations);
    setBeaches(defaultBeaches);
    setMountainFeatures(defaultMountains);
    setWildlifeSpecies(defaultWildlife);
    setNationalParks(defaultParks);
    setHeritageSites(defaultHeritage);
    setCulinaryDishes(defaultFood);
    setExperiences(defaultExperiences);
    setRegions(defaultRegions);
    
    // Clear dataset keys
    [
      `${STORAGE_KEY}_HERO`,
      `${STORAGE_KEY}_DESTINATIONS`,
      `${STORAGE_KEY}_BEACHES`,
      `${STORAGE_KEY}_MOUNTAINS`,
      `${STORAGE_KEY}_WILDLIFE`,
      `${STORAGE_KEY}_PARKS`,
      `${STORAGE_KEY}_HERITAGE`,
      `${STORAGE_KEY}_FOOD`,
      `${STORAGE_KEY}_EXPERIENCES`,
      `${STORAGE_KEY}_REGIONS`
    ].forEach((k) => localStorage.removeItem(k));
  };

  // JSON Export & Import
  const exportConfigurationJSON = (): string => {
    const config = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
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
    return JSON.stringify(config, null, 2);
  };

  const importConfigurationJSON = (jsonString: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Invalid configuration format.' };
      }
      if (Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides);
      if (Array.isArray(data.destinations)) setDestinations(data.destinations);
      if (Array.isArray(data.beaches)) setBeaches(data.beaches);
      if (Array.isArray(data.mountainFeatures)) setMountainFeatures(data.mountainFeatures);
      if (Array.isArray(data.wildlifeSpecies)) setWildlifeSpecies(data.wildlifeSpecies);
      if (Array.isArray(data.nationalParks)) setNationalParks(data.nationalParks);
      if (Array.isArray(data.heritageSites)) setHeritageSites(data.heritageSites);
      if (Array.isArray(data.culinaryDishes)) setCulinaryDishes(data.culinaryDishes);
      if (Array.isArray(data.experiences)) setExperiences(data.experiences);
      if (Array.isArray(data.regions)) setRegions(data.regions);

      return { success: true, message: 'Configuration successfully imported and applied!' };
    } catch (err) {
      return { success: false, message: `Import error: ${(err as Error).message}` };
    }
  };

  // Compute total custom overrides count compared to code defaults
  const totalCustomOverridesCount = [
    heroSlides.filter((h, i) => h.image !== defaultHeroSlides[i]?.image || h.title !== defaultHeroSlides[i]?.title).length,
    destinations.filter((d, i) => d.image !== defaultDestinations[i]?.image || d.description !== defaultDestinations[i]?.description).length,
    beaches.filter((b, i) => b.image !== defaultBeaches[i]?.image).length,
    mountainFeatures.filter((m, i) => m.image !== defaultMountains[i]?.image).length,
    wildlifeSpecies.filter((w, i) => w.image !== defaultWildlife[i]?.image).length,
    nationalParks.filter((p, i) => p.image !== defaultParks[i]?.image).length,
    heritageSites.filter((h, i) => h.image !== defaultHeritage[i]?.image).length,
    culinaryDishes.filter((f, i) => f.image !== defaultFood[i]?.image).length,
    experiences.filter((e, i) => e.image !== defaultExperiences[i]?.image).length,
    regions.filter((r, i) => r.image !== defaultRegions[i]?.image).length,
  ].reduce((a, b) => a + b, 0);

  const attemptsRemaining = Math.max(0, MAX_AUTH_ATTEMPTS - lockoutState.attempts);

  return (
    <MediaContext.Provider
      value={{
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
        updateHeroSlide,
        updateDestination,
        updateBeach,
        updateMountain,
        updateWildlife,
        updatePark,
        updateHeritage,
        updateFood,
        updateExperience,
        updateRegion,
        resetSingleItem,
        resetAllToDefault,
        exportConfigurationJSON,
        importConfigurationJSON,
        totalCustomOverridesCount,
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
        directEditTarget,
        setDirectEditTarget
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
