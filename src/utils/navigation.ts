export interface SectionRoute {
  id: string;
  path: string;
  title: string;
  label: string;
}

export const SECTION_ROUTES: SectionRoute[] = [
  {
    id: 'hero',
    path: '/',
    label: 'Home',
    title: 'SERENDIB — Sri Lanka Luxury Travel & Bespoke Expedition Guide'
  },
  {
    id: 'introduction',
    path: '/about',
    label: 'About',
    title: 'The Serendib Philosophy | Sri Lanka Bespoke Expeditions'
  },
  {
    id: 'destinations',
    path: '/destinations',
    label: 'Destinations',
    title: 'Destinations & Royal Citadels | SERENDIB'
  },
  {
    id: 'map',
    path: '/map',
    label: 'Interactive Map',
    title: 'Interactive GIS Expedition Map of Sri Lanka | SERENDIB'
  },
  {
    id: 'beaches',
    path: '/beaches',
    label: 'Ocean Beaches',
    title: 'Turquoise Ocean Beaches & Surf Coastlines | SERENDIB'
  },
  {
    id: 'highlands',
    path: '/highlands',
    label: 'Highlands & Tea',
    title: 'Misty Highlands, Ceylon Tea & Scenic Rail | SERENDIB'
  },
  {
    id: 'wildlife',
    path: '/wildlife',
    label: 'Wildlife Sanctuaries',
    title: 'Big 5 Wildlife Sanctuaries & Leopard Corridors | SERENDIB'
  },
  {
    id: 'heritage',
    path: '/heritage',
    label: '2,500 Years Heritage',
    title: '2,500 Years Ancient Heritage & Sacred Citadels | SERENDIB'
  },
  {
    id: 'food',
    path: '/cuisine',
    label: 'Ceylon Cuisine',
    title: 'Ceylon Culinary Arts, Spices & Gastronomy | SERENDIB'
  },
  {
    id: 'experiences',
    path: '/experiences',
    label: 'Experiences',
    title: '10 Iconic Bucket-List Island Expeditions | SERENDIB'
  },
  {
    id: 'regions',
    path: '/regions',
    label: 'The 6 Realms',
    title: 'The 6 Island Realms & Microclimates | SERENDIB'
  },
  {
    id: 'travel-guide',
    path: '/guide',
    label: 'Travel Guide',
    title: 'Practical Island Travel Guide & Monsoons | SERENDIB'
  },
  {
    id: 'planner',
    path: '/planner',
    label: 'Journey Planner',
    title: 'Bespoke Itinerary & Expedition Architect | SERENDIB'
  }
];

// Map lookup helpers
const pathMap = new Map<string, SectionRoute>();
const idMap = new Map<string, SectionRoute>();

SECTION_ROUTES.forEach((route) => {
  pathMap.set(route.path.toLowerCase(), route);
  idMap.set(route.id.toLowerCase(), route);
});

// Aliases for compatibility
pathMap.set('/food', idMap.get('food')!);
pathMap.set('/travel-guide', idMap.get('travel-guide')!);
pathMap.set('/intro', idMap.get('introduction')!);

export function getRouteByPath(pathname: string): SectionRoute | undefined {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  return pathMap.get(cleanPath.toLowerCase());
}

export function getRouteById(id: string): SectionRoute | undefined {
  return idMap.get(id.toLowerCase());
}

/**
 * Cleanly navigate to a target section or path with smooth scrolling and HTML5 History
 */
export function navigateToSection(target: string, push: boolean = true): void {
  // Normalize target (could be '/map', 'map', '#map', etc.)
  const cleanTarget = target.replace(/^#/, '').replace(/^\//, '');
  let route = idMap.get(cleanTarget.toLowerCase()) || pathMap.get('/' + cleanTarget.toLowerCase());

  if (!route && (cleanTarget === '' || cleanTarget === 'hero' || target === '/')) {
    route = SECTION_ROUTES[0];
  }

  if (route) {
    if (route.id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(route.id);
      if (el) {
        const yOffset = -70; // Header height compensation
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    const newPath = route.path;
    if (window.location.pathname !== newPath) {
      if (push) {
        window.history.pushState({ sectionId: route.id }, route.title, newPath);
      } else {
        window.history.replaceState({ sectionId: route.id }, route.title, newPath);
      }
    }
    document.title = route.title;
  } else {
    // Fallback for custom element IDs
    const el = document.getElementById(cleanTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `/${cleanTarget}`);
    }
  }
}
