import React from 'react';

const Cart = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Shipping Details</h2>
            <form>
                <input type="text" placeholder="Full Name" className="w-full p-2 mb-4 bg-gray-700 text-white rounded" />
                <input type="text" placeholder="Address" className="w-full p-2 mb-4 bg-gray-700 text-white rounded" />
                {/* Add more fields as needed */}
            </form>
            <h2 className="text-2xl font-bold text-white mb-4">Payment Details</h2>
            {/* Payment integration goes here */}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
                <p className="text-gray-300 mb-4">Total: ${totalPrice}</p>
                <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors">
                    Place Order
                </button>
            </div>
        </div>
    </div>
  );
};

export default Cart; 