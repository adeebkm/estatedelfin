# Estate Deli - MongoDB Database Schema

## Database Name: `estate_deli`

## Collections Structure

### 1. **users** Collection
```javascript
{
  _id: ObjectId("..."),
  email: "user@example.com",
  password: "hashedPassword", // bcrypt hashed
  firstName: "John",
  lastName: "Doe",
  phone: "+919876543210",
  address: {
    street: "123 Main St",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    country: "India"
  },
  role: "customer", // customer | admin
  isEmailVerified: true,
  createdAt: ISODate("2024-01-15T10:30:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

### 2. **shop_items** Collection
```javascript
{
  _id: ObjectId("..."),
  name: "Estate Special Coffee Beans",
  description: "Our signature blend from Chikmagalur - 500g",
  price: 850,
  image: "https://images.unsplash.com/photo-1...",
  category: "Coffee Beans",
  tags: ["Premium", "Signature"],
  inStock: true,
  stockQuantity: 100,
  sku: "ESB-001",
  createdAt: ISODate("2024-01-15T10:30:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

### 3. **orders** Collection
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."), // References users._id
  orderNumber: "ORDER-2024-001",
  items: [
    {
      productId: ObjectId("..."), // References shop_items._id
      name: "Estate Special Coffee Beans",
      price: 850,
      quantity: 2,
      totalPrice: 1700
    }
  ],
  subtotal: 1700,
  tax: 153, // 9% GST
  deliveryCharge: 50,
  totalAmount: 1903,
  status: "pending", // pending | confirmed | processing | shipped | delivered | cancelled
  paymentStatus: "pending", // pending | paid | failed | refunded
  paymentMethod: "card", // card | upi | cod
  customerDetails: {
    name: "John Doe",
    email: "user@example.com",
    phone: "+919876543210",
    address: {
      street: "123 Main St",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India"
    }
  },
  notes: "Please deliver between 10 AM - 2 PM",
  createdAt: ISODate("2024-01-15T10:30:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

### 4. **categories** Collection
```javascript
{
  _id: ObjectId("..."),
  id: "coffee-beans",
  label: "Coffee Beans",
  description: "Premium coffee beans from our estate",
  isActive: true,
  sortOrder: 1,
  createdAt: ISODate("2024-01-15T10:30:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

### 5. **sessions** Collection (for authentication)
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."), // References users._id
  token: "jwt-token-here",
  expiresAt: ISODate("2024-01-22T10:30:00.000Z"),
  createdAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

## MongoDB Setup Steps

### 1. Create Database and Collections
```javascript
// Connect to MongoDB
use estate_deli

// Create collections with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "firstName", "lastName", "role"],
      properties: {
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" },
        password: { bsonType: "string", minLength: 6 },
        firstName: { bsonType: "string", minLength: 1 },
        lastName: { bsonType: "string", minLength: 1 },
        phone: { bsonType: "string" },
        role: { enum: ["customer", "admin"] }
      }
    }
  }
})

db.createCollection("shop_items", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "price", "category", "inStock"],
      properties: {
        name: { bsonType: "string", minLength: 1 },
        description: { bsonType: "string", minLength: 1 },
        price: { bsonType: "number", minimum: 0 },
        category: { bsonType: "string", minLength: 1 },
        stockQuantity: { bsonType: "number", minimum: 0 },
        inStock: { bsonType: "bool" }
      }
    }
  }
})

db.createCollection("orders")
db.createCollection("categories")
db.createCollection("sessions")
```

### 2. Create Indexes
```javascript
// Users collection indexes
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "phone": 1 })
db.users.createIndex({ "createdAt": 1 })

// Shop items collection indexes
db.shop_items.createIndex({ "category": 1 })
db.shop_items.createIndex({ "name": "text", "description": "text" })
db.shop_items.createIndex({ "tags": 1 })
db.shop_items.createIndex({ "sku": 1 }, { unique: true })
db.shop_items.createIndex({ "inStock": 1 })

// Orders collection indexes
db.orders.createIndex({ "userId": 1 })
db.orders.createIndex({ "orderNumber": 1 }, { unique: true })
db.orders.createIndex({ "status": 1 })
db.orders.createIndex({ "paymentStatus": 1 })
db.orders.createIndex({ "createdAt": -1 })

// Categories collection indexes
db.categories.createIndex({ "id": 1 }, { unique: true })
db.categories.createIndex({ "sortOrder": 1 })

// Sessions collection indexes
db.sessions.createIndex({ "userId": 1 })
db.sessions.createIndex({ "token": 1 }, { unique: true })
db.sessions.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 })
```

### 3. Insert Initial Data
```javascript
// Insert shop categories
db.categories.insertMany([
  { id: "coffee-beans", label: "Coffee Beans", description: "Premium coffee beans", isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "filters", label: "Filters", description: "Coffee filters and accessories", isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "mugs", label: "Mugs", description: "Coffee mugs and cups", isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: "brewing-kit", label: "Brewing Kits", description: "Complete brewing solutions", isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: "equipment", label: "Equipment", description: "Coffee making equipment", isActive: true, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: "accessories", label: "Accessories", description: "Coffee accessories", isActive: true, sortOrder: 6, createdAt: new Date(), updatedAt: new Date() }
])

// Insert shop items (your existing 16 items)
db.shop_items.insertMany([
  {
    name: "Estate Special Coffee Beans",
    description: "Our signature blend from Chikmagalur - 500g",
    price: 850,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
    category: "Coffee Beans",
    tags: ["Premium", "Signature"],
    inStock: true,
    stockQuantity: 100,
    sku: "ESB-001",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ... (insert all 16 items from your shopData.js)
])

// Create admin user
db.users.insertOne({
  email: "admin@estatedeli.com",
  password: "$2b$10$hashedPasswordHere", // Hash with bcrypt
  firstName: "Admin",
  lastName: "User",
  phone: "+919876543210",
  role: "admin",
  isEmailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Backend API Structure Needed

### Authentication APIs
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Shop Items APIs
- `GET /api/shop/items` - Get all shop items
- `GET /api/shop/items/:id` - Get single item
- `GET /api/shop/categories` - Get all categories
- `POST /api/shop/items` - Create item (admin only)
- `PUT /api/shop/items/:id` - Update item (admin only)
- `DELETE /api/shop/items/:id` - Delete item (admin only)

### Order APIs
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)

### Next Steps:
1. Set up MongoDB Atlas or local MongoDB
2. Create the database and collections using the above scripts
3. Set up Express.js backend with these APIs
4. Implement JWT authentication
5. Connect your React frontend to the backend

Would you like me to help you set up the Express.js backend structure or help with any specific part of the MongoDB setup? 