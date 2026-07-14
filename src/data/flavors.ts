import { IceCreamFlavor, MojitoIngredient, PartyPackage } from '../types';

export const ICE_CREAM_FLAVORS: IceCreamFlavor[] = [
  {
    id: 'nolen-gur',
    name: 'Nolen Gur & Roasted Almond',
    description: 'A luxurious tribute to Bengal’s winter jaggery. Silky sweet cream swirled with authentic liquid Nolen Gur and crunch of premium roasted almonds.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-amber-50',
    badgeColor: 'bg-amber-600 text-white',
    rating: 4.9,
    votes: 412,
    tags: ['Traditional', 'Chef’s Special', 'Nuts'],
    ingredients: ['Authentic Date Palm Jaggery', 'Premium Almonds', 'Organic Full Cream Milk', 'Saffron Touch'],
    originalStory: 'Sourced directly from the local jaggery extractors of Joynagar, our Nolen Gur ice cream captures the soul of Bengali winter dessert celebrations.'
  },
  {
    id: 'gondhoraj-lime',
    name: 'Kolkata Gondhoraj Lime & Basil',
    description: 'Refreshing, intensely aromatic Gondhoraj lime juice and hand-grated zest, beautifully infused with sweet garden basil for an incredibly crisp dessert.',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-emerald-50',
    badgeColor: 'bg-emerald-600 text-white',
    rating: 4.8,
    votes: 289,
    tags: ['Aromatic', 'Refreshing', 'Fruit'],
    ingredients: ['Kolkata Gondhoraj Lime Zest', 'Gondhoraj Juice', 'Sweet Italian Basil Leaves', 'Raw Honey'],
    originalStory: 'The Gondhoraj lemon is Bengal’s culinary pride. We hand-pick each lemon from local orchards to guarantee that majestic, unmatched citrus aroma.'
  },
  {
    id: 'belgian-fudge',
    name: 'Double Chocolate Belgian Fudge',
    description: 'Rich, bittersweet dark Belgian chocolate cream loaded with homemade warm hot chocolate fudge, chocolate chips, and soft chocolate brownie bits.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-stone-100',
    badgeColor: 'bg-stone-800 text-white',
    rating: 5.0,
    votes: 567,
    tags: ['Best Seller', 'Decadent', 'Chocolate'],
    ingredients: ['70% Belgian Dark Chocolate', 'Homemade Chocolate Fudge', 'Warm Chocolate Ganache Swirls', 'Brownie Pieces'],
    originalStory: 'Our fudge is boiled for 4 hours to achieve that thick, sticky texture that pairs flawlessly with our high-cocoa premium chocolate cream.'
  },
  {
    id: 'tutti-frutti',
    name: 'Vibrant Tutti Frutti Classic',
    description: 'The nostalgic Kolkata childhood favorite! Vanilla and orange-blossom premium base studded with candied raw papaya fruits, raisins, and cashew crunch.',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-pink-50',
    badgeColor: 'bg-pink-600 text-white',
    rating: 4.7,
    votes: 318,
    tags: ['Nostalgic', 'Kids’ Favorite', 'Crunchy'],
    ingredients: ['Candied Tutti Frutti Bits', 'Orange Blossom Essence', 'Crispy Cashew Nuts', 'Madagascar Vanilla Base'],
    originalStory: 'Inspired by the old-school ice cream parlors of Park Street, we bring back the vibrant happiness of childhood birthdays with premium hand-candied fruits.'
  },
  {
    id: 'banana-split',
    name: 'Fresh Banana Split Sundae',
    description: 'Creamy local banana-infused cream layered with organic strawberry compote, chocolate ribbons, and whole roasted red cherries.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-yellow-50',
    badgeColor: 'bg-yellow-600 text-white',
    rating: 4.8,
    votes: 194,
    tags: ['Sundae Specialty', 'Fruity', 'Rich'],
    ingredients: ['Organic Robusta Bananas', 'Strawberry Pulp Sauce', 'Dark Chocolate Ribbons', 'Roasted Whole Cherries'],
    originalStory: 'A timeless classic reimagined. We caramelize the bananas slightly before churning them to unlock a deeper, rich butterscotch-banana notes.'
  },
  {
    id: 'alphonso-mango',
    name: 'Alphonso Mango Saffron Rabri',
    description: 'Pure hand-pulled ripe Alphonso mango pulp layered inside a rich, slow-cooked caramelized milk Rabri with strands of Kashmiri Saffron.',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-orange-50',
    badgeColor: 'bg-orange-600 text-white',
    rating: 4.9,
    votes: 498,
    tags: ['Summer Special', 'Royal', 'Traditional'],
    ingredients: ['Devgad Alphonso Mango Pulp', 'Caramelized Milk Rabri', 'Kashmiri Saffron Strands', 'Crushed Pistachios'],
    originalStory: 'The king of fruits meets the king of Bengali milk sweets. Our Rabri is simmered in large iron pots for 6 hours to get the perfect flaky texture.'
  },
  {
    id: 'rose-gulkand',
    name: 'Rose Petal Gulkand Shahi',
    description: 'A majestic floral experience of sweet organic damask rose preserve (Gulkand) with cardamom, crushed green pistachios, and faint notes of royal rosewater.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-red-50',
    badgeColor: 'bg-rose-500 text-white',
    rating: 4.9,
    votes: 245,
    tags: ['Royal', 'Exotic', 'Floral'],
    ingredients: ['Organic Damask Rose Petals', 'Sun-cooked Gulkand', 'Green Cardamom Powder', 'Premium Pistachios'],
    originalStory: 'We use sun-cooked rose petals sourced from certified organic farms, resulting in a subtle, natural sweetness that is soothing and highly refined.'
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel Butterscotch Crunch',
    description: 'Deep golden butterscotch ice cream infused with hand-poured sea-salted caramel ribbons and crisp, home-cooked brown sugar butter praline pieces.',
    image: 'https://images.unsplash.com/photo-1505394033343-40a290cf64ef?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-amber-50',
    badgeColor: 'bg-amber-700 text-white',
    rating: 4.8,
    votes: 382,
    tags: ['Sweet & Salty', 'Crunchy', 'Modern'],
    ingredients: ['Sea Salted Butter Caramel', 'Brown Sugar Butter Praline', 'Rich Butterscotch Custard', 'Roasted Pecans'],
    originalStory: 'The perfect marriage of sweet butterscotch crunch and modern, complex salted caramel. Each batch of praline is cracked by hand to ensure random chunky bites.'
  },
  {
    id: 'paan-shots',
    name: 'Kolkata Paan Shots & Cardamom',
    description: 'Intensely refreshing betel leaf ice cream infused with sweet fennel seeds (saunf), honey dates, candied cardamom, and cooling mint.',
    image: 'https://images.unsplash.com/photo-1517244683807-7ae569f7a51e?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-green-50',
    badgeColor: 'bg-green-700 text-white',
    rating: 4.9,
    votes: 367,
    tags: ['Post-Dinner Favorite', 'Aromatic', 'Digesting'],
    ingredients: ['Fresh Sweet Betel Leaves', 'Fennel Seed Extract', 'Premium Honey Dates', 'Cardamom & Cloves'],
    originalStory: 'The traditional post-meal paan serves as the perfect palette cleanser. Our Paan Shot ice cream is highly popular for premium evening buffet terminations.'
  },
  {
    id: 'hazelnut-nutella',
    name: 'Rich Hazelnut Nutella Crunch',
    description: 'Slow-roasted Italian hazelnuts crushed and infused in milk chocolate ice cream, swirled with dense, gooey ribbons of genuine chocolate hazelnut Nutella.',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-amber-100/50',
    badgeColor: 'bg-amber-900 text-white',
    rating: 5.0,
    votes: 489,
    tags: ['Best Seller', 'Nuts', 'Premium Chocolate'],
    ingredients: ['Roasted Piedmont Hazelnuts', 'Creamy Milk Chocolate Cream', 'Authentic Nutella Ribbons', 'Crispy Wafer Bits'],
    originalStory: 'For the elite chocolate lovers. We blend crispy waffle cone pieces directly into the Nutella layers for an incredible texture surprise in every scoop.'
  },
  {
    id: 'madagascar-vanilla',
    name: 'Classic Madagascar Vanilla Bean',
    description: 'Elegant, rich white cream with visible specks of real Madagascar vanilla bean pods, enhanced with crisp bits of home-spun golden honeycomb candy.',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-stone-50',
    badgeColor: 'bg-neutral-600 text-white',
    rating: 4.6,
    votes: 180,
    tags: ['Classic', 'All-Time Favorite'],
    ingredients: ['Pure Madagascar Vanilla Pods', 'Sweet Whipping Cream', 'Wild Forest Honeycomb Pieces', 'Salted Butter'],
    originalStory: 'Never artificial! You can see and taste the real microscopic seeds of orchid vanilla pods, bringing a profound, woody depth of flavor to your plate.'
  },
  {
    id: 'berry-mascarpone',
    name: 'Berry Blast Mascarpone Swirl',
    description: 'A vibrant tang of local strawberries, wild blueberries, and raspberries cooked down into a tart syrup, folded into thick, buttery Italian Mascarpone cream.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-pink-50/50',
    badgeColor: 'bg-purple-600 text-white',
    rating: 4.8,
    votes: 215,
    tags: ['Fruity', 'Tangy', 'Creamy Cheese'],
    ingredients: ['Italian Mascarpone Cream', 'Wild Raspberry Compote', 'Blueberry Coulis', 'Fresh Strawberry Ribbons'],
    originalStory: 'The velvety, slightly salty richness of mascarpone cheese cuts beautifully through the sweet, vibrant tanginess of forest berries.'
  },
  {
    id: 'mocha-coffee',
    name: 'Choco Roasted Coffee Mocha',
    description: 'Dark, smoky freshly brewed Indian espresso ice cream mixed with dark chocolate chunks and a light dusting of roasted cocoa powder.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    bgColor: 'bg-amber-950/5',
    badgeColor: 'bg-amber-950 text-white',
    rating: 4.7,
    votes: 254,
    tags: ['Coffee', 'Awakening', 'Chocolate'],
    ingredients: ['South Indian Filter Coffee Beans', 'Ecuadorian Cocoa Beans', 'Flaked Cocoa Ribbons', 'Brown Sugar'],
    originalStory: 'We brew a concentrated filter decoction with 80% chicory-free coffee beans to achieve a profound, aromatic, non-bitter espresso ice cream.'
  }
];

