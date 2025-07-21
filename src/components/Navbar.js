import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import OrderModal from './OrderModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { getCartCount, items: cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleCartClick = () => {
    if (!cart || cart.length === 0) {
      alert('Your cart is empty! Add some items from the shop section.');
      return;
    }
    
    // Show order modal regardless of authentication status
    // Authentication will be checked when placing the order
    setShowOrderModal(true);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#E6C9A2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button onClick={scrollToTop} className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 640 512" className="fill-coffee-brown">
                <path d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"></path>
              </svg>
              <span className="font-playfair text-2xl font-bold text-coffee-brown">
                EstateDeli
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={scrollToTop}
                className="text-coffee-brown hover:text-coffee-dark transition-all duration-300 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-coffee-brown hover:text-coffee-dark transition-all duration-300 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="text-coffee-brown hover:text-coffee-dark transition-all duration-300 font-medium"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('shop')}
                className="text-coffee-brown hover:text-coffee-dark transition-all duration-300 font-medium"
              >
                Shop
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-coffee-brown hover:text-coffee-dark transition-all duration-300 font-medium"
              >
                Contact
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button 
                onClick={handleCartClick}
                className="relative p-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 bg-coffee-brown rounded-full hover:bg-coffee-dark"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current text-white">
                  <path d="M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15V16C5 17.1 5.9 18 7 18H19V16H7.42C7.28 16 7.17 15.89 7.17 15.75L7.2 15.63L8.1 14H15.55C16.3 14 16.96 13.59 17.3 12.97L20.88 5.48C20.95 5.34 21 5.17 21 5S20.95 4.66 20.88 4.52C20.66 4.21 20.28 4 19.86 4H5.21L4.27 2H1ZM17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18Z"/>
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Authentication */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 bg-coffee-brown text-white px-4 py-2 rounded-full hover:bg-coffee-dark"
                  >
                    <span className="text-sm font-medium">
                      Hi, {user?.firstName}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          alert('Profile page coming soon!');
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          alert('Order history coming soon!');
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Order History
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="text-coffee-brown hover:text-coffee-dark transition-colors duration-300 bg-coffee-brown text-white px-4 py-2 rounded-full hover:bg-coffee-dark"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-coffee-brown hover:text-coffee-dark transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  onClick={scrollToTop}
                  className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                >
                  Menu
                </button>
                <button 
                  onClick={() => scrollToSection('shop')}
                  className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                >
                  Shop
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                >
                  Contact
                </button>
                
                {/* Mobile Authentication */}
                {isAuthenticated ? (
                  <div className="border-t border-coffee-brown pt-2">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        alert('Profile page coming soon!');
                      }}
                      className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        alert('Order history coming soon!');
                      }}
                      className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                    >
                      Order History
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <OrderModal 
        isOpen={showOrderModal} 
        onClose={() => setShowOrderModal(false)} 
      />
    </>
  );
};

export default Navbar; 