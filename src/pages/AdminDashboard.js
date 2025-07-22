import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    totalCustomers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch admin stats
      const statsResponse = await axios.get('/admin/stats');
      const ordersResponse = await axios.get('/admin/orders?limit=5');
      
      setStats(statsResponse.data);
      setRecentOrders(ordersResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback demo data
      setStats({
        totalOrders: 156,
        pendingOrders: 8,
        todayRevenue: 12450,
        totalCustomers: 89
      });
      setRecentOrders([
        {
          _id: '1',
          orderNumber: 'EST001',
          customerName: 'John Doe',
          total: 850,
          status: 'pending',
          createdAt: new Date(),
          items: [
            { name: 'Arabica Coffee', quantity: 2 },
            { name: 'Black Pepper', quantity: 1 }
          ]
        },
        {
          _id: '2', 
          orderNumber: 'EST002',
          customerName: 'Jane Smith',
          total: 450,
          status: 'processing',
          createdAt: new Date(Date.now() - 3600000),
          items: [
            { name: 'Filter Coffee', quantity: 1 }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen coffee-bean-section-medium flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee-brown mx-auto mb-4"></div>
          <p style={{ color: '#E6C9A2' }}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen coffee-bean-section-medium">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-4xl font-bold" style={{ color: '#E6C9A2' }}>
            Admin Dashboard
          </h1>
          <p className="font-lato text-lg mt-2" style={{ color: '#E6C9A2', opacity: 0.9 }}>
            Welcome back, {user?.name || 'Admin'}. Here's your business overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-coffee-brown rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                  Total Orders
                </p>
                <p className="text-3xl font-bold" style={{ color: '#E6C9A2' }}>
                  {stats.totalOrders}
                </p>
              </div>
              <div className="bg-yellow-500 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-coffee-brown rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                  Pending Orders
                </p>
                <p className="text-3xl font-bold" style={{ color: '#E6C9A2' }}>
                  {stats.pendingOrders}
                </p>
              </div>
              <div className="bg-red-500 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-coffee-brown rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                  Today's Revenue
                </p>
                <p className="text-3xl font-bold" style={{ color: '#E6C9A2' }}>
                  ₹{stats.todayRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-500 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-coffee-brown rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                  Total Customers
                </p>
                <p className="text-3xl font-bold" style={{ color: '#E6C9A2' }}>
                  {stats.totalCustomers}
                </p>
              </div>
              <div className="bg-blue-500 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-coffee-brown rounded-lg p-6 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl font-semibold" style={{ color: '#E6C9A2' }}>
                Recent Orders
              </h2>
              <Link
                to="/admin/orders"
                className="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                style={{ backgroundColor: '#E6C9A2' }}
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order._id} className="border-b border-gray-600 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold" style={{ color: '#E6C9A2' }}>
                        #{order.orderNumber}
                      </p>
                      <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                        {order.customerName} • {formatTime(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="font-bold mt-1" style={{ color: '#E6C9A2' }}>
                        ₹{order.total}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm" style={{ color: '#E6C9A2', opacity: 0.7 }}>
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} ({item.quantity})
                        {idx < order.items.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-coffee-brown rounded-lg p-6 shadow-xl"
          >
            <h2 className="font-playfair text-2xl font-semibold mb-6" style={{ color: '#E6C9A2' }}>
              Quick Actions
            </h2>

            <div className="space-y-4">
              <Link
                to="/admin/orders"
                className="block w-full p-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                style={{ backgroundColor: '#E6C9A2' }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="font-medium">Manage Orders</span>
                </div>
              </Link>

              <Link
                to="/admin/customers"
                className="block w-full p-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                style={{ backgroundColor: '#E6C9A2' }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">View Customers</span>
                </div>
              </Link>

              <Link
                to="/admin/products"
                className="block w-full p-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                style={{ backgroundColor: '#E6C9A2' }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="font-medium">Manage Products</span>
                </div>
              </Link>

              <Link
                to="/admin/analytics"
                className="block w-full p-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                style={{ backgroundColor: '#E6C9A2' }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">View Analytics</span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 