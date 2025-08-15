import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
  
  // Hamburger animation refs
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const path3Ref = useRef(null);

  // Hamburger keyframes
  const KEY_FRAMES1 = [
    "M 84,24 C 84,24 78.333333,24.00025 71.25,24.0005 C 64.166667,24.00075 55.666667,24.001 50,24.001 C 44.333333,24.001 35.833333,24.00075 28.75,24.0005 C 21.666667,24.00025 16,24 16,24",
    "M 80,24 C 80,24 76.030349,22.75 70.295523,26 C 64.560698,29.25 57.060698,37 50,37 C 42.939302,37 35.439302,29.25 29.704477,26 C 23.969651,22.75 20,24 20,24",
    "M 78,24 C 78,24 74.539273,26.125 69.30891,31 C 64.078547,35.875 57.078547,43.5 50,43.5 C 42.921453,43.5 35.921453,35.875 30.69109,31 C 25.460727,26.125 22,24 22,24",
    "M 77.16569,24 C 77.16569,24 72.416225,29.177123 68,35 C 63.583775,40.822878 60.173703,42.300951 50,47 C 39.70128,42.841844 36.345369,40.823517 32,35 C 27.654631,29.176481 23.127298,24 23.127298,24",
    "M 76,24 C 76,24 69.513841,30.5 63.020762,37 C 56.527682,43.5 50.027682,50 50,50 C 49.972315,50 43.472315,43.5 36.979236,37 C 30.486157,30.5 24,24 24,24",
  ];
  
  const KEY_FRAMES2 = [
    "M 84,50 H 50 16",
    "M 75.5,50 H 50 24.5",
    "M 67,50 H 50 33",
    "M 58.5,50 H 50 41.5",
    "M 50.001,50 H 50 49.99",
  ];
  
  const KEY_FRAMES3 = [
    "M 84,76 C 84,76 78.333333,76.00025 71.25,76.0005 C 64.166667,76.00075 55.666667,76.001 50,76.001 C 44.333333,76.001 35.833333,76.00075 28.75,76.0005 C 21.666667,76.00025 16,76 16,76",
    "M 80,76 C 80,76 75.711325,77.126815 70.295523,74 C 64.58693,70.704142 57.060698,61 50,61 C 42.939302,61 35.41307,70.704142 29.704477,74 C 24.175255,77.192298 20,76 20,76",
    "M 78,76 C 78,76 74.20895,73.90004 69.30891,69 C 64.253105,63.944195 57.078547,56.5 50,56.5 C 42.921453,56.5 35.746895,63.944195 30.69109,69 C 25.852943,73.838147 22,76 22,76",
    "M 77.16569,76 C 77.16569,76 72.203446,70.303263 68,65 C 63.370693,59.15945 59.635373,56.914232 50,53 C 39.432115,57.18596 36.345369,58.845673 32,65 C 27.809053,70.935619 23.127298,76 23.127298,76",
    "M 76,76 C 76,76 69.683023,69.655167 63.020762,63 C 56.520762,56.506921 50.027682,50 50,50 C 49.972315,50 42.429609,57.55543 36.979236,63 C 30.479236,69.493079 24,76 24,76",
  ];

  // Animation function for hamburger
  const animatePath = (pathRef, keyframes, isOpening) => {
    if (!pathRef.current) return;
    const frames = isOpening ? keyframes : [...keyframes].reverse();
    const path = pathRef.current;
    const DURATION = 0.3;
    
    frames.forEach((frame, index) => {
      setTimeout(() => {
        path.setAttribute('d', frame);
      }, (index * DURATION * 1000) / (frames.length - 1));
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate hamburger when menu state changes
  useEffect(() => {
    animatePath(path1Ref, KEY_FRAMES1, isMobileMenuOpen);
    animatePath(path2Ref, KEY_FRAMES2, isMobileMenuOpen);
    animatePath(path3Ref, KEY_FRAMES3, isMobileMenuOpen);
  }, [isMobileMenuOpen]);

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

                             {/* Animated Hamburger Menu Button */}
               <button
                 onClick={toggleMobileMenu}
                 className="relative w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-0 focus:border-none outline-none border-none z-50 p-2 bg-transparent"
                 aria-label="Toggle mobile menu"
               >
                 <svg
                   className="w-8 h-8"
                   viewBox="0 0 100 100"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     ref={path1Ref}
                     d="M 84,24 C 84,24 78.333333,24.00025 71.25,24.0005 C 64.166667,24.00075 55.666667,24.001 50,24.001 C 44.333333,24.001 35.833333,24.00075 28.75,24.0005 C 21.666667,24.00025 16,24 16,24"
                     stroke="#E5E5E5"
                     strokeWidth="3"
                     fill="none"
                     strokeLinecap="round"
                   />
                   <path
                     ref={path2Ref}
                     d="M 84,50 H 50 16"
                     stroke="#E5E5E5"
                     strokeWidth="3"
                     fill="none"
                     strokeLinecap="round"
                   />
                   <path
                     ref={path3Ref}
                     d="M 84,76 C 84,76 78.333333,76.00025 71.25,76.0005 C 64.166667,76.00075 55.666667,76.001 50,76.001 C 44.333333,76.001 35.833333,76.00075 28.75,76.0005 C 21.666667,76.00025 16,76 16,76"
                     stroke="#E5E5E5"
                     strokeWidth="3"
                     fill="none"
                     strokeLinecap="round"
                   />
                 </svg>
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
                className="text-2xl font-semibold bg-bright-red text-off-white px-6 py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 active:scale-95 relative"
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