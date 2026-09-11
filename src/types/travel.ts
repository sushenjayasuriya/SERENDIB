export interface Destination {
  id: string;
  number: string;
  name: string;
  tagline: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapPosition: {
    x: number; // percentage on stylized map (0-100)
    y: number; // percentage on stylized map (0-100)
  };
  image: string;
  gallery: string[];
  description: string;
  bestKnownFor: string[];
  climate: string;
  elevation: string;
  recommendedStay: string;
  keyHighlights: string[];
  culturalSignificance?: string;
  tags: ('coastal' | 'highland' | 'heritage' | 'wildlife' | 'urban')[];
}

export interface BeachDestination {
  id: string;
  name: string;
  region: string;
  bestKnownFor: string;
  atmosphere: string;
  surfSeason: string;
  waterTemp: string;
  image: string;
  highlights: string[];
}

export interface MountainFeature {
  id: string;
  name: string;
  tagline: string;
  altitude: string;
  image: string;
  story: string;
  keyFeatures: string[];
}

export interface WildlifeSpecies {
  id: string;
  name: string;
  sinhalaName: string;
  scientificName: string;
  status: string;
  image: string;
  description: string;
  bestParks: string[];
  sightingTips: string;
}

export interface NationalPark {
  id: string;
  name: string;
  region: string;
  area: string;
  knownFor: string;
  image: string;
  notableFauna: string[];
}

export interface HeritageSite {
  id: string;
  name: string;
  period: string;
  unescoYear?: number;
  location: string;
  image: string;
  significance: string;
  architecturalWonder: string;
  visitorTip: string;
}

export interface CulinaryDish {
  id: string;
  name: string;
  sinhalaName: string;
  tagline: string;
  image: string;
  description: string;
  flavorProfile: string[];
  keyIngredients: string[];
  pairing: string;
}

export interface BucketListExperience {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  bestTime: string;
  duration: string;
  quote: string;
}

export interface RegionInfo {
  id: string;
  name: string;
  tagline: string;
  landscape: string;
  weatherSummary: string;
  destinations: string[];
  highlights: string[];
  image: string;
  colorTone: string;
}

export interface TravelGuideTopic {
  id: string;
  title: string;
  shortSummary: string;
  details: {
    label: string;
    value: string;
  }[];
  content: string;
  iconName: string;
}

export interface ItineraryStop {
  day: string;
  destination: string;
  region: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  stayRecommendation: string;
  travelTime?: string;
  image: string;
}

export interface GeneratedItinerary {
  id: string;
  duration: number;
  themeTitle: string;
  summary: string;
  idealFor: string;
  routeStops: string[];
  days: ItineraryStop[];
}
