import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BrainCircuit, Sprout, Utensils, Loader2, Send } from 'lucide-react';
import { getAgriAdvisorAdvice } from '../services/geminiService';

const AgriAdvisor = () => {
  const { currentUser } = useStore();
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string>('');
  
  // Inputs
  const [location, setLocation] = useState(currentUser?.location || '');
  const [season, setSeason] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [details, setDetails] = useState(currentUser?.bio || ''); // Reuse bio for convenience, or empty

  const isFarmer = currentUser?.role === 'farmer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !details) return;

    setLoading(true);
    setAdvice('');
    
    // Call the thinking model
    const result = await getAgriAdvisorAdvice(
      isFarmer ? 'farmer' : 'customer',
      { location, season, details }
    );
    
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <BrainCircuit className="h-8 w-8 text-blue-300" />
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
             {isFarmer ? "Strategic Planting Advisor" : "Seasonal Nutrition Guide"}
           </h1>
           <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto">
             {isFarmer 
               ? "Leverage advanced AI to analyze soil, climate, and market trends for your next harvest." 
               : "Discover the best seasonal produce for your region and how it benefits your health."}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 {isFarmer ? <Sprout className="text-green-600"/> : <Utensils className="text-orange-500"/>}
                 Configure Analysis
               </h2>
               
               <form onSubmit={handleSubmit} className="space-y-5">
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-1">Region / Location</label>
                   <input 
                     type="text"
                     required
                     value={location}
                     onChange={(e) => setLocation(e.target.value)}
                     className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50"
                     placeholder="e.g. Napa Valley, CA"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-1">Current Season</label>
                   <select 
                     value={season}
                     onChange={(e) => setSeason(e.target.value)}
                     className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50"
                   >
                     {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                       <option key={m} value={m}>{m}</option>
                     ))}
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-1">
                     {isFarmer ? "Farm Details (Soil, Size, History)" : "Dietary Preferences / Goals"}
                   </label>
                   <textarea 
                     required
                     value={details}
                     onChange={(e) => setDetails(e.target.value)}
                     rows={4}
                     className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50"
                     placeholder={isFarmer 
                       ? "e.g. Clay soil, 5 acres, previously grew corn..." 
                       : "e.g. Vegetarian, looking for high iron, cooking for 2..."}
                   />
                 </div>

                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                   {loading ? 'Thinking Deeply...' : 'Generate Advisor Report'}
                 </button>
               </form>
             </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 min-h-[500px]">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BrainCircuit size={24} className="text-blue-600" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">Analyzing Agricultural Data...</h3>
                  <p className="mt-2 text-gray-500 max-w-md">
                    Our AI is running complex simulations based on your location and inputs. This uses advanced reasoning and may take a moment.
                  </p>
                </div>
              ) : advice ? (
                <div className="prose prose-blue max-w-none">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                      <BrainCircuit size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 m-0">Expert Analysis</h2>
                  </div>
                  {/* Render the markdown response */}
                  <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                    {advice}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 text-gray-400">
                   <BrainCircuit size={64} className="mb-4 text-gray-200" />
                   <p className="text-lg">Enter your details and click generate to receive your report.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgriAdvisor;