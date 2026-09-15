export interface ChatAction {
  label: string;
  type: 'navigate' | 'modal' | 'whatsapp' | 'call' | 'quiz_step';
  payload?: string;
}

export interface ChatDestinationCard {
  id: string;
  name: string;
  region: string;
  image: string;
  tagline: string;
  badge: string;
  path: string;
}

export interface ChatbotResponse {
  keywords: string[];
  reply: string;
  cards?: ChatDestinationCard[];
  actions?: ChatAction[];
}

export const QUICK_PROMPTS = [
  '✨ Plan My Expedition (Quiz)',
  'Best time to visit Sri Lanka?',
  'Where can I see wild leopards?',
  'Kandy to Ella scenic train tips',
  'Sigiriya & Royal Citadels',
  'Whale watching seasons',
  'Talk to Human Concierge'
];

export const INITIAL_GREETING = {
  text: "Ayubowan! I am **Serendib AI**, your private Island Expedition Concierge.\n\nWhether you wish to build a bespoke route with our interactive quiz, explore seasonal monsoon clarity, or discover wildlife safari intel, I am at your service. How may I assist your Sri Lankan expedition today?",
  actions: [
    { label: '✨ Start Expedition Quiz', type: 'quiz_step' as const, payload: 'start' },
    { label: '🗺️ Explore GIS Map', type: 'navigate' as const, payload: '/map' },
    { label: '💬 WhatsApp Concierge', type: 'whatsapp' as const, payload: '94713912972' }
  ]
};

// Destination visual cards
export const DESTINATION_CARDS: Record<string, ChatDestinationCard> = {
  sigiriya: {
    id: 'sigiriya',
    name: 'Sigiriya Lion Rock Citadel',
    region: 'Cultural Triangle (Matale)',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=80',
    tagline: '5th-Century Sky Palace atop a 200m monolith',
    badge: 'UNESCO World Heritage',
    path: '/destinations'
  },
  ella: {
    id: 'ella',
    name: 'Demodara Nine Arch Bridge & Ella',
    region: 'Central Highlands',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    tagline: 'Highland blue railway & emerald tea peaks',
    badge: 'World Top 10 Train Journey',
    path: '/highlands'
  },
  galle: {
    id: 'galle',
    name: 'UNESCO Galle Dutch Fort',
    region: 'Southern Province',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    tagline: '17th-Century oceanfront living rampart citadel',
    badge: 'Living Heritage Enclave',
    path: '/heritage'
  },
  kandy: {
    id: 'kandy',
    name: 'Temple of the Sacred Tooth (Kandy)',
    region: 'Central Province',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tagline: 'Spiritual heart of ancient Ceylon Buddhism',
    badge: 'Sacred Royal Seat',
    path: '/heritage'
  },
  yala: {
    id: 'yala',
    name: 'Yala & Wilpattu Leopard Corridors',
    region: 'Southern / North-Western',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    tagline: 'Highest leopard density in the world',
    badge: 'Asian Big 5 Sanctuary',
    path: '/wildlife'
  },
  mirissa: {
    id: 'mirissa',
    name: 'Mirissa Bay & Coconut Tree Hill',
    region: 'Southern Coast',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Blue whale marine canyon & turquoise bays',
    badge: 'Marine Wildlife Sanctuary',
    path: '/beaches'
  },
  arugam: {
    id: 'arugam',
    name: 'Arugam Bay Surf Haven',
    region: 'Eastern Province',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    tagline: 'World-championship right-hand point breaks',
    badge: 'Premier Surfing Coast',
    path: '/beaches'
  },
  nuwaraEliya: {
    id: 'nuwaraEliya',
    name: 'Nuwara Eliya & Horton Plains',
    region: 'Central Highlands',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
    tagline: 'Misty single-estate orthodox Ceylon tea hills',
    badge: '1,868m Alpine Elevation',
    path: '/highlands'
  }
};

export const KNOWLEDGE_BASE: ChatbotResponse[] = [
  // 1. BEST TIME TO VISIT / WEATHER / MONSOONS
  {
    keywords: ['best time', 'weather', 'monsoon', 'season', 'when to visit', 'rain', 'climate', 'sunshine', 'month'],
    reply: "Sri Lanka enjoys a unique **dual-monsoon microclimate**, which means **any time of year is a good time to visit**—you just need to pick the right coast:\n\n• **December to April (Peak South & West):** Perfect dry, sunny weather for Galle, Mirissa, Colombo, Bentota, and Central Highlands (Ella, Sigiriya, Kandy).\n• **May to September (Peak East Coast):** Ideal for surfing in Arugam Bay, swimming in Pasikuda/Trincomalee, and the Minneriya Elephant Gathering.\n• **Shoulder Months (October & November):** Inter-monsoonal showers, but lush green landscapes across the island.",
    cards: [DESTINATION_CARDS.mirissa, DESTINATION_CARDS.arugam],
    actions: [
      { label: '🗺️ View Map Microclimates', type: 'navigate', payload: '/map' },
      { label: '📖 Read Travel Guide', type: 'navigate', payload: '/guide' }
    ]
  },

  // 2. WILDLIFE / LEOPARDS / SAFARI / ELEPHANTS / WHALES
  {
    keywords: ['leopard', 'wildlife', 'safari', 'elephant', 'whale', 'animals', 'yala', 'wilpattu', 'minneriya', 'udawalawe'],
    reply: "Sri Lanka has the highest density of leopards in the world and is home to the Asian 'Big 5':\n\n🐆 **Leopards:** Best spotted in **Yala National Park (Block 1)** and **Wilpattu National Park** (quieter, stunning natural lakes).\n🐘 **Asian Elephants:** Year-round herds in **Udawalawe**, plus the world-famous *Great Elephant Gathering* (300+ elephants) at **Minneriya** from July to October.\n🐋 **Blue & Sperm Whales:** Peak sightings off **Mirissa** (Dec–April) and **Trincomalee** (May–October).\n🐻 **Sloth Bears:** Active in Wilpattu and Wasgamuwa during palu fruit season (June/July).",
    cards: [DESTINATION_CARDS.yala, DESTINATION_CARDS.mirissa],
    actions: [
      { label: '🐾 Wildlife Sanctuaries', type: 'navigate', payload: '/wildlife' },
      { label: '🗺️ Locate Yala on Map', type: 'navigate', payload: '/map' }
    ]
  },

  // 3. SCENIC TRAIN / KANDY TO ELLA / NINE ARCH BRIDGE
  {
    keywords: ['train', 'kandy to ella', 'scenic train', 'nine arch', 'blue train', 'railway', 'ticket', 'observation car'],
    reply: "The **Kandy → Nuwara Eliya (Nanu Oya) → Ella** scenic railway is globally celebrated as one of Earth's most breathtaking train journeys.\n\n🚂 **Key Tips for Travelers:**\n• **Duration:** ~6.5 to 7 hours through mist-covered Ceylon tea estates and dramatic waterfalls.\n• **Best Views:** Sit on the **Right Side** departing Kandy to Nanu Oya, and the **Left Side** from Nanu Oya into Ella.\n• **Classes:** **1st Class Observation Car** (air-conditioned with panoramic rear glass) or **2nd Class Reserved** (open windows for classic photo opportunities).\n• **Booking:** Reserved seats open 30 days in advance; our concierge can arrange pre-booked tickets with private station chauffeurs.",
    cards: [DESTINATION_CARDS.ella, DESTINATION_CARDS.nuwaraEliya],
    actions: [
      { label: '⛰️ Highlands & Rail Story', type: 'navigate', payload: '/highlands' },
      { label: '💬 Reserve Train via WhatsApp', type: 'whatsapp', payload: '94713912972' }
    ]
  },

  // 4. SIGIRIYA / CULTURAL TRIANGLE / HERITAGE
  {
    keywords: ['sigiriya', 'rock fortress', 'heritage', 'history', 'anuradhapura', 'polonnaruwa', 'kandy temple', 'ancient', 'kingdom', 'unesco', 'ruins', 'citadel'],
    reply: "Sri Lanka holds **8 UNESCO World Heritage Sites** within just 65,000 km²:\n\n👑 **Sigiriya Lion Rock:** 5th-century royal sky citadel built by King Kasyapa atop a 200m monolith with ancient frescoes and landscaped water gardens.\n🏛️ **Anuradhapura & Polonnaruwa:** Sacred ancient capitals with 2,000-year-old stupas and the sacred Jaya Sri Maha Bodhi tree.\n🛕 **Temple of the Sacred Tooth Relic (Kandy):** The spiritual heart of Ceylon Buddhism.\n🏰 **Galle Dutch Fort:** A living 17th-century European rampart fortress on the Indian Ocean with cobblestone boutique avenues.",
    cards: [DESTINATION_CARDS.sigiriya, DESTINATION_CARDS.galle, DESTINATION_CARDS.kandy],
    actions: [
      { label: '👑 2,500 Yrs Heritage Timeline', type: 'navigate', payload: '/heritage' },
      { label: '🗺️ View Cultural Triangle on Map', type: 'navigate', payload: '/map' }
    ]
  },

  // 5. BEACHES & SURFING
  {
    keywords: ['beach', 'beaches', 'surf', 'surfing', 'mirissa', 'weligama', 'arugam bay', 'bentota', 'unawatuna', 'hiriketiya', 'ocean'],
    reply: "With 1,340 km of coastline, Sri Lanka is an Indian Ocean surfing and coastal paradise:\n\n🏄 **Surfing Zones:**\n• **Arugam Bay (East Coast):** World-class right-hand point breaks (Best: May – September).\n• **Weligama & Midigama (South Coast):** Ideal for all levels from beginner beach breaks to advanced reef points (Best: November – April).\n• **Hiriketiya Horseshoe Bay:** Turquoise crescent with mellow left-hand peels and bohemian dining.\n\n🏖️ **Luxury Relaxation:**\n• **Bentota & Tangalle:** Secluded golden sand coves with luxury boutique private villas.",
    cards: [DESTINATION_CARDS.mirissa, DESTINATION_CARDS.arugam],
    actions: [
      { label: '🌊 Ocean Beaches & Surf', type: 'navigate', payload: '/beaches' },
      { label: '🗺️ Explore Coastlines', type: 'navigate', payload: '/map' }
    ]
  },

  // 6. CEYLON CUISINE & FOOD
  {
    keywords: ['food', 'cuisine', 'eat', 'curry', 'spices', 'tea', 'hoppers', 'kottu', 'dining', 'gastronomy', 'seafood'],
    reply: "Ceylon gastronomy is a vibrant explosion of wild spices, roasted coconut, and fresh ocean seafood:\n\n🍛 **Must-Try Culinary Icons:**\n• **Egg Hoppers (Appa):** Crisp bowl-shaped rice flour pancakes with soft steamed centers and spicy lunu miris.\n• **Jaffna Blue Crab Curry:** Rich roasted spices infused with toasted cumin, coriander, and fresh tamarind.\n• **Kottu Rhapsody:** Chopped flatbread wok-fried on hot steel with leeks, eggs, and aromatic curry sauce.\n• **Single-Estate Ceylon Tea:** Pure high-altitude orthodox teas from Nuwara Eliya and Dimbula.",
    cards: [DESTINATION_CARDS.nuwaraEliya],
    actions: [
      { label: '🍲 Ceylon Culinary Explorer', type: 'navigate', payload: '/cuisine' }
    ]
  },

  // 7. ITINERARIES & PLANNING (3, 7, 10, 14 DAYS)
  {
    keywords: ['itinerary', 'plan', 'route', '7 days', '10 days', '14 days', '3 days', 'recommend', 'trip', 'odyssey'],
    reply: "Here are our recommended luxury route blueprints:\n\n✨ **Classic 7-Day Royal Route:**\n1. Colombo → 2. Sigiriya & Cultural Triangle → 3. Kandy Temple → 4. Nuwara Eliya Tea Mountains → 5. Scenic Blue Train to Ella → 6. Yala Leopard Safari → 7. UNESCO Galle Fort & Departure.\n\n🌿 **10-Day Deep Immersion:**\nAdds Mirissa whale expeditions, Sinharaja Rainforest trek, and secluded Tangalle private beachfront villas.\n\nWould you like to try our **Interactive Expedition Quiz** to tailor this to your exact travel passions?",
    cards: [DESTINATION_CARDS.sigiriya, DESTINATION_CARDS.ella, DESTINATION_CARDS.yala],
    actions: [
      { label: '✨ Start Expedition Quiz', type: 'quiz_step', payload: 'start' },
      { label: '📅 Open Full Journey Architect', type: 'navigate', payload: '/planner' }
    ]
  },

  // 8. VISA / ETA / PRACTICAL ADVICE / CURRENCY
  {
    keywords: ['visa', 'eta', 'currency', 'money', 'lkr', 'usd', 'cash', 'card', 'safety', 'hotline', 'emergency', 'sim', 'airport'],
    reply: "📋 **Practical Travel Essentials for Sri Lanka:**\n\n• **Visa (ETA):** Most international travelers require an approved Electronic Travel Authorization (ETA) prior to arrival via the official portal.\n• **Currency:** Sri Lankan Rupee (LKR). Major cards (Visa, Mastercard, Amex) are widely accepted in hotels and luxury boutiques. Carrying small LKR cash notes for local tea stalls and tuk-tuks is recommended.\n• **Emergency Numbers:** Tourist Police (`1912`), Emergency Ambulance (`1990`), National Emergency (`119`).\n• **Airport Transfer:** Colombo Bandaranaike International Airport (CMB) is 35 minutes to central Colombo via the expressway.",
    actions: [
      { label: '📘 Practical Travel Compendium', type: 'navigate', payload: '/guide' }
    ]
  },

  // 9. LUXURY RESORTS & VILLAS
  {
    keywords: ['hotel', 'resort', 'villa', 'stay', 'accommodation', 'tea trails', 'amangalla', 'cape weligama', 'wild coast', 'luxury stay'],
    reply: "Sri Lanka boasts some of Asia's most distinguished boutique luxury properties:\n\n🏰 **Historic & Plantation Heritage:**\n• **Ceylon Tea Trails (Hatton):** Restored colonial tea planter bungalows with private butler service.\n• **Amangalla (Galle Fort):** 17th-century Aman sanctuary with antique four-poster suites and Ayurvedic baths.\n\n🐆 **Wild Coast & Coastal Chic:**\n• **Wild Coast Tented Lodge (Yala):** Cocoon suites nestled between rugged leopard jungle and the Indian Ocean.\n• **Cape Weligama:** Cliff-top panoramic ocean villas with 60m crescent infinity pools.",
    cards: [DESTINATION_CARDS.nuwaraEliya, DESTINATION_CARDS.galle, DESTINATION_CARDS.yala],
    actions: [
      { label: '💬 Inquire Luxury Stays on WhatsApp', type: 'whatsapp', payload: '94713912972' }
    ]
  },

  // 10. HUMAN CONCIERGE / CONTACT / PHONE / WHATSAPP / BOOKING
  {
    keywords: ['contact', 'whatsapp', 'call', 'phone', 'human', 'agent', 'concierge', 'speak', 'book', 'reservation', 'cost', 'quote', 'number'],
    reply: "Our private **24/7 Island Concierge Team** is on standby to assist with custom quotes, private luxury vehicle bookings, English/German/French-speaking chauffeur-guides, and VIP airport fast-track service.\n\n📞 **Direct WhatsApp & Hotline:** `+94 71 391 2972` (`0713912972`)\n📧 **Email:** `concierge@sushenjayasuriya.org.lk`\n📍 **Colombo Studio:** Colombo 03, Western Province, Sri Lanka",
    actions: [
      { label: '💬 Chat on WhatsApp (+94 71 391 2972)', type: 'whatsapp', payload: '94713912972' },
      { label: '🛎️ Open Reservation Form', type: 'modal' }
    ]
  }
];

