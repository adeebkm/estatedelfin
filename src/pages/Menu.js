import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { menuData, categories, allTags } from '../data/menuData';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = () => {
    let items = [];
    
    // Get all items from selected category or all categories
    if (activeCategory === 'all') {
      Object.values(menuData).forEach(category => {
        items = [...items, ...category.items.map(item => ({
          ...item,
          categoryTitle: category.title
        }))];
      });
    } else {
      items = menuData[activeCategory].items.map(item => ({
        ...item,
        categoryTitle: menuData[activeCategory].title
      }));
    }
    
    // Filter by tag
    if (activeTag !== 'all') {
      items = items.filter(item => item.tags.includes(activeTag));
    }
    
    // Filter by search term
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return items;
  };

  const formatPrice = (price) => {
    if (typeof price === 'object') {
      return `₹${price.regular} / ₹${price.large}`;
    }
    return `₹${price}`;
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
            Our Menu
          </motion.h1>
          <motion.p 
            className="font-lato text-xl text-beige drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Artisanal coffee and handcrafted dishes made with love
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="section-light py-8 sticky top-16 z-40 shadow-2xl backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-coffee rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee bg-white bg-opacity-90 backdrop-blur-sm transition-all duration-300"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-4">
            <h3 className="font-playfair text-lg font-semibold text-dark-brown mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === 'all' 
                    ? 'bg-coffee text-white shadow-lg transform scale-105' 
                    : 'bg-white bg-opacity-70 text-coffee hover:bg-coffee hover:text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'bg-coffee text-white shadow-lg transform scale-105' 
                      : 'bg-white bg-opacity-70 text-coffee hover:bg-coffee hover:text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-dark-brown mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag('all')}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  activeTag === 'all' 
                    ? 'bg-light-coffee text-white shadow-md transform scale-105' 
                    : 'bg-white bg-opacity-70 text-coffee hover:bg-light-coffee hover:text-white hover:shadow-md hover:scale-105'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    activeTag === tag 
                      ? 'bg-light-coffee text-white shadow-md transform scale-105' 
                      : 'bg-white bg-opacity-70 text-coffee hover:bg-light-coffee hover:text-white hover:shadow-md hover:scale-105'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="section-medium section-padding">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredItems().map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                className="menu-card bg-white bg-opacity-95 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                layout
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-semibold text-dark-brown mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-light-coffee font-medium mb-2">
                      {item.categoryTitle}
                    </p>
                  </div>
                  <div className="font-lato text-lg font-bold text-coffee">
                    {formatPrice(item.price)}
                  </div>
                </div>
                
                <p className="text-coffee mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Pizza crust options */}
                {item.crust && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-dark-brown mb-2">Crust Options:</p>
                    <div className="flex gap-2">
                      {item.crust.map(crust => (
                        <span 
                          key={crust}
                          className="px-2 py-1 bg-beige bg-opacity-70 text-coffee text-xs rounded backdrop-blur-sm"
                        >
                          {crust}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-light-coffee text-white text-xs rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="btn-primary w-full">
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredItems().length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                <p className="text-coffee text-lg">No items found matching your criteria.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu; 