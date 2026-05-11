const express  = require('express');
const router   = express.Router();
const Category = require('../models/categories');
const jwt      = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  try {
    const token   = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'brightflix_secret_key');
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Admin only' });
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET all categories (with subcategories)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add category
router.post('/', isAdmin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// ── Subcategory routes ──

// POST add subcategory
router.post('/:id/subcategories', isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.subcategories.push(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update subcategory
router.put('/:id/subcategories/:subId', isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const sub      = category.subcategories.id(req.params.subId);
    sub.name  = req.body.name  || sub.name;
    sub.icon  = req.body.icon  || sub.icon;
    sub.order = req.body.order ?? sub.order;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE subcategory
router.delete('/:id/subcategories/:subId', isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.subcategories.pull(req.params.subId);
    await category.save();
    res.json({ message: 'Subcategory deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update category

router.put('/:id', isAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE category
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;