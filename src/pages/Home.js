import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { menuData } from '../data/menuData.js';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'object') {
      if (price.regular && price.large) {
        if (price.cheeseBurst) {
          return `₹${price.regular} / ₹${price.large} / ₹${price.cheeseBurst}`;
        }
        return `₹${price.regular} / ₹${price.large}`;
      }
      if (price.veg) {
        const prices = [];
        if (price.veg) prices.push(`Veg: ₹${price.veg}`);
        if (price.chicken) prices.push(`Chicken: ₹${price.chicken}`);
        if (price.lamb) prices.push(`Lamb: ₹${price.lamb}`);
        return prices.join(' / ');
      }
    }
    return `₹${price}`;
  };

  // Fetch shop items from API
  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const response = await axios.get('/shop/items');
        setShopItems(response.data);
      } catch (error) {
        console.error('Error fetching shop items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  // Handle adding items to cart
  const handleAddToCart = (item) => {
    addItem({
      id: item._id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
      type: 'product'
    });
  };

  useEffect(() => {
    // Scroll transition effects
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM updates before observing
    const timeoutId = setTimeout(() => {
      const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right');
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [activeCategory]); // Re-run when activeCategory changes

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center coffee-bean-section-low"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80)`
        }}
      >
        {/* Coffee Bean Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=3456&h=2304')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        ></div>

        <motion.div 
          className="hero-content text-center px-4 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ color: '#E6C9A2' }}
        >
          <motion.h1 
            className="font-playfair text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              textShadow: '2px 2px 0px #2C1810, -2px -2px 0px #2C1810, 2px -2px 0px #2C1810, -2px 2px 0px #2C1810'
            }}
          >
            Welcome to EstateDeli
          </motion.h1>
          <motion.p 
            className="font-lato text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              textShadow: '1px 1px 0px #2C1810, -1px -1px 0px #2C1810, 1px -1px 0px #2C1810, -1px 1px 0px #2C1810'
            }}
          >
            Where every cup tells a story of passion and craftsmanship
          </motion.p>
          <motion.button 
            onClick={() => scrollToSection('about')}
            className="btn-primary text-lg px-8 py-4 transition-all duration-500 transform hover:scale-110 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Discover Our Story
          </motion.button>
        </motion.div>
      </section>

      {/* Our Story Section - Higher Opacity */}
      <section id="about" className="section-padding coffee-bean-section-high">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="scroll-fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8" style={{ color: '#E6C9A2' }}>
              Our Story
            </h2>
          </div>
          <div className="scroll-slide-left">
            <p className="font-lato text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto" style={{ color: '#E6C9A2' }}>
              Every bite and every sip at Estate Deli is rooted in a legacy that began in the lush hills of Chikmagalur, where our family estate has been growing coffee since 1889.
            </p>
            <p className="font-lato text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto" style={{ color: '#E6C9A2' }}>
              What started as a small bake lounge in the mountains has blossomed into a soulful café experience—carrying forward five generations of tradition, care, and flavour. At Estate Deli, we don't just serve food and coffee. We serve stories.
            </p>
            <p className="font-lato text-lg md:text-xl leading-relaxed mb-12 max-w-4xl mx-auto" style={{ color: '#E6C9A2' }}>
              From handpicked beans brewed to perfection, to mom's timeless desserts and fiery comfort bowls—each plate is a celebration of our heritage. We believe food should be honest, warm, and crafted with love.
            </p>
            <p className="font-lato text-xl md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto font-medium text-center" style={{ color: '#E6C9A2' }}>
              This isn't just a café. It's a memory. A mood. A moment that lingers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            <div className="scroll-slide-left text-center">
              <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#E6C9A2' }}>Heritage Since 1889</h3>
              <p style={{ color: '#E6C9A2', opacity: 0.9 }}>Five generations of coffee growing tradition from the lush hills of Chikmagalur, where our family estate continues to nurture the finest beans</p>
            </div>
            
            <div className="scroll-fade-in text-center">
              <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#E6C9A2' }}>Comfort & Tradition</h3>
              <p style={{ color: '#E6C9A2', opacity: 0.9 }}>From mom's timeless desserts to fiery comfort bowls, every dish celebrates our heritage with honest, warm food crafted with love</p>
            </div>
            
            <div className="scroll-slide-right text-center">
              <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#E6C9A2' }}>Home Away From Home</h3>
              <p style={{ color: '#E6C9A2', opacity: 0.9 }}>Heritage in every cup, comfort in every bite, and a space where memories are made—creating moments that linger long after you leave</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section - Lower Opacity */}
      <section id="menu" className="section-padding coffee-bean-section-low">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="scroll-fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: '#E6C9A2' }}>
              Our Menu
            </h2>
            <p className="font-lato text-lg text-center mb-12" style={{ color: '#E6C9A2', opacity: 0.9 }}>
              Handcrafted beverages and food made with passion
            </p>
          </div>
          
          {/* Menu Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(menuData).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === key 
                    ? 'text-coffee-brown shadow-lg' 
                    : 'bg-coffee-brown hover:bg-coffee-dark'
                }`}
                style={activeCategory === key ? { backgroundColor: '#E6C9A2' } : { color: '#E6C9A2' }}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData[activeCategory].items.map((item, index) => (
              <div 
                key={index}
                className={`bg-coffee-brown rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  index % 3 === 0 ? 'scroll-slide-left' : 
                  index % 3 === 1 ? 'scroll-fade-in' : 
                  'scroll-slide-right'
                }`}
              >
                <h3 className="font-playfair text-xl font-semibold mb-2" style={{ color: '#E6C9A2' }}>{item.name}</h3>
                <p className="mb-4" style={{ color: '#E6C9A2', opacity: 0.9 }}>{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-lato text-lg font-bold" style={{ color: '#E6C9A2' }}>{formatPrice(item.price)}</span>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs text-coffee-brown px-2 py-1 rounded" style={{ backgroundColor: '#E6C9A2' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section - Higher Opacity */}
      <section id="shop" className="section-padding coffee-bean-section-high">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="scroll-fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8" style={{ color: '#E6C9A2' }}>
              Our Shop
            </h2>
            <p className="font-lato text-lg mb-12" style={{ color: '#E6C9A2', opacity: 0.9 }}>
              Premium coffee products to take home
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-brown"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {shopItems.map((item, index) => (
                <div key={item._id} className={`${
                  index === 0 ? 'scroll-slide-left' : 
                  index === 1 ? 'scroll-fade-in' : 
                  'scroll-slide-right'
                }`}>
                  <div className="bg-coffee-brown rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    <div className="mb-4 text-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-48 object-cover rounded-lg mx-auto shadow-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-48 bg-gray-200 rounded-lg items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-2 text-center" style={{ color: '#E6C9A2' }}>{item.name}</h3>
                    <p className="text-center mb-4" style={{ color: '#E6C9A2', opacity: 0.9 }}>{item.description}</p>
                    <div className="text-center mb-4">
                      <span className="font-lato text-lg font-bold" style={{ color: '#E6C9A2' }}>₹{item.price}</span>
                    </div>
                    <div className="text-center">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-coffee-brown" 
                        style={{ backgroundColor: '#E6C9A2' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section - Lower Opacity */}
      <section id="contact" className="section-padding coffee-bean-section-low">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="scroll-fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8" style={{ color: '#E6C9A2' }}>
              Contact Us
            </h2>
            <p className="font-lato text-lg mb-12" style={{ color: '#E6C9A2', opacity: 0.9 }}>
              Visit us or get in touch
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="scroll-slide-left">
              <div className="rounded-lg p-8" style={{ backgroundColor: 'rgba(230, 201, 162, 0.1)' }}>
                <h3 className="font-playfair text-2xl font-semibold mb-6" style={{ color: '#E6C9A2' }}>Visit Our Cafe</h3>
                <div className="space-y-4" style={{ color: '#E6C9A2' }}>
                  <p className="flex items-center justify-center md:justify-start">
                    <span className="mr-3">📍</span>
                    The Estate Deli, #3162, 60 feet, 12th Cross Rd, HAL 2nd Stage, Defence Colony, Indranagar, Bengaluru, Karnataka 560008
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <span className="mr-3">🕒</span>
                    Open daily: 11am – 11pm
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <span className="mr-3">📞</span>
                    +91 98765 43210
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <span className="mr-3">📧</span>
                    hello@estatedeli.com
                  </p>
                </div>
              </div>
            </div>
            
            <div className="scroll-slide-right">
              <div className="rounded-lg p-8" style={{ backgroundColor: 'rgba(230, 201, 162, 0.1)' }}>
                <h3 className="font-playfair text-2xl font-semibold mb-6" style={{ color: '#E6C9A2' }}>Follow Us</h3>
                <div className="flex justify-center space-x-6 text-4xl">
                  <span className="cursor-pointer transition-colors duration-300" style={{ color: '#E6C9A2' }}>📘</span>
                  <a href="https://www.instagram.com/the.estate.deli/?hl=en" target="_blank" rel="noopener noreferrer" className="cursor-pointer transition-colors duration-300 hover:opacity-80" style={{ color: '#E6C9A2' }}>📷</a>
                  <span className="cursor-pointer transition-colors duration-300" style={{ color: '#E6C9A2' }}>🐦</span>
                </div>
                <p className="mt-6" style={{ color: '#E6C9A2', opacity: 0.9 }}>
                  Stay connected with us for updates, special offers, and behind-the-scenes content from our coffee journey.
                </p>
                <p className="mt-4 text-sm" style={{ color: '#E6C9A2', opacity: 0.8 }}>
                  <a href="https://www.instagram.com/the.estate.deli/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    @the.estate.deli
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="coffee-bean-section-medium section-padding">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#E6C9A2' }}>EstateDeli</h3>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto mb-6" style={{ color: '#E6C9A2', opacity: 0.9 }}>
              Experience the finest coffee crafted with passion and served with care. 
              Every cup tells a story of dedication to quality and exceptional taste.
            </p>
            <div className="border-t mt-8 pt-8" style={{ borderColor: 'rgba(230, 201, 162, 0.3)' }}>
              <p style={{ color: '#E6C9A2', opacity: 0.9 }}>© 2024 EstateDeli. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 