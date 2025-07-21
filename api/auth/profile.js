const { connectToDatabase } = require('../../lib/mongodb');
const User = require('../../lib/models/User');
const { auth } = require('../../lib/middleware/auth');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
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

    if (req.method === 'GET') {
      // Get current user
      res.json({
        user: {
          id: req.user._id,
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          phone: req.user.phone,
          address: req.user.address,
          role: req.user.role,
          isEmailVerified: req.user.isEmailVerified
        }
      });
    } else if (req.method === 'PUT') {
      // Update profile
      const { firstName, lastName, phone, address } = req.body;
      
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { firstName, lastName, phone, address },
        { new: true, runValidators: true }
      );

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          role: user.role,
          isEmailVerified: user.isEmailVerified
        }
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Profile error:', error);
    if (error.message === 'Authorization header missing') {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    if (error.message === 'Invalid token') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: error.message });
  }
}; 