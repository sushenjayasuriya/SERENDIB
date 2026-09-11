import type { CulinaryDish } from '../types/travel';

export const culinaryDishes: CulinaryDish[] = [
  {
    id: 'rice-and-curry',
    name: 'Rice & Curry (Traditional Feast)',
    sinhalaName: 'Bath Saha Karri (බත් සහ කරි)',
    tagline: 'The daily culinary symphony: fragrant red rice surrounded by 5 to 8 clay-pot curries.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    description: 'Not a single dish, but an elaborate harmony of tastes balancing spicy, sour, sweet, and creamy. Typically features slow-simmered black pork or fish curry, dhal in coconut milk, tempered jackfruit (Polos), gotu kola salad, and crispy papadum.',
    flavorProfile: ['Rich Coconut Milk Creaminess', 'Roasted Ceylon Curry Powder', 'Tart Goraka (Garcinia)', 'Fiery Chili Punch'],
    keyIngredients: ['Ceylon Cinnamon', 'Curry Leaves (Karapincha)', 'Pandan (Rampe)', 'Fresh Coconut Milk', 'Goraka'],
    pairing: 'Fresh King Coconut water (Thambili) straight from the husk.'
  },
  {
    id: 'hoppers',
    name: 'Egg & Plain Hoppers (Appa)',
    sinhalaName: 'Appa & Biththara Appa (ආප්ප)',
    tagline: 'Crispy lacy bowl-shaped pancakes with a pillowy soft steamed center.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    description: 'Made from fermented rice flour batter, coconut milk, and a splash of coconut toddy. Swirled in a hemispherical wok so the edges crisp into golden lace while the center remains cloud-soft, often crowned with a sunny steamed farm egg.',
    flavorProfile: ['Crispy Golden Lace', 'Subtle Yeasty Sweetness', 'Rich Molten Yolk', 'Spicy Sambol Bite'],
    keyIngredients: ['Fermented Rice Flour', 'Thick Coconut Cream', 'Farm Eggs', 'Lunu Miris Sambol'],
    pairing: 'Lunu Miris (crushed chili-onion paste) & Seeni Sambol (caramelized onion preserve).'
  },
  {
    id: 'kottu-roti',
    name: 'Kottu Roti (The Street Rhapsody)',
    sinhalaName: 'Kottu (කොත්තු)',
    tagline: 'The rhythmic musical heartbeat of Sri Lankan night street food.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Shredded godamba flatbread chopped furiously on an iron griddle using two metal blades with a rhythmic clattering beat. Tossed with crisp shredded leeks, carrots, egg, aromatic meat curry gravy, and optional molten melted cheese.',
    flavorProfile: ['Smoky Griddled Flatbread', 'Savory Spiced Gravy', 'Crisp Vegetables', 'Satisfying Chewy Texture'],
    keyIngredients: ['Godamba Roti Flatbread', 'Curry Gravy', 'Leeks & Onions', 'Eggs', 'Fresh Green Chilies'],
    pairing: 'Chilled local ginger beer (EGB) or fresh iced lime juice.'
  },
  {
    id: 'string-hoppers',
    name: 'String Hoppers (Idiyappam)',
    sinhalaName: 'Idiyappam (ඉඳිආප්ප)',
    tagline: 'Delicate steamed rice noodle nests served for breakfast or dinner.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    description: 'Rice flour dough extruded into intricate vermicelli coils and steamed on woven cane trays. Served in stacks of 10 or 15 alongside gentle turmeric-infused coconut milk gravy (Kiri Hodi) and freshly grated Pol Sambol.',
    flavorProfile: ['Light & Silky Noodles', 'Aromatic Turmeric Gravy', 'Zesty Coconut Sambol'],
    keyIngredients: ['White or Red Rice Flour', 'Kiri Hodi (Coconut Turmeric Gravy)', 'Pol Sambol', 'Curry Leaf Tempering'],
    pairing: 'Kiri Hodi with a dash of lime juice and fresh Maldive fish flakes.'
  },
  {
    id: 'lamprais',
    name: 'Ceylon Dutch Burgher Lamprais',
    sinhalaName: 'Lamprais (ලම්ප්රයිස්)',
    tagline: 'A royal banana-leaf parcel baked with Dutch Burgher heritage.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    description: 'Derived from Dutch "lump-rice". Short-grain samba rice cooked in rich meat stock, accompanied by a three-meat curry (beef, pork, mutton), frikkadels (Dutch meatballs), blachan prawn paste, and sweet eggplant moju, wrapped in a banana leaf and slow-baked.',
    flavorProfile: ['Deep Smoky Banana Leaf Infusion', 'Cardamom & Clove Warmth', 'Sweet-Sour Moju', 'Rich Savory Stock'],
    keyIngredients: ['Steamed Banana Leaf', 'Seeramba Rice', 'Frikkadel Meatballs', 'Brinjal Eggplant Moju', 'Blachan'],
    pairing: 'Traditional cucumber salad in coconut vinegar.'
  },
  {
    id: 'pol-sambol',
    name: 'Pol Sambol (Fresh Coconut Relish)',
    sinhalaName: 'Pol Sambol (පොල් සම්බෝල)',
    tagline: 'The undisputed national condiment that accompanies almost every meal.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    description: 'Freshly scraped coconut meat ground on a traditional granite miris gala (grinding stone) with red chili flakes, crushed shallots, sun-dried Maldive fish flakes, sea salt, and a generous squeeze of fresh lime juice.',
    flavorProfile: ['Zesty Citrus Zing', 'Nutty Sweet Coconut', 'Smoky Umami Maldive Fish', 'Sharp Chili Heat'],
    keyIngredients: ['Fresh Coconut Scraps', 'Dry Red Chili & Kochchi', 'Red Pearl Onions', 'Maldive Cured Fish', 'Lime Juice'],
    pairing: 'Fresh woodfired roast paan (bread) and dhal curry.'
  },
  {
    id: 'watalappam',
    name: 'Watalappam (Spiced Jaggery Pudding)',
    sinhalaName: 'Watalappam (වටලප්පන්)',
    tagline: 'Velvety coconut jaggery custard perfumed with nutmeg and cardamom.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    description: 'An iconic dessert introduced by Malay settlers. Steamed pudding made from rich kithul palm jaggery syrup, thick coconut cream, and farm eggs, generously spiced with freshly ground cardamom, cloves, and nutmeg, finished with toasted cashews.',
    flavorProfile: ['Deep Caramel Kithul Treacle', 'Silky Steamed Custard', 'Fragrant Cardamom & Nutmeg', 'Crunchy Toasted Cashews'],
    keyIngredients: ['Pure Kithul Palm Treacle Jaggery', 'Thick Coconut Milk', 'Nutmeg & Cardamom Pods', 'Sri Lankan Cashews'],
    pairing: 'A steaming cup of black Ceylon Orange Pekoe tea.'
  },
  {
    id: 'ceylon-tea',
    name: 'Pure Ceylon Single-Estate Tea',
    sinhalaName: 'Sri Lanka The (ශ්‍රී ලංකා තේ)',
    tagline: 'The world’s gold standard of pure orthodox hand-picked tea.',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    description: 'Grown across diverse microclimates from the sea-level Ruhuna region to the 6,000-foot peaks of Nuwara Eliya and Dimbula. Ranging from golden amber floral notes to deep brisk malty infusions, hand-picked with artisanal precision.',
    flavorProfile: ['Bright Golden Cup', 'Floral Jasmine & Bergamot Aromas', 'Crisp Tannic Finish', 'Clean Citrus Undertones'],
    keyIngredients: ['Camellia Sinensis (Highland Orthodox Flush)', 'Two Leaves and a Bud Hand Harvest'],
    pairing: 'Fresh ginger biscuits or jaggery toffee.'
  }
];
