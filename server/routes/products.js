const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, search, featured, limit = 20, page = 1 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured) query.featured = true;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);
    res.json({ products, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create product (admin)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Seed sample products
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const sampleProducts = [
      { name: '4K Ultra HD Smart TV 55"', category: 'Television', price: 45999, originalPrice: 65000, badge: 'Best Seller', featured: true, rating: 4.8, reviews: 2341, description: 'Experience stunning 4K visuals with Dolby Vision and HDR10+' },
      { name: 'Inverter Split AC 1.5 Ton', category: 'Air Conditioner', price: 38999, originalPrice: 52000, badge: 'Hot', featured: true, rating: 4.7, reviews: 1823, description: '5-star energy rating with Wi-Fi control and PM 2.5 filter' },
      { name: 'French Door Refrigerator 500L', category: 'Refrigerator', price: 72999, originalPrice: 95000, badge: 'New', featured: true, rating: 4.6, reviews: 987, description: 'Frost-free with inverter technology and smart cooling' },
      { name: 'Front Load Washing Machine 8kg', category: 'Washing Machine', price: 34999, originalPrice: 48000, featured: true, rating: 4.5, reviews: 1456, description: 'AI-powered wash with steam clean and hygiene+ mode' },
      { name: 'Tower Air Cooler 50L', category: 'Air Cooler', price: 12999, originalPrice: 18000, badge: 'Hot', featured: false, rating: 4.4, reviews: 3210, description: 'Honeycomb cooling pads with 4-way air deflection' },
      { name: 'Microwave Oven 28L Convection', category: 'Kitchen', price: 14999, originalPrice: 22000, featured: false, rating: 4.3, reviews: 765, description: 'Grill + convection with 200+ auto-cook menus' },
      { name: 'Robot Vacuum Cleaner', category: 'Home Care', price: 24999, originalPrice: 35000, badge: 'New', featured: false, rating: 4.6, reviews: 543, description: 'LiDAR navigation with 3000Pa suction and auto-empty base' },
      { name: 'Air Purifier HEPA 13', category: 'Air Purifier', price: 18999, originalPrice: 26000, featured: false, rating: 4.7, reviews: 1234, description: 'True HEPA with activated carbon — removes 99.97% pollutants' },
    ];
    const products = await Product.insertMany(sampleProducts);
    res.json({ message: 'Seeded!', count: products.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
