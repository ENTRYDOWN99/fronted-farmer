import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Using HashRouter under the hood
import { useStore } from '../context/StoreContext';
import { ShoppingCart, LogOut, Menu, User, Sprout, LayoutDashboard, X, Newspaper, Heart, Sparkles, BrainCircuit } from 'lucide-react';

const Navbar = () => {
  const { currentUser, cart, logout, wishlist } = useStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-green-100 p-2 rounded-xl group-hover:bg-green-200 transition-colors">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-green-700 transition-colors">AgriConnect</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-1">
                <Link to="/marketplace" className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all">Marketplace</Link>
                <Link to="/news" className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all flex items-center gap-2">
                    <Newspaper size={16}/> News
                </Link>
                {currentUser && (
                   <Link to="/advisor" className="px-4 py-2 rounded-full text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-2">
                       <BrainCircuit size={16}/> Agri-Advisor
                   </Link>
                )}
                {currentUser?.role === 'customer' && (
                     <Link to="/assistant" className="px-4 py-2 rounded-full text-sm font-bold text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all flex items-center gap-2">
                        <Sparkles size={16}/> AI Shopper
                    </Link>
                )}
                {currentUser && (
                  <Link to="/dashboard" className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all flex items-center gap-2">
                    <LayoutDashboard size={16}/> Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {currentUser ? (
                <>
                  {currentUser.role === 'customer' && (
                    <>
                    <Link to="/wishlist" className="relative p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Wishlist">
                        <Heart className="h-6 w-6" />
                        {(wishlist && wishlist.length > 0) && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                            {wishlist.length}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart" className="relative p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all" title="Cart">
                      <ShoppingCart className="h-6 w-6" />
                      {cart.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-600 rounded-full">
                          {cart.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                      )}
                    </Link>
                    </>
                  )}
                  <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden lg:block">
                      <Link to="/profile" className="block text-sm font-medium text-gray-900 hover:text-green-600 transition-colors">{currentUser.name}</Link>
                      <div className="text-xs text-gray-500">{currentUser.role === 'farmer' ? 'Farmer Account' : 'Customer'}</div>
                    </div>
                    <Link to="/profile" className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all" title="Profile">
                      <User className="h-5 w-5" />
                    </Link>
                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Logout">
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Login</Link>
                  <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-md shadow-green-200 transition-all transform hover:-translate-y-0.5">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/marketplace" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50">Marketplace</Link>
             <Link to="/news" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50">News</Link>
             {currentUser && (
               <Link to="/advisor" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50">Agri-Advisor</Link>
             )}
            {currentUser?.role === 'customer' && (
                <Link to="/assistant" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-purple-600 hover:bg-purple-50">AI Shopper</Link>
            )}
            {currentUser && (
               <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50">Dashboard</Link>
            )}
            
            {currentUser ? (
              <div className="mt-4 pt-4 border-t border-gray-100">
                 <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 mb-4 group hover:bg-green-50 rounded-lg py-2 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 group-hover:bg-green-200 transition-colors">
                        <User className="h-5 w-5"/>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 group-hover:text-green-800">{currentUser.name}</div>
                      <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                    </div>
                 </Link>
                 <div className="space-y-2">
                   {currentUser.role === 'customer' && (
                    <>
                     <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-green-50">My Cart ({cart.length})</Link>
                     <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-green-50">My Wishlist</Link>
                    </>
                   )}
                   <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-green-50">My Profile</Link>
                   <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50">Sign out</button>
                 </div>
              </div>
            ) : (
               <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 px-2">
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-2 border border-gray-200 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Login</Link>
                 <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-2 border border-transparent rounded-lg text-base font-medium text-white bg-green-600 hover:bg-green-700 shadow-sm">Register</Link>
               </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;