const { connectToDatabase } = require('../../lib/mongodb');
const ShopItem = require('../../lib/models/ShopItem');
const { adminAuth } = require('../../lib/middleware/auth');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    const { id } = req.query;

    if (req.method === 'GET') {
      // Get single shop item
      const item = await ShopItem.findById(id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } else if (req.method === 'PUT') {
      // Admin: Update shop item
      await new Promise((resolve, reject) => {
        adminAuth(req, res, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      const item = await ShopItem.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } else if (req.method === 'DELETE') {
      // Admin: Delete shop item
      await new Promise((resolve, reject) => {
        adminAuth(req, res, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      const item = await ShopItem.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Shop item error:', error);
    if (error.message === 'Authorization header missing' || error.message === 'Access denied') {
      return res.status(401).json({ message: 'Access denied' });
    }
    res.status(500).json({ message: error.message });
  }
}; 