import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProceedToCheckout = () => {
    setIsNavigating(true);
    // Simulate a brief loading delay to make it feel more realistic
    setTimeout(() => {
      navigate('/checkout');
    }, 800); // 800ms delay
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-soft-black min-h-screen p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-off-white mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
        <Link 
          to="/products" 
          className="bg-bright-red text-off-white px-6 py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-black min-h-screen pt-20 sm:pt-24 md:pt-28 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-red-600 via-white to-teal-300 bg-clip-text text-transparent">
              Your Cart
            </span>
          </h1>
          <Link 
            to="/products" 
            className="text-gray-400 hover:text-bright-red transition-colors duration-300 flex items-center justify-center sm:justify-start"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="text-sm sm:text-base ">Back</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex-1">
                         {cartItems.map((item) => (
               <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center bg-element p-4 sm:p-5 mb-4 rounded-lg border border-gray-800 shadow-md">
                 <img src={item.imageUrl} alt={item.name} className="w-full sm:w-24 h-64 sm:h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4" />
                 <div className="flex-1">
                   {/* Mobile Layout */}
                   <div className="sm:hidden">
                     <div className="flex justify-between items-start mb-3">
                       <div>
                         <h3 className="text-lg font-semibold text-off-white mb-1">{item.name}</h3>
                         <p className="text-bright-red font-bold text-lg">${item.price}</p>
                       </div>
                       <button 
                         onClick={() => removeFromCart(item._id)}
                         className="text-bright-red hover:text-red-400 font-medium px-3 py-2 rounded-full hover:bg-bright-red/10 focus:outline-none focus:ring-0 focus:border-none outline-none border-none transition-all duration-300 transform active:scale-95 min-h-[44px] flex items-center ml-24"
                       >
                         Remove
                       </button>
                     </div>
                     <div className="flex items-center">
                       <button 
                         onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                         className="bg-gray-700 text-off-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-600 focus:outline-none focus:ring-0 focus:border-none outline-none border-none transition-all duration-300 transform active:scale-95"
                       >
                         <span className="text-lg font-bold">-</span>
                       </button>
                       <span className="text-off-white mx-4 text-lg font-medium min-w-[2rem] text-center">{item.quantity}</span>
                       <button 
                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
                         className="bg-gray-700 text-off-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-600 focus:outline-none focus:ring-0 focus:border-none outline-none border-none transition-all duration-300 transform active:scale-95"
                       >
                         <span className="text-lg font-bold">+</span>
                       </button>
                     </div>
                   </div>
                   
                   {/* Desktop Layout - Original Style */}
                   <div className="hidden sm:block">
                     <h3 className="text-lg font-semibold text-off-white">{item.name}</h3>
                     <p className="text-gray-400">${item.price} x {item.quantity}</p>
                     <div className="flex items-center mt-2">
                       <button 
                         onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                         className="bg-gray-700 text-off-white w-8 h-8 flex items-center justify-center rounded hover:bg-gray-600 focus:outline-none focus:ring-0 focus:border-none outline-none border-none transition-all duration-300"
                       >
                         -
                       </button>
                       <span className="text-off-white mx-2">{item.quantity}</span>
                       <button 
                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
                         className="bg-gray-700 text-off-white w-8 h-8 flex items-center justify-center rounded hover:bg-gray-600 focus:outline-none focus:ring-0 focus:border-none outline-none border-none transition-all duration-300"
                       >
                         +
                       </button>
                     </div>
                   </div>
                 </div>
                 {/* Remove Button - Desktop Only */}
                 <button 
                   onClick={() => removeFromCart(item._id)}
                   className="hidden sm:block ml-auto text-bright-red hover:outline-none hover:border-none hover:text-red-400 focus:outline-none focus:border-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50 transition-all duration-0"
                 >
                   Remove
                 </button>
               </div>
             ))}
          </div>
          <div className="bg-element p-4 sm:p-6 rounded-lg border border-gray-800 shadow-md md:w-1/3 order-first md:order-last">
            <h2 className="text-xl sm:text-2xl font-bold text-off-white mb-4">Order Summary</h2>
            <div className="flex justify-between mb-3 text-base sm:text-lg">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-off-white font-medium">${totalPrice}</span>
            </div>
            <div className="flex justify-between mb-3 text-base sm:text-lg">
              <span className="text-gray-400">Shipping</span>
              <span className="text-off-white font-medium">$5.00</span>
            </div>
            <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-700 text-lg sm:text-xl">
              <span className="text-off-white">Total</span>
              <span className="text-bright-red">${(parseFloat(totalPrice) + 5).toFixed(2)}</span>
            </div>
            <button 
              onClick={handleProceedToCheckout}
              disabled={isNavigating}
              className="bg-bright-red text-off-white px-6 py-4 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg w-full mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-0 focus:border-none outline-none border-none min-h-[44px] text-base sm:text-lg font-medium"
            >
              {isNavigating ? (
                <>
                  <LineSpinner
                    size="20"
                    stroke="3"
                    speed="1"
                    color="#FFFFFF"
                    className="mr-2"
                  />
                  ㅤProcessing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
