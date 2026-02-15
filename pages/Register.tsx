import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Sprout, User, Mail, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'farmer' | 'customer'>('customer');
  const { register } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
           <div className="bg-green-100 p-3 rounded-2xl">
             <Sprout className="h-10 w-10 text-green-600" />
           </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">Join AgriConnect</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start your journey with fresh, local produce
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">I want to...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${role === 'customer' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    checked={role === 'customer'}
                    onChange={() => setRole('customer')}
                  />
                  <span className={`text-sm font-bold ${role === 'customer' ? 'text-green-700' : 'text-gray-600'}`}>Buy Products</span>
                </label>
                
                <label className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${role === 'farmer' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    checked={role === 'farmer'}
                    onChange={() => setRole('farmer')}
                  />
                  <span className={`text-sm font-bold ${role === 'farmer' ? 'text-green-700' : 'text-gray-600'}`}>Sell Products</span>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-green-200 text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5"
              >
                Create Account <ArrowRight size={16} className="ml-2"/>
              </button>
            </div>
          </form>

          <div className="mt-8">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                   <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
                </div>
             </div>
             <div className="mt-6 text-center">
               <Link to="/login" className="font-bold text-green-600 hover:text-green-500 hover:underline">
                 Sign in instead
               </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;