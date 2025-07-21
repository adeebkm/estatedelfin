const { connectToDatabase } = require('../_lib/mongodb');
const ShopItem = require('../models/ShopItem');
const { adminAuth } = require('../middleware/auth');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      // Get all shop items
      const items = await ShopItem.find({ inStock: true });
      res.json(items);
    } else if (req.method === 'POST') {
      // Admin: Create new shop item
      await new Promise((resolve, reject) => {
        adminAuth(req, res, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      const item = new ShopItem(req.body);
      await item.save();
      res.status(201).json(item);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Shop items error:', error);
    if (error.message === 'Authorization header missing' || error.message === 'Access denied') {
      return res.status(401).json({ message: 'Access denied' });
    }
    res.status(500).json({ message: error.message });
  }
}; 