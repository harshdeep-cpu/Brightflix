const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  badge: { type: String }, // e.g., "Best Seller", "New", "Hot"
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
