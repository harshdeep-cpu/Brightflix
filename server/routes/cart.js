const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const jwt     = require('jsonwebtoken');

// ── Auth middleware ──
const protect = (req, res, next) => {
  try {
    const token   = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'brightflix_secret_key');
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET cart
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.product');
    res.json({ items: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add to cart
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.userId);

    const existing = user.cart.find(i => i.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    const updated = await User.findById(req.userId).populate('cart.product');
    res.json({ items: updated.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update quantity
router.put('/update', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.userId);

    const item = user.cart.find(i => i.product.toString() === productId);
    if (item) item.quantity = quantity;
    await user.save();

    const updated = await User.findById(req.userId).populate('cart.product');
    res.json({ items: updated.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE remove item
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart   = user.cart.filter(i => i.product.toString() !== req.params.productId);
    await user.save();
    const updated = await User.findById(req.userId).populate('cart.product');
    res.json({ items: updated.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE clear cart
router.delete('/clear', protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart   = [];
    await user.save();
    res.json({ items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;