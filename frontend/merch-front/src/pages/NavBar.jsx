import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth0 } from '@auth0/auth0-react';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { totalItems } = useCart();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide Account/Login button on Home page
  const showAuthButton = location.pathname !== '/';

  // Function to handle login and redirect back to current page
  const handleLogin = () => {
    setIsLoggingIn(true);
    // Store the current path in localStorage before login
    localStorage.setItem('returnTo', location.pathname);
    // Add a small delay to show the loader before redirecting
    setTimeout(() => {
      loginWithRedirect();
    }, 500); // 500ms delay to show loading state
  };

  // Extract first name from user data
  const getFirstName = () => {
    if (!user) return '';
    if (user.given_name) return user.given_name;
    if (user.name) {
      const nameParts = user.name.split(' ');
      return nameParts[0];
    }
    return user.nickname || user.email.split('@')[0] || 'User';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
      isScrolled ? 'bg-soft-black/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-3xl font-bold text-bright-red hover:text-bright-red transition-transform duration-300"
          >
            The Weeknd
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="text-off-white hover:text-bright-red transition-colors duration-300 relative group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bright-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/products" 
              className="text-off-white hover:text-bright-red transition-colors duration-300 relative group"
            >
              <span>Products</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bright-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/cart" 
              className="px-3 py-1 rounded-full bg-bright-red text-off-white hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 relative"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-soft-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            {showAuthButton && (
              isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-bright-red text-sm font-medium">{getFirstName()}</span>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="text-gray-400 hover:text-bright-red transition-colors duration-300 focus:outline-none focus:ring-0 focus:border-none outline-none border-none"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="text-gray-400 hover:text-bright-red transition-colors duration-300 focus:outline-none focus:ring-0 focus:border-none outline-none border-none flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <>
                      <LineSpinner
                        size="16"
                        stroke="2"
                        speed="1"
                        color="#FF2E2E"
                        className="mr-2"
                      />
                      ㅤLogging in...
                    </>
                  ) : (
                    'Account'
                  )}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;