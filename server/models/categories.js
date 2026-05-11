const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name:  { type: String, required: true },
  icon:  { type: String, default: '📦' },
  order: { type: Number, default: 0 },
});

const categorySchema = new mongoose.Schema({
  name:          { type: String, required: true, unique: true },
  icon:          { type: String, default: '📦' },
  order:         { type: Number, default: 0 },
  subcategories: [subcategorySchema],   // 👈 embedded subcategories
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);