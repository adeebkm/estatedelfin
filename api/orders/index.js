const { connectToDatabase } = require('../_lib/mongodb');
const Order = require('../models/Order');
const ShopItem = require('../models/ShopItem');
const { auth } = require('../middleware/auth');
const { sendOrderConfirmationEmail } = require('../utils/emailService');

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

    // Apply auth middleware
    await new Promise((resolve, reject) => {
      auth(req, res, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    if (req.method === 'POST') {
      // Create new order
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
    } else if (req.method === 'GET') {
      // Get user's orders
      const orders = await Order.find({ userId: req.user._id })
        .populate('items.productId')
        .sort({ createdAt: -1 });
      res.json(orders);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Orders error:', error);
    if (error.message === 'Authorization header missing') {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (error.message === 'Invalid token') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: error.message });
  }
}; 