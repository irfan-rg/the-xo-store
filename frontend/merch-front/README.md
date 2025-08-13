# The Weeknd Store - Frontend

React-based frontend for The Weeknd's official merchandise store, built with modern web technologies for a premium shopping experience.

## 🛠️ Tech Stack

- **React 19** - Latest React with improved performance
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Auth0 React SDK** - User authentication
- **Stripe React** - Payment processing
- **Axios** - HTTP client for API requests
- **LDRS** - Loading animations

## ✨ Features

- **🎨 Modern UI**: Dark theme with smooth animations and responsive design
- **🔐 Authentication**: Secure user login/logout via Auth0
- **🛒 Shopping Cart**: Add/remove items with persistent cart state
- **💳 Payments**: Secure checkout process with Stripe
- **📱 Responsive**: Optimized for all device sizes
- **🎵 Album Collections**: Browse products by album/collection
- **🖼️ High-Quality Images**: Optimized images via Cloudinary
- **⚡ Fast Loading**: Optimized with Vite and modern React features

## 📁 Project Structure

```
frontend/merch-front/
├── public/
│   ├── _redirects          # Netlify/Vercel routing rules
│   └── favicon.ico         # Site favicon
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page with hero video
│   │   ├── Products.jsx   # Product catalog with filtering
│   │   ├── Cart.jsx       # Shopping cart management
│   │   ├── Checkout.jsx   # Payment processing
│   │   ├── NavBar.jsx     # Navigation component
│   │   └── Footer.jsx     # Footer component
│   ├── context/
│   │   └── CartContext.jsx # Global cart state management
│   ├── assets/            # Static assets
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # App entry point
│   ├── App.css           # Global styles
│   └── index.css         # Tailwind imports
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel deployment config
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend API running (see [backend README](../../backend/README.md))
- Stripe account (for payments)
- Auth0 account (for authentication)

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend/merch-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   VITE_API_URL=http://localhost:5000
   VITE_AUTH0_DOMAIN=your-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` or `pk_live_...` |
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |
| `VITE_AUTH0_DOMAIN` | Auth0 domain | `your-domain.auth0.com` |
| `VITE_AUTH0_CLIENT_ID` | Auth0 application client ID | `your_client_id` |

**Important:** All environment variables must start with `VITE_` to be accessible in the frontend.

### Service Setup

#### Stripe Configuration

1. **Create Stripe Account** at [stripe.com](https://stripe.com)
2. **Get Publishable Key** from Dashboard → Developers → API Keys
3. **Use Test Key** for development (starts with `pk_test_`)
4. **Switch to Live Key** for production (starts with `pk_live_`)

#### Auth0 Configuration

1. **Create Auth0 Account** at [auth0.com](https://auth0.com)
2. **Create Application** (Single Page Application type)
3. **Configure Allowed URLs**:
   - **Allowed Callback URLs**: `http://localhost:5173, https://your-domain.com`
   - **Allowed Logout URLs**: `http://localhost:5173, https://your-domain.com`
   - **Allowed Web Origins**: `http://localhost:5173, https://your-domain.com`

### Tailwind Configuration

The project uses custom Tailwind colors defined in `tailwind.config.js`:

```javascript
colors: {
  'soft-black': '#0a0a0a',    // Background color
  'off-white': '#f5f5f5',     // Text color
  'bright-red': '#ff073a',    // Accent color
}
```

## 🎨 UI Components

### Key Components

- **NavBar**: Responsive navigation with cart icon and auth buttons
- **Home**: Hero section with background video and call-to-action
- **Products**: Product grid with category filtering
- **Cart**: Shopping cart with quantity management
- **Checkout**: Stripe-powered payment form

### Styling Approach

- **Utility-First**: Tailwind CSS for rapid development
- **Responsive**: Mobile-first design with breakpoint utilities
- **Dark Theme**: Consistent dark color scheme throughout
- **Animations**: Smooth transitions and hover effects

## 🛒 Cart Management

The cart is managed using React Context (`CartContext`) providing:

```javascript
{
  cartItems: [],           // Array of cart items
  addToCart: (product) => {}, // Add product to cart
  removeFromCart: (id) => {}, // Remove item from cart
  updateQuantity: (id, quantity) => {}, // Update item quantity
  getTotalPrice: () => {}, // Calculate total price
  getCartCount: () => {}   // Get total item count
}
```

## 💳 Payment Integration

The checkout process uses Stripe Elements:

1. **Cart Review**: User reviews items and total
2. **Payment Form**: Stripe Elements for secure card input
3. **Payment Intent**: Create payment intent via backend API
4. **Confirmation**: Success/error handling

## 🔐 Authentication Flow

Using Auth0 React SDK:

1. **Login**: Redirect to Auth0 hosted login
2. **Callback**: Handle authentication callback
3. **Protected Routes**: Secure checkout process
4. **User Info**: Access user profile data

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub** repository to Vercel
2. **Configure Build Settings**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend/merch-front`

3. **Set Environment Variables** in Vercel dashboard
4. **Deploy** automatically on push to main branch

### Alternative Platforms

- **Netlify**: Drag and drop or Git integration
- **GitHub Pages**: Static hosting for React apps
- **Firebase Hosting**: Google's hosting platform

For detailed deployment instructions, see [DEPLOYMENT.md](../../docs/DEPLOYMENT.md)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Navigation works across all pages
- [ ] Product filtering by category works
- [ ] Add/remove items from cart works
- [ ] Cart persists across page refreshes
- [ ] Authentication login/logout works
- [ ] Checkout process completes successfully
- [ ] Responsive design works on mobile
- [ ] Loading states display properly
- [ ] Error handling works for failed API calls

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Development Guidelines

### Code Style

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript-style prop validation where needed
- Follow React best practices

### Performance Optimization

- **Lazy Loading**: Use React.lazy() for route-based code splitting
- **Image Optimization**: Cloudinary handles image optimization
- **Bundle Analysis**: Use `npm run build` and analyze bundle size

### Adding New Features

1. **Create Component** in appropriate directory
2. **Add Routes** if needed in App.jsx
3. **Update Context** if global state is needed
4. **Style with Tailwind** following existing patterns
5. **Test Thoroughly** across devices and browsers

## 🐛 Troubleshooting

### Common Issues

**Build fails:**
- Check all environment variables are set with `VITE_` prefix
- Verify Node.js version compatibility
- Clear node_modules and reinstall dependencies

**API calls fail:**
- Check backend is running on correct port
- Verify CORS configuration in backend
- Check API URL in environment variables

**Stripe integration issues:**
- Verify publishable key format (starts with `pk_`)
- Check if using test vs live keys appropriately
- Ensure backend payment intent endpoint works

**Auth0 authentication fails:**
- Check Auth0 domain and client ID
- Verify allowed URLs in Auth0 dashboard
- Check callback URL configuration

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Stripe React Documentation](https://stripe.com/docs/stripe-js/react)
- [Auth0 React Documentation](https://auth0.com/docs/quickstart/spa/react)

## 🤝 Contributing

1. Follow existing code patterns and structure
2. Use Tailwind utilities instead of custom CSS when possible
3. Ensure responsive design for all new components
4. Test authentication and payment flows thoroughly
5. Update documentation for new features