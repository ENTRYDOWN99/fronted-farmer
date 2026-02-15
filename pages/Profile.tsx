import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { User, MapPin, Award, Truck, Phone, FileText, Save, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, updateProfile } = useStore();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    bio: '',
    location: '',
    address: '',
    certifications: '',
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phoneNumber: currentUser.phoneNumber || '',
      bio: currentUser.bio || '',
      location: currentUser.location || '',
      address: currentUser.address || '',
      certifications: currentUser.certifications?.join(', ') || '',
    });
  }, [currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call and save delay
    setTimeout(() => {
      updateProfile({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        bio: formData.bio,
        location: formData.location,
        address: formData.address,
        certifications: formData.certifications.split(',').map(c => c.trim()).filter(c => c),
      });
      setIsSaving(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 800);
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
           {/* Header */}
           <div className="bg-green-600 px-8 py-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-white/10 w-40 h-40 rounded-full blur-3xl"></div>
             <div className="relative z-10 flex items-center gap-6">
                <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                   <h1 className="text-3xl font-bold">{currentUser.name}</h1>
                   <p className="text-green-100 font-medium capitalize flex items-center gap-2">
                     {currentUser.role === 'farmer' ? <><User size={16}/> Farmer Account</> : <><User size={16}/> Customer Account</>}
                   </p>
                </div>
             </div>
           </div>

           {/* Form */}
           <form onSubmit={handleSubmit} className="p-8 space-y-8">
             {/* General Info */}
             <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <User className="text-green-600"/> General Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                       <div className="relative">
                         <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                         <input 
                           type="email" 
                           value={formData.email}
                           disabled
                           className="w-full rounded-xl border-gray-200 bg-gray-100 py-3 pl-11 px-4 text-gray-500 cursor-not-allowed"
                         />
                       </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                       <div className="relative">
                         <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                         <input 
                           type="tel" 
                           name="phoneNumber"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           placeholder="+1 (555) 000-0000"
                           className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 pl-11 px-4 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                         />
                       </div>
                   </div>
                </div>
             </div>

             <div className="border-t border-gray-100 pt-8">
               {currentUser.role === 'farmer' ? (
                 <>
                   <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <FileText className="text-green-600"/> Farm Details
                   </h2>
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">About Your Farm</label>
                        <textarea 
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell customers about your farming practices, history, and values..."
                          className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Location</label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                              <input 
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, State"
                                className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 pl-11 px-4 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                              />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Certifications</label>
                            <div className="relative">
                              <Award className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                              <input 
                                type="text"
                                name="certifications"
                                value={formData.certifications}
                                onChange={handleChange}
                                placeholder="Organic, Non-GMO (comma separated)"
                                className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 pl-11 px-4 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                              />
                            </div>
                         </div>
                      </div>
                   </div>
                 </>
               ) : (
                 <>
                   <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Truck className="text-green-600"/> Delivery Preferences
                   </h2>
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Default Delivery Address</label>
                      <textarea 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        placeholder="123 Main St, Apt 4B..."
                        className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                      />
                   </div>
                 </>
               )}
             </div>

             {/* Footer Actions */}
             <div className="pt-4 flex items-center justify-between">
                {message && (
                  <span className="text-green-600 font-medium animate-fade-in px-4 py-2 bg-green-50 rounded-lg">
                    {message}
                  </span>
                )}
                <div className="flex-1"></div> {/* Spacer if message is empty to keep button right */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
