import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LineSpinner } from 'ldrs/react';
import 'ldrs/react/LineSpinner.css';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
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
  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const hasAlerted = useRef(false);
  const [isRedirectingToLogin, setIsRedirectingToLogin] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [realProcessing, setRealProcessing] = useState(false);
  const [demoProcessing, setDemoProcessing] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check authentication immediately and trigger redirect if needed
  if (!isLoading && !isAuthenticated && !hasAlerted.current && !isRedirectingToLogin) {
    hasAlerted.current = true;
    setIsRedirectingToLogin(true);
    alert('Please Log In to proceed with Checkout.');
    // Store the current path in localStorage before login
    localStorage.setItem('returnTo', '/checkout');
    setTimeout(() => {
      loginWithRedirect();
    }, 100); // Small delay to ensure state is set
  }

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateZip = (zip) => {
    const zipRegex = /^[A-Z0-9\s-]{3,10}$/i; // International postal code format
    return zipRegex.test(zip);
  };

  const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case 'email':
        if (value && !validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'zip':
        if (value && !validateZip(value)) {
          errors.zip = 'Please enter a valid ZIP code';
        }
        break;
      case 'firstName':
      case 'lastName':
      case 'address':
      case 'city':
      case 'state':
      case 'country':
        if (!value.trim()) {
          errors[name] = 'This field is required';
        }
        break;
      default:
        break;
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Real-time validation
    const fieldErrors = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] || null
    }));
  };

  const validateAllFields = () => {
    const allErrors = {};
    Object.keys(formData).forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      if (fieldErrors[field]) {
        allErrors[field] = fieldErrors[field];
      }
    });
    
    // Check for required fields
    Object.keys(formData).forEach(field => {
      if (!formData[field].trim()) {
        allErrors[field] = 'This field is required';
      }
    });
    
    setFormErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const handleRealPayment = async () => {
    if (!stripe || !elements) return;

    if (!validateAllFields() || cartItems.length === 0) {
      alert('Please fill all the details before proceeding.');
      return;
    }

    setRealProcessing(true);
    setPaymentError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/create-payment-intent`, {
        amount: Math.round((parseFloat(totalPrice) + shippingCost) * 100), // Total with shipping in cents
      });

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zip,
              country: formData.country,
            },
          },
        },
      });

      if (error) {
        setPaymentError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        const randomOrderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
        setOrderNumber(randomOrderNumber);
        clearCart();
        setOrderPlaced(true);
      }
    } catch (err) {
      setPaymentError('An error occurred during payment processing. Please try again.');
    } finally {
      setRealProcessing(false);
    }
  };

  const handleDemoPayment = () => {
    if (!validateAllFields() || cartItems.length === 0) {
      alert('Please fill all the details before proceeding.');
      return;
    }

    setDemoProcessing(true);
    setTimeout(() => {
      const randomOrderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      setOrderNumber(randomOrderNumber);
      clearCart();
      setOrderPlaced(true);
      setDemoProcessing(false);
    }, 1500);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (isLoading) {
    return (
      <div className="bg-soft-black min-h-screen p-8 flex flex-col items-center justify-center">
        <LineSpinner
          size="40"
          stroke="3"
          speed="1"
          color="#FF2E2E"
          className="mb-4"
        />
        <p className="text-off-white text-lg">Loading authentication status...</p>
      </div>
    );
  }

  // Show login redirect spinner
  if (isRedirectingToLogin) {
    return (
      <div className="bg-soft-black min-h-screen p-8 flex flex-col items-center justify-center">
        <LineSpinner
          size="40"
          stroke="3"
          speed="1"
          color="#FF2E2E"
          className="mb-4"
        />
        <p className="text-off-white text-lg">Logging you in...</p>
      </div>
    );
  }

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
    <div className="bg-soft-black min-h-screen pt-20 sm:pt-24 md:pt-28 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">
        <span className="bg-gradient-to-r from-red-600 via-white to-teal-300 bg-clip-text text-transparent">
          Checkout
        </span>
      </h1>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Shipping Information */}
        <div className="bg-element p-4 sm:p-6 rounded-lg border border-gray-800 shadow-md md:w-2/3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-off-white">Shipping Information</h2>
            <Link to="/cart" className="text-gray-400 hover:text-bright-red transition-colors duration-300 flex items-center justify-center sm:justify-start">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </Link>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="firstName" className="block text-gray-400 mb-1">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.firstName 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.firstName && (
                <p className="text-bright-red text-sm mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div className="md:col-span-1">
              <label htmlFor="lastName" className="block text-gray-400 mb-1">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.lastName 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.lastName && (
                <p className="text-bright-red text-sm mt-1">{formErrors.lastName}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-gray-400 mb-1">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.email 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.email && (
                <p className="text-bright-red text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-gray-400 mb-1">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.address 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.address && (
                <p className="text-bright-red text-sm mt-1">{formErrors.address}</p>
              )}
            </div>
            <div className="md:col-span-1">
              <label htmlFor="city" className="block text-gray-400 mb-1">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.city 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.city && (
                <p className="text-bright-red text-sm mt-1">{formErrors.city}</p>
              )}
            </div>
            <div className="md:col-span-1">
              <label htmlFor="state" className="block text-gray-400 mb-1">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.state 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.state && (
                <p className="text-bright-red text-sm mt-1">{formErrors.state}</p>
              )}
            </div>
            <div className="md:col-span-1">
              <label htmlFor="zip" className="block text-gray-400 mb-1">ZIP Code *</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.zip 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.zip && (
                <p className="text-bright-red text-sm mt-1">{formErrors.zip}</p>
              )}
            </div>
            <div className="md:col-span-1">
              <label htmlFor="country" className="block text-gray-400 mb-1">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full bg-gray-600 text-off-white p-4 md:p-3 rounded border focus:outline-none focus:ring-2 text-base min-h-[44px] ${
                  formErrors.country 
                    ? 'border-bright-red focus:ring-bright-red' 
                    : 'border-gray-500 focus:ring-bright-red'
                }`}
                required
              />
              {formErrors.country && (
                <p className="text-bright-red text-sm mt-1">{formErrors.country}</p>
              )}
            </div>
            </form>
        </div>
        {/* Order Summary */}
        <div className="bg-element p-4 sm:p-6 rounded-lg border border-gray-800 shadow-md md:w-1/3 order-first md:order-last">
          <h2 className="text-xl sm:text-2xl font-bold text-off-white mb-4">Order Summary</h2>
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
            <span className="text-bright-red text-2xl">${totalWithShipping}</span>
          </div>
          <div className="mt-16">
            <h3 className="text-xl font-bold text-off-white mb-4">Payment Information</h3>
            <div className="bg-gray-600 p-4 rounded-lg border border-gray-500">
              <CardElement options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#E5E5E5',
                    '::placeholder': { color: '#A0A0A0'},
                  },
                  invalid: { color: '#FF2E2E' },
                }
              }} />
            </div>
            {paymentError && <p className="text-bright-red mt-2">{paymentError}</p>}
          </div>
          <button
            onClick={handleRealPayment}
            disabled={realProcessing}
            className="bg-bright-red text-off-white px-6 py-4 md:px-4 md:py-3 rounded-full hover:bg-off-white hover:text-soft-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg w-full mt-6 focus:outline-none focus:ring-0 focus:border-none outline-none border-none min-h-[44px] text-base md:text-sm font-medium"
          >
            {realProcessing ? (
              <div className="flex items-center justify-center">
                <LineSpinner size="20" stroke="2" speed="1" color="#FFFFFF" className="mr-2" />
                <span>ㅤProcessing Payment...</span>
              </div>
            ) : (
              <span>Pay with Card</span>
            )}
          </button>
          <button
            onClick={handleDemoPayment}
            disabled={demoProcessing}
            className="bg-gray-700 text-off-white px-6 py-4 md:px-4 md:py-3 rounded-full hover:bg-gray-600 transition-all duration-300 active:scale-95 shadow-lg w-full mt-4 focus:outline-none focus:ring-0 focus:border-none outline-none border-none min-h-[44px] text-base md:text-sm font-medium"
          >
            {demoProcessing ? (
              <div className="flex items-center justify-center">
                <LineSpinner size="20" stroke="2" speed="1" color="#FFFFFF" className="mr-2" />
                <span>ㅤProcessing Demo...</span>
              </div>
            ) : (
              <span>Demo Payment (Test Mode)</span>
            )}
                </button>
            </div>
        </div>
    </div>
  );
};

export default Checkout; 