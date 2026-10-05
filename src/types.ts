export interface Product {
  id: string;
  name: string;
  category: string;
  shortTag: string;
  price: number;
  description: string;
  tastingNotes: string[];
  image: string;
  prepTime: string;
  calories?: string;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface QuickOrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  favoriteItem: string;
}
