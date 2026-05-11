const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// ── Admin middleware ──
const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'brightflix_secret_key');
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Admin access only' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET all products (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit, search } = req.query;
    let query = {};
    if (category)        query.category = category;
    if (featured)        query.featured = true;
    if (search)          query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query)
      .limit(limit ? parseInt(limit) : 0)
      .sort({ createdAt: -1 });

    res.json({ products, total: products.length });
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

// POST add product (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update product (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE product (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
