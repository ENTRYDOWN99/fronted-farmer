export type UserRole = 'farmer' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  bio?: string; // Farm description for farmers
  location?: string; // Farm location for farmers
  certifications?: string[]; // Array of certifications for farmers
  address?: string; // Delivery address for customers
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string; // e.g., 'kg', 'piece', 'bundle'
  stock: number;
  sold: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category?: string;
}

export interface AppState {
  currentUser: User | null;
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  news: NewsItem[];
  wishlist: string[]; // Array of Product IDs
}