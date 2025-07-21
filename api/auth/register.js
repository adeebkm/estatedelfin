const { connectToDatabase } = require('../_lib/mongodb');
const User = require('../models/User');
const { sendOTPEmail } = require('../utils/emailService');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (not verified yet)
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      isEmailVerified: false
    });

    // Generate OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp, firstName);
    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }

    res.status(201).json({
      message: 'User created successfully. Please verify your email with the OTP sent.',
      userId: user._id,
      email: user.email,
      requiresVerification: true
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
}; 