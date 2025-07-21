# Estate Deli Backend API

## Setup Instructions

### 1. Configure Environment Variables

Edit the `.env` file and replace with your actual MongoDB Atlas credentials:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/estate_deli?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

### 2. Seed the Database

Run this command to populate your database with the 3 shop items and admin user:

```bash
npm run seed
```

This will create:
- **3 Shop Items**: Pepper (₹150), 100% Arabica (₹450), Filter Coffee (₹350)
- **Admin User**: email: `admin@estatedeli.com`, password: `admin123`

### 3. Start the Server

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)

### Shop Items
- `GET /api/shop/items` - Get all shop items
- `GET /api/shop/items/:id` - Get single item
- `POST /api/shop/items` - Create item (admin only)
- `PUT /api/shop/items/:id` - Update item (admin only)
- `DELETE /api/shop/items/:id` - Delete item (admin only)

### Orders
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get single order (requires auth)
- `GET /api/orders/admin/all` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Test the API

1. Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

2. Get shop items:
```bash
curl http://localhost:5000/api/shop/items
```

3. Admin login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@estatedeli.com","password":"admin123"}'
```

## Next Steps

1. Update your React frontend to connect to these APIs
2. Replace hardcoded shop items with API calls
3. Implement user authentication in frontend
4. Add order placement functionality 