const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ── updated generateToken with isAdmin ──
const generateToken = (id, isAdmin) => {
  return jwt.sign(
    { id, isAdmin },
    process.env.JWT_SECRET || 'brightflix_secret_key',
    { expiresIn: '30d' }
  );
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,          // 👈 send isAdmin to frontend
      token: generateToken(user._id, user.isAdmin),  // 👈 include in token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout — just a confirmation, real logout happens on client
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Get profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'brightflix_secret_key');
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
