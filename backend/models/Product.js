const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  album: { type: String, default: '' }, // Album or collection name
  details: {
    fabric: { type: String, default: '' }, // For apparel
    fit: { type: String, default: '' }, // For apparel
    care: { type: String, default: '' }, // For apparel
    format: { type: String, default: '' }, // For music
    releaseYear: { type: Number, default: 0 }, // For music
    tracks: { type: Number, default: 0 } // For music
  }
});

module.exports = mongoose.model('Product', productSchema);