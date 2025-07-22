import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#E6C9A2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/admin" className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 640 512" className="fill-coffee-brown">
              <path d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"></path>
            </svg>
            <span className="font-playfair text-2xl font-bold text-coffee-brown">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/admin"
              className={`navbar-link ${isActive('/admin') ? 'font-bold' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/orders"
              className={`navbar-link ${isActive('/admin/orders') ? 'font-bold' : ''}`}
            >
              Orders
            </Link>
            <Link 
              to="/admin/customers"
              className={`navbar-link ${isActive('/admin/customers') ? 'font-bold' : ''}`}
            >
              Customers
            </Link>
            <Link 
              to="/admin/products"
              className={`navbar-link ${isActive('/admin/products') ? 'font-bold' : ''}`}
            >
              Products
            </Link>
            <Link 
              to="/admin/analytics"
              className={`navbar-link ${isActive('/admin/analytics') ? 'font-bold' : ''}`}
            >
              Analytics
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Back to Site */}
            <Link 
              to="/"
              className="hidden md:block text-coffee-brown hover:text-coffee-dark transition-colors duration-300 text-sm"
            >
              ← Back to Site
            </Link>

            {/* Admin User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 bg-coffee-brown text-white px-4 py-2 rounded-full hover:bg-coffee-dark"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">
                  Admin {user?.name && `(${user.name})`}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Site
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

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
              <Link 
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/orders"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
              >
                Orders
              </Link>
              <Link 
                to="/admin/customers"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
              >
                Customers
              </Link>
              <Link 
                to="/admin/products"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
              >
                Products
              </Link>
              <Link 
                to="/admin/analytics"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
              >
                Analytics
              </Link>
              
              <div className="border-t border-coffee-brown pt-2">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                >
                  ← Back to Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-coffee-brown hover:text-coffee-dark transition-colors duration-300 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar; 