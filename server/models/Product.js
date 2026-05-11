const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },
  category:      { type: String, required: true },
  subcategory:   { type: String },              // 👈 add this
  description:   { type: String },
  image:         { type: String },
  images:        [{ type: String }],
  video:         { type: String },
  badge:         { type: String },
  rating:        { type: Number, default: 0 },
  reviews:       { type: Number, default: 0 },
  stock:         { type: Number, default: 0 },
  featured:      { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
