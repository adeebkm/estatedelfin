import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      // Fallback data for demo
      setOrders([
        {
          _id: '1',
          orderNumber: 'EST001',
          items: [
            { name: 'Black Pepper', quantity: 2, price: 299 },
            { name: '100% Arabica Coffee', quantity: 1, price: 450 }
          ],
          total: 1048,
          status: 'delivered',
          createdAt: new Date('2024-01-15'),
          customerDetails: {
            name: 'John Doe',
            address: '123 Coffee Street, Bangalore'
          }
        },
        {
          _id: '2',
          orderNumber: 'EST002',
          items: [
            { name: 'Filter Coffee Powder', quantity: 1, price: 350 }
          ],
          total: 350,
          status: 'processing',
          createdAt: new Date('2024-01-20'),
          customerDetails: {
            name: 'John Doe',
            address: '123 Coffee Street, Bangalore'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown';
    try {
      return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen coffee-bean-section-medium flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4" style={{ color: '#E6C9A2' }}>
            Please Login
          </h2>
          <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
            You need to be logged in to view your orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen coffee-bean-section-medium">
      {/* Header */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#E6C9A2' }}>
              My Orders
            </h1>
            <p className="font-lato text-lg" style={{ color: '#E6C9A2', opacity: 0.9 }}>
              Track your orders and view purchase history
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee-brown mx-auto mb-4"></div>
                <p style={{ color: '#E6C9A2' }}>Loading your orders...</p>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-coffee-brown rounded-lg p-12 shadow-xl">
                <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#E6C9A2' }}>
                  No Orders Found
                </h3>
                <p style={{ color: '#E6C9A2', opacity: 0.9 }} className="mb-6">
                  You haven't placed any orders yet. Start shopping to see your orders here!
                </p>
                <a
                  href="/#shop"
                  className="inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                  style={{ backgroundColor: '#E6C9A2' }}
                >
                  Start Shopping
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-coffee-brown rounded-lg p-6 shadow-xl"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="font-playfair text-xl font-semibold mb-2" style={{ color: '#E6C9A2' }}>
                        Order #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="font-lato text-lg font-bold mt-2" style={{ color: '#E6C9A2' }}>
                        ₹{order.total}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-600 pt-4 mb-4">
                    <h4 className="font-medium mb-3" style={{ color: '#E6C9A2' }}>Order Items:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center">
                          <span style={{ color: '#E6C9A2', opacity: 0.9 }}>
                            {item.name} × {item.quantity}
                          </span>
                          <span style={{ color: '#E6C9A2' }}>
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="border-t border-gray-600 pt-4">
                    <h4 className="font-medium mb-2" style={{ color: '#E6C9A2' }}>Delivery Details:</h4>
                    <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.9 }}>
                      {order.customerDetails?.name}
                    </p>
                    <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.9 }}>
                      {order.customerDetails?.address}
                    </p>
                  </div>

                  {/* Order Status Timeline */}
                  <div className="mt-6 pt-4 border-t border-gray-600">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className={`flex items-center ${order.status === 'pending' ? 'text-yellow-400' : 'text-green-400'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${order.status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                        Order Placed
                      </div>
                      <div className={`flex items-center ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        Processing
                      </div>
                      <div className={`flex items-center ${['shipped', 'delivered'].includes(order.status) ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${['shipped', 'delivered'].includes(order.status) ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        Shipped
                      </div>
                      <div className={`flex items-center ${order.status === 'delivered' ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${order.status === 'delivered' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                        Delivered
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                      style={{ backgroundColor: '#E6C9A2' }}
                    >
                      {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                    </button>
                    
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border border-gray-400 text-gray-300 rounded-lg font-medium transition-all duration-300 hover:bg-gray-800">
                        Reorder
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders; 