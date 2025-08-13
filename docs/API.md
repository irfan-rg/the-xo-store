# API Documentation

This document provides detailed information about the backend API endpoints for The XO Store.

## Base URLs

- **Development**: `http://localhost:5000`
- **Production**: `[Your deployed backend URL]`

## Authentication

Currently, the API doesn't require authentication for most endpoints. User authentication is handled on the frontend via Auth0.

## Content Type

All requests and responses use `application/json` content type unless specified otherwise.

## Error Handling

The API returns standard HTTP status codes and error messages in the following format:

```json
{
  "error": "Error message description"
}
```

## Endpoints

### Health Check

#### `GET /`

Check if the server is running and get basic information.

**Response:**
```json
{
  "message": "Backend is running!",
  "products": [...] // Array of all products
}
```

**Status Codes:**
- `200` - Server is running successfully

---

### Products

#### `GET /api/products`

Retrieve all products or filter by category.

**Query Parameters:**
- `category` (optional) - Filter products by category (`apparel`, `music`, or `all`)

**Examples:**
```bash
# Get all products
GET /api/products

# Get only apparel products
GET /api/products?category=apparel

# Get only music products
GET /api/products?category=music
```

**Response:**
```json
[
  {
    "_id": "product_id_here",
    "name": "Hurry Up Tomorrow Tee",
    "description": "Black cotton tee with logo from Hurry Up Tomorrow",
    "price": 25,
    "imageUrl": "https://res.cloudinary.com/deqe0oqer/image/upload/...",
    "category": "apparel",
    "album": "Hurry Up Tomorrow",
    "details": {
      "fabric": "100% Cotton",
      "fit": "Regular Fit",
      "care": "Machine wash cold, tumble dry low"
    },
    "__v": 0
  }
]
```

**Status Codes:**
- `200` - Products retrieved successfully
- `500` - Internal server error

---

### Payments

#### `POST /api/create-payment-intent`

Create a Stripe payment intent for processing payments.

**Request Body:**
```json
{
  "amount": 2500  // Amount in cents (e.g., $25.00 = 2500)
}
```

**Response:**
```json
{
  "clientSecret": "pi_1234567890_secret_abcdef"
}
```

**Validation:**
- Amount must be at least 50 cents (50)
- Amount must be a positive integer

**Status Codes:**
- `200` - Payment intent created successfully
- `400` - Invalid amount (less than 50 cents)
- `500` - Stripe API error or server error

**Error Response Example:**
```json
{
  "error": "Invalid amount. Must be at least 50 cents."
}
```

---

### Image Upload

#### `POST /api/upload-image`

Upload an image to Cloudinary for product management.

**Request Body:**
```json
{
  "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // Base64 encoded image
}
```

**Response:**
```json
{
  "url": "https://res.cloudinary.com/deqe0oqer/image/upload/v1234567890/image_id.jpg"
}
```

**Status Codes:**
- `200` - Image uploaded successfully
- `500` - Upload error

---

### Development Utilities

#### `GET /seed`

⚠️ **Development Only** - Populate the database with sample products.

**Warning**: This endpoint will delete all existing products and replace them with sample data.

**Response:**
```json
{
  "message": "Products seeded successfully",
  "count": 8
}
```

**Status Codes:**
- `200` - Database seeded successfully
- `500` - Seeding error

**Sample Products Created:**
- Hurry Up Tomorrow Collection (4 items)
- After Hours Collection (4 items)
- Categories: `apparel` and `music`

---

## Data Models

### Product Schema

```javascript
{
  name: String,           // Product name (required)
  description: String,    // Product description (required)
  price: Number,         // Price in USD (required)
  imageUrl: String,      // Cloudinary image URL (required)
  category: String,      // "apparel" or "music" (required)
  album: String,         // Album/collection name (optional)
  details: {
    // For apparel products:
    fabric: String,      // e.g., "100% Cotton"
    fit: String,         // e.g., "Regular Fit"
    care: String,        // e.g., "Machine wash cold"
    
    // For music products:
    format: String,      // e.g., "12-inch Vinyl LP"
    releaseYear: Number, // e.g., 2024
    tracks: Number       // e.g., 12
  }
}
```

### Categories

- **`apparel`** - Clothing items (tees, hoodies, etc.)
- **`music`** - Music products (vinyl, cassettes, CDs)

### Albums/Collections

- **`Hurry Up Tomorrow`** - Latest album collection
- **`After Hours`** - Previous album collection

---

## CORS Configuration

The API accepts requests from:
- `http://localhost:3000` (React dev server default)
- `http://localhost:5173` (Vite dev server default)
- `https://thexostore.vercel.app` (Production frontend)

---

## Environment Variables

The following environment variables are required for the backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production deployment.

## Future Enhancements

- [ ] Add user authentication for protected endpoints
- [ ] Implement order management endpoints
- [ ] Add product inventory tracking
- [ ] Implement product search functionality
- [ ] Add product reviews and ratings
- [ ] Implement admin dashboard endpoints
