import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminLogin = ({ onSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await adminLogin(credentials);
      
      if (result.success) {
        toast.success('Admin login successful!');
        onSuccess();
      } else {
        toast.error(result.message || 'Admin login failed');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen coffee-bean-section-medium flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-coffee-brown rounded-lg p-8 shadow-2xl max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold mb-2" style={{ color: '#E6C9A2' }}>
            Admin Portal
          </h1>
          <p className="font-lato" style={{ color: '#E6C9A2', opacity: 0.9 }}>
            Estate Deli Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#E6C9A2' }}>
              Admin Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
              placeholder="admin@estatedeli.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#E6C9A2' }}>
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown disabled:opacity-50"
            style={{ backgroundColor: '#E6C9A2' }}
          >
            {loading ? 'Signing in...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.7 }}>
            Admin access only • Secure login required
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin; 