// App.jsx
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { CartProvider } from './context/CartContext';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';
import NavBar from './pages/NavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Footer from './pages/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Callback component to handle Auth0 redirect and ensure content loads
function Callback() {
  const { isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoading && isAuthenticated && !redirecting) {
        setRedirecting(true);
        // Add a small delay to ensure Auth0 state is fully settled
        setTimeout(() => {
          const returnTo = localStorage.getItem('returnTo') || '/';
          console.log('Redirecting to:', returnTo);
          navigate(returnTo, { replace: true });
          localStorage.removeItem('returnTo');
        }, 500); // 500ms delay to ensure smooth transition
      }
    };
    handleRedirect();
  }, [isLoading, isAuthenticated, navigate, redirecting]);

  return (
    <div className="bg-soft-black min-h-screen p-8 flex flex-col items-center justify-center">
      <LineSpinner
        size="40"
        stroke="3"
        speed="1"
        color="#FF2E2E"
        className="mb-4"
      />
      <p className="text-off-white text-lg">
        {redirecting ? 'Redirecting...' : 'Completing login...'}
      </p>
    </div>
  );
}

function App() {
  // Enhanced Stripe loading with ad blocker detection
  const stripePromise = React.useMemo(async () => {
    try {
      console.log('🔄 Loading Stripe...');
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
        console.error('❌ Stripe failed to load - likely blocked by ad blocker');
        return null;
      }
      console.log('✅ Stripe loaded successfully');
      return stripe;
    } catch (error) {
      console.error('❌ Stripe loading error:', error);
      return null;
    }
  }, []);
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || "dev-x6vdgqu0qeqokinl.us.auth0.com"}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || "rCJPsiOcu23erb42a33h29W8ksh8WjpN"}
      redirectUri={window.location.origin + '/callback'}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            } />
            <Route path="/callback" element={<Callback />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </Auth0Provider>
  );
}

export default App;