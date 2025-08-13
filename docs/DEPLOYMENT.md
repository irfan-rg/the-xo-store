# Deployment Guide

This guide covers deploying both the frontend and backend of The XO Store to production environments.

## 📋 Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Third-party services (Stripe, Auth0, Cloudinary) configured
- [ ] Domain names configured (if using custom domains)
- [ ] SSL certificates ready (automatic with most platforms)

---

## 🚀 Frontend Deployment (Vercel)

The frontend is configured for deployment on Vercel with automatic deployments from GitHub.

### Automatic Deployment (Recommended)

1. **Connect GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend/merch-front` directory as the root

2. **Configure Build Settings**
   ```bash
   Framework Preset: Vite
   Root Directory: frontend/merch-front
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   Add the following environment variables in Vercel dashboard:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
   VITE_API_URL=https://your-backend-domain.com
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   ```

4. **Deploy**
   - Push to your main branch
   - Vercel will automatically build and deploy
   - Your site will be available at `https://your-project.vercel.app`

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy**
   ```bash
   cd frontend/merch-front
   vercel login
   vercel --prod
   ```

3. **Configure Environment Variables**
   ```bash
   vercel env add VITE_STRIPE_PUBLISHABLE_KEY
   vercel env add VITE_API_URL
   vercel env add VITE_AUTH0_DOMAIN
   vercel env add VITE_AUTH0_CLIENT_ID
   ```

### Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

---

## 🌐 Backend Deployment

The backend can be deployed to various platforms. Here are guides for popular options:

### Option 1: Railway (Recommended)

Railway offers easy deployment with automatic builds from GitHub.

1. **Setup Railway**
   - Go to [Railway](https://railway.app)
   - Sign up/login with GitHub
   - Create new project from GitHub repo
   - Select your repository

2. **Configure Build**
   - Railway will auto-detect Node.js
   - Root directory: `backend`
   - Start command: `npm start`

3. **Environment Variables**
   Add these in Railway dashboard:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/weeknd-store
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Deploy**
   - Push to main branch
   - Railway will automatically deploy
   - Note your deployment URL for frontend configuration

### Option 2: Render

1. **Create Web Service**
   - Go to [Render](https://render.com)
   - Connect GitHub repository
   - Create new "Web Service"

2. **Configure Service**
   ```bash
   Name: weeknd-store-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**
   Add the same environment variables as Railway

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku login
   heroku create weeknd-store-backend
   ```

3. **Configure Environment Variables**
   ```bash
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
   heroku config:set CLOUDINARY_API_KEY=your_api_key
   heroku config:set CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

---

## 🗄️ Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Cluster

1. **Sign up for MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your backend deployment
   - Create cluster

3. **Configure Database Access**
   - Go to "Database Access"
   - Create database user with read/write permissions
   - Save username and password for connection string

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP address `0.0.0.0/0` (allow from anywhere) for production
   - Or add specific IPs of your deployment platform

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### Initialize Database

After deployment, visit your backend URL + `/seed` to populate with initial products:
```
https://your-backend-url.com/seed
```

⚠️ **Warning**: This will delete existing data. Only use for initial setup.

---

## 🔐 Environment Variables Reference

### Frontend (.env)
```env
# Stripe (use publishable key - starts with pk_)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key

# Backend API URL
VITE_API_URL=https://your-backend-domain.com

# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
```

### Backend (.env)
```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/weeknd-store

# Stripe (use secret key - starts with sk_)
STRIPE_SECRET_KEY=sk_live_your_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🔒 Security Considerations

### Production Checklist

- [ ] Use production Stripe keys (not test keys)
- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Configure CORS for production domains only
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB Atlas IP whitelisting
- [ ] Set up monitoring and logging
- [ ] Configure error reporting (e.g., Sentry)

### Environment Security

- [ ] Never commit `.env` files to Git
- [ ] Use platform-specific environment variable management
- [ ] Rotate API keys regularly
- [ ] Use different keys for development and production

---

## 📊 Monitoring and Maintenance

### Frontend Monitoring
- Vercel provides built-in analytics and error tracking
- Monitor Core Web Vitals and performance metrics
- Set up custom domains and SSL certificates

### Backend Monitoring
- Use platform-specific logging (Railway Logs, Render Logs, etc.)
- Monitor API response times and error rates
- Set up database connection monitoring
- Configure alerts for downtime

### Database Maintenance
- Monitor MongoDB Atlas performance metrics
- Set up automated backups
- Monitor connection limits and usage

---

## 🚨 Troubleshooting

### Common Issues

**Frontend build fails:**
- Check that all environment variables are set
- Ensure `VITE_` prefix is used for all frontend env vars
- Check for missing dependencies in package.json

**Backend deployment fails:**
- Verify environment variables are correctly set
- Check MongoDB connection string format
- Ensure all required environment variables are present

**CORS errors:**
- Update backend CORS configuration with production frontend URL
- Check that API URLs match in frontend configuration

**Payment processing fails:**
- Verify Stripe keys are production keys (not test)
- Check webhook endpoints if using Stripe webhooks
- Verify currency and amount formatting

### Getting Help

1. Check platform-specific documentation
2. Review application logs for error messages
3. Test API endpoints individually
4. Verify environment variable configuration
5. Contact platform support if needed