export const MOJITO_INGREDIENTS: MojitoIngredient[] = [
  {
    id: 'lime',
    name: 'Fresh Gondhoraj Lime & Mint Juice',
    type: 'base',
    color: '#10B981',
    emoji: '🍋',
    description: 'Freshly squeezed premium local Gondhoraj lime juice which adds that unique Kolkata signature citrus fragrance.'
  },
  {
    id: 'club-soda',
    name: 'Chilled Club Soda & Tonic',
    type: 'base',
    color: '#E0F2FE',
    emoji: '🫧',
    description: 'Carbonated sparkling bubble soda to give your mocktail high fizz and sparkling elegance.'
  },
  {
    id: 'mint-leaves',
    name: 'Bruised Fresh Garden Mint',
    type: 'herb',
    color: '#059669',
    emoji: '🌿',
    description: 'Fresh local garden pudina leaves, gently muddled to release raw aromatic oils.'
  },
  {
    id: 'strawberry',
    name: 'Strawberry Crush & Berries',
    type: 'fruit',
    color: '#EF4444',
    emoji: '🍓',
    description: 'Vibrant sweet strawberry chunks and syrup for a delicious summer berry flavor.'
  },
  {
    id: 'blueberry',
    name: 'Wild Blueberry Compote',
    type: 'fruit',
    color: '#4F46E5',
    emoji: '🫐',
    description: 'Deep blue mashed forest berries providing a majestic purple hue and delicious woody sweetness.'
  },
  {
    id: 'gulkand-syrup',
    name: 'Shahi Gulkand & Rose water',
    type: 'sweetener',
    color: '#F43F5E',
    emoji: '🌹',
    description: 'Traditional rose preserve syrup to craft a highly unique sweet Royal Rose Mojito.'
  },
  {
    id: 'brown-sugar',
    name: 'Muddled Demerara Sugar',
    type: 'sweetener',
    color: '#B45309',
    emoji: '🟤',
    description: 'Rich brown cane sugar that melts beautifully into lime and mint oils.'
  },
  {
    id: 'rock-salt',
    name: 'Kolkata Black Salt (Bit Nun)',
    type: 'garnish',
    color: '#F472B6',
    emoji: '🧂',
    description: 'The final pinch of local black salt to give that authentic chatpata tangy Bengali punch!'
  }
];

