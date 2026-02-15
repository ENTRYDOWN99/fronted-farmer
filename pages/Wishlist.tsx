import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, products } = useStore();

  const favoriteProducts = products.filter(p => wishlist?.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-100 p-3 rounded-full">
                <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            </div>
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Wishlist</h1>
                <p className="text-gray-500">Your curated collection of farm fresh favorites.</p>
            </div>
        </div>

        {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favoriteProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                <Heart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                <p className="text-gray-500 mt-2 mb-6">Start exploring the market to save items for later.</p>
                <Link to="/marketplace" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm">
                   <ArrowLeft size={18} /> Go to Marketplace
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;