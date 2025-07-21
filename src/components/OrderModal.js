import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderModal = ({ isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const { items: cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen && isAuthenticated && user) {
      setCustomerInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      });
    }
  }, [isOpen, isAuthenticated, user]);

  // Calculate order totals
  const calculateTotals = () => {
    if (!cart || !Array.isArray(cart)) {
      return { subtotal: 0, tax: 0, deliveryCharge: 0, total: 0 };
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.09; // 9% GST
    const deliveryCharge = subtotal > 500 ? 0 : 50; // Free delivery over ₹500
    const total = subtotal + tax + deliveryCharge;
    
    return { subtotal, tax, deliveryCharge, total };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCustomerInfo(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!customerInfo.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    
    if (!customerInfo.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    
    if (!customerInfo.address.street.trim()) {
      toast.error('Please enter your street address');
      return false;
    }
    
    if (!customerInfo.address.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    if (!cart || cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    
    try {
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        customerDetails: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address
        },
        paymentMethod,
        notes
      };

      const response = await axios.post('/orders', orderData);
      
      setOrderDetails(response.data.order);
      setOrderPlaced(true);
      clearCart();
      
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Order placement failed:', error);
      const message = error.response?.data?.message || 'Failed to place order';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setOrderPlaced(false);
    setOrderDetails(null);
    setNotes('');
  };

  const { subtotal, tax, deliveryCharge, total } = calculateTotals();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {orderPlaced ? 'Order Confirmation' : 'Place Your Order'}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {orderPlaced ? (
                // Order Success Screen
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Order Placed Successfully!</h3>
                    <p className="text-gray-600">Your order has been confirmed and is being processed.</p>
                  </div>

                  {orderDetails && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Order Details</h4>
                      <p className="text-sm text-gray-600 mb-1">Order Number: <span className="font-medium">{orderDetails?.orderNumber || 'N/A'}</span></p>
                      <p className="text-sm text-gray-600 mb-1">Total Amount: <span className="font-medium">₹{orderDetails?.totalAmount || 0}</span></p>
                      <p className="text-sm text-gray-600">Payment Method: <span className="font-medium">{orderDetails?.paymentMethod ? String(orderDetails.paymentMethod).toUpperCase() : 'N/A'}</span></p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      📧 A confirmation email has been sent to {customerInfo?.email || 'your email'}
                    </p>
                    <p className="text-sm text-gray-600">
                      📱 We'll send you updates on your order status
                    </p>
                    <p className="text-sm text-gray-600">
                      🚚 Expected delivery: 30-45 minutes
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="mt-6 w-full bg-coffee-brown text-white py-3 px-6 rounded-md hover:bg-coffee-dark transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                // Order Form
                <div className="space-y-6">
                  {/* Cart Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {cart && cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                      
                      <div className="border-t pt-3 mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>GST (9%):</span>
                          <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delivery Charge:</span>
                          <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                          <span>Total:</span>
                          <span>₹{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Authentication Check */}
                  {!isAuthenticated ? (
                    <div className="text-center py-6">
                      <div className="mb-4">
                        <p className="text-gray-600 mb-2">Please log in to continue with your order</p>
                        <p className="text-sm text-gray-500">Already have an account? Sign in to proceed with checkout</p>
                      </div>
                      <button
                        onClick={() => setShowAuthModal(true)}
                        className="w-full bg-coffee-brown text-white py-3 px-6 rounded-md hover:bg-coffee-dark transition-colors"
                      >
                        Log in to Place Order
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Customer Information (only shown when authenticated) */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              value={customerInfo.name}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                              placeholder="Enter your full name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={customerInfo.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                              placeholder="Enter your email"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                              type="tel"
                              name="phone"
                              value={customerInfo.phone}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                              placeholder="Enter your phone number"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                              type="text"
                              name="address.city"
                              value={customerInfo.address.city}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                              placeholder="Enter your city"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input
                              type="text"
                              name="address.street"
                              value={customerInfo.address.street}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                              placeholder="Enter your street address"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input
                              type="text"
                              name="address.state"
                              value={customerInfo.address.state}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                              placeholder="Enter your state"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                            <input
                              type="text"
                              name="address.zipCode"
                              value={customerInfo.address.zipCode}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                              placeholder="Enter your ZIP code"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Method</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cod"
                              checked={paymentMethod === 'cod'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-gray-700">Cash on Delivery (COD)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="upi"
                              checked={paymentMethod === 'upi'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-gray-700">UPI Payment</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="card"
                              checked={paymentMethod === 'card'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-gray-700">Card Payment</span>
                          </label>
                        </div>
                      </div>

                      {/* Special Instructions */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-brown"
                          placeholder="Any special instructions for your order..."
                        />
                      </div>

                      {/* Place Order Button */}
                      <button
                        onClick={handlePlaceOrder}
                        disabled={loading || !cart || cart.length === 0}
                        className="w-full bg-coffee-brown text-white py-3 px-6 rounded-md hover:bg-coffee-dark transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Placing Order...' : `Place Order - ₹${total.toFixed(2)}`}
                      </button>
                    </>
                  )}

                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* AuthModal for login when user is not authenticated */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </AnimatePresence>
  );
};

export default OrderModal; 