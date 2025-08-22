import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const { addToCart, notification } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [addingToCart, setAddingToCart] = useState(null); // Track which product is being added to cart

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    const startTime = Date.now();
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    }
    
    // Ensure minimum 600 milliseconds loading time regardless of success/failure
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 400 - elapsedTime);
    
    setTimeout(() => {
      setLoading(false);
    }, remainingTime);
  };

  // Add a useEffect to log category changes
  useEffect(() => {
    console.log('Category changed to:', selectedCategory);
  }, [selectedCategory]);

  // Handle browser back navigation and escape key for modal
  useEffect(() => {
    const handlePopState = (event) => {
      if (selectedProduct) {
        event.preventDefault();
        setSelectedProduct(null);
        // Push the current state back to prevent actual navigation
        window.history.pushState(null, '', window.location.href);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedProduct) {
        closeModal();
      }
    };

    if (selectedProduct) {
      // Add a history entry when modal opens
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  const filteredProducts = products
    .filter((product) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    setAddingToCart(product._id);
    setTimeout(() => {
      addToCart(product);
      setAddingToCart(null);
    }, 500); // Simulate a brief delay for loader visibility
  };

  // Show loading spinner during auth state resolution or data fetching
  if (loading) {
    return (
      <div className="bg-soft-black min-h-screen p-8 flex flex-col items-center justify-center">
        <LineSpinner
          size="40"
          stroke="3"
          speed="1"
          color="#FF2E2E"
          className="mb-4"
        />
        <p className="text-off-white text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-soft-black min-h-screen p-8 flex items-center justify-center">
        <div className="text-bright-red text-center">
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-off-white">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 bg-bright-red text-off-white px-6 py-2 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-soft-black min-h-screen pt-20 sm:pt-24 md:pt-28 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">
          <span className="bg-gradient-to-r from-red-600 via-white to-teal-300 bg-clip-text text-transparent">
            Exclusive Merch
          </span>
        </h1>

        {/* Search and Filters */}
        <div className="mb-8 sm:mb-10 md:mb-12 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-element text-off-white rounded-full pl-6 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-bright-red border border-gray-800"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex space-x-3 sm:space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-element text-off-white rounded-full px-4 sm:px-6 py-3 focus:outline-none focus:ring-2 focus:ring-bright-red border border-gray-800 text-sm sm:text-base flex-1 sm:flex-none"
            >
              <option value="all">All Categories</option>
              <option value="apparel">Apparel</option>
              <option value="music">Music</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-element text-off-white rounded-full px-4 sm:px-6 py-3 focus:outline-none focus:ring-2 focus:ring-bright-red border border-gray-800 text-sm sm:text-base flex-1 sm:flex-none"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <h3 className="text-lg sm:text-xl text-off-white">No products found</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-element rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-800 cursor-pointer active:scale-95"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative group">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-96 sm:h-72 md:h-64 object-cover"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                  <div className="absolute inset-0 bg-soft-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-off-white leading-tight">{product.name}</h3>
                    <span className="text-xl sm:text-2xl font-bold text-bright-red">${product.price}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      disabled={addingToCart === product._id}
                      className="w-full sm:w-auto mt-3 bg-bright-red text-off-white px-6 py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center min-h-[44px] text-base font-medium"
                    >
                      {addingToCart === product._id ? (
                        <LineSpinner
                          size="20"
                          stroke="2"
                          speed="1"
                          color="#FFFFFF" // White to match button text
                          className="mr-2"
                        />
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      )}
                      <span>{addingToCart === product._id ? 'ㅤAdding...' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notification Popup */}
        {notification && (
          <div className="fixed bottom-4 left-4 right-4 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-xs bg-element text-off-white p-4 rounded-lg shadow-lg border border-gray-700 animate-fade-in-out z-40">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-bright-red mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm sm:text-base">{notification}</span>
            </div>
          </div>
        )}

        {/* Product Preview Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-soft-black/90 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
               onClick={closeModal}
          >
            <div className="bg-element rounded-t-2xl sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-gray-700 max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col md:flex-row"
                 onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side - Image */}
              <div className="md:w-1/2 relative">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-96 sm:h-64 md:h-full object-cover"
                />
                {/* Close button for mobile */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 md:hidden bg-soft-black/70 text-off-white rounded-full p-2 hover:bg-soft-black/90 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Right Side - Details */}
              <div className="p-4 sm:p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-off-white mb-3 sm:mb-4 leading-tight">{selectedProduct.name}</h2>
                  <p className="text-bright-red text-xl sm:text-2xl font-bold mb-3 sm:mb-4">${selectedProduct.price}</p>
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{selectedProduct.description}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">Category: {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}</p>
                  {selectedProduct.album && (
                    <p className="text-gray-400 text-xs sm:text-sm mb-2">Album/Collection: {selectedProduct.album}</p>
                  )}
                  {/* Additional Product Info */}
                  <div className="mt-3 sm:mt-4">
                    <h3 className="text-base sm:text-lg font-semibold text-off-white mb-2">Additional Details</h3>
                    <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
                      {selectedProduct.category === 'apparel' && selectedProduct.details && (
                        <>
                          {selectedProduct.details.fabric && (
                            <li><span className="font-medium">Fabric:</span> {selectedProduct.details.fabric}</li>
                          )}
                          {selectedProduct.details.fit && (
                            <li><span className="font-medium">Fit:</span> {selectedProduct.details.fit}</li>
                          )}
                          {selectedProduct.details.care && (
                            <li><span className="font-medium">Care:</span> {selectedProduct.details.care}</li>
                          )}
                        </>
                      )}
                      {selectedProduct.category === 'music' && selectedProduct.details && (
                        <>
                          {selectedProduct.details.format && (
                            <li><span className="font-medium">Format:</span> {selectedProduct.details.format}</li>
                          )}
                          {selectedProduct.details.releaseYear && selectedProduct.details.releaseYear > 0 && (
                            <li><span className="font-medium">Release Year:</span> {selectedProduct.details.releaseYear}</li>
                          )}
                          {selectedProduct.details.tracks && selectedProduct.details.tracks > 0 && (
                            <li><span className="font-medium">Tracks:</span> {selectedProduct.details.tracks}</li>
                          )}
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      // Removed closeModal() to keep the modal open after adding to cart
                    }}
                    disabled={addingToCart === selectedProduct._id}
                    className="bg-bright-red text-off-white px-6 py-4 sm:py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex-1 min-h-[44px] text-base font-medium"
                  >
                    {addingToCart === selectedProduct._id ? (
                      <div className="flex items-center justify-center">
                        <LineSpinner
                          size="20"
                          stroke="2"
                          speed="1"
                          color="#FFFFFF"
                          className="mr-2"
                        />
                        <span>ㅤAdding...</span>
                      </div>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </button>
                  <button
                    onClick={closeModal}
                    className="hidden sm:block bg-gray-700 text-off-white px-6 py-3 rounded-full hover:bg-gray-600 transition-all duration-300 shadow-lg min-h-[44px]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;