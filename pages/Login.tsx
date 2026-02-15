import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Sprout, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'farmer' | 'customer'>('customer');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, role)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
           <div className="bg-green-100 p-3 rounded-2xl">
             <Sprout className="h-10 w-10 text-green-600" />
           </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
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
              <label className="block text-sm font-semibold text-gray-700 mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${role === 'customer' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    checked={role === 'customer'}
                    onChange={() => setRole('customer')}
                  />
                  <span className={`text-sm font-bold ${role === 'customer' ? 'text-green-700' : 'text-gray-600'}`}>Customer</span>
                </label>
                
                <label className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${role === 'farmer' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    checked={role === 'farmer'}
                    onChange={() => setRole('farmer')}
                  />
                  <span className={`text-sm font-bold ${role === 'farmer' ? 'text-green-700' : 'text-gray-600'}`}>Farmer</span>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-green-200 text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5"
              >
                Sign In <ArrowRight size={16} className="ml-2"/>
              </button>
            </div>
          </form>

          <div className="mt-8">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                   <span className="px-4 bg-white text-gray-500 font-medium">New to AgriConnect?</span>
                </div>
             </div>
             <div className="mt-6 text-center">
               <Link to="/register" className="font-bold text-green-600 hover:text-green-500 hover:underline">
                 Create a free account
               </Link>
             </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 bg-gray-100 inline-block px-3 py-1 rounded-full">
              Demo Login: <b>farmer@test.com</b> (Farmer) or <b>customer@test.com</b> (Customer)
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;