const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

app.get('/seed', async (req, res) => {
    const products = [
      { name: 'Artist Tee', description: 'Black cotton tee with logo', price: 25, imageUrl: 'https://example.com/tee.jpg' },
      { name: 'Vinyl Record', description: 'Limited edition vinyl', price: 30, imageUrl: 'https://example.com/vinyl.jpg' },
    ];
    await Product.insertMany(products);
    res.send('Products added');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
