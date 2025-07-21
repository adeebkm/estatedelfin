import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
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
            Visit Us
          </motion.h1>
          <motion.p 
            className="font-lato text-xl text-beige drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Come experience the Estate Deli difference
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-light section-padding">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <div className="bg-beige bg-opacity-70 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg backdrop-blur-sm">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-dark-brown mb-2">Location</h3>
              <p className="text-coffee">123 Coffee Street</p>
              <p className="text-coffee">Bangalore, Karnataka</p>
              <p className="text-coffee">560001</p>
            </motion.div>

            {/* Hours */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-beige bg-opacity-70 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg backdrop-blur-sm">
                <span className="text-2xl">🕐</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-dark-brown mb-2">Hours</h3>
              <p className="text-coffee">Monday - Sunday</p>
              <p className="text-coffee">7:00 AM - 8:00 PM</p>
              <p className="text-coffee text-sm mt-2">Open daily, no holidays</p>
            </motion.div>

            {/* Contact */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="bg-beige bg-opacity-70 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg backdrop-blur-sm">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-dark-brown mb-2">Contact</h3>
              <p className="text-coffee">+91 98765 43210</p>
              <p className="text-coffee">hello@estatedeli.com</p>
              <div className="flex justify-center space-x-4 mt-3">
                <span className="text-coffee hover:text-dark-brown cursor-pointer text-lg transition-colors duration-300">📘</span>
                <span className="text-coffee hover:text-dark-brown cursor-pointer text-lg transition-colors duration-300">📷</span>
                <span className="text-coffee hover:text-dark-brown cursor-pointer text-lg transition-colors duration-300">🐦</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-medium section-padding">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="font-playfair text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Find Us
          </motion.h2>
          
          <motion.div 
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-coffee">Interactive map would be displayed here</p>
                <p className="text-sm text-light-coffee mt-2">
                  123 Coffee Street, Bangalore, Karnataka 560001
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-light section-padding">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2 
            className="font-playfair text-4xl font-bold text-dark-brown text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          
          <motion.p 
            className="text-center text-coffee mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Have questions about our menu, want to book a table, or interested in our catering services? 
            We'd love to hear from you!
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6 bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-lato font-medium text-dark-brown mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-coffee rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee bg-white bg-opacity-90 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block font-lato font-medium text-dark-brown mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-coffee rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee bg-white bg-opacity-90 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label className="block font-lato font-medium text-dark-brown mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full p-3 border border-coffee rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee bg-white bg-opacity-90 transition-all duration-300"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn-primary text-lg px-8 py-3">
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Estate Story */}
      <section className="section-dark text-white section-padding">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="font-playfair text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Heritage
          </motion.h2>
          
          <motion.p 
            className="text-beige text-lg leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Since 1889, our family estate in Chikmagalur has been nurturing the finest coffee beans. 
            What started as a small plantation has grown into a legacy of five generations, each adding 
            their own touch to our craft. Today, we bring this heritage to your table, combining 
            traditional methods with modern culinary artistry.
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🏔️</div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Chikmagalur Estate</h3>
              <p className="text-beige text-sm">High-altitude coffee plantation since 1889</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Five Generations</h3>
              <p className="text-beige text-sm">Family passion passed down through generations</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🌿</div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Sustainable Practices</h3>
              <p className="text-beige text-sm">Eco-friendly farming and ethical sourcing</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 