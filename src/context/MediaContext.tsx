import React, { createContext, useContext, useState, useEffect } from 'react';
import { destinations as defaultDestinations } from '../data/destinations';
import { beaches as defaultBeaches } from '../data/beaches';
import { mountainFeatures as defaultMountains } from '../data/mountains';
import { wildlifeSpecies as defaultWildlife, nationalParks as defaultParks } from '../data/wildlife';
import { heritageSites as defaultHeritage } from '../data/culture';
import { culinaryDishes as defaultFood } from '../data/food';
import { experiences as defaultExperiences } from '../data/experiences';
import { regions as defaultRegions } from '../data/regions';
import type { Destination, BeachDestination, MountainFeature, WildlifeSpecies, NationalPark, HeritageSite, CulinaryDish, BucketListExperience, RegionInfo } from '../types/travel';

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

interface MediaContextType {
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
  updateImage: (category: string, id: string, newImageUrl: string) => void;
  resetAllToDefault: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = 'SERENDIB_MEDIA_OVERRIDES_V2';
const AUTH_KEY = 'SERENDIB_ADMIN_AUTH_V1';
const MASTER_PASSCODES = ['serendib2026', 'admin@serendib', 'serendib', 'admin123'];

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const loginAdmin = (passcode: string): boolean => {
    const trimmed = passcode.trim();
    if (MASTER_PASSCODES.includes(trimmed)) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setIsAdminOpen(false);
  };

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
    localStorage.clear();
  };

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
        resetAllToDefault,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin
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
