import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    const isFormValid = Object.values(formData).every(field => field.trim() !== '');
    if (isFormValid && cartItems.length > 0) {
      setIsProcessing(true);
      setTimeout(() => {
        const randomOrderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
        setOrderNumber(randomOrderNumber);
        setOrderPlaced(true);
        // Clear the cart after order is placed using the context method
        clearCart();
        console.log('Cart cleared, localStorage updated to empty array');
        setIsProcessing(false);
        // Optionally, you could save the order details somewhere if you implement order history
      }, 1500); // Simulate processing delay
    } else {
      alert('Please fill out all shipping details and ensure your cart is not empty.');
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="bg-soft-black min-h-screen p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-off-white mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Looks like you haven\'t added anything yet.</p>
        <Link 
          to="/products" 
          className="bg-bright-red text-off-white px-6 py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-soft-black min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="bg-element p-8 rounded-lg shadow-lg border border-gray-700 max-w-lg text-center">
          <svg
            className="w-16 h-16 text-bright-red mx-auto mb-6"
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
          <h2 className="text-3xl font-bold text-off-white mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-300 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-300 mb-6">Your order number is <span className="font-bold text-off-white">{orderNumber}</span>.</p>
          <button
            onClick={handleContinueShopping}
            className="bg-bright-red text-off-white px-6 py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const shippingCost = 5.00;
  const totalWithShipping = (parseFloat(totalPrice) + shippingCost).toFixed(2);

  return (
    <div className="bg-soft-black min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-red-600 via-white to-teal-300 bg-clip-text text-transparent">
          Checkout
        </span>
      </h1>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Shipping Information */}
        <div className="bg-element p-6 rounded-lg border border-gray-800 shadow-md md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-off-white">Shipping Information</h2>
            <Link to="/cart" className="text-gray-400 hover:text-bright-red transition-colors duration-300">
              Back to Cart
            </Link>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="firstName" className="block text-gray-400 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="lastName" className="block text-gray-400 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-gray-400 mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="city" className="block text-gray-400 mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="state" className="block text-gray-400 mb-1">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="zip" className="block text-gray-400 mb-1">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="country" className="block text-gray-400 mb-1">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-off-white p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bright-red"
                required
              />
            </div>
          </form>
        </div>
        {/* Order Summary */}
        <div className="bg-element p-6 rounded-lg border border-gray-800 shadow-md md:w-1/3">
          <h2 className="text-2xl font-bold text-off-white mb-4">Order Summary</h2>
          <div className="max-h-40 overflow-y-auto mb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between mb-2 border-b border-gray-700 pb-2">
                <span className="text-gray-300">{item.name} x {item.quantity}</span>
                <span className="text-off-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-off-white">${totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Shipping</span>
            <span className="text-off-white">${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-700">
            <span className="text-off-white">Total</span>
            <span className="text-bright-red">${totalWithShipping}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="bg-bright-red text-off-white px-4 py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 shadow-lg w-full mt-6"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <LineSpinner
                  size="20"
                  stroke="2"
                  speed="1"
                  color="#FFFFFF" // White to match button text
                  className="mr-2"
                />
                <span>ㅤProcessing...</span>
              </div>
            ) : (
              <span>Place Order</span>
            )}
          </button>
          <p className="text-gray-400 text-sm mt-2 text-center">*This is a simulated checkout for demo purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 