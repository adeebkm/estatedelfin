import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import AdminLogin from './components/AdminLogin';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import './index.css';

// Component to conditionally render navbar
function AppContent() {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  useEffect(() => {
    // Don't show admin login while authentication is loading
    if (loading) {
      return;
    }
    
    // Check if user is trying to access admin without admin login
    if (isAdminRoute && (!isAuthenticated || user?.role !== 'admin')) {
      setShowAdminLogin(true);
    } else {
      setShowAdminLogin(false);
    }
  }, [isAdminRoute, isAuthenticated, user, loading]);

  // Show loading while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen coffee-bean-section-medium flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee-brown mx-auto mb-4"></div>
          <p style={{ color: '#E6C9A2' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Show admin login if needed
  if (showAdminLogin) {
    return <AdminLogin onSuccess={() => setShowAdminLogin(false)} />;
  }

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/products" element={<div className="min-h-screen coffee-bean-section-medium flex items-center justify-center"><div className="text-center"><h1 className="font-playfair text-4xl font-bold" style={{ color: '#E6C9A2' }}>Product Management</h1><p style={{ color: '#E6C9A2', opacity: 0.9 }}>Coming Soon...</p></div></div>} />
        <Route path="/admin/analytics" element={<div className="min-h-screen coffee-bean-section-medium flex items-center justify-center"><div className="text-center"><h1 className="font-playfair text-4xl font-bold" style={{ color: '#E6C9A2' }}>Analytics Dashboard</h1><p style={{ color: '#E6C9A2', opacity: 0.9 }}>Coming Soon...</p></div></div>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <AppContent />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App; 