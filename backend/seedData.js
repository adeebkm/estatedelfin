const mongoose = require('mongoose');
const ShopItem = require('./models/ShopItem');
const User = require('./models/User');
require('dotenv').config();

// Your 3 shop items from Home.js
const shopItems = [
  {
    name: "Pepper",
    description: "Premium black pepper from our estate",
    price: 150,
    image: "https://images.unsplash.com/photo-1616874531062-8d5b3ac6f7f5?auto=format&fit=crop&w=400&h=300&q=80",
    category: "Spices",
    tags: ["Premium", "Spices", "Estate"],
    inStock: true,
    stockQuantity: 100,
    sku: "PEPPER-001"
  },
  {
    name: "100% Arabica",
    description: "Pure arabica beans from our estate",
    price: 450,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&h=300&q=80",
    category: "Coffee Beans",
    tags: ["Premium", "Arabica", "Coffee"],
    inStock: true,
    stockQuantity: 50,
    sku: "ARABICA-001"
  },
  {
    name: "Filter Coffee",
    description: "Traditional South Indian filter coffee blend",
    price: 350,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&h=300&q=80",
    category: "Coffee Blends",
    tags: ["Traditional", "Filter", "South Indian"],
    inStock: true,
    stockQuantity: 75,
    sku: "FILTER-001"
  }
];

// Create admin user
const adminUser = {
  email: "admin@estatedeli.com",
  password: "admin123",
  firstName: "Admin",
  lastName: "User",
  phone: "+919876543210",
  role: "admin",
  isEmailVerified: true
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/estate_deli');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await ShopItem.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('👤 Admin user created:', admin.email);

    // Create shop items
    await ShopItem.insertMany(shopItems);
    console.log('🛍️ Shop items created:', shopItems.length);

    // Display created items
    const createdItems = await ShopItem.find({});
    console.log('\n📦 Created Shop Items:');
    createdItems.forEach(item => {
      console.log(`- ${item.name}: ₹${item.price} (${item.category})`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase }; 