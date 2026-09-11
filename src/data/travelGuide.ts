import type { TravelGuideTopic } from '../types/travel';

export const travelGuideTopics: TravelGuideTopic[] = [
  {
    id: 'when-to-visit',
    title: 'WHEN TO VISIT & MONSOONS',
    shortSummary: 'Sri Lanka is a year-round destination thanks to its dual monsoon system.',
    details: [
      { label: 'South & West Coasts (Beaches & Whales)', value: 'November to April (Dry, calm, sunny)' },
      { label: 'East Coast (Arugam Bay & Nilaveli)', value: 'May to October (Perfect waves, crystal water)' },
      { label: 'Cultural Triangle & Wildlife', value: 'Year-round · Dry season peaking June to September' },
      { label: 'Central Highlands', value: 'December to April (Clear skies, cool crisp hiking weather)' }
    ],
    content: 'Because Sri Lanka experiences two distinct monsoon seasons on opposite coasts (the Southwest "Yala" and Northeast "Maha" monsoons), there is always a coast blessed with blue skies, calm waters, and offshore breezes regardless of what month you visit.',
    iconName: 'Sun'
  },
  {
    id: 'visa-entry',
    title: 'VISA & ENTRY REQUIREMENTS',
    shortSummary: 'Seamless online Electronic Travel Authorization (ETA).',
    details: [
      { label: 'Visa Type', value: 'Standard Tourist ETA (30-day double entry, extendable)' },
      { label: 'Application Portal', value: 'Official Sri Lanka ETA Online System' },
      { label: 'Passport Validity', value: 'Minimum 6 months from arrival date' },
      { label: 'Processing Time', value: 'Typically approved within 24–48 hours' }
    ],
    content: 'Most international travelers must apply online for an ETA prior to arrival. Tourist visas are usually granted for 30 days and can easily be extended for up to 270 days via the Department of Immigration in Battaramulla, Colombo.',
    iconName: 'FileCheck'
  },
  {
    id: 'currency-money',
    title: 'CURRENCY & PAYMENT',
    shortSummary: 'Sri Lankan Rupee (LKR) with ubiquitous card acceptance.',
    details: [
      { label: 'Official Currency', value: 'Sri Lankan Rupee (LKR / Rs)' },
      { label: 'Approximate Exchange Rate', value: '1 USD ≈ 300–310 LKR | 1 EUR ≈ 325–335 LKR' },
      { label: 'Cards & ATMs', value: 'Visa/Mastercard widely accepted in hotels & restaurants; ATMs abundant' },
      { label: 'Tipping Culture', value: '10% service is standard; 500–1000 LKR for drivers and safari trackers' }
    ],
    content: 'While credit cards are widely accepted at resorts and urban venues, carry small rupee notes (100, 500, 1000) for fruit stands, tuk-tuks, temple donations, and rural village crafts.',
    iconName: 'Coins'
  },
  {
    id: 'languages-culture',
    title: 'LANGUAGES & ETIQUETTE',
    shortSummary: 'Warm hospitality with English widely spoken throughout.',
    details: [
      { label: 'Official Languages', value: 'Sinhala (සිංහල) & Tamil (தமிழ்)' },
      { label: 'Commercial Language', value: 'English (Fluently spoken in hospitality & business)' },
      { label: 'Common Greeting', value: '"Ayubowan" (May you live long) with palms pressed together' },
      { label: 'Temple Dress Code', value: 'Cover shoulders and knees; remove shoes and hats before entering' }
    ],
    content: 'Sri Lankans are globally celebrated for their warmth and genuine smiles. Greeting locals with a gentle "Ayubowan" (Sinhala) or "Vanakkam" (Tamil) brings instant delight.',
    iconName: 'Languages'
  },
  {
    id: 'transportation',
    title: 'TRANSPORT & GETTING AROUND',
    shortSummary: 'Scenic railway journeys, private chauffeurs, and iconic tuk-tuks.',
    details: [
      { label: 'Highland Trains', value: 'Reserved 1st & 2nd class tickets recommended 30 days in advance' },
      { label: 'Private Chauffeur-Guide', value: 'The gold standard for seamless, air-conditioned multi-day touring' },
      { label: 'Three-Wheelers (Tuk-Tuk)', value: 'Ideal for short urban rides; use PickMe / Uber in Colombo & Kandy' },
      { label: 'Domestic Flights & Seaplanes', value: 'Cinnamon Air operates scenic seaplane routes between water reservoirs' }
    ],
    content: 'The train journey between Kandy, Nanu Oya (Nuwara Eliya), and Ella is considered an essential rite of passage. For longer multi-stop itineraries, hiring a dedicated English-speaking chauffeur is remarkably affordable and flexible.',
    iconName: 'Train'
  },
  {
    id: 'timezone-weather',
    title: 'TIME ZONE & CLIMATE',
    shortSummary: 'UTC+5:30 (Sri Lanka Standard Time) and pleasant tropical warmth.',
    details: [
      { label: 'Time Zone', value: 'UTC+5:30 (No daylight saving adjustments)' },
      { label: 'Coastal Temperature', value: '27°C–32°C (80°F–90°F) with ocean sea breezes' },
      { label: 'Highland Temperature', value: '12°C–20°C (54°F–68°F) — bring light fleece and jackets' },
      { label: 'Sunrise & Sunset', value: 'Consistent ~06:00 AM sunrise and ~18:15 PM sunset' }
    ],
    content: 'Sri Lanka is situated just north of the equator. The day length remains remarkably constant throughout the year, with roughly 12 hours of tropical daylight.',
    iconName: 'Clock'
  },
  {
    id: 'emergency-health',
    title: 'EMERGENCY & MEDICAL CONTACTS',
    shortSummary: 'High-quality private healthcare and dedicated tourist police.',
    details: [
      { label: 'Tourist Police Hotline', value: '1912 (Dedicated tourist assistance)' },
      { label: 'Emergency Police', value: '119' },
      { label: 'Ambulance & Medical (Suwa Seriya)', value: '1990 (Free rapid-response national service)' },
      { label: 'Fire & Rescue', value: '110' }
    ],
    content: 'Sri Lanka has an exemplary free national emergency ambulance service (1990 Suwa Seriya) with modern medical equipment. Colombo, Galle, and Kandy have world-class private hospitals (Lanka Hospitals, Asiri, Nawaloka).',
    iconName: 'ShieldAlert'
  }
];
