import React from 'react';

const Cart = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center bg-gray-800 p-4 mb-4 rounded-lg">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-gray-300">${item.price} x {item.quantity}</p>
              </div>
              <button className="ml-auto text-red-500">Remove</button>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
          <p className="text-gray-300 mb-4">Total: ${totalPrice}</p>
          <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 