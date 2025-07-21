const express = require('express');
const ShopItem = require('../models/ShopItem');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all shop items
router.get('/items', async (req, res) => {
  try {
    const items = await ShopItem.find({ inStock: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single shop item
router.get('/items/:id', async (req, res) => {
  try {
    const item = await ShopItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Create new shop item
router.post('/items', adminAuth, async (req, res) => {
  try {
    const item = new ShopItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update shop item
router.put('/items/:id', adminAuth, async (req, res) => {
  try {
    const item = await ShopItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete shop item
router.delete('/items/:id', adminAuth, async (req, res) => {
  try {
    const item = await ShopItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 