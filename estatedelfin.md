# EstateDeli - Artisanal Coffee & Handcrafted Experience

## Project Overview
EstateDeli is a luxurious, responsive cafe website built with React and Tailwind CSS. The site showcases a family-run coffee estate from Chikmagalur with five generations of coffee expertise, offering artisanal coffee, handcrafted dishes, and premium coffee products.

## Features

### 🏠 Home Page
- **Hero Section**: Full-screen gradient background with animated text and smooth scroll button
- **About Section**: Family story from Chikmagalur estate (since 1889)
- **Featured Menu**: Preview of signature items
- **Footer**: Contact information and location details

### 📋 Menu Page
- **Comprehensive Menu**: 15+ categories with 80+ items
- **Interactive Filtering**: 
  - Category filters (Coffee, Cold Coffee, Manual Brew, Matcha, etc.)
  - Tag filters (Veg, Vegan, Hot, Iced, Premium, etc.)
  - Search functionality
- **Special Features**: 
  - Pizza size/crust options
  - Add-ons and customizations
  - Detailed descriptions and pricing

### 🛍️ Shop Page
- **Product Grid**: Coffee beans, filters, mugs, brewing kits, equipment
- **Category Filtering**: All products, coffee beans, mugs, brewing kits, etc.
- **Cart Integration**: Add to cart functionality with quantity management
- **Featured Products**: Highlighted premium items

### 📞 Contact Page
- **Location & Hours**: 123 Coffee Street, Bangalore (7am-8pm daily)
- **Contact Form**: Name, email, message with form validation
- **Interactive Map**: Placeholder for location map
- **Heritage Story**: Estate history and sustainable practices

### 🎨 Design System
- **Fonts**: Playfair Display (headers), Lato (body text)
- **Colors**: 
  - Beige (#f5e2c8)
  - Dark Brown (#2d1e16)
  - Coffee (#6c4b3c)
  - Light Coffee (#8b6f47)
  - Cream (#faf7f2)
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design with Tailwind CSS

## Technical Architecture

### 🔧 Tech Stack
- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.2
- **Animation**: Framer Motion 10.12.16
- **Routing**: React Router DOM 6.3.0
- **State Management**: React Context API for cart
- **Smooth Scrolling**: react-scroll 1.8.9

### 📁 Project Structure
```
src/
├── components/
│   └── Navbar.js          # Navigation component
├── context/
│   └── CartContext.js     # Cart state management
├── data/
│   ├── menuData.js        # Menu items and categories
│   └── shopData.js        # Shop products
├── pages/
│   ├── Home.js            # Landing page
│   ├── Menu.js            # Menu page with filtering
│   ├── Shop.js            # Shop page with products
│   └── Contact.js         # Contact and visit info
├── App.js                 # Main app component
├── index.js               # React entry point
└── index.css              # Global styles
```

### 🍽️ Menu Data Structure
- **15 Categories**: Coffee, Cold Coffee, Manual Brew, Matcha, Signature beverages, Mocktails, Appetizers, Salads, Burgers, Paninis, Pastas, Pizzas, Rice Bowls, Add-ons
- **80+ Items**: Each with name, description, price, tags, and special options
- **Special Pricing**: Pizza sizes (regular/large), add-on pricing
- **Tagging System**: Hot, Iced, Veg, Vegan, Premium, Spicy, etc.

### 🛒 Cart System
- **Context API**: Global cart state management
- **Features**: Add/remove items, update quantities, cart total calculation
- **Persistent UI**: Cart count badge in navbar
- **Item Types**: Menu items and shop products

## Database Schema (Future Implementation)

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Menu Items Table
```sql
CREATE TABLE menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  tags JSON,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Shop Products Table
```sql
CREATE TABLE shop_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  stock_quantity INT DEFAULT 0,
  image_url VARCHAR(500),
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered') DEFAULT 'pending',
  order_type ENUM('dine_in', 'takeaway', 'delivery') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  item_type ENUM('menu_item', 'shop_product') NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  customizations JSON,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

## Installation & Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd estatedelfin
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm start
```

4. **Build for Production**
```bash
npm run build
```

## Development Guidelines

### 🎯 Component Structure
- Use functional components with hooks
- Implement proper prop validation
- Follow responsive design patterns
- Use Tailwind utility classes
- Add Framer Motion animations

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid systems
- Touch-friendly interactions

### 🎨 Styling Guidelines
- Use Tailwind utility classes
- Custom CSS only for complex animations
- Maintain consistent spacing (4px grid)
- Follow color palette strictly
- Use semantic class names

## Future Enhancements

### Phase 1: Core Features
- [ ] User authentication system
- [ ] Online ordering functionality
- [ ] Real-time order tracking
- [ ] Payment integration
- [ ] Table booking system

### Phase 2: Advanced Features
- [ ] Loyalty program
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Push notifications
- [ ] Social media integration

### Phase 3: Business Features
- [ ] Multi-location support
- [ ] Franchise management
- [ ] Staff management system
- [ ] Customer feedback system
- [ ] Marketing automation

## Performance Optimization

### Current Optimizations
- Lazy loading for images
- Code splitting with React.lazy
- Framer Motion animations
- Responsive images
- Minimal bundle size

### Future Optimizations
- Service worker for offline functionality
- Image optimization pipeline
- CDN integration
- Database query optimization
- Caching strategies

## Contact Information
- **Location**: 123 Coffee Street, Bangalore, Karnataka
- **Hours**: 7:00 AM - 8:00 PM (Daily)
- **Phone**: +91 98765 43210
- **Email**: hello@estatedeli.com

## Version History
- **v1.0.0**: Initial release with full menu, shop, and contact pages
- **v1.1.0**: Enhanced filtering and cart functionality
- **v1.2.0**: Mobile responsiveness improvements
- **v2.0.0**: User authentication and ordering system (planned)

---

*Built with ❤️ for the Estate Deli family legacy since 1889* 