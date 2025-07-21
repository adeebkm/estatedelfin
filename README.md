# Estate Deli - Full-Stack Web Application

> A beautiful, responsive coffee estate website with complete e-commerce functionality, authentication, and order management system.

## 🏗️ Project Architecture

This is a full-stack web application built with:
- **Frontend**: React 18.2.0 with Tailwind CSS (Port: 5002)
- **Backend**: Express.js REST API with JWT authentication (Port: 5001)
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer with Gmail SMTP
- **Authentication**: JWT tokens with email OTP verification

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email service (optional for development)

### Installation & Setup

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd estatedelfin

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

2. **Environment Setup**
Create `backend/.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/estate_deli
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

3. **Database Setup**
```bash
# Seed the database with initial data
cd backend
npm run seed
```

4. **Start Development Servers**
```bash
# Terminal 1: Backend (port 5001)
cd backend
PORT=5001 node server.js

# Terminal 2: Frontend (port 5002)
cd .. && npm start
```

5. **Access the Application**
- Frontend: `http://localhost:5002`
- Backend API: `http://localhost:5001`

## 📁 Project Structure

```
estatedelfin/
├── README.md                      # This comprehensive guide
├── DATABASE_SCHEMA.md            # Complete database documentation
├── AUTHENTICATION_GUIDE.md       # Authentication system guide
├── estatedelfin.md              # Project specifications
├── package.json                 # Frontend dependencies
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── public/                      # Static assets
├── src/                         # Frontend source code
│   ├── App.js                   # Main React component
│   ├── index.js                 # React entry point
│   ├── index.css                # Global styles & Tailwind imports
│   ├── components/              # React components
│   │   ├── Navbar.js           # Navigation bar with cart/auth
│   │   ├── AuthModal.js        # Login/Register modal with OTP
│   │   └── OrderModal.js       # Order placement modal
│   ├── context/                 # React Context API
│   │   ├── AuthContext.js      # Authentication state management
│   │   └── CartContext.js      # Shopping cart state management
│   ├── pages/                   # Main page components
│   │   ├── Home.js             # Landing page
│   │   ├── Menu.js             # Menu page with filtering
│   │   ├── Shop.js             # Shop page with products
│   │   └── Contact.js          # Contact page
│   ├── data/                    # Static data files
│   └── assets/                  # Images and static assets
└── backend/                     # Backend API server
    ├── server.js                # Express server entry point
    ├── package.json            # Backend dependencies
    ├── seedData.js             # Database seeding script
    ├── models/                 # MongoDB models
    │   ├── User.js             # User model with authentication
    │   ├── ShopItem.js         # Shop items model
    │   └── Order.js            # Orders model
    ├── routes/                 # API routes
    │   ├── auth.js             # Authentication endpoints
    │   ├── shop.js             # Shop items endpoints
    │   └── orders.js           # Order management endpoints
    ├── middleware/             # Express middleware
    │   └── auth.js             # JWT authentication middleware
    ├── utils/                  # Utility functions
    │   └── emailService.js     # Email service with templates
    └── config/                 # Configuration files
```

## 🔧 Technologies Used

### Frontend
- **React 18.2.0**: Main framework
- **Tailwind CSS 3.3.2**: Utility-first CSS framework
- **Framer Motion 10.12.16**: Animations and transitions
- **React Router DOM 6.3.0**: Client-side routing
- **React Context API**: State management
- **React Scroll**: Smooth scrolling navigation

### Backend
- **Express.js 4.18.2**: Web framework
- **MongoDB + Mongoose 8.0.3**: Database and ODM
- **JWT (jsonwebtoken 9.0.2)**: Authentication
- **bcryptjs 2.4.3**: Password hashing
- **Nodemailer 7.0.5**: Email service
- **CORS 2.8.5**: Cross-origin resource sharing
- **crypto**: OTP generation

## 📊 Database Schema

### Collections:
1. **users** - User accounts with authentication
2. **shop_items** - Coffee products and merchandise
3. **orders** - Customer orders with status tracking
4. **categories** - Product categories (referenced in shop_items)
5. **sessions** - User sessions for authentication

> **Detailed Schema**: See `DATABASE_SCHEMA.md` for complete field definitions and relationships.

## 🔐 Authentication System

### Flow:
1. **Registration**: Email → OTP verification → Account creation
2. **Login**: Email/Password → OTP verification (if unverified) → JWT token
3. **Session Management**: JWT tokens stored in localStorage
4. **Protected Routes**: Middleware validates JWT for protected endpoints

### OTP System:
- 6-digit codes generated using crypto
- 5-minute expiration
- Email sent via nodemailer (Gmail SMTP)
- Fallback to console logging for development

> **Detailed Guide**: See `AUTHENTICATION_GUIDE.md` for complete authentication flow.

## 🛒 Shopping Cart & Orders

### Cart Features:
- **Persistent Storage**: Cart data saved in localStorage
- **Authentication Integration**: 
  - Unauthenticated users can add items
  - Login required for order placement
- **Real-time Updates**: Quantity changes, item removal
- **Responsive Design**: Works on all devices

### Order Process:
1. Add items to cart
2. Click "Place Order" 
3. Login/Register if not authenticated
4. Fill customer details form
5. Order confirmation with email notification
6. Order stored in database with status tracking

## 🚀 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration with OTP
- `POST /verify-otp` - Verify OTP and create account
- `POST /login` - User login
- `POST /resend-otp` - Resend OTP code
- `GET /profile` - Get user profile (protected)

