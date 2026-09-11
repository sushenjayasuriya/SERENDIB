import type { RegionInfo } from '../types/travel';

export const regions: RegionInfo[] = [
  {
    id: 'west',
    name: 'WEST COAST',
    tagline: 'Cosmopolitan energy, maritime history and gateway ports.',
    landscape: 'Urban coastlines, colonial enclaves, lagoon wetlands and ocean promenades.',
    weatherSummary: 'Warm tropical (28–32°C) · Best Nov–Apr',
    destinations: ['Colombo', 'Negombo', 'Kalutara'],
    highlights: ['Pettah Bazaar & Street Food', 'Galle Face Green', 'Boutique Dutch Hospital Dining', 'Muthurajawela Mangroves'],
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
    colorTone: '#193746'
  },
  {
    id: 'south',
    name: 'SOUTHERN COAST',
    tagline: 'Colonial ramparts, golden surf bays and whale-rich ocean trenches.',
    landscape: 'Golden sand crescents, coconut headlands, coastal reefs and UNESCO fortress walls.',
    weatherSummary: 'Sunny coastal (27–31°C) · Best Nov–Apr',
    destinations: ['Galle', 'Mirissa', 'Unawatuna', 'Hiriketiya', 'Weligama'],
    highlights: ['UNESCO Galle Fort', 'Blue Whale Watching', 'Coconut Tree Hill', 'Stilt Fishermen at Sunset'],
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    colorTone: '#2A5C74'
  },
  {
    id: 'central',
    name: 'CENTRAL HIGHLANDS',
    tagline: 'Misty cloud forests, rolling Ceylon tea carpets and alpine peaks.',
    landscape: 'Montane plateaus, tea-carpeted slopes, dramatic waterfalls and mountain passes.',
    weatherSummary: 'Crisp & cool (14–22°C) · Year-round pleasant',
    destinations: ['Ella', 'Nuwara Eliya', 'Kandy', 'Haputale', 'Knuckles'],
    highlights: ['Demodara Nine Arch Bridge', "World's End Precipice", 'Temple of the Tooth', 'Highland Blue Train Journey'],
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    colorTone: '#1B382B'
  },
  {
    id: 'east',
    name: 'EAST COAST',
    tagline: 'Turquoise lagoons, world-class surf breaks and ancient sacred cliffs.',
    landscape: 'Pristine white sand spits, calm turquoise bays, coral atolls and wild jungle coastlines.',
    weatherSummary: 'Hot & sunny (29–34°C) · Best May–Oct',
    destinations: ['Arugam Bay', 'Trincomalee', 'Nilaveli', 'Pasikudah'],
    highlights: ['Arugam Bay Surf Point', 'Pigeon Island Shark Snorkeling', 'Koneswaram Cliff Temple', 'Wild Coast Safaris'],
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
    colorTone: '#20637A'
  },
  {
    id: 'north',
    name: 'NORTHERN PENINSULA',
    tagline: 'Sacred Tamil kovils, palmyra horizons and remote island secrets.',
    landscape: 'Arid limestone plains, palmyra palm forests, causeways and coral-stone islands.',
    weatherSummary: 'Sunny & dry (28–33°C) · Best Dec–Mar',
    destinations: ['Jaffna', 'Delft Island', 'Point Pedro', 'Nagadeepa'],
    highlights: ['Nallur Kandaswamy Kovil', 'Delft Wild Horses', 'Northern Jaffna Crab Curry', 'Keerimalai Sacred Springs'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    colorTone: '#9C4B33'
  },
  {
    id: 'north-central',
    name: 'NORTH CENTRAL (CULTURAL TRIANGLE)',
    tagline: '2,500 years of ancient kingdoms, massive stupas and sky palaces.',
    landscape: 'Dry-zone jungle canopy, vast ancient man-made reservoirs (wewas), and granite monoliths.',
    weatherSummary: 'Warm tropical dry-zone (27–33°C) · Year-round',
    destinations: ['Sigiriya', 'Anuradhapura', 'Polonnaruwa', 'Dambulla', 'Minneriya'],
    highlights: ['Sigiriya Lion Rock Fortress', 'Dambulla Cave Frescoes', 'Minneriya Elephant Gathering', 'Gal Vihara Stone Buddhas'],
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
    colorTone: '#7D5728'
  }
];
