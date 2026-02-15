import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { User, MapPin, Award, Mail, Sprout, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { User as UserType } from '../types';

const FarmerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { getFarmerById, products, currentUser } = useStore();
  const [farmer, setFarmer] = useState<UserType | undefined>(undefined);
  
  useEffect(() => {
    if (id) {
      const data = getFarmerById(id);
      setFarmer(data);
    }
  }, [id, getFarmerById]);

  if (!farmer) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Farmer not found</h2>
        <Link to="/marketplace" className="text-green-600 hover:underline mt-4">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const farmerProducts = products.filter(p => p.farmerId === farmer.id);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
          <Sprout size={400} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/marketplace" className="inline-flex items-center text-green-100 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Market
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="h-24 w-24 md:h-32 md:w-32 bg-white rounded-full flex items-center justify-center text-green-700 text-4xl font-bold shadow-2xl border-4 border-white/20">
              {farmer.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{farmer.name}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-green-100">
                {farmer.location && (
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <MapPin size={18} /> {farmer.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                   <Mail size={18} /> {farmer.email}
                </span>
              </div>
            </div>
            
            {currentUser?.id === farmer.id && (
              <Link 
                to="/profile" 
                className="bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 shadow-lg transition-all"
              >
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bio Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">About the Farm</h3>
              <p className="text-gray-600 leading-relaxed">
                {farmer.bio || "This farmer hasn't added a bio yet. They are busy growing fresh produce for you!"}
              </p>
            </div>

            {/* Certifications */}
            {farmer.certifications && farmer.certifications.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="text-green-600" /> Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {farmer.certifications.map((cert, index) => (
                    <span key={index} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-semibold border border-green-100">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
             {/* Stats */}
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Farm Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-2xl font-bold text-gray-800">{farmerProducts.length}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Active Products</div>
                    </div>
                    {/* Placeholder for future stats like "Joined Date" or "Total Sales" */}
                     <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-2xl font-bold text-gray-800">100%</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Response Rate</div>
                    </div>
                </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Farm Fresh Products</h2>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                {farmerProducts.length} Items Available
              </span>
            </div>
            
            {farmerProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {farmerProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                <Sprout className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No products listed</h3>
                <p className="text-gray-500 mt-1">This farmer doesn't have any active listings right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;