### Shop (`/api/shop`)
- `GET /items` - Get all shop items
- `GET /items/:id` - Get specific item
- `POST /items` - Create new item (admin only)
- `PUT /items/:id` - Update item (admin only)
- `DELETE /items/:id` - Delete item (admin only)

### Orders (`/api/orders`)
- `POST /` - Create new order (protected)
- `GET /` - Get user orders (protected)
- `GET /:id` - Get specific order (protected)
- `PUT /:id/status` - Update order status (admin only)

## 💻 Development Setup

### Port Configuration
⚠️ **Important**: Port 5000 is occupied by macOS Control Center
- Backend runs on port **5001**
- Frontend runs on port **5002**

### Starting Development
```bash
# Method 1: Manual start
cd backend && PORT=5001 node server.js
cd .. && npm start

# Method 2: Using package.json scripts
npm run dev  # If you add dev script
```

### Email Service Configuration
1. **Gmail Setup**:
   - Enable 2-factor authentication
   - Generate app-specific password
   - Update `.env` with credentials

2. **Development Mode**:
   - OTP codes logged to console
   - Email sending has fallback to console
   - No email setup required for basic testing

## 🧪 Testing the System

### User Registration Flow:
1. Navigate to `http://localhost:5002`
2. Click "Login" button
3. Switch to "Register" tab
4. Fill form and submit
5. Check backend console for OTP
6. Enter OTP to complete registration

### Order Placement Flow:
1. Browse shop items
2. Add items to cart
3. Click cart icon → "Place Order"
4. Login if not authenticated
5. Fill customer details
6. Submit order
7. Check database for order record

### Database Seeding:
```bash
cd backend
npm run seed
```
This adds:
- 3 shop items: Pepper (₹150), 100% Arabica (₹450), Filter Coffee (₹350)
- Admin user account for testing

## 🎨 Design System

### Colors:
- **Primary**: `#2d1e16` (Dark Brown)
- **Secondary**: `#6c4b3c` (Coffee Brown)
- **Accent**: `#f5e2c8` (Beige)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)

### Typography:
- **Headers**: Playfair Display (elegant, serif)
- **Body**: Lato (clean, sans-serif)
- **Monospace**: Consolas (code, technical)

### Responsive Design:
- Mobile-first approach
- Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Tested on all device sizes

## 🔧 Known Issues & Solutions

### Port 5000 Conflict:
- **Issue**: macOS Control Center occupies port 5000
- **Solution**: Use `PORT=5001 node server.js`

### Email Service:
- **Issue**: Gmail authentication errors
- **Solution**: Use app-specific passwords, check credentials
- **Fallback**: OTP logged to console for development

### Cart State Management:
- **Issue**: Cart items undefined errors
- **Solution**: Null safety checks added to all cart operations

### MongoDB Connection:
- **Issue**: Connection timeout errors
- **Solution**: Verify MongoDB URI, check network connectivity

## 🚧 Future Enhancements

### Planned Features:
1. **Payment Integration**: Razorpay/Stripe integration
2. **Admin Dashboard**: Order management, inventory control
3. **Email Templates**: Professional HTML email designs
4. **Push Notifications**: Real-time order updates
5. **Analytics**: Sales reports, user behavior tracking
6. **Multi-language**: Support for regional languages
7. **Mobile App**: React Native version

### Technical Improvements:
1. **Testing**: Unit tests, integration tests
2. **Performance**: Code splitting, lazy loading
3. **Security**: Rate limiting, input validation
4. **DevOps**: Docker containerization, CI/CD
5. **Monitoring**: Error tracking, performance monitoring

## 📝 Development Guidelines

### Code Style:
- **React**: Functional components with hooks
- **CSS**: Tailwind utility classes
- **JavaScript**: ES6+ features
- **API**: RESTful design principles

### File Naming:
- Components: PascalCase (`AuthModal.js`)
- Utilities: camelCase (`emailService.js`)
- Pages: PascalCase (`Home.js`)
- Styles: kebab-case (`index.css`)

### Git Workflow:
1. Create feature branch
2. Make changes with clear commits
3. Test thoroughly
4. Create pull request
5. Code review and merge

## 🆘 Troubleshooting

### Common Issues:

**Backend won't start:**
```bash
# Check if port is in use
lsof -i :5001
# Kill process if needed
kill -9 <PID>
```

**Frontend build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Database connection fails:**
```bash
# Check MongoDB URI in .env
# Verify network connectivity
# Check MongoDB Atlas IP whitelist
```

**OTP not working:**
```bash
# Check backend console for OTP codes
# Verify email service configuration
# Use fallback console logging
```

## 📞 Support & Contact

- **Technical Issues**: Check console logs, verify configurations
- **Database Issues**: Verify MongoDB connection, run seed script
- **Email Issues**: Check Gmail settings, use console fallback
- **Port Issues**: Use PORT=5001 for backend

## 🎯 Current Status

### ✅ Completed Features:
- User authentication with OTP
- Shopping cart functionality
- Order placement system
- Email service integration
- Database schema and seeding
- Responsive design
- API documentation

### 🔄 In Progress:
- Payment gateway integration
- Admin dashboard
- Email template improvements

### 📋 Todo:
- Testing suite
- Performance optimization
- Security enhancements
- Mobile app development

---

**Built with ❤️ for Estate Deli - Five generations of coffee expertise since 1889**

*This documentation is comprehensive and designed to help any developer understand and continue the project. For specific implementation details, check the individual documentation files in the project root.* 