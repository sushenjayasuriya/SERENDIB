import type { WildlifeSpecies, NationalPark } from '../types/travel';

export const wildlifeSpecies: WildlifeSpecies[] = [
  {
    id: 'sri-lankan-leopard',
    name: 'Sri Lankan Leopard',
    sinhalaName: 'Kotiya (දිවියා)',
    scientificName: 'Panthera pardus kotiya',
    status: 'Endangered · Apex Island Predator',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    description: 'Unlike continental leopards that compete with lions and tigers, the Sri Lankan leopard evolved as the undisputed apex predator of the island. Bold, muscular, and exceptionally photogenic on sun-warmed rocky outcrops.',
    bestParks: ['Yala Block 1', 'Wilpattu National Park', 'Kumana National Park'],
    sightingTips: 'Highest success during early morning safaris (06:00-08:30) and late afternoon sunbathing on granite boulders.'
  },
  {
    id: 'asian-elephant',
    name: 'Sri Lankan Elephant',
    sinhalaName: 'Aliya (අලියා)',
    scientificName: 'Elephas maximus maximus',
    status: 'Endangered · Cultural & Ecological Giant',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    description: 'The largest and darkest subspecies of the Asian elephant. Sri Lanka is home to highest density of wild Asian elephants on earth, including the famous "Gathering" of 300+ giants around Minneriya Tank in the dry season.',
    bestParks: ['Minneriya (The Gathering)', 'Udawalawe', 'Wasgamuwa', 'Yala'],
    sightingTips: 'Udawalawe guarantees sightings year-round; Minneriya from July to October hosts the world’s largest elephant gathering.'
  },
  {
    id: 'sloth-bear',
    name: 'Sri Lankan Sloth Bear',
    sinhalaName: 'Walaha (වලසා)',
    scientificName: 'Melursus ursinus inornatus',
    status: 'Vulnerable · Elusive Jungle Forager',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    description: 'With shaggy black coats and sickle-like claws, these reclusive bears roam the dry-zone forests digging for termite mounds and feasting on sweet palu and weera fruits during fruiting season.',
    bestParks: ['Wilpattu National Park', 'Yala National Park', 'Wasgamuwa'],
    sightingTips: 'Peak activity occurs in June and July during the Palu berry ripening season in Wilpattu.'
  },
  {
    id: 'blue-whale',
    name: 'Blue Whale & Sperm Whale',
    sinhalaName: 'Thalmaha (තල්මසා)',
    scientificName: 'Balaenoptera musculus',
    status: 'Endangered · Earth’s Colossus',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    description: 'The deep underwater canyons off Sri Lanka’s southern and eastern coasts bring krill-rich currents exceptionally close to shore, making the island the top marine habitat on earth for resident and migrating Blue and Sperm Whales.',
    bestParks: ['Mirissa Marine Trench', 'Trincomalee Deep Harbor', 'Kalpitiya Ridge'],
    sightingTips: 'November to April in Mirissa (South); May to October in Trincomalee (East Coast).'
  },
  {
    id: 'peacock-birds',
    name: 'Ceylon Peafowl & Endemic Birds',
    sinhalaName: 'Monara (මොනරා)',
    scientificName: 'Pavo cristatus / 34 Endemic Species',
    status: 'Thriving · Vibrant Tropical Avifauna',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    description: 'From majestic Indian Peafowl displaying iridescent plumage against ancient jungle stupas to the rare Sri Lanka Blue Magpie and Junglefowl in Sinharaja rainforest, the island is a birder’s paradise with over 450 species.',
    bestParks: ['Sinharaja Rainforest', 'Bundala Ramsar Wetland', 'Kumana Bird Sanctuary'],
    sightingTips: 'Bundala during winter migratory season (November–March) is alive with thousands of flamingos and waders.'
  }
];

export const nationalParks: NationalPark[] = [
  {
    id: 'yala',
    name: 'Yala National Park',
    region: 'Southern & Uva Province',
    area: '979 km²',
    knownFor: 'Highest leopard density in the world & coastal lagoons',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    notableFauna: ['Leopard', 'Elephant', 'Sloth Bear', 'Mugger Crocodile', 'Spotted Deer']
  },
  {
    id: 'wilpattu',
    name: 'Wilpattu National Park',
    region: 'North Western & North Central',
    area: '1,317 km² (Largest Park)',
    knownFor: 'Natural sand-rimmed water basins (Willus) and ancient jungle wilderness',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    notableFauna: ['Leopard', 'Sloth Bear', 'Barking Deer', 'Sambar', 'Crested Serpent Eagle']
  },
  {
    id: 'udawalawe',
    name: 'Udawalawe National Park',
    region: 'Sabaragamuwa & Uva',
    area: '308 km²',
    knownFor: 'Guaranteed wild elephant herds against reservoir mountain backdrops',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    notableFauna: ['Elephant', 'Water Buffalo', 'Golden Jackal', 'White-Bellied Sea Eagle', 'Monitor Lizard']
  },
  {
    id: 'minneriya',
    name: 'Minneriya & Kaudulla',
    region: 'North Central (Cultural Plains)',
    area: '88 km²',
    knownFor: 'The Elephant Gathering — hundreds of wild elephants converging on lush grass',
    image: 'https://images.unsplash.com/photo-1581852017103-68ac6550407b?auto=format&fit=crop&w=1200&q=80',
    notableFauna: ['Elephant Gathering', 'Painted Stork', 'Pelican', 'Grey Langur', 'Loris']
  }
];
