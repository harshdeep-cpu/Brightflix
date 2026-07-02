const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const jwt     = require('jsonwebtoken');

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

// Upload multiple images (max 6)
router.post('/images', isAdmin, upload.array('images', 6), (req, res) => {
  try {
    const urls = req.files.map(f => `https://brightflix.onrender.com/uploads/images/${f.filename}`);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload single video
router.post('/video', isAdmin, upload.single('video'), (req, res) => {
  try {
    const url = `https://brightflix.onrender.com/uploads/videos/${req.file.filename}`;
    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;