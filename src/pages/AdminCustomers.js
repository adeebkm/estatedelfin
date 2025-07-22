import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/admin/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Fallback demo data
      setCustomers([
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 9876543210',
          address: '123 Coffee Street, Bangalore',
          joinedAt: new Date('2024-01-15'),
          totalOrders: 8,
          totalSpent: 3240,
          lastOrder: new Date('2024-01-20')
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+91 9876543211',
          address: '456 Bean Avenue, Mumbai',
          joinedAt: new Date('2024-01-10'),
          totalOrders: 12,
          totalSpent: 5680,
          lastOrder: new Date('2024-01-19')
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+91 9876543212',
          address: '789 Spice Lane, Delhi',
          joinedAt: new Date('2024-01-12'),
          totalOrders: 6,
          totalSpent: 2340,
          lastOrder: new Date('2024-01-18')
        },
        {
          _id: '4',
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          phone: '+91 9876543213',
          address: '321 Aroma Road, Chennai',
          joinedAt: new Date('2024-01-08'),
          totalOrders: 15,
          totalSpent: 7250,
          lastOrder: new Date('2024-01-21')
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredCustomers = customers.filter(customer =>
    !searchTerm ||
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen coffee-bean-section-medium flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee-brown mx-auto mb-4"></div>
          <p style={{ color: '#E6C9A2' }}>Loading customers...</p>
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
            Customer Management
          </h1>
          <p className="font-lato text-lg mt-2" style={{ color: '#E6C9A2', opacity: 0.9 }}>
            View and manage customer information and order history
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-coffee-brown rounded-lg p-6 shadow-xl mb-8"
        >
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-transparent"
          />
        </motion.div>

        {/* Customer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-coffee-brown rounded-lg p-6 shadow-xl text-center">
            <p className="text-3xl font-bold" style={{ color: '#E6C9A2' }}>
              {customers.length}
            </p>
            <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
              Total Customers
            </p>
          </div>
          <div className="bg-coffee-brown rounded-lg p-6 shadow-xl text-center">
            <p className="text-3xl font-bold" style={{ color: '#E6C9A2' }}>
              ₹{customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toLocaleString()}
            </p>
            <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
              Total Revenue
            </p>
          </div>
          <div className="bg-coffee-brown rounded-lg p-6 shadow-xl text-center">
            <p className="text-3xl font-bold" style={{ color: '#E6C9A2' }}>
              ₹{Math.round(customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.length || 0)}
            </p>
            <p className="text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
              Average Order Value
            </p>
          </div>
        </motion.div>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20"
            >
              <div className="bg-coffee-brown rounded-lg p-12 shadow-xl">
                <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#E6C9A2' }}>
                  No Customers Found
                </h3>
                <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
                  No customers match your search criteria.
                </p>
              </div>
            </motion.div>
          ) : (
            filteredCustomers.map((customer, index) => (
              <motion.div
                key={customer._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-coffee-brown rounded-lg p-6 shadow-xl"
              >
                {/* Customer Info */}
                <div className="mb-4">
                  <h3 className="font-playfair text-xl font-semibold mb-2" style={{ color: '#E6C9A2' }}>
                    {customer.name}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
                      📧 {customer.email}
                    </p>
                    <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
                      📱 {customer.phone}
                    </p>
                    <p style={{ color: '#E6C9A2', opacity: 0.9 }}>
                      🏠 {customer.address}
                    </p>
                  </div>
                </div>

                {/* Customer Stats */}
                <div className="border-t border-gray-600 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold" style={{ color: '#E6C9A2' }}>
                        {customer.totalOrders}
                      </p>
                      <p className="text-xs" style={{ color: '#E6C9A2', opacity: 0.7 }}>
                        Total Orders
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold" style={{ color: '#E6C9A2' }}>
                        ₹{customer.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-xs" style={{ color: '#E6C9A2', opacity: 0.7 }}>
                        Total Spent
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-xs" style={{ color: '#E6C9A2', opacity: 0.7 }}>
                    <p>Joined: {formatDate(customer.joinedAt)}</p>
                    <p>Last Order: {formatDate(customer.lastOrder)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown"
                    style={{ backgroundColor: '#E6C9A2' }}
                  >
                    View Orders
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300">
                    Contact
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers; 