export const PARTY_PACKAGES: PartyPackage[] = [
  {
    id: 'silver',
    name: 'Classic Birthday Delight',
    description: 'Perfect for kid’s birthdays and warm private gatherings.',
    basePrice: 8500,
    perGuestPrice: 80,
    minGuests: 50,
    features: [
      'Selection of any 4 Premium Ice Cream flavors',
      'Assorted premium toppings (Choco chips, sprinkles, sauces)',
      '1 Dedicated friendly server with ice cream cart setup',
      'Standard eco-friendly biodegradable cups and wooden spoons',
      '3 Hours of continuous service'
    ],
    badge: 'Popular'
  },
  {
    id: 'gold',
    name: 'Grand Wedding & Event Premium',
    description: 'Our most sought-after premium service for majestic Bengali weddings and corporate galas.',
    basePrice: 18000,
    perGuestPrice: 130,
    minGuests: 100,
    features: [
      'Selection of any 8 Premium Ice Cream flavors (includes Gondhoraj & Nolen Gur)',
      'Live Hot Chocolate Fudge station with fresh waffle cones',
      '2 Dedicated premium-dressed servers with luxury display counter',
      'Gourmet toppings: Roasted almonds, Pistachios, Gulkand glaze',
      'Live Mojito & Mocktail service with 3 customized flavors (Gondhoraj, Blueberry, Strawberry)',
      '4 Hours of uninterrupted service',
      'Premium custom-branded napkins and premium high-grade cups'
    ],
    badge: 'Recommended'
  },
  {
    id: 'platinum',
    name: 'Shahi Royal Event Extravaganza',
    description: 'An elite, unlimited luxury catering experience for high-profile receptions and VIP parties.',
    basePrice: 35000,
    perGuestPrice: 190,
    minGuests: 150,
    features: [
      'Selection of all 13 Premium Ice Cream flavors',
      'Live Hand-rolled Stone Cold Ice cream mixing bar with custom mix-ins',
      'Live premium Mojito, Mocktail, and Mint Iced Tea service station with 5 flavors',
      '3 Professional servers with a grand luxury backlit illuminated bar counter',
      'Unlimited toppings: Exotic fruits, premium dry fruits, organic gold leaves',
      'Custom theme-matched stall decorations and selfie corner styling',
      '6 Hours of full event coverage'
    ],
    badge: 'Ultra Luxury'
  }
];
