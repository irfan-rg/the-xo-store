# The ✘󠁅'𝑶 Store - The Weeknd Official Merchandise Store

A modern, full-stack e-commerce platform for The Weeknd's official merchandise, featuring exclusive apparel and music collections from albums like "Hurry Up Tomorrow" and "After Hours".

<div align="center">

![The XO Store](https://res.cloudinary.com/deqe0oqer/image/upload/v1754410702/favicon_zs1pui.ico)

![The XO Store](https://res.cloudinary.com/deqe0oqer/image/upload/v1756387292/red-weeknd_elrseh.jpg)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://thexostore.vercel.app)

</div>

## 🚀 Live Production

- **Frontend**: [https://thexostore.vercel.app](https://thexostore.vercel.app)
- **Backend API**: Deployed on Cloud Platform

## ✨ Features

- **🛍️ Product Catalog**: Browse exclusive merchandise by category (apparel, music)
- **🔐 Authentication**: Secure user authentication via Auth0
- **💳 Payment Processing**: Secure payments powered by Stripe
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🎵 Album Collections**: Products organized by album releases
- **🛒 Shopping Cart**: Add/remove items with real-time cart management
- **📦 Product Details**: Detailed product information with high-quality images
- **🎨 Modern UI**: Clean, dark theme with smooth animations

## 🛠️ Tech Stack

### 🖥️Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Auth0 React SDK** - Authentication
- **Stripe React** - Payment integration
- **Axios** - HTTP client
- **Cloudinary** - Image optimization and delivery

For detailed Frontend documentation, see [FRONTEND.md](./docs/FRONTEND.md)

### 🗃️Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Stripe API** - Payment processing
- **Cloudinary API** - Image upload and management
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

For detailed Backend documentation, see [BACKEND.md](./docs/BACKEND.md)

## 📁 Project Structure

```
merch/
├── frontend/merch-front/          # React frontend application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components (Home, Products, Cart, etc.)
│   │   ├── context/               # React Context (CartContext)
│   │   └── assets/                # Static assets
│   ├── public/                    # Public assets
│   └── package.json               # Frontend dependencies
├── backend/                       # Node.js backend API
│   ├── models/                    # MongoDB models
│   ├── routes/                    # API route handlers
│   ├── server.js                  # Main server file
│   └── package.json               # Backend dependencies
└── README.md                      # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Stripe account
- Auth0 account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/irfan-rg/the-xo-store
   cd merch
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file in backend directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend/merch-front
   npm install
   ```

   Create `.env` file in frontend directory:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_API_URL=http://localhost:5000
   VITE_AUTH0_DOMAIN=your_auth0_domain
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   ```

   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000
Production: [Your deployed backend URL]
```

### Endpoints

#### Products
- `GET /api/products` - Get all products (supports category filtering)
- `GET /api/products?category=apparel` - Get products by category

#### Payments
- `POST /api/create-payment-intent` - Create Stripe payment intent

#### Images
- `POST /api/upload-image` - Upload image to Cloudinary

#### Utilities
- `GET /` - Health check endpoint
- `GET /seed` - Seed database with sample products (development only)

For detailed API documentation, see [API.md](./docs/API.md)

## 🚀 Deployment

### Frontend (Vercel)
The frontend is configured for Vercel deployment with automatic builds from the main branch.

### Backend
Can be deployed to various platforms (Railway, Render, Heroku, etc.)

For detailed deployment instructions, see [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Weeknd for the musical inspiration
- Cloudinary for image optimization
- Stripe for payment processing
- Auth0 for authentication services

## Contact

For questions or support, please open an issue in this repository.

---

**Made With Love ✘󠁅'𝑶 !**