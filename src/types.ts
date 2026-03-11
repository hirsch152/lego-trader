export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  image_url: string | null;
  contact_info: string;
  created_at: string;
  set_number?: string;
  trade_availability?: 'Available for Trade' | 'Trade + Cash' | 'For Sale Only';
  has_box?: boolean;
  has_instructions?: boolean;
  is_complete?: boolean;
  piece_count?: number;
  year_released?: number;
  watching_count?: number;
  is_verified?: boolean;
}

export interface Notification {
  id: number;
  message: string;
  type: 'offer' | 'trade';
  listing_id: number;
  timestamp: string;
  is_read: boolean;
}

export type Category = 'Star Wars' | 'Technic' | 'City' | 'Ninjago' | 'Harry Potter' | 'Minifigures' | 'Other';
export const CATEGORIES: Category[] = ['Star Wars', 'Technic', 'City', 'Ninjago', 'Harry Potter', 'Minifigures', 'Other'];

export type Condition = 'New (Sealed)' | 'Used (Complete)' | 'Used (Incomplete)' | 'Minifigure Only';
export const CONDITIONS: Condition[] = ['New (Sealed)', 'Used (Complete)', 'Used (Incomplete)', 'Minifigure Only'];
