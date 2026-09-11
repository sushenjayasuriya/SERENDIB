import type { GeneratedItinerary } from '../types/travel';

export const predefinedItineraries: Record<string, GeneratedItinerary> = {
  'classic-7': {
    id: 'classic-7',
    duration: 7,
    themeTitle: 'The Quintessential Emerald Odyssey',
    summary: 'A balanced introductory voyage across ancient kingdoms, misty tea hills, and colonial ocean ramparts.',
    idealFor: 'First-time visitors wanting the complete iconic Sri Lanka experience.',
    routeStops: ['Colombo', 'Sigiriya', 'Kandy', 'Ella', 'Galle'],
    days: [
      {
        day: 'Day 01',
        destination: 'Colombo',
        region: 'Western Province',
        title: 'Arrival & Colonial Harbor Sunset',
        morning: 'Touch down at Bandaranaike International Airport (CMB). Check in to an oceanfront heritage hotel.',
        afternoon: 'Stroll through the Old Dutch Hospital precinct and sample artisan Ceylon tea at Dilmah t-Lounge.',
        evening: 'Sunset street-food walk along Galle Face Green; world-class crab feast at Ministry of Crab.',
        stayRecommendation: 'Galle Face Hotel / Tintagel Colombo',
        travelTime: '45 mins from Airport',
        image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 02',
        destination: 'Sigiriya',
        region: 'Cultural Triangle',
        title: 'The Fortress in the Sky & Dambulla Caves',
        morning: 'Scenic morning drive into the dry-zone plains; explore Dambulla Golden Rock Cave Temples.',
        afternoon: 'Late afternoon ascent of Sigiriya Rock Citadel before the sun sets over the emerald jungle canopy.',
        evening: 'Traditional candlelit rice & curry banquet with organic lake fish in a rustic mud-hut village retreat.',
        stayRecommendation: 'Water Garden Sigiriya / Jetwing Vil Uyana',
        travelTime: '3.5 Hours drive',
        image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 03',
        destination: 'Kandy',
        region: 'Central Province',
        title: 'Sacred Relics & Royal Highlands',
        morning: 'Sunrise climb up Pidurangala for epic Sigiriya photography; spice garden walk in Matale.',
        afternoon: 'Wander Peradeniya Royal Botanical Gardens beneath century-old giant bamboo and orchid groves.',
        evening: 'Attend the vibrant evening drumming Puja at the Temple of the Sacred Tooth Relic (Sri Dalada Maligawa).',
        stayRecommendation: 'The Kandy House / King’s Pavilion',
        travelTime: '2.5 Hours drive',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 04',
        destination: 'Ella via Scenic Train',
        region: 'Central Highlands',
        title: 'The World’s Most Scenic Railway Odyssey',
        morning: 'Board the iconic blue train from Peradeniya/Nanu Oya; window-gaze across emerald tea valleys and waterfalls.',
        afternoon: 'Arrive in Ella mountain village; check into a ridge bungalow with panoramic Ella Gap vistas.',
        evening: 'Sunset hike up Little Adam’s Peak; craft cocktails and live acoustic music in Ella village.',
        stayRecommendation: '98 Acres Resort & Spa / Ceylon Tea Trails',
        travelTime: '6 Hours panoramic train journey',
        image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 05',
        destination: 'Ella to Yala Safaris',
        region: 'Highlands to Wild South',
        title: 'Nine Arch Viaduct & Leopard Kingdom',
        morning: 'Watch the sunrise train cross the stone arches of Demodara Nine Arch Bridge; visit Ravana Falls.',
        afternoon: 'Descend the southern escarpment to Yala National Park for a private open-top 4x4 safari.',
        evening: 'Spot leopards, wild elephants, and sloth bears; luxury glamping under the Milky Way by the ocean.',
        stayRecommendation: 'Wild Coast Tented Lodge / Chena Huts',
        travelTime: '2.5 Hours drive',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 06',
        destination: 'Galle Fort',
        region: 'Southern Coast',
        title: 'Colonial Ramparts & Ocean Sunsets',
        morning: 'Early morning coastal drive along the southern surf beaches with a stop at Coconut Tree Hill, Mirissa.',
        afternoon: 'Wander Galle Fort’s cobbled lanes, artisan jewelry boutiques, antique stores, and gelaterias.',
        evening: 'Walk the historic lighthouse ramparts at golden hour; candlelit Dutch seafood dinner.',
        stayRecommendation: 'Amangalla / Fort Bazaar',
        travelTime: '2 Hours coastal drive',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 07',
        destination: 'Colombo / Departure',
        region: 'Southern Expressway',
        title: 'Tropical Farewell & Departure',
        morning: 'Relaxed breakfast with fresh tropical fruits and hopper live station overlooking the ocean.',
        afternoon: 'Private transfer along the Southern Highway to Colombo for last-minute Ceylon tea & sapphire shopping.',
        evening: 'Transfer to Colombo Airport (CMB) for your onward flight with memories for a lifetime.',
        stayRecommendation: 'Departure',
        travelTime: '2 Hours highway transfer',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  'wildlife-beach-10': {
    id: 'wildlife-beach-10',
    duration: 10,
    themeTitle: 'The Wild & Ocean Sanctuary',
    summary: 'A coastal and safari deep dive: Blue Whales, apex leopards, secret surf bays, and elephant gatherings.',
    idealFor: 'Wildlife photographers, ocean lovers, and relaxed tropical travelers.',
    routeStops: ['Negombo', 'Minneriya', 'Kandy', 'Yala', 'Mirissa', 'Galle'],
    days: [
      {
        day: 'Day 01',
        destination: 'Negombo Coastal Lagoon',
        region: 'West Coast',
        title: 'Arrival & Fisherman Lagoon Cruise',
        morning: 'Arrive at CMB; unwind at a serene beach villa.',
        afternoon: 'Catamaran boat ride through the Dutch Canal and coastal mangroves.',
        evening: 'Fresh grilled jumbo prawns by the beach.',
        stayRecommendation: 'The Wallawwa / Heritance Negombo',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 02–03',
        destination: 'Minneriya & Sigiriya',
        region: 'Cultural Jungle',
        title: 'The Great Elephant Gathering & Sky Citadel',
        morning: 'Sunrise climb up Pidurangala rock with vistas of Sigiriya.',
        afternoon: 'Afternoon private safari in Minneriya observing hundreds of wild elephant families.',
        evening: 'Night stargazing and nocturnal loris walk.',
        stayRecommendation: 'Jetwing Vil Uyana',
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 04–05',
        destination: 'Yala & Bundala Wetlands',
        region: 'Deep South Safari',
        title: 'Leopards, Sloth Bears & Flamingos',
        morning: 'Dawn game drive in Yala Block 1 for leopards sunning on granite rocks.',
        afternoon: 'Birdwatching cruise through Bundala Ramsar wetlands.',
        evening: 'Campfire dinner with authentic Sri Lankan grill under open skies.',
        stayRecommendation: 'Wild Coast Tented Lodge',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 06–08',
        destination: 'Mirissa & Hiriketiya',
        region: 'South Coast Ocean',
        title: 'Blue Whale Expeditions & Surf Coves',
        morning: 'Catamaran cruise to the continental shelf to witness Blue & Sperm Whales.',
        afternoon: 'Surfing lessons in Hiriketiya horseshoe bay; relax at beachfront boutique cafes.',
        evening: 'Sunset coconut cocktails at Coconut Tree Hill.',
        stayRecommendation: 'Malabar Hill / Sri Sharavi Beach Villas',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 09–10',
        destination: 'Galle Fort & Departure',
        region: 'Southern Heritage Coast',
        title: 'UNESCO Ramparts & Coastal Departure',
        morning: 'Guided architecture walk of the Dutch Fort ramparts.',
        afternoon: 'Artisan sapphire and cinnamon shopping.',
        evening: 'Final seafood dinner at Fort Printers before smooth highway transfer to airport.',
        stayRecommendation: 'Amangalla',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  'culture-highland-14': {
    id: 'culture-highland-14',
    duration: 14,
    themeTitle: 'The Grand Imperial & Highland Heritage',
    summary: 'The ultimate 2-week grand expedition encompassing Anuradhapura, Jaffna, Sigiriya, Kandy, Nuwara Eliya, Ella, and Galle.',
    idealFor: 'Enthusiasts of deep cultural immersion, slow travel, and breathtaking geography.',
    routeStops: ['Colombo', 'Anuradhapura', 'Jaffna', 'Sigiriya', 'Kandy', 'Nuwara Eliya', 'Ella', 'Galle'],
    days: [
      {
        day: 'Day 01–02',
        destination: 'Colombo & Negombo',
        region: 'West Gateway',
        title: 'Colonial Arrival & Cosmopolitan Energy',
        morning: 'Check in, heritage architecture tour, Pettah spice markets.',
        afternoon: 'National Museum & Geoffrey Bawa architectural pilgrimage.',
        evening: 'Sunset dining on Galle Face promenade.',
        stayRecommendation: 'Tintagel Colombo',
        image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 03–04',
        destination: 'Anuradhapura & Wilpattu',
        region: 'Ancient North Central',
        title: '2,500-Year Sacred Kingdom & Wild Leopards',
        morning: 'Bicycle through the vast sacred stupas and Jaya Sri Maha Bodhi.',
        afternoon: 'Safari in Wilpattu National Park around natural sand-rimmed lakes.',
        evening: 'Sunset meditation at Mihintale cradle of Buddhism.',
        stayRecommendation: 'Ulagalla by Uga Escapes',
        image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 05–06',
        destination: 'Jaffna Peninsula & Delft',
        region: 'Northern Kingdom',
        title: 'Golden Kovils, Palmyra Horizons & Fiery Curries',
        morning: 'Experience morning rituals at Nallur Kandaswamy Kovil.',
        afternoon: 'Ferry to Delft Island to see wild horses and baobab trees.',
        evening: 'Northern Jaffna crab curry feast.',
        stayRecommendation: 'Jetwing Jaffna / Fox Resort',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 07–08',
        destination: 'Sigiriya & Polonnaruwa',
        region: 'Cultural Triangle',
        title: 'Palaces in the Sky & Medieval Masterpieces',
        morning: 'Sigiriya rock climb at dawn; Gal Vihara rock statues.',
        afternoon: 'Explore Polonnaruwa ancient palace ruins and reservoir canals.',
        evening: 'Ayurvedic herbal massage and wellness bath.',
        stayRecommendation: 'Water Garden Sigiriya',
        image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 09–10',
        destination: 'Kandy & Nuwara Eliya',
        region: 'Central Highlands',
        title: 'Sacred Relics & High-Grown Tea Estates',
        morning: 'Temple of the Tooth puja; Peradeniya botanical gardens.',
        afternoon: 'Drive into the misty tea mountains of Nuwara Eliya.',
        evening: 'High tea at the Grand Hotel; Pedro Tea Factory tasting.',
        stayRecommendation: 'Ceylon Tea Trails / Heritance Tea Factory',
        image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 11–12',
        destination: 'Ella & Nine Arch Viaduct',
        region: 'Mountain Passes',
        title: 'Iconic Scenic Railway & Peak Trails',
        morning: 'Highland train ride; Little Adam’s Peak sunrise hike.',
        afternoon: 'Photography at Nine Arch Bridge; Ravana Falls swim.',
        evening: 'Artisanal dinner overlooking the deep Ella Gap.',
        stayRecommendation: '98 Acres Resort',
        image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 13–14',
        destination: 'Galle Fort & Ocean Finale',
        region: 'Southern Coast',
        title: 'UNESCO Fort Bastions & Coastal Departure',
        morning: 'Coastline drive with stilt fisherman viewpoints.',
        afternoon: 'Galle Fort boutique shopping and lighthouse walk.',
        evening: 'Farewell sunset dinner on the ramparts before airport transfer.',
        stayRecommendation: 'Amangalla',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  'escape-3': {
    id: 'escape-3',
    duration: 3,
    themeTitle: 'The Express Island Glimpse',
    summary: 'A fast-paced weekend luxury escape linking the historic capital, tea country, and southern coast.',
    idealFor: 'Stopover travelers or short holiday seekers wanting maximum highlights in minimum time.',
    routeStops: ['Colombo', 'Kandy / Highlands', 'Galle Fort'],
    days: [
      {
        day: 'Day 01',
        destination: 'Colombo to Kandy',
        region: 'Central Highlands',
        title: 'Capital Flavors & Sacred Relics',
        morning: 'Early morning arrival; express scenic transfer to Kandy.',
        afternoon: 'Visit the Temple of the Sacred Tooth Relic and stroll around Kandy Lake.',
        evening: 'Traditional Kandyan dance performance and hill-view dinner.',
        stayRecommendation: 'The Kandy House',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 02',
        destination: 'Highland Tea to Southern Coast',
        region: 'Highlands to Galle',
        title: 'Tea Factory Secrets & Galle Fort Ramparts',
        morning: 'Morning Ceylon tea estate walk and artisan tasting.',
        afternoon: 'Scenic drive to UNESCO Galle Fort along the southern expressway.',
        evening: 'Lighthouse sunset stroll and fresh lobster dinner inside the Dutch Fort.',
        stayRecommendation: 'Fort Bazaar Galle',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        day: 'Day 03',
        destination: 'Galle to Colombo Airport',
        region: 'South Coast',
        title: 'Ocean Sunrise & Departure',
        morning: 'Breakfast on the ramparts; quick dip at Unawatuna or Jungle Beach.',
        afternoon: 'Smooth highway transfer to Colombo for shopping at Barefoot and Paradise Road.',
        evening: 'Direct transfer to Colombo Airport (CMB) for departure.',
        stayRecommendation: 'Departure',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  }
};

export const getCustomItinerary = (duration: number, selectedInterests: string[]): GeneratedItinerary => {
  // Return matching or best-fit tailored itinerary
  if (duration <= 4) return predefinedItineraries['escape-3'];
  if (duration <= 8) return predefinedItineraries['classic-7'];
  if (duration <= 11) {
    if (selectedInterests.includes('WILDLIFE') || selectedInterests.includes('BEACH')) {
      return predefinedItineraries['wildlife-beach-10'];
    }
    return predefinedItineraries['classic-7'];
  }
  return predefinedItineraries['culture-highland-14'];
};
