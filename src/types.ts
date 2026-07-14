export interface IceCreamFlavor {
  id: string;
  name: string;
  description: string;
  image: string;
  bgColor: string;
  badgeColor: string;
  rating: number;
  votes: number;
  tags: string[];
  ingredients: string[];
  originalStory?: string;
}

export interface MojitoIngredient {
  id: string;
  name: string;
  type: 'base' | 'fruit' | 'herb' | 'garnish' | 'sweetener';
  color: string;
  emoji: string;
  description: string;
}

export interface PartyPackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  perGuestPrice: number;
  minGuests: number;
  features: string[];
  badge: string;
}

export interface EventBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  guestCount: number;
  selectedFlavors: string[];
  mojitoServiceEnabled: boolean;
  notes: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  estimatedCost: number;
}
