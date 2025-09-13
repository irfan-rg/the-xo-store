# The XO Store - Backend API

Node.js/Express backend for The Weeknd's official merchandise store, providing RESTful APIs for product management, payment processing, and image uploads.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** with **Mongoose** - Database and ODM
- **Stripe API** - Payment processing
- **Cloudinary** - Image upload and management
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
backend/
├── models/
│   └── Product.js          # MongoDB product schema
├── routes/
│   └── products.js         # Product-related API routes
├── server.js               # Main application file
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database (local or MongoDB Atlas)
- Stripe account (for payment processing)
- Cloudinary account (for image management)

### Installation

1. **Clone the repository and navigate to backend**
   ```bash
   git clone <repository-url>
   cd merch/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/weeknd-store
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

## 📝 Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server
npm test        # Run tests (currently not implemented)
```

## 🗄️ Database Schema

### Product Model

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

## 🌐 API Endpoints

### Health Check
- `GET /` - Server health check and basic info

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=apparel` - Get products by category

### Payments
- `POST /api/create-payment-intent` - Create Stripe payment intent

### Images
- `POST /api/upload-image` - Upload image to Cloudinary

### Development
- `GET /seed` - Populate database with sample products (development only)

For detailed API documentation, see [API.md](./API.md)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/weeknd-store` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` or `sk_live_...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |

### CORS Configuration

The server accepts requests from:
- `http://localhost:3000` (React default dev server)
- `http://localhost:5173` (Vite dev server)
- `https://thexostore.vercel.app` (Production frontend)

To add more allowed origins, modify the CORS configuration in `server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', 
    'https://thexostore.vercel.app',
    'https://your-custom-domain.com'  // Add your domains here
  ],
  credentials: true
}));
```

## 🗃️ Database Setup

### Local MongoDB

1. **Install MongoDB** locally or use Docker:
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Update connection string**:
   ```env
   MONGO_URI=mongodb://localhost:27017/weeknd-store
   ```

### MongoDB Atlas (Cloud)

1. **Create cluster** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Get connection string** from cluster dashboard
3. **Update environment variable**:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/weeknd-store
   ```

### Seed Database

To populate the database with sample products:

```bash
# Start the server, then visit:
GET http://localhost:5000/seed
```

This will create 8 sample products (4 from "Hurry Up Tomorrow" and 4 from "After Hours" collections).

## 💳 Payment Integration

### Stripe Setup

1. **Create Stripe account** at [stripe.com](https://stripe.com)
2. **Get API keys** from Dashboard → Developers → API Keys
3. **Use test keys** for development:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_test_secret_key
   ```
4. **Switch to live keys** for production:
   ```env
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key
   ```

### Payment Flow

1. Frontend sends payment amount to `/api/create-payment-intent`
2. Backend creates Stripe PaymentIntent
3. Backend returns `clientSecret` to frontend
4. Frontend completes payment using Stripe.js

## 🖼️ Image Management

### Cloudinary Setup

1. **Create account** at [cloudinary.com](https://cloudinary.com)
2. **Get credentials** from Dashboard
3. **Configure environment variables**:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Upload Preset

Ensure you have an upload preset named `merch_store` in your Cloudinary settings, or update the preset name in `server.js`:

```javascript
const uploadResponse = await cloudinary.uploader.upload(fileStr, {
  upload_preset: 'your_preset_name'  // Update this
});
```

## 🚀 Deployment

### Preparation

1. **Create production environment variables**
2. **Use production database** (MongoDB Atlas recommended)
3. **Use production Stripe keys**
4. **Configure CORS** for production frontend URL

### Platform Options

- **Render** - Good free tier
- **Railway** - Recommended for ease of use
- **Heroku** - Established platform
- **DigitalOcean App Platform** - Developer-friendly

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧪 Testing

### Manual Testing

Test all endpoints using tools like:
- **Postman** - GUI-based API testing
- **curl** - Command-line testing
- **Thunder Client** - VS Code extension

Example curl commands:

```bash
# Health check
curl http://localhost:5000/

# Get all products
curl http://localhost:5000/api/products

# Get apparel products
curl http://localhost:5000/api/products?category=apparel

# Create payment intent
curl -X POST http://localhost:5000/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 2500}'
```

### Testing Checklist

- [ ] All endpoints return correct status codes
- [ ] Database connection works
- [ ] Environment variables are loaded
- [ ] CORS allows frontend requests
- [ ] Stripe integration works with test keys
- [ ] Cloudinary image upload works
- [ ] Error handling works correctly

## 🛠️ Development Guidelines

### Error Handling

```javascript
// Example error handling pattern
app.get('/api/example', async (req, res) => {
  try {
    // Your logic here
    res.json({ success: true });
  } catch (error) {
    console.error('Error in /api/example:', error);
    res.status(500).json({ error: error.message });
  }
});
```

### Adding New Endpoints

1. **Create route file** in `routes/` if needed
2. **Define route handlers** with proper error handling
3. **Update API documentation**
4. **Test thoroughly**

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 🤝 Contributing

1. Follow the existing code style
2. Add appropriate error handling
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit pull requests with clear descriptions

## ✒️ License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

For detailed licensing information including third-party dependencies, see [LICENSE.md](./LICENSE.md).

## 🐛 Troubleshooting

### Common Issues

**Server won't start:**
- Check that all environment variables are set
- Verify MongoDB connection string
- Ensure port 5000 is available

**Database connection fails:**
- Check MongoDB URI format
- Verify database credentials
- Ensure network access (for Atlas)

**Stripe errors:**
- Verify API key format (starts with `sk_`)
- Check if using test vs live keys appropriately
- Ensure amount is in cents and >= 50

**CORS errors:**
- Add frontend URL to CORS origins
- Check protocol (http vs https)
- Verify port numbers

**Cloudinary upload fails:**
- Check credentials and upload preset
- Verify image format and size
- Check Cloudinary account limits

For more help, check the main [troubleshooting guide](./DEPLOYMENT.md#troubleshooting).
