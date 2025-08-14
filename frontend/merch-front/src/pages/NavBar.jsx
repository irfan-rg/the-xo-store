import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth0 } from '@auth0/auth0-react';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-soft-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl md:text-3xl font-bold text-bright-red hover:text-bright-red transition-transform duration-300 z-50 relative"
            >
              The Weeknd
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
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
                className="px-3 py-2 rounded-full bg-bright-red text-off-white hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 relative"
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

            {/* Mobile Cart Button and Hamburger */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Cart Button - Hidden on Home Page */}
              {location.pathname !== '/' && (
                <Link 
                  to="/cart" 
                  className="relative px-3 py-2 rounded-full bg-bright-red text-off-white hover:bg-off-white hover:text-soft-black transition-all duration-300 transform active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-soft-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1 focus:outline-none z-50"
                aria-label="Toggle mobile menu"
              >
                <span className={`block w-6 h-0.5 bg-off-white transition-all duration-300 transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
                <span className={`block w-6 h-0.5 bg-off-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-6 h-0.5 bg-off-white transition-all duration-300 transform ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-soft-black/95 backdrop-blur-md"
            onClick={toggleMobileMenu}
          ></div>
          
          {/* Menu Content */}
          <div className="fixed top-0 right-0 w-full h-full bg-soft-black/95 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
              {/* Navigation Links */}
              <Link 
                to="/" 
                className="text-2xl font-semibold text-off-white hover:text-bright-red transition-colors duration-300 transform hover:scale-105 active:scale-95 py-4 px-8 text-center"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              
              <Link 
                to="/products" 
                className="text-2xl font-semibold text-off-white hover:text-bright-red transition-colors duration-300 transform hover:scale-105 active:scale-95 py-4 px-8 text-center"
                onClick={toggleMobileMenu}
              >
                Products
              </Link>
              
              <Link 
                to="/cart" 
                className="text-2xl font-semibold bg-bright-red text-off-white px-8 py-4 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 active:scale-95 relative"
                onClick={toggleMobileMenu}
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-soft-black text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Authentication Section */}
              {showAuthButton && (
                <div className="flex flex-col items-center space-y-4 pt-8 border-t border-gray-700/50 w-full">
                  {isAuthenticated ? (
                    <>
                      <span className="text-bright-red text-xl font-medium">Hello, {getFirstName()}!</span>
                      <button
                        onClick={() => {
                          logout({ returnTo: window.location.origin });
                          toggleMobileMenu();
                        }}
                        className="text-lg text-gray-400 hover:text-bright-red transition-colors duration-300 py-2 px-6"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogin();
                        toggleMobileMenu();
                      }}
                      disabled={isLoggingIn}
                      className="text-lg text-gray-400 hover:text-bright-red transition-colors duration-300 flex items-center disabled:opacity-70 disabled:cursor-not-allowed py-2 px-6"
                    >
                      {isLoggingIn ? (
                        <>
                          <LineSpinner
                            size="20"
                            stroke="2"
                            speed="1"
                            color="#FF2E2E"
                            className="mr-3"
                          />
                          Logging in...
                        </>
                      ) : (
                        'Account'
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;