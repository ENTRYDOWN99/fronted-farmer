import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Users, ShoppingBag, Leaf, TrendingUp } from 'lucide-react';

const Home = () => {
  const { products, news, currentUser } = useStore();

  // Stats calculation
  const totalProducts = products.length;
  const totalFarmers = new Set(products.map(p => p.farmerId)).size;
  const totalCategories = new Set(products.map(p => p.category)).size;

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Modern Hero Section */}
      <div className="bg-green-50/50 pt-20 pb-24 md:pt-32 md:pb-32 px-4 border-b border-green-100">
        <div className="max-w-4xl mx-auto text-center">
           <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wide uppercase mb-6">
             Direct from Earth
           </span>
           <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
             Eat Fresh.<br/>
             <span className="text-green-600">Support Local.</span>
           </h1>
           <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
             Connect directly with local farmers. No middlemen, just fresh, organic produce delivered from the field to your table.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/marketplace" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-green-600 rounded-full hover:bg-green-700 shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1">
               Start Shopping
             </Link>
             {!currentUser && (
               <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all">
                 Become a Farmer
               </Link>
             )}
           </div>
        </div>
      </div>

      {/* Minimal Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
             <div className="flex flex-col items-center p-4">
               <span className="text-4xl font-black text-gray-900 mb-2">{totalProducts}+</span>
               <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Fresh Products</span>
             </div>
             <div className="flex flex-col items-center p-4">
               <span className="text-4xl font-black text-gray-900 mb-2">{totalFarmers}</span>
               <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Local Farmers</span>
             </div>
             <div className="flex flex-col items-center p-4">
               <span className="text-4xl font-black text-gray-900 mb-2">{totalCategories}</span>
               <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Categories</span>
             </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Harvest</h2>
            <p className="text-gray-500 mt-3 text-lg">Hand-picked selections for the week</p>
          </div>
          <Link to="/marketplace" className="text-green-600 font-bold flex items-center hover:text-green-700 transition-colors group">
            View Market <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Latest News (Simplified) */}
      <div className="bg-gray-50 border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <TrendingUp size={24}/> 
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Community Updates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map(item => (
              <div key={item.id} className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">{item.date}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;