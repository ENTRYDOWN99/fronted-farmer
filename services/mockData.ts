import { Product, NewsItem, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    farmerId: 'f1',
    farmerName: 'Green Valley Farms',
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    description: 'Fresh, vine-ripened organic tomatoes harvested this morning.',
    price: 3.50,
    unit: 'kg',
    stock: 100,
    sold: 25,
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'p2',
    farmerId: 'f1',
    farmerName: 'Green Valley Farms',
    name: 'Fresh Spinach',
    category: 'Vegetables',
    description: 'Crisp and healthy spinach leaves, pesticide-free.',
    price: 2.00,
    unit: 'bundle',
    stock: 50,
    sold: 10,
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 'p3',
    farmerId: 'f2',
    farmerName: 'Sunny Side Orchard',
    name: 'Honeycrisp Apples',
    category: 'Fruits',
    description: 'Sweet and crunchy apples, perfect for snacking.',
    price: 4.20,
    unit: 'kg',
    stock: 200,
    sold: 45,
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: 'p4',
    farmerId: 'f2',
    farmerName: 'Sunny Side Orchard',
    name: 'Raw Honey',
    category: 'Pantry',
    description: 'Pure, unprocessed honey from our local apiary.',
    price: 12.00,
    unit: 'jar',
    stock: 30,
    sold: 5,
    image: 'https://picsum.photos/400/300?random=4'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Seasonal Harvest Festival',
    summary: 'Join us this weekend for the annual harvest celebration with local farmers.',
    date: '2023-10-15'
  },
  {
    id: 'n2',
    title: 'New Organic Certification',
    summary: 'Three more local farms have received their official organic certification.',
    date: '2023-10-10'
  }
];

export const MOCK_USERS: User[] = [
  { id: 'f1', name: 'John Farmer', email: 'farmer@test.com', role: 'farmer' },
  { id: 'c1', name: 'Jane Customer', email: 'customer@test.com', role: 'customer' }
];
