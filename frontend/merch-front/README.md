# Frontend Setup

## Environment Variables Setup

1. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```

2. Open `.env` and replace the placeholder values with your actual credentials:
   - **VITE_STRIPE_PUBLISHABLE_KEY**: Get from Stripe Dashboard → Developers → API Keys (use the publishable key starting with `pk_`)
   - **VITE_API_URL**: Your backend API URL (use `http://localhost:5000` for development)
   - **VITE_AUTH0_DOMAIN**: Your Auth0 domain from Auth0 Dashboard
   - **VITE_AUTH0_CLIENT_ID**: Your Auth0 application client ID

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Required Services

- **Stripe**: For payment processing (publishable key)
- **Auth0**: For user authentication
- **Backend API**: Your Node.js/Express backend

## Important Notes

- All environment variables in Vite must start with `VITE_` to be accessible in the frontend
- Never put secret keys in the frontend - only use publishable/public keys
- The `.env` file is ignored by Git for security