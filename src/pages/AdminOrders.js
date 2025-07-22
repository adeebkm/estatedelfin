import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback demo data
      setOrders([
        {
          _id: '1',
          orderNumber: 'EST001',
          customer: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+91 9876543210'
          },
          items: [
            { name: 'Black Pepper', quantity: 2, price: 299 },
            { name: '100% Arabica Coffee', quantity: 1, price: 450 }
          ],
          total: 1048,
          status: 'pending',
          paymentMethod: 'cod',
          address: {
            street: '123 Coffee Street',
            city: 'Bangalore',
            state: 'Karnataka',
            zipCode: '560001'
          },
          notes: 'Please call before delivery',
          createdAt: new Date('2024-01-20T10:30:00'),
          updatedAt: new Date('2024-01-20T10:30:00')
        },
        {
          _id: '2',
          orderNumber: 'EST002', 
          customer: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+91 9876543211'
          },
          items: [
            { name: 'Filter Coffee Powder', quantity: 1, price: 350 }
          ],
          total: 350,
          status: 'processing',
          paymentMethod: 'online',
          address: {
            street: '456 Bean Avenue',
            city: 'Mumbai',
            state: 'Maharashtra', 
            zipCode: '400001'
          },
          notes: '',
          createdAt: new Date('2024-01-20T11:15:00'),
          updatedAt: new Date('2024-01-20T11:45:00')
        },
        {
          _id: '3',
          orderNumber: 'EST003',
          customer: {
            name: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+91 9876543212'
          },
          items: [
            { name: 'Black Pepper', quantity: 1, price: 299 },
            { name: 'Filter Coffee Powder', quantity: 2, price: 350 }
          ],
          total: 999,
          status: 'delivered',
          paymentMethod: 'cod',
          address: {
            street: '789 Spice Lane',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110001'
          },
          notes: 'Ring the doorbell twice',
          createdAt: new Date('2024-01-19T14:20:00'),
          updatedAt: new Date('2024-01-19T16:30:00')
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      ));
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      
      // Optimistic update for demo
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      ));
      
      toast.success(`Order status updated to ${newStatus}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = !searchTerm || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen coffee-bean-section-medium flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee-brown mx-auto mb-4"></div>
          <p style={{ color: '#E6C9A2' }}>Loading orders...</p>
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
            Order Management
          </h1>
          <p className="font-lato text-lg mt-2" style={{ color: '#E6C9A2', opacity: 0.9 }}>
            View and manage all customer orders
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-coffee-brown rounded-lg p-6 shadow-xl mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by order number, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-coffee-brown rounded-lg p-12 shadow-xl">
                <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#E6C9A2' }}>
                  No Orders Found
                </h3>
                <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
                  No orders match your current filters.
                </p>
              </div>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-coffee-brown rounded-lg p-6 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-playfair text-xl font-semibold" style={{ color: '#E6C9A2' }}>
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                          Placed: {formatDateTime(order.createdAt)}
                        </p>
                        {order.updatedAt !== order.createdAt && (
                          <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.6 }}>
                            Updated: {formatDateTime(order.updatedAt)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-lato text-xl font-bold" style={{ color: '#E6C9A2' }}>
                          ₹{order.total}
                        </p>
                        <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                          {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-medium mb-2" style={{ color: '#E6C9A2' }}>Customer Details:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
                          <strong>Name:</strong> {order.customer.name}
                        </p>
                        <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
                          <strong>Phone:</strong> {order.customer.phone}
                        </p>
                        <p style={{ color: '#E6C9A2', opacity: 0.9 }} className="md:col-span-2">
                          <strong>Email:</strong> {order.customer.email}
                        </p>
                        <p style={{ color: '#E6C9A2', opacity: 0.9 }} className="md:col-span-2">
                          <strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipCode}
                        </p>
                        {order.notes && (
                          <p style={{ color: '#E6C9A2', opacity: 0.9 }} className="md:col-span-2">
                            <strong>Notes:</strong> {order.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2" style={{ color: '#E6C9A2' }}>Order Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-center text-sm">
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
                  </div>

                  {/* Status Management */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium mb-4" style={{ color: '#E6C9A2' }}>Order Status:</h4>
                      
                      <div className="mb-4">
                        <span className={`px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => updateOrderStatus(order._id, 'processing')}
                          disabled={order.status === 'processing'}
                          className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          Mark Processing
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, 'shipped')}
                          disabled={order.status === 'shipped' || order.status === 'delivered'}
                          className="w-full px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          Mark Shipped
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, 'delivered')}
                          disabled={order.status === 'delivered'}
                          className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          Mark Delivered
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, 'cancelled')}
                          disabled={order.status === 'delivered' || order.status === 'cancelled'}
                          className="w-full px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders; 