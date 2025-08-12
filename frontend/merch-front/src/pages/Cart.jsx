import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

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
    <div className="bg-soft-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-12">
          <h1 className="text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-red-600 via-white to-teal-300 bg-clip-text text-transparent">
              Your Cart
            </span>
          </h1>
          <Link 
            to="/products" 
            className="className= text-gray-400 hover:text-bright-red transition-colors duration-300 flex items-center"
          >
            <svg
              className="w-6 h-6 mr-1"
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
            <span className="text-sm">Back</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center bg-element p-4 mb-4 rounded-lg border border-gray-800 shadow-md">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-off-white">{item.name}</h3>
                  <p className="text-gray-400">${item.price} x {item.quantity}</p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className="bg-gray-700 text-off-white w-8 h-8 flex items-center justify-center rounded hover:outline-none hover:border-none focus:outline-none focus:border-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50 transition-all duration-0"
                    >
                      -
                    </button>
                    <span className="text-off-white mx-2">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="bg-gray-700 text-off-white w-8 h-8 flex items-center justify-center rounded hover:outline-none hover:border-none focus:outline-none focus:border-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50 transition-all duration-0"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="ml-auto text-bright-red hover:text-red-400 hover:outline-none hover:border-none focus:outline-none focus:border-none focus:ring-2 focus:ring-bright-red focus:ring-opacity-50 transition-all duration-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="bg-element p-6 rounded-lg border border-gray-800 shadow-md md:w-1/3">
            <h2 className="text-2xl font-bold text-off-white mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-off-white">${totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Shipping</span>
              <span className="text-off-white">$5.00</span>
            </div>
            <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-700">
              <span className="text-off-white">Total</span>
              <span className="text-bright-red">${(parseFloat(totalPrice) + 5).toFixed(2)}</span>
            </div>
            <button 
              onClick={handleProceedToCheckout}
              disabled={isNavigating}
              className="bg-bright-red text-off-white px-4 py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 shadow-lg w-full mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-0 focus:border-none outline-none border-none"
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
