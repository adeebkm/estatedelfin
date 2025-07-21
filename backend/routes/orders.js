const express = require('express');
const Order = require('../models/Order');
const ShopItem = require('../models/ShopItem');
const { auth, adminAuth } = require('../middleware/auth');
const { sendOrderConfirmationEmail } = require('../utils/emailService');

const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, customerDetails, paymentMethod, notes } = req.body;

    // Use authenticated user's details if customerDetails not provided
    const orderCustomerDetails = customerDetails || {
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address
    };

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const shopItem = await ShopItem.findById(item.productId);
      if (!shopItem) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      
      if (!shopItem.inStock || shopItem.stockQuantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${shopItem.name}` });
      }

      const itemTotal = shopItem.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: shopItem._id,
        name: shopItem.name,
        price: shopItem.price,
        quantity: item.quantity,
        totalPrice: itemTotal
      });
    }

    // Calculate tax and total
    const tax = subtotal * 0.09; // 9% GST
    const deliveryCharge = subtotal > 500 ? 0 : 50; // Free delivery over ₹500
    const totalAmount = subtotal + tax + deliveryCharge;

    // Generate order number
    const orderNumber = `ORDER-${Date.now()}`;

    // Create order
    const order = new Order({
      userId: req.user._id,
      orderNumber,
      items: orderItems,
      subtotal,
      tax,
      deliveryCharge,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
      customerDetails: orderCustomerDetails,
      notes
    });

    await order.save();

    // Update stock quantities
    for (const item of items) {
      await ShopItem.findByIdAndUpdate(
        item.productId,
        { $inc: { stockQuantity: -item.quantity } }
      );
    }

    // Send order confirmation email
    await sendOrderConfirmationEmail(orderCustomerDetails.email, {
      orderNumber,
      items: orderItems,
      subtotal,
      tax,
      deliveryCharge,
      totalAmount,
      customerDetails: orderCustomerDetails
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        deliveryCharge: order.deliveryCharge,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        customerDetails: order.customerDetails,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all orders
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'firstName lastName email')
      .populate('items.productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update order status
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    ).populate('userId', 'firstName lastName email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send status update email to customer
    if (status === 'confirmed' || status === 'shipped' || status === 'delivered') {
      await sendOrderConfirmationEmail(order.customerDetails.email, {
        orderNumber: order.orderNumber,
        status: order.status,
        message: `Your order has been ${status}`
      });
    }

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 