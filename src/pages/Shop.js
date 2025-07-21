import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  // Get unique categories from shop items
  const getCategories = () => {
    const categories = shopItems.map(item => item.category);
    return [...new Set(categories)]; // Remove duplicates
  };

  // Fetch shop items from API
  useEffect(() => {
    const fetchShopItems = async () => {
      console.log('🔍 Shop: Starting to fetch items...');
      console.log('📡 Axios baseURL:', axios.defaults.baseURL);
      
      try {
        console.log('📞 Shop: Making API call to /shop/items');
        const response = await axios.get('/shop/items');
        console.log('✅ Shop: API response received:', response);
        console.log('📦 Shop: Response data:', response.data);
        console.log('📊 Shop: Number of items:', response.data?.length);
        
        setShopItems(response.data);
        console.log('✅ Shop: Items set in state');
      } catch (error) {
        console.error('❌ Shop: Error fetching shop items:', error);
        console.error('❌ Shop: Error details:', error.response || error.message);
        // Fallback to empty array if API fails
        setShopItems([]);
      } finally {
        console.log('🏁 Shop: Setting loading to false');
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  const filteredProducts = () => {
    let products = shopItems;
    
    // Filter by category
    if (activeCategory !== 'all') {
      products = products.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return products;
  };

  const handleAddToCart = (product) => {
    addItem({
      id: `shop-${product._id}`, // Use _id from MongoDB
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      type: 'product'
    });
  };

  return (
    <div className="min-h-screen coffee-beans-bg">
      {/* Header with Coffee Background */}
      <section className="section-dark text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            className="font-playfair text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Estate Shop
          </motion.h1>
          <motion.p 
            className="text-xl text-beige mb-8 max-w-3xl mx-auto font-lato drop-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our premium coffee collection and accessories
          </motion.p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-light py-8">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-coffee"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === 'all' 
                    ? 'btn-primary' 
                    : 'bg-white bg-opacity-70 text-coffee border border-coffee hover:bg-coffee hover:text-white'
                }`}
              >
                All
              </button>
              {getCategories().map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category 
                      ? 'btn-primary' 
                      : 'bg-white bg-opacity-70 text-coffee border border-coffee hover:bg-coffee hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-medium section-padding">
        <div className="max-w-6xl mx-auto relative z-10">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-coffee mx-auto mb-4"></div>
                <p className="text-coffee font-lato">Loading shop items...</p>
              </div>
            </div>
          ) : shopItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-coffee font-lato text-xl mb-4">No shop items available</p>
              <p className="text-light-coffee">Please check back later or contact us for assistance.</p>
            </div>
          ) : (
            <>
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts().map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="card bg-white bg-opacity-95 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    layout
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-beige bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-6xl">
                        {product.category === 'Coffee Beans' ? '☕️' : 
                         product.category === 'Coffee Blends' ? '☕️' :
                         product.category === 'Spices' ? '🌶️' :
                         product.category === 'Mugs' ? '🥤' : 
                         product.category === 'Filters' ? '📄' : 
                         product.category === 'Brewing Kit' ? '⚗️' : 
                         product.category === 'Equipment' ? '⚙️' : 
                         '🛍️'}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Product Info */}
                      <div className="mb-4">
                        <h3 className="font-playfair text-xl font-semibold text-dark-brown mb-2">
                          {product.name}
                        </h3>
                        <p className="text-coffee text-sm leading-relaxed mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-lato text-lg font-bold text-coffee">
                            ₹{product.price}
                          </span>
                          <span className="text-xs text-light-coffee px-2 py-1 bg-beige bg-opacity-70 rounded backdrop-blur-sm">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags && product.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-light-coffee text-white text-xs rounded-full shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Add to Cart Button */}
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="btn-primary w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {filteredProducts().length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                    <p className="text-coffee text-lg">No products found matching your criteria.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-light section-padding">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="font-playfair text-4xl font-bold text-dark-brown text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Estate Deli?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Hand-picked beans from our 5th generation estate",
                emoji: "⭐"
              },
              {
                title: "Fresh Roasting",
                description: "Roasted to order for maximum flavor and aroma",
                emoji: "🔥"
              },
              {
                title: "Sustainable Farming",
                description: "Eco-friendly practices protecting our environment",
                emoji: "🌱"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="font-playfair text-xl font-semibold text-dark-brown mb-3">
                  {feature.title}
                </h3>
                <p className="text-coffee leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop; 