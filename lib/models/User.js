const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  otpAttempts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate OTP method
userSchema.methods.generateOTP = function() {
  const crypto = require('crypto');
  const otp = crypto.randomInt(100000, 999999).toString();
  
  this.otp = otp;
  this.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  this.otpAttempts = 0;
  
  return otp;
};

// Verify OTP method
userSchema.methods.verifyOTP = function(inputOTP) {
  if (!this.otp || !this.otpExpires) {
    return false;
  }
  
  if (this.otpAttempts >= 3) {
    return false;
  }
  
  if (Date.now() > this.otpExpires) {
    return false;
  }
  
  if (this.otp === inputOTP) {
    this.isEmailVerified = true;
    this.otp = undefined;
    this.otpExpires = undefined;
    this.otpAttempts = 0;
    return true;
  }
  
  this.otpAttempts += 1;
  return false;
};

module.exports = mongoose.model('User', userSchema); 