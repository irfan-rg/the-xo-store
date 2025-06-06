import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
      isScrolled ? 'bg-soft-black/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-3xl font-bold bg-gradient-to-r from-bright-red to-off-white bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            Artist Name
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
              className="px-6 py-2 rounded-full bg-bright-red text-off-white hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;