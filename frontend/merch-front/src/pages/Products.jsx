import { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">All Merch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transition-transform">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
            <p className="text-gray-300 mb-4">${product.price}</p>
            <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;