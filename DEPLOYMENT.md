# 🚀 Estate Deli - Vercel Deployment Guide

## 📋 Overview

This guide will help you deploy the Estate Deli full-stack application to Vercel. The application has been configured to work with Vercel's serverless functions.

## 🏗️ Architecture

```
Frontend (React.js) → Vercel Static Hosting
Backend APIs → Vercel Serverless Functions (/api/*)
Database → MongoDB Atlas (Cloud)
Email Service → Gmail SMTP
```

## 📂 Project Structure

```
estatedelfin/
├── api/                    # Vercel Serverless Functions
│   ├── auth/
│   │   ├── register.js     # POST /api/auth/register
│   │   ├── login.js        # POST /api/auth/login
│   │   ├── verify-otp.js   # POST /api/auth/verify-otp
│   │   ├── resend-otp.js   # POST /api/auth/resend-otp
│   │   └── profile.js      # GET/PUT /api/auth/profile
│   ├── shop/
│   │   ├── items.js        # GET/POST /api/shop/items
│   │   └── [id].js         # GET/PUT/DELETE /api/shop/[id]
│   ├── orders/
│   │   └── index.js        # GET/POST /api/orders
│   ├── models/             # MongoDB Models
│   ├── middleware/         # Auth middleware
│   ├── utils/              # Email service
│   └── _lib/
│       └── mongodb.js      # Database connection
├── src/                    # React Frontend
├── public/                 # Static assets
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## 🔧 Prerequisites

1. **GitHub Account** - Code repository
2. **Vercel Account** - [Sign up at vercel.com](https://vercel.com)
3. **MongoDB Atlas Account** - [Create at mongodb.com](https://mongodb.com)
4. **Gmail Account** - For OTP email service

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new project: "Estate Deli"
3. Build a database (choose FREE M0 Sandbox)
4. Choose cloud provider and region
5. Create cluster

### Step 2: Configure Database Access
1. **Database Access** → Add new database user
   - Username: `estatedeli`
   - Password: Generate secure password
   - Database User Privileges: "Read and write to any database"

2. **Network Access** → Add IP Address
   - Add `0.0.0.0/0` (Allow access from anywhere)
   - Or add your specific IP addresses

### Step 3: Get Connection String
1. Connect → Connect your application
2. Copy the connection string (looks like):
   ```
   mongodb+srv://estatedeli:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
3. Replace `<password>` with your database user password
4. Add database name: `estate_deli`

## 📧 Email Service Setup

### Gmail SMTP Configuration
1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Select app: "Mail", Select device: "Other"
   - Generate password (16-character code)
3. Use this app password (not your regular Gmail password)

## 🚀 Vercel Deployment

### Step 1: Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `adeebkm/estatedelfin`
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)

### Step 2: Environment Variables
Add these environment variables in Vercel:

```env
MONGODB_URI=mongodb+srv://estatedeli:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/estate_deli
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**To add environment variables:**
1. Project Settings → Environment Variables
2. Add each variable with Name and Value
3. Select all environments (Production, Preview, Development)

### Step 3: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Get your live URL: `https://your-project-name.vercel.app`

## 🔍 Verification

### Test API Endpoints
```bash
# Health check
curl https://your-app.vercel.app/api/shop/items

# Should return shop items array
```

### Test Frontend
1. Visit your Vercel URL
2. Navigate to Shop section
3. Try user registration
4. Check OTP email delivery
5. Test order placement

## 🛠️ Local Development

### Environment Setup
```bash
# Clone repository
git clone https://github.com/adeebkm/estatedelfin.git
cd estatedelfin

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your values
```

### Run Development Server
```bash
# Start React development server
npm start

# Runs on http://localhost:3000
# API calls will go to Vercel production APIs
```

## 🔄 Updates and Redeployment

### Automatic Deployment
- Push changes to `main` branch
- Vercel automatically builds and deploys
- No manual intervention required

### Manual Deployment
```bash
# Using Vercel CLI
npm i -g vercel
vercel --prod
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB URI format
   - Verify IP whitelist (0.0.0.0/0)
   - Confirm database user credentials

2. **Email Not Sending**
   - Verify Gmail App Password (not regular password)
   - Check EMAIL_USER and EMAIL_PASS variables
   - Ensure 2FA is enabled on Gmail

3. **API Endpoints Not Working**
   - Check serverless function logs in Vercel
   - Verify environment variables are set
   - Confirm CORS headers

4. **Build Failed**
   - Check for syntax errors in code
   - Verify all dependencies in package.json
   - Review build logs in Vercel dashboard

### Debugging
- **Vercel Logs**: Project → Functions → View logs
- **Browser Console**: Check for API errors
- **Network Tab**: Monitor API requests/responses

## 📊 Performance Optimization

### Serverless Functions
- Functions auto-scale based on traffic
- Cold start: ~1-2 seconds for first request
- Warm functions: ~100-300ms response time

### Frontend
- React build optimized for production
- Static assets served via Vercel CDN
- Gzip compression enabled automatically

## 💰 Cost Estimation

### Free Tier Limits
- **Vercel**: 100GB bandwidth, 1000 serverless invocations/day
- **MongoDB Atlas**: 512MB storage, shared cluster
- **Gmail SMTP**: Included with Google account

### Expected Costs (Small Business)
- **0-1000 orders/month**: FREE
- **1000-5000 orders/month**: $20-50/month
- **5000+ orders/month**: $50-200/month

## 🔐 Security Features

- ✅ HTTPS enabled by default
- ✅ Environment variables encrypted
- ✅ JWT authentication
- ✅ Email OTP verification
- ✅ CORS configured
- ✅ MongoDB connection pooling

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review MongoDB Atlas logs
3. Test API endpoints individually
4. Check browser console for errors

## 🎉 Success!

Your Estate Deli application is now live and ready for customers! 

**Live URL**: `https://your-project-name.vercel.app`

Features available:
- ✅ Product catalog
- ✅ User registration/login
- ✅ Email OTP verification
- ✅ Shopping cart
- ✅ Order placement
- ✅ Order management 