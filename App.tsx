import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import News from './pages/News';
import FarmerProfile from './pages/FarmerProfile';
import Wishlist from './pages/Wishlist';
import SmartAssistant from './pages/SmartAssistant';
import AgriAdvisor from './pages/AgriAdvisor';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { currentUser } = useStore();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { currentUser } = useStore();

  return (
    <>
      {currentUser && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes: Redirect to dashboard if already logged in */}
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" replace />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" replace />} />

          {/* Protected Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/farmer/:id" element={<ProtectedRoute><FarmerProfile /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/assistant" element={<ProtectedRoute><SmartAssistant /></ProtectedRoute>} />
          <Route path="/advisor" element={<ProtectedRoute><AgriAdvisor /></ProtectedRoute>} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      {currentUser && (
        <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} AgriConnect Marketplace. All rights reserved.</p>
          </div>
        </footer>
      )}
    </>
  );
};

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
          <AppRoutes />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;