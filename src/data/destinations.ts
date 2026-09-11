import type { Destination } from '../types/travel';

export const destinations: Destination[] = [
  {
    id: 'colombo',
    number: '01',
    name: 'COLOMBO',
    tagline: "The island's energetic oceanfront capital.",
    region: 'Western Province',
    coordinates: { lat: 6.9271, lng: 79.8612 },
    mapPosition: { x: 26, y: 70 },
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Where colonial British, Portuguese, and Dutch heritage seamlessly blends with vibrant open-air bazaars in Pettah, contemporary rooftop dining, and sunset sea breezes along Galle Face Green.',
    bestKnownFor: ['Galle Face Green Promenade', 'Pettah Floating Markets', 'Old Dutch Hospital Precinct', 'Seema Malaka Lake Temple'],
    climate: '28°C–32°C · Tropical Coastal',
    elevation: '5 m above sea level',
    recommendedStay: '1–2 Days',
    keyHighlights: [
      'Stroll along the historic Galle Face Green oceanfront promenade at golden hour',
      'Explore the vibrant spice, textile, and gem markets of Pettah',
      'Dine on legendary Ceylon lagoon crab in the restored 17th-century Old Dutch Hospital',
      'Visit the serene Geoffrey Bawa-designed Seema Malaka temple on Beira Lake'
    ],
    culturalSignificance: 'A historic deep-sea trading port connecting East and West along maritime silk routes for over two millennia.',
    tags: ['urban', 'coastal']
  },
  {
    id: 'galle',
    number: '02',
    name: 'GALLE',
    tagline: 'Colonial ramparts, ocean sunsets and living history.',
    region: 'Southern Province',
    coordinates: { lat: 6.0535, lng: 80.2210 },
    mapPosition: { x: 30, y: 88 },
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A 17th-century UNESCO World Heritage fortified enclave where thick coral-stone ramparts defend cobblestone lanes, artisan jewelry ateliers, boutique spice mansions, and panoramic Indian Ocean horizons.',
    bestKnownFor: ['UNESCO Dutch Fort Ramparts', 'Galle Lighthouse & Flag Rock', 'Colonial Boutique Architecture', 'Art & Literary Scene'],
    climate: '27°C–30°C · Balmy Ocean',
    elevation: '12 m above sea level',
    recommendedStay: '2–3 Days',
    keyHighlights: [
      'Walk the full perimeter bastion walls at sunset overlooking crashing southern waves',
      'Photograph the iconic white lighthouse framed by coconut palms at Point Utrecht Bastion',
      'Browse local sapphire jewelers, spice merchants, and handwoven textile studios',
      'Sip artisan Ceylon white tea in the courtyards of century-old Dutch merchant mansions'
    ],
    culturalSignificance: 'First fortified by the Portuguese in 1588, then expanded extensively into a fortified city by the Dutch East India Company in 1663.',
    tags: ['heritage', 'coastal']
  },
  {
    id: 'ella',
    number: '03',
    name: 'ELLA',
    tagline: 'Misty mountains, emerald tea country and the scenic railway.',
    region: 'Central Highlands (Uva)',
    coordinates: { lat: 6.8667, lng: 81.0466 },
    mapPosition: { x: 58, y: 72 },
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A mountain sanctuary tucked into the southern escarpment of the highlands, renowned for rolling tea terraces, the stone arches of Demodara Nine Arch Bridge, and panoramic gaps into the southern plains.',
    bestKnownFor: ['Demodara Nine Arch Bridge', "Little Adam's Peak Ridge Hike", 'Ravana Waterfall', 'Highland Blue Train'],
    climate: '18°C–24°C · Crisp Highland Air',
    elevation: '1,041 m above sea level',
    recommendedStay: '2–3 Days',
    keyHighlights: [
      'Watch the blue highland train curve across the stone arches of Demodara Bridge',
      'Hike Little Adam’s Peak at dawn for 360-degree mountain gap vistas',
      'Witness the cascading roar of Ravana Falls in the canyon pass',
      'Sample single-estate high-grown Ceylon tea with views stretching to the southern coast'
    ],
    culturalSignificance: 'Rich in prehistoric folklore and legends associated with King Ravana and the ancient Ramayana.',
    tags: ['highland']
  },
  {
    id: 'kandy',
    number: '04',
    name: 'KANDY',
    tagline: 'Sacred temples, royal history and mountain lake tranquility.',
    region: 'Central Province',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    mapPosition: { x: 48, y: 58 },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The last royal capital of ancient Sri Lanka, cradled in lush forested hills around a central lake and home to the sacred Temple of the Sacred Tooth Relic — the spiritual heart of the island.',
    bestKnownFor: ['Temple of the Sacred Tooth', 'Royal Botanical Gardens Peradeniya', 'Kandy Lake Promenade', 'Esala Perahera Pageant'],
    climate: '22°C–28°C · Moderate Highland',
    elevation: '500 m above sea level',
    recommendedStay: '2 Days',
    keyHighlights: [
      'Witness the evening drumming puja ceremony at Sri Dalada Maligawa',
      'Walk beneath giant Javanese fig trees and orchid houses at Peradeniya Gardens',
      'Stroll the tranquil perimeter of Kandy Lake in the cool morning mist',
      'Explore traditional Kandyan brasswork, woodcarving, and lacquer artisan workshops'
    ],
    culturalSignificance: 'A UNESCO World Heritage City and the royal seat of Sinhalese sovereignty until 1815.',
    tags: ['heritage', 'highland']
  },
  {
    id: 'sigiriya',
    number: '05',
    name: 'SIGIRIYA',
    tagline: 'An ancient rock fortress rising dramatically above the jungle canopy.',
    region: 'Cultural Triangle (Matale)',
    coordinates: { lat: 7.9570, lng: 80.7603 },
    mapPosition: { x: 48, y: 44 },
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A 200-meter sheer monolith crowned by the 5th-century palace citadel of King Kashyapa, celebrated for its ancient frescoed maidens, polished mirror wall, colossal carved lion paws, and hydraulic water gardens.',
    bestKnownFor: ['5th-Century Sky Palace Ruins', 'Celestial Maiden Frescoes', 'Mirror Wall Inscriptions', 'Symmetrical Water Gardens'],
    climate: '26°C–32°C · Dry-Zone Tropical Plains',
    elevation: '349 m above sea level',
    recommendedStay: '1–2 Days',
    keyHighlights: [
      'Ascend the spiral staircases to view preserved 1,500-year-old painted frescoes',
      'Pass through the monumental carved stone Lion’s Paws to the summit royal palace ruins',
      'Climb neighbouring Pidurangala Rock at dawn for iconic sunrise photography of Sigiriya',
      'Marvel at ancient hydraulic moats and fountains that still operate after centuries'
    ],
    culturalSignificance: 'A UNESCO World Heritage Site regarded as one of the best-preserved examples of ancient Asian urban planning.',
    tags: ['heritage']
  },
  {
    id: 'nuwara-eliya',
    number: '06',
    name: 'NUWARA ELIYA',
    tagline: 'Highland tea estates, crisp mountain air and alpine valleys.',
    region: 'Central Highlands',
    coordinates: { lat: 6.9497, lng: 80.7891 },
    mapPosition: { x: 46, y: 66 },
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Situated nearly 2,000 meters above sea level, this cool mountain valley is blanketed in manicured Ceylon tea plantations, cedar forests, English gardens, and dramatic highland peaks.',
    bestKnownFor: ['Single-Estate Ceylon Tea', 'Horton Plains & World’s End', 'Lake Gregory', 'Pedro Tea Estate'],
    climate: '12°C–18°C · Cool Alpine Climate',
    elevation: '1,868 m above sea level',
    recommendedStay: '2 Days',
    keyHighlights: [
      'Trek the montane plateau of Horton Plains to peer over the 880m sheer drop at World’s End',
      'Walk alongside expert tea pluckers harvesting "two leaves and a bud" on misty hillsides',
      'Taste single-estate high-grown Ceylon black and silver-tip teas fresh from orthodox factories',
      'Stroll through Hakgala Botanical Gardens nestled beneath soaring granite cliffs'
    ],
    culturalSignificance: 'The historic capital of Ceylon’s world-renowned orthodox tea industry established in the 19th century.',
    tags: ['highland']
  },
  {
    id: 'mirissa',
    number: '07',
    name: 'MIRISSA',
    tagline: 'Golden palm bays, blue whales and laid-back ocean living.',
    region: 'Southern Province',
    coordinates: { lat: 5.9483, lng: 80.4716 },
    mapPosition: { x: 38, y: 92 },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A crescent of golden sand fringed by coconut headlands, celebrated worldwide as one of the premier locations on earth to encounter migrating Blue Whales, Sperm Whales, and spinner dolphins in their natural oceanic habitat.',
    bestKnownFor: ['Blue Whale Expeditions', 'Coconut Tree Hill Promontory', 'Secret Beach Cove', 'Sunset Seafood BBQs'],
    climate: '28°C–32°C · Tropical Sunny',
    elevation: '3 m above sea level',
    recommendedStay: '2–3 Days',
    keyHighlights: [
      'Embark at dawn into the deep marine canyon to see the world’s largest mammal — the Blue Whale',
      'Catch the golden glow of twilight atop the famous Coconut Tree Hill headland',
      'Surf peeling right-hand reef waves in warm 28°C water',
      'Relax at candlelit seaside seafood tables with catch-of-the-day grilled over coconut charcoal'
    ],
    culturalSignificance: 'A historic southern fishing village transformed into a renowned marine wildlife conservation hub.',
    tags: ['coastal', 'wildlife']
  },
  {
    id: 'arugam-bay',
    number: '08',
    name: 'ARUGAM BAY',
    tagline: 'World-class point breaks, golden sands and wild coastal lagoons.',
    region: 'Eastern Province',
    coordinates: { lat: 6.8436, lng: 81.8344 },
    mapPosition: { x: 78, y: 72 },
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A world-famous right-hand point break that attracts international surfers, set against wild lagoons where sea eagles soar and wild elephants occasionally wander near the shoreline at dusk.',
    bestKnownFor: ['Main Point Right-Hand Swell', 'Kottukal Lagoon Safaris', 'Elephant Rock Sunset Vista', 'Whiskey Point'],
    climate: '29°C–34°C · Sunny & Breezy',
    elevation: '2 m above sea level',
    recommendedStay: '3–4 Days',
    keyHighlights: [
      'Ride long, glassy peeling waves at Main Point, Peanut Farm, and Whiskey Point',
      'Paddle through Kottukal Lagoon by wooden canoe spotting wild crocodiles and water birds',
      'Climb Elephant Rock for 360-degree views of untouched coastline and grazing wild elephants',
      'Enjoy chilled King Coconut and beachside stone-baked dinners under starlit eastern skies'
    ],
    culturalSignificance: 'A world championship surfing destination coexisting alongside ancient forest hermitage ruins such as Kudumbigala.',
    tags: ['coastal']
  },
  {
    id: 'jaffna',
    number: '09',
    name: 'JAFFNA',
    tagline: 'Distinctive northern Tamil culture, golden kovils and island heritage.',
    region: 'Northern Province',
    coordinates: { lat: 9.6615, lng: 80.0255 },
    mapPosition: { x: 28, y: 12 },
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The cultural capital of Sri Lanka’s northern heritage, defined by soaring golden Hindu kovil gopurams, palmyra-lined horizons, Dutch fort ramparts, sacred thermal springs, and legendary roasted crab curries.',
    bestKnownFor: ['Nallur Kandaswamy Kovil', 'Jaffna Fort Ramparts', 'Delft Island Wild Ponies', 'Authentic Northern Crab Curry'],
    climate: '28°C–33°C · Dry Sunny Peninsula',
    elevation: '5 m above sea level',
    recommendedStay: '2–3 Days',
    keyHighlights: [
      'Experience the spiritual energy and chanting at the monumental Nallur Kandaswamy Kovil',
      'Take the ferry to remote Delft Island to discover coral boundary walls and wild ponies',
      'Feast on authentic Jaffna Crab Curry infused with toasted spices, cumin, and moringa leaves',
      'Visit the iconic Jaffna Public Library — a masterpiece of neoclassical Dravidian architecture'
    ],
    culturalSignificance: 'The ancient capital of the Jaffna Kingdom with distinct culinary, linguistic, and spiritual traditions.',
    tags: ['heritage']
  },
  {
    id: 'trincomalee',
    number: '10',
    name: 'TRINCOMALEE',
    tagline: 'Turquoise ocean waters, cliffside temples and pristine eastern beaches.',
    region: 'Eastern Province',
    coordinates: { lat: 8.5874, lng: 81.2152 },
    mapPosition: { x: 65, y: 34 },
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Home to one of the world’s greatest natural deep-water harbours, crystal-clear turquoise bays at Nilaveli, and the cliffside Koneswaram Temple perched dramatically hundreds of feet above the deep ocean.',
    bestKnownFor: ['Koneswaram Temple on Swami Rock', 'Pigeon Island Marine Park', 'Nilaveli Beach & Coral Reefs', 'Natural Deep-Water Harbour'],
    climate: '28°C–34°C · Sunny Turquoise Coast',
    elevation: '8 m above sea level',
    recommendedStay: '2–3 Days',
    keyHighlights: [
      'Snorkel with blacktip reef sharks, green sea turtles, and vibrant coral at Pigeon Island',
      'Stand on the edge of Swami Rock cliff at Koneswaram Kovil overlooking the deep blue sea',
      'Swim in the calm crystalline waters of Nilaveli Beach with soft powdery sand',
      'Explore 17th-century Fort Frederick where gentle spotted deer roam beneath ancient banyans'
    ],
    culturalSignificance: 'Celebrated by Greek, Roman, and Asian navigators since antiquity as a crucial maritime Silk Road harbor.',
    tags: ['coastal', 'heritage', 'wildlife']
  }
];
