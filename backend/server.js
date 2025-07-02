const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: 'Backend is running!', products: products });
  } catch (err) {
    res.json({ message: 'Backend is running!', error: err.message });
  }
});

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Image upload endpoint
app.post('/api/upload-image', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'merch_store'
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong with the upload' });
  }
});

app.get('/seed', async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    const products = [
      { 
        name: 'Hurry Up Tomorrow Tee', 
        description: 'Black cotton tee with logo from Hurry Up Tomorrow', 
        price: 25, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751479344/Hurry_Up_Tommorow_-_T-Shirt_stidqf.webp', 
        category: 'apparel',
        album: 'Hurry Up Tomorrow',
        details: {
          fabric: '100% Cotton',
          fit: 'Regular Fit',
          care: 'Machine wash cold, tumble dry low'
        }
      },
      { 
        name: 'Hurry Up Tomorrow Vinyl Record', 
        description: 'Limited edition vinyl of Hurry Up Tomorrow album', 
        price: 30, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751478032/f3yksbepitviuodhjfu2.webp', 
        category: 'music',
        album: 'Hurry Up Tomorrow',
        details: {
          format: '12-inch Vinyl LP',
          releaseYear: 2024,
          tracks: 12
        }
      },
      { 
        name: 'Hurry Up Tomorrow Hoodie', 
        description: 'Comfortable black hoodie from Hurry Up Tomorrow collection', 
        price: 45, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751479343/Hurry_Up_Tommorow_-_Hoddie_ijzwae.webp', 
        category: 'apparel',
        album: 'Hurry Up Tomorrow',
        details: {
          fabric: '80% Cotton, 20% Polyester',
          fit: 'Oversized Fit',
          care: 'Machine wash cold, tumble dry low'
        }
      },
      { 
        name: 'Hurry Up Tomorrow Cassette Disk', 
        description: 'Cassette disk of the Hurry Up Tomorrow album', 
        price: 15, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751478031/swpvpl3ywauqxdojmsag.webp', 
        category: 'music',
        album: 'Hurry Up Tomorrow',
        details: {
          format: 'Cassette Disk',
          releaseYear: 2024,
          tracks: 12
        }
      },
      { 
        name: 'After Hours Tee', 
        description: 'Red and black tee from After Hours album', 
        price: 28, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751483860/After_Hours_-_T-Shirt_vdlh6p.jpg', 
        category: 'apparel',
        album: 'After Hours',
        details: {
          fabric: '100% Cotton',
          fit: 'Slim Fit',
          care: 'Machine wash cold, tumble dry low'
        }
      },
      { 
        name: 'After Hours Vinyl Record', 
        description: 'Limited edition vinyl of After Hours album', 
        price: 35, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751483864/After_Hours_-_Vinyl_lsd8ve.webp', 
        category: 'music',
        album: 'After Hours',
        details: {
          format: '12-inch Vinyl LP',
          releaseYear: 2020,
          tracks: 14
        }
      },
      { 
        name: 'After Hours Hoodie', 
        description: 'Comfortable black hoodie from After Hours collection', 
        price: 45, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751483859/After_Hours_-_Hoddie_uko4kh.jpg', 
        category: 'apparel',
        album: 'After Hours',
        details: {
          fabric: '80% Cotton, 20% Polyester',
          fit: 'Oversized Fit',
          care: 'Machine wash cold, tumble dry low'
        }
      },
      { 
        name: 'After Hours Cassette Disk', 
        description: 'Cassette disk of the After Hours album', 
        price: 15, 
        imageUrl: 'https://res.cloudinary.com/deqe0oqer/image/upload/v1751483860/After_Hours_-_Cassette_Disk_jn9ubc.webp', 
        category: 'music',
        album: 'After Hours',
        details: {
          format: 'Cassette Disk',
          releaseYear: 2020,
          tracks: 14
        }
      }
    ];
    
    const result = await Product.insertMany(products);
    res.json({ message: 'Products seeded successfully', count: result.length });
  } catch (err) {
    console.error('Seeding error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
