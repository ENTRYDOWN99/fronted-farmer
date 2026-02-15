import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Sparkles, Search, Loader2 } from 'lucide-react';
import { recommendProductsForMeal } from '../services/geminiService';

const SmartAssistant = () => {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    
    // Prepare simplified product list for AI
    const simplifiedProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description
    }));

    const results = await recommendProductsForMeal(query, simplifiedProducts);
    setRecommendedIds(results);
    setLoading(false);
  };

  const recommendedProducts = products.filter(p => recommendedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-purple-700 text-white py-16 px-4 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
                <Sparkles className="h-8 w-8 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">AI Shopping Assistant</h1>
            <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto">
                Not sure what to buy? Tell us what you want to cook, and we'll find the fresh ingredients for you.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
         {/* Search Box */}
         <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/10 p-2 md:p-3 max-w-3xl mx-auto mb-12 flex">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. I want to make a fresh Greek salad for 4 people..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-purple-500/50 bg-gray-50 focus:bg-white transition-all text-gray-800 placeholder-gray-400 text-lg"
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="bg-purple-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                    <span className="hidden md:inline">{loading ? 'Thinking...' : 'Find Ingredients'}</span>
                </button>
            </form>
         </div>

         {/* Results */}
         {hasSearched && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {loading ? (
                     <div className="text-center py-20">
                         <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4"/>
                         <p className="text-gray-500">Analyzing our inventory for the best matches...</p>
                     </div>
                 ) : recommendedProducts.length > 0 ? (
                     <div>
                         <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Recommended Ingredients</h2>
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">{recommendedProducts.length} items found</span>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                             {recommendedProducts.map(product => (
                                 <ProductCard key={product.id} product={product} />
                             ))}
                         </div>
                     </div>
                 ) : (
                     <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                         <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900">No matching ingredients found</h3>
                         <p className="text-gray-500 mt-2">Try a different recipe or description. Our farmers are always adding new produce!</p>
                     </div>
                 )}
             </div>
         )}
      </div>
    </div>
  );
};

export default SmartAssistant;