export function findChatbotResponse(userMessage: string): ChatbotResponse {
  const normalized = userMessage.toLowerCase().trim();
  const cleanTokens = normalized.replace(/[^\w\s]/g, '').split(/\s+/);

  // 1. GREETINGS (Hi, Hello, Hey, Ayubowan, Good Morning/Evening, etc.)
  const greetingWords = ['hi', 'hello', 'hey', 'ayubowan', 'vanakkam', 'greetings', 'howdy', 'yo', 'halo', 'ola', 'bonjour', 'namaste'];
  const isGreeting = 
    greetingWords.some(w => cleanTokens.includes(w)) ||
    normalized.startsWith('good morning') ||
    normalized.startsWith('good afternoon') ||
    normalized.startsWith('good evening') ||
    normalized.startsWith('good day');

  if (isGreeting) {
    return {
      keywords: ['greeting'],
      reply: "Ayubowan & warm greetings! I am **Serendib AI**, your private Island Expedition Concierge.\n\nWhether you are planning to discover ancient 5th-century royal citadels, ride the misty blue train through Ceylon tea hills, encounter wild leopards, or bask on southern surf beaches, I am here to assist.\n\nHow would you like to begin your journey?",
      cards: [DESTINATION_CARDS.sigiriya, DESTINATION_CARDS.ella, DESTINATION_CARDS.yala],
      actions: [
        { label: '✨ Start Expedition Quiz', type: 'quiz_step', payload: 'start' },
        { label: '🗺️ Explore GIS Island Map', type: 'navigate', payload: '/map' },
        { label: '📅 Plan 7-Day Route', type: 'navigate', payload: '/planner' }
      ]
    };
  }

  // 2. GRATITUDE (Thanks, Thank you, Cheers, etc.)
  const thanksWords = ['thanks', 'thank', 'thx', 'cheers', 'appreciate', 'grateful', 'awesome', 'perfect', 'great'];
  if (thanksWords.some(w => cleanTokens.includes(w))) {
    return {
      keywords: ['thanks'],
      reply: "You are most welcome! It is an absolute pleasure assisting your Sri Lankan voyage.\n\nIf you have any further questions or wish to connect with our human concierge team for chauffeur bookings, I am always here.",
      actions: [
        { label: '💬 WhatsApp Concierge (+94 71 391 2972)', type: 'whatsapp', payload: '94713912972' },
        { label: '✨ Take Expedition Quiz', type: 'quiz_step', payload: 'start' },
        { label: '🗺️ Back to Map', type: 'navigate', payload: '/map' }
      ]
    };
  }

  // 3. CAPABILITIES / WHO ARE YOU / HELP
  if (normalized.includes('who are you') || normalized.includes('what can you do') || normalized === 'help') {
    return {
      keywords: ['help'],
      reply: "I am **Serendib AI**, an interactive expedition intelligence assistant created for travelers discovering Sri Lanka.\n\nHere is what I can do for you:\n• **Plan Expeditions:** Take our 3-step interactive route quiz.\n• **Weather & Monsoons:** Clarify when to visit South vs. East coasts.\n• **Wonders & Heritage:** In-depth knowledge on Sigiriya, Kandy, Galle Fort, and Anuradhapura.\n• **Wildlife & Rail:** Logistics on Yala leopards, Minneriya elephants, and the Kandy-Ella scenic train.\n• **Concierge Handoff:** Connect directly with our private chauffeur dispatch team on WhatsApp.",
      cards: [DESTINATION_CARDS.sigiriya, DESTINATION_CARDS.mirissa],
      actions: [
        { label: '✨ Start Expedition Quiz', type: 'quiz_step', payload: 'start' },
        { label: '🗺️ Explore GIS Map', type: 'navigate', payload: '/map' }
      ]
    };
  }

  // 4. Check if user is requesting the quiz
  if (normalized.includes('quiz') || normalized.includes('build expedition') || normalized.includes('help me choose') || normalized.includes('quiz me')) {
    return {
      keywords: ['quiz'],
      reply: "✨ **Welcome to the Bespoke Expedition Architect Quiz!**\n\nLet's design your ideal Sri Lankan journey across 3 quick questions.\n\n**Step 1 of 3:** What is the primary focus of your dream island expedition?",
      actions: [
        { label: '🏰 Royal Heritage & Citadels', type: 'quiz_step', payload: 'style_heritage' },
        { label: '🐆 Big 5 Safari & Wildlife', type: 'quiz_step', payload: 'style_safari' },
        { label: '🌊 Coastlines & Ocean Surf', type: 'quiz_step', payload: 'style_coast' },
        { label: '☕ Tea Mountains & Scenic Rail', type: 'quiz_step', payload: 'style_mountains' },
        { label: '💎 The Grand Panorama (All Highlights)', type: 'quiz_step', payload: 'style_grand' }
      ]
    };
  }

  // 5. Search knowledge base
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => normalized.includes(kw))) {
      return item;
    }
  }

  // Graceful smart fallback
  return {
    keywords: [],
    reply: "I have noted your inquiry regarding Sri Lanka. While I am an automated expedition specialist, our **24/7 Island Concierge Desk** can provide exact bespoke arrangements, private helicopter quotes, or tailored itinerary answers immediately.\n\nWould you like to try our **Interactive Expedition Quiz** or speak directly with our team on WhatsApp (`+94 71 391 2972`)?",
    cards: [DESTINATION_CARDS.sigiriya, DESTINATION_CARDS.ella],
    actions: [
      { label: '✨ Start Expedition Quiz', type: 'quiz_step', payload: 'start' },
      { label: '💬 Message Concierge (+94 71 391 2972)', type: 'whatsapp', payload: '94713912972' },
      { label: '🗺️ Explore GIS Island Map', type: 'navigate', payload: '/map' }
    ]
  };
}

// Multi-turn Quiz Synthesis Helper
export interface QuizState {
  style?: string;
  duration?: string;
  pace?: string;
}

export function handleQuizTransition(stepPayload: string, currentState: QuizState): {
  reply: string;
  cards?: ChatDestinationCard[];
  actions: ChatAction[];
  nextState: QuizState;
} {
  const updatedState = { ...currentState };

  if (stepPayload === 'start') {
    return {
      reply: "✨ **Welcome to the Bespoke Expedition Architect Quiz!**\n\nLet's design your ideal Sri Lankan journey in 3 quick choices.\n\n**Step 1 of 3:** What is the primary focus of your dream island expedition?",
      actions: [
        { label: '🏰 Royal Heritage & Citadels', type: 'quiz_step', payload: 'style_heritage' },
        { label: '🐆 Big 5 Safari & Wildlife', type: 'quiz_step', payload: 'style_safari' },
        { label: '🌊 Coastlines & Ocean Surf', type: 'quiz_step', payload: 'style_coast' },
        { label: '☕ Tea Mountains & Scenic Rail', type: 'quiz_step', payload: 'style_mountains' },
        { label: '💎 The Grand Panorama (All Highlights)', type: 'quiz_step', payload: 'style_grand' }
      ],
      nextState: {}
    };
  }

  if (stepPayload.startsWith('style_')) {
    const styleMap: Record<string, string> = {
      style_heritage: 'Royal Heritage & Ancient Citadels',
      style_safari: 'Big 5 Safari & Wild Sanctuaries',
      style_coast: 'Turquoise Coastlines & Surf Bays',
      style_mountains: 'Ceylon Tea Mountains & Scenic Rail',
      style_grand: 'The Grand Island Panorama'
    };
    updatedState.style = styleMap[stepPayload] || 'The Grand Island Panorama';

    return {
      reply: `Excellent choice. Focusing on **${updatedState.style}**.\n\n**Step 2 of 3:** How long will your journey in Sri Lanka be?`,
      actions: [
        { label: '⚡ 3–5 Days (Express Highlights)', type: 'quiz_step', payload: 'dur_short' },
        { label: '🌟 7 Days (Classic Essential)', type: 'quiz_step', payload: 'dur_7' },
        { label: '🌿 10 Days (Deep Immersion)', type: 'quiz_step', payload: 'dur_10' },
        { label: '👑 14+ Days (Grand Ceylon Odyssey)', type: 'quiz_step', payload: 'dur_14' }
      ],
      nextState: updatedState
    };
  }

  if (stepPayload.startsWith('dur_')) {
    const durMap: Record<string, string> = {
      dur_short: '3–5 Days (Express Highlights)',
      dur_7: '7 Days (Classic Essential)',
      dur_10: '10 Days (Deep Immersion)',
      dur_14: '14+ Days (Grand Ceylon Odyssey)'
    };
    updatedState.duration = durMap[stepPayload] || '7 Days';

    return {
      reply: `Noted: **${updatedState.duration}** duration.\n\n**Step 3 of 3:** What travel style and pace best describes your party?`,
      actions: [
        { label: '👑 Ultra-Luxury & Historic Stays', type: 'quiz_step', payload: 'pace_luxury' },
        { label: '🌿 Active Nature & Wildlife Trekking', type: 'quiz_step', payload: 'pace_active' },
        { label: '🧘 Slow Travel, Wellness & Coast', type: 'quiz_step', payload: 'pace_relaxed' }
      ],
      nextState: updatedState
    };
  }

  if (stepPayload.startsWith('pace_')) {
    const paceMap: Record<string, string> = {
      pace_luxury: 'Ultra-Luxury & Historic Stays',
      pace_active: 'Active Nature & Wildlife Trekking',
      pace_relaxed: 'Slow Travel, Wellness & Coast'
    };
    updatedState.pace = paceMap[stepPayload] || 'Ultra-Luxury & Historic Stays';

    // Synthesize final bespoke itinerary
    const routeSummary = `🏛️ **Your Curated Expedition Blueprint:**\n\n` +
      `• **Focus:** ${updatedState.style}\n` +
      `• **Duration:** ${updatedState.duration}\n` +
      `• **Pace:** ${updatedState.pace}\n\n` +
      `🗺️ **Recommended Route:**\n` +
      `Colombo Airport → Sigiriya 5th-Century Sky Fortress → Kandy Sacred Tooth Relic → Scenic Blue Train to Ella & Nine Arch Bridge → Yala Leopard Safari → UNESCO Galle Fort Ramparts.\n\n` +
      `✨ Our Island Concierge is ready to assign a private chauffeur-guide and secure preferred luxury boutique villa reservations for your dates.`;

    const prefilledWhatsApp = `Hello Serendib Expeditions, I completed your AI Expedition Quiz: ${updatedState.style} (${updatedState.duration}, ${updatedState.pace}). Could you provide a bespoke proposal and private chauffeur availability?`;

    return {
      reply: routeSummary,
      cards: [DESTINATION_CARDS.sigiriya, DESTINATION_CARDS.ella, DESTINATION_CARDS.galle],
      actions: [
        { label: '💬 Send Plan to WhatsApp (+94 71 391 2972)', type: 'whatsapp', payload: `94713912972&text=${encodeURIComponent(prefilledWhatsApp)}` },
        { label: '📅 Open Journey Architect', type: 'navigate', payload: '/planner' },
        { label: '🗺️ Trace Route on Map', type: 'navigate', payload: '/map' }
      ],
      nextState: {}
    };
  }

  return {
    reply: "Would you like to restart the expedition architect quiz?",
    actions: [{ label: '✨ Start Expedition Quiz', type: 'quiz_step', payload: 'start' }],
    nextState: {}
  };
}
