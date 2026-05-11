// seed.js — run with: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Category.deleteMany({});
  await Category.insertMany([
    { name: 'Home Appliances', icon: '🏠', order: 1 },
    { name: 'Solar',           icon: '☀️', order: 2 },
    { name: 'Lights',          icon: '💡', order: 3 },
  ]);
  console.log('✅ Categories seeded');
  process.exit();
});