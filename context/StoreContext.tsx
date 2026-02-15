import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Product, Order, CartItem, AppState, NewsItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_NEWS, MOCK_USERS } from '../services/mockData';
import { generateFarmingNews } from '../services/geminiService';

interface StoreContextType extends AppState {
  login: (email: string, role: 'farmer' | 'customer') => boolean;
  logout: () => void;
  register: (name: string, email: string, role: 'farmer' | 'customer') => void;
  updateProfile: (updates: Partial<User>) => void;
  addProduct: (product: Omit<Product, 'id' | 'farmerId' | 'sold' | 'farmerName'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => void;
  refreshNews: () => Promise<void>;
  getFarmerById: (id: string) => User | undefined;
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'agri_connect_data_v1';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentUser: null,
      products: INITIAL_PRODUCTS,
      orders: [],
      cart: [],
      news: INITIAL_NEWS,
      wishlist: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (email: string, role: 'farmer' | 'customer') => {
    // Mock login logic - checks against mock users or allows demo login
    const foundUser = MOCK_USERS.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setState(prev => ({ ...prev, currentUser: foundUser }));
      return true;
    }
    // For demo purposes, allow any new login if not in mock list
    const newUser: User = { id: Date.now().toString(), name: email.split('@')[0], email, role };
    setState(prev => ({ ...prev, currentUser: newUser }));
    return true;
  };

  const register = (name: string, email: string, role: 'farmer' | 'customer') => {
    const newUser: User = { id: Date.now().toString(), name, email, role };
    setState(prev => ({ ...prev, currentUser: newUser }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null, cart: [], wishlist: [] }));
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!state.currentUser) return;
    
    setState(prev => ({
      ...prev,
      currentUser: { ...prev.currentUser!, ...updates }
    }));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'farmerId' | 'sold' | 'farmerName'>) => {
    if (!state.currentUser || state.currentUser.role !== 'farmer') return;
    
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      farmerId: state.currentUser.id,
      farmerName: state.currentUser.name,
      sold: 0
    };

    setState(prev => ({ ...prev, products: [...prev.products, newProduct] }));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deleteProduct = (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const addToCart = (product: Product, quantity: number) => {
    setState(prev => {
      const existingItem = prev.cart.find(item => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prev.cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newCart = [...prev.cart, { ...product, quantity }];
      }
      return { ...prev, cart: newCart };
    });
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== productId)
    }));
  };

  const clearCart = () => {
    setState(prev => ({ ...prev, cart: [] }));
  };

  const checkout = () => {
    if (!state.currentUser || state.cart.length === 0) return;

    const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: Date.now().toString(),
      customerId: state.currentUser.id,
      items: [...state.cart],
      totalAmount,
      date: new Date().toISOString(),
      status: 'Processing'
    };

    // Update product stock and sold count
    const updatedProducts = state.products.map(p => {
      const cartItem = state.cart.find(c => c.id === p.id);
      if (cartItem) {
        return {
          ...p,
          stock: p.stock - cartItem.quantity,
          sold: p.sold + cartItem.quantity
        };
      }
      return p;
    });

    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      products: updatedProducts,
      cart: []
    }));
  };

  const refreshNews = async () => {
    const newArticles = await generateFarmingNews();
    const formattedNews: NewsItem[] = newArticles.map((a, i) => ({
      id: Date.now().toString() + i,
      title: a.title,
      summary: a.summary,
      date: a.date,
      category: a.category
    }));
    if (formattedNews.length > 0) {
        setState(prev => ({ ...prev, news: formattedNews }));
    }
  };

  const getFarmerById = (id: string) => {
    const mockUser = MOCK_USERS.find(u => u.id === id && u.role === 'farmer');
    if (mockUser) return mockUser;
    
    if (state.currentUser?.id === id && state.currentUser.role === 'farmer') {
      return state.currentUser;
    }

    return undefined;
  };

  const toggleWishlist = (productId: string) => {
    setState(prev => {
        const list = prev.wishlist || [];
        if (list.includes(productId)) {
            return { ...prev, wishlist: list.filter(id => id !== productId) };
        } else {
            return { ...prev, wishlist: [...list, productId] };
        }
    });
  };

  return (
    <StoreContext.Provider value={{
      ...state,
      login,
      logout,
      register,
      updateProfile,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      removeFromCart,
      clearCart,
      checkout,
      refreshNews,
      getFarmerById,
      toggleWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};