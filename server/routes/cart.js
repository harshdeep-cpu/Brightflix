const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'brightflix_secret_key');
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get cart
router.get('/', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(user.cart);
});

// Add to cart
router.post('/add', protect, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = await User.findById(req.user._id);
  const existing = user.cart.find(c => c.product.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }
  await user.save();
  res.json({ message: 'Added to cart' });
});

// Remove from cart
router.delete('/:productId', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter(c => c.product.toString() !== req.params.productId);
  await user.save();
  res.json({ message: 'Removed from cart' });
});

module.exports = router;
