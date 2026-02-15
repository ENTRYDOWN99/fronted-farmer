import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Calendar, RefreshCw, Newspaper, ArrowRight, Tag } from 'lucide-react';

const News = () => {
  const { news, refreshNews } = useStore();
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    await refreshNews();
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       {/* Header with Refresh Button */}
       <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <Newspaper className="text-green-600 h-10 w-10"/> Farming News
            </h1>
            <p className="text-lg text-gray-500 mt-2">Latest updates, technology trends, and market insights.</p>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 hover:border-green-300 transition-all shadow-sm"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin text-green-600' : 'text-gray-500'}`} />
            {loading ? 'Curating Feed...' : 'Refresh Feed'}
          </button>
       </div>

       {news.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.map((item) => (
                 <div key={item.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 hover:border-green-100 transition-all duration-300 group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                       <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 uppercase tracking-wide">
                         <Tag size={12} /> {item.category || 'General'}
                       </span>
                       <span className="text-sm font-medium text-gray-400 flex items-center gap-1">
                         <Calendar size={14}/> {item.date}
                       </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {item.summary}
                    </p>
                    <div className="flex items-center text-green-600 font-bold text-sm group-hover:underline cursor-pointer mt-auto">
                      Read Full Story <ArrowRight size={16} className="ml-1" />
                    </div>
                 </div>
              ))}
           </div>
       ) : (
           <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
               <p className="text-gray-500 text-lg">No news loaded yet.</p>
               <button onClick={handleRefresh} className="mt-4 text-green-600 font-bold hover:underline">Tap to load news</button>
           </div>
       )}
    </div>
  );
};

export default News;