export interface ChatAction {
  label: string;
  type: 'navigate' | 'modal' | 'whatsapp' | 'call';
  payload?: string;
}

export interface ChatbotResponse {
  keywords: string[];
  reply: string;
  actions?: ChatAction[];
}

export const QUICK_PROMPTS = [
  'Best time to visit Sri Lanka?',
  'Where can I see wild leopards?',
  'Kandy to Ella scenic train tips',
  '7-Day Luxury Itinerary advice',
  'Whale watching seasons',
  'Talk to Human Concierge'
];

export const INITIAL_GREETING = {
  text: "Ayubowan! I am **Serendib AI**, your private Island Expedition Concierge.\n\nWhether you need bespoke route curation, seasonal monsoon clarity, wildlife safari intel, or scenic train logistics, I am at your service. How may I assist your Sri Lankan expedition today?",
  actions: [
    { label: '🗺️ Explore GIS Map', type: 'navigate' as const, payload: '/map' },
    { label: '📅 Plan 7-Day Route', type: 'navigate' as const, payload: '/planner' },
    { label: '💬 WhatsApp Concierge', type: 'whatsapp' as const, payload: '94713912972' }
  ]
};

export const KNOWLEDGE_BASE: ChatbotResponse[] = [
  // 1. BEST TIME TO VISIT / WEATHER / MONSOONS
  {
    keywords: ['best time', 'weather', 'monsoon', 'season', 'when to visit', 'rain', 'climate', 'sunshine', 'month'],
    reply: "Sri Lanka enjoys a unique **dual-monsoon microclimate**, which means **any time of year is a good time to visit**—you just need to pick the right coast:\n\n• **December to April (Peak South & West):** Perfect dry, sunny weather for Galle, Mirissa, Colombo, Bentota, and Central Highlands (Ella, Sigiriya, Kandy).\n• **May to September (Peak East Coast):** Ideal for surfing in Arugam Bay, swimming in Pasikuda/Trincomalee, and the Minneriya Elephant Gathering.\n• **Shoulder Months (October & November):** Inter-monsoonal showers, but lush green landscapes across the island.",
    actions: [
      { label: '🗺️ View Map Microclimates', type: 'navigate', payload: '/map' },
      { label: '📖 Read Travel Guide', type: 'navigate', payload: '/guide' }
    ]
  },

  // 2. WILDLIFE / LEOPARDS / SAFARI / ELEPHANTS / WHALES
  {
    keywords: ['leopard', 'wildlife', 'safari', 'elephant', 'whale', 'animals', 'yala', 'wilpattu', 'minneriya', 'udawalawe'],
    reply: "Sri Lanka has the highest density of leopards in the world and is home to the Asian 'Big 5':\n\n🐆 **Leopards:** Best spotted in **Yala National Park (Block 1)** and **Wilpattu National Park** (quieter, stunning natural lakes).\n🐘 **Asian Elephants:** Year-round herds in **Udawalawe**, plus the world-famous *Great Elephant Gathering* (300+ elephants) at **Minneriya** from July to October.\n🐋 **Blue & Sperm Whales:** Peak sightings off **Mirissa** (Dec–April) and **Trincomalee** (May–October).\n🐻 **Sloth Bears:** Active in Wilpattu and Wasgamuwa during palu fruit season (June/July).",
    actions: [
      { label: '🐾 Wildlife Sanctuaries', type: 'navigate', payload: '/wildlife' },
      { label: '🗺️ Locate Yala on Map', type: 'navigate', payload: '/map' }
    ]
  },

  // 3. SCENIC TRAIN / KANDY TO ELLA / NINE ARCH BRIDGE
  {
    keywords: ['train', 'kandy to ella', 'scenic train', 'nine arch', 'blue train', 'railway', 'ticket', 'observation car'],
    reply: "The **Kandy → Nuwara Eliya (Nanu Oya) → Ella** scenic railway is globally celebrated as one of Earth's most breathtaking train journeys.\n\n🚂 **Key Tips for Travelers:**\n• **Duration:** ~6.5 to 7 hours through mist-covered Ceylon tea estates and dramatic waterfalls.\n• **Best Views:** Sit on the **Right Side** departing Kandy to Nanu Oya, and the **Left Side** from Nanu Oya into Ella.\n• **Classes:** **1st Class Observation Car** (air-conditioned with panoramic rear glass) or **2nd Class Reserved** (open windows for classic photo opportunities).\n• **Booking:** Reserved seats open 30 days in advance; our concierge can arrange pre-booked tickets with private station chauffeurs.",
    actions: [
      { label: '⛰️ Highlands & Rail Story', type: 'navigate', payload: '/highlands' },
      { label: '💬 Reserve Train via WhatsApp', type: 'whatsapp', payload: '94713912972' }
    ]
  },

  // 4. SIGIRIYA / CULTURAL TRIANGLE / HERITAGE
  {
    keywords: ['sigiriya', 'rock fortress', 'heritage', 'history', 'anuradhapura', 'polonnaruwa', 'kandy temple', 'ancient', 'kingdom', 'unesco', 'ruins'],
    reply: "Sri Lanka holds **8 UNESCO World Heritage Sites** within just 65,000 km²:\n\n👑 **Sigiriya Lion Rock:** 5th-century royal sky citadel built by King Kasyapa atop a 200m monolith with ancient frescoes and landscaped water gardens.\n🏛️ **Anuradhapura & Polonnaruwa:** Sacred ancient capitals with 2,000-year-old stupas and the sacred Jaya Sri Maha Bodhi tree.\n🛕 **Temple of the Sacred Tooth Relic (Kandy):** The spiritual heart of Ceylon Buddhism.\n🏰 **Galle Dutch Fort:** A living 17th-century European rampart fortress on the Indian Ocean with cobblestone boutique avenues.",
    actions: [
      { label: '👑 2,500 Yrs Heritage Timeline', type: 'navigate', payload: '/heritage' },
      { label: '🗺️ View Cultural Triangle on Map', type: 'navigate', payload: '/map' }
    ]
  },

  // 5. BEACHES & SURFING
  {
    keywords: ['beach', 'beaches', 'surf', 'surfing', 'mirissa', 'weligama', 'arugam bay', 'bentota', 'unawatuna', 'hiriketiya', 'ocean'],
    reply: "With 1,340 km of coastline, Sri Lanka is an Indian Ocean surfing and coastal paradise:\n\n🏄 **Surfing Zones:**\n• **Arugam Bay (East Coast):** World-class right-hand point breaks (Best: May – September).\n• **Weligama & Midigama (South Coast):** Ideal for all levels from beginner beach breaks to advanced reef points (Best: November – April).\n• **Hiriketiya Horseshoe Bay:** Turquoise crescent with mellow left-hand peels and bohemian dining.\n\n🏖️ **Luxury Relaxation:**\n• **Bentota & Tangalle:** Secluded golden sand coves with luxury boutique private villas.",
    actions: [
      { label: '🌊 Ocean Beaches & Surf', type: 'navigate', payload: '/beaches' },
      { label: '🗺️ Explore Coastlines', type: 'navigate', payload: '/map' }
    ]
  },

  // 6. CEYLON CUISINE & FOOD
  {
    keywords: ['food', 'cuisine', 'eat', 'curry', 'spices', 'tea', 'hoppers', 'kottu', 'dining', 'gastronomy', 'seafood'],
    reply: "Ceylon gastronomy is a vibrant explosion of wild spices, roasted coconut, and fresh ocean seafood:\n\n🍛 **Must-Try Culinary Icons:**\n• **Egg Hoppers (Appa):** Crisp bowl-shaped rice flour pancakes with soft steamed centers and spicy lunu miris.\n• **Jaffna Blue Crab Curry:** Rich roasted roasted spices infused with toasted cumin, coriander, and fresh tamarind.\n• **Kottu Rhapsody:** Chopped flatbread wok-fried on hot steel with leeks, eggs, and aromatic curry sauce.\n• **Single-Estate Ceylon Tea:** Pure high-altitude orthodox teas from Nuwara Eliya and Dimbula.",
    actions: [
      { label: '🍲 Ceylon Culinary Explorer', type: 'navigate', payload: '/cuisine' }
    ]
  },

  // 7. ITINERARIES & PLANNING (3, 7, 10, 14 DAYS)
  {
    keywords: ['itinerary', 'plan', 'route', '7 days', '10 days', '14 days', '3 days', 'recommend', 'trip'],
    reply: "Here are our recommended luxury route blueprints:\n\n✨ **Classic 7-Day Royal Route:**\n1. Colombo → 2. Sigiriya & Cultural Triangle → 3. Kandy Temple → 4. Nuwara Eliya Tea Mountains → 5. Scenic Blue Train to Ella → 6. Yala Leopard Safari → 7. UNESCO Galle Fort & Departure.\n\n🌿 **10-Day Deep Immersion:**\nAdds Mirissa whale expeditions, Sinharaja Rainforest trek, and secluded Tangalle private beachfront villas.\n\nUse our interactive **Journey Planner** below to customize travel duration, pace, and bespoke requirements!",
    actions: [
      { label: '📅 Open Journey Architect', type: 'navigate', payload: '/planner' },
      { label: '🛎️ Book Private Chauffeur', type: 'modal' }
    ]
  },

  // 8. VISA / ETA / PRACTICAL ADVICE / CURRENCY
  {
    keywords: ['visa', 'eta', 'currency', 'money', 'lkr', 'usd', 'cash', 'card', 'safety', 'hotline', 'emergency', 'sim', 'airport'],
    reply: "📋 **Practical Travel Essentials for Sri Lanka:**\n\n• **Visa (ETA):** Most international travelers require an approved Electronic Travel Authorization (ETA) prior to arrival via the official portal.\n• **Currency:** Sri Lankan Rupee (LKR). Major cards (Visa, Mastercard, Amex) are widely accepted in hotels and luxury boutiques. Carrying small LKR cash notes for local tea stalls and tuk-tuks is recommended.\n• **Emergency Numbers:** Tourist Police (**1912**), Emergency Ambulance (**1990**), National Emergency (**119**).\n• **Airport Transfer:** Colombo Bandaranaike International Airport (CMB) is 35 minutes to central Colombo via the expressway.",
    actions: [
      { label: '📘 Practical Travel Compendium', type: 'navigate', payload: '/guide' }
    ]
  },

  // 9. LUXURY RESORTS & VILLAS
  {
    keywords: ['hotel', 'resort', 'villa', 'stay', 'accommodation', 'tea trails', 'amangalla', 'cape weligama', 'wild coast', 'luxury stay'],
    reply: "Sri Lanka boasts some of Asia's most distinguished boutique luxury properties:\n\n🏰 **Historic & Plantation Heritage:**\n• **Ceylon Tea Trails (Hatton):** Restored colonial tea planter bungalows with private butler service.\n• **Amangalla (Galle Fort):** 17th-century Aman sanctuary with antique four-poster suites and Ayurvedic baths.\n\n🐆 **Wild Coast & Coastal Chic:**\n• **Wild Coast Tented Lodge (Yala):** Cocoon suites nestled between rugged leopard jungle and the Indian Ocean.\n• **Cape Weligama:** Cliff-top panoramic ocean villas with 60m crescent infinity pools.",
    actions: [
      { label: '💬 Inquire Luxury Stays on WhatsApp', type: 'whatsapp', payload: '94713912972' }
    ]
  },

  // 10. HUMAN CONCIERGE / CONTACT / PHONE / WHATSAPP / BOOKING
  {
    keywords: ['contact', 'whatsapp', 'call', 'phone', 'human', 'agent', 'concierge', 'speak', 'book', 'reservation', 'cost', 'quote', 'number'],
    reply: "Our private **24/7 Island Concierge Team** is on standby to assist with custom quotes, private luxury vehicle bookings, English/German/French-speaking chauffeur-guides, and VIP airport fast-track service.\n\n📞 **Direct WhatsApp & Hotline:** **+94 71 391 2972** (`0713912972`)\n📧 **Email:** `concierge@sushenjayasuriya.org.lk`\n📍 **Colombo Studio:** Colombo 03, Western Province, Sri Lanka",
    actions: [
      { label: '💬 Chat on WhatsApp (+94 71 391 2972)', type: 'whatsapp', payload: '94713912972' },
      { label: '🛎️ Open Reservation Form', type: 'modal' }
    ]
  }
];

export function findChatbotResponse(userMessage: string): ChatbotResponse {
  const normalized = userMessage.toLowerCase().trim();

  // Search knowledge base
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => normalized.includes(kw))) {
      return item;
    }
  }

  // Graceful smart fallback
  return {
    keywords: [],
    reply: "I have noted your inquiry regarding Sri Lanka. While I am an automated expedition specialist, our **24/7 Island Concierge Desk** can provide exact bespoke arrangements, private helicopter quotes, or tailored itinerary answers immediately.\n\nWould you like to speak directly with our team on WhatsApp (**+94 71 391 2972**)?",
    actions: [
      { label: '💬 Message Concierge (+94 71 391 2972)', type: 'whatsapp', payload: '94713912972' },
      { label: '🗺️ Explore GIS Island Map', type: 'navigate', payload: '/map' },
      { label: '📅 Plan Custom Itinerary', type: 'navigate', payload: '/planner' }
    ]
  };
}
