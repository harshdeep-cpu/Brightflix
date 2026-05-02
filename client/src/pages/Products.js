import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Products.css';

const categories = ['All', 'Television', 'Air Conditioner', 'Refrigerator', 'Washing Machine', 'Air Cooler', 'Kitchen', 'Home Care', 'Air Purifier'];

const mockProducts = [
  { _id: '1', name: '4K Ultra HD Smart TV 55"', price: 45999, originalPrice: 65000, badge: 'Best Seller', rating: 4.8, reviews: 2341, category: 'Television' },
  { _id: '2', name: 'Inverter Split AC 1.5 Ton', price: 38999, originalPrice: 52000, badge: 'Hot', rating: 4.7, reviews: 1823, category: 'Air Conditioner' },
  { _id: '3', name: 'French Door Refrigerator 500L', price: 72999, originalPrice: 95000, badge: 'New', rating: 4.6, reviews: 987, category: 'Refrigerator' },
  { _id: '4', name: 'Front Load Washing Machine 8kg', price: 34999, originalPrice: 48000, rating: 4.5, reviews: 1456, category: 'Washing Machine' },
  { _id: '5', name: 'Tower Air Cooler 50L', price: 12999, originalPrice: 18000, badge: 'Hot', rating: 4.4, reviews: 3210, category: 'Air Cooler' },
  { _id: '6', name: 'Microwave Oven 28L Convection', price: 14999, originalPrice: 22000, rating: 4.3, reviews: 765, category: 'Kitchen' },
  { _id: '7', name: 'Robot Vacuum Cleaner', price: 24999, originalPrice: 35000, badge: 'New', rating: 4.6, reviews: 543, category: 'Home Care' },
  { _id: '8', name: 'Air Purifier HEPA 13', price: 18999, originalPrice: 26000, rating: 4.7, reviews: 1234, category: 'Air Purifier' },
  { _id: '9', name: 'Smart TV 43" FHD', price: 28999, originalPrice: 42000, rating: 4.5, reviews: 1876, category: 'Television' },
  { _id: '10', name: 'Window AC 1 Ton 5 Star', price: 29999, originalPrice: 38000, rating: 4.4, reviews: 932, category: 'Air Conditioner' },
  { _id: '11', name: 'Side-by-Side Refrigerator 700L', price: 95000, originalPrice: 130000, badge: 'New', rating: 4.7, reviews: 432, category: 'Refrigerator' },
  { _id: '12', name: 'Semi-Auto Washing Machine 7.5kg', price: 14999, originalPrice: 22000, rating: 4.2, reviews: 2100, category: 'Washing Machine' },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [search, setSearch] = useState('');

  const filtered = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="container">
          <h1>Our <span>Products</span></h1>
          <p>Browse {products.length}+ premium home appliances</p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Sidebar */}
        <aside className="products-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                    <span className="cat-count">
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Price Range</h3>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={priceRange[1]}
              onChange={e => setPriceRange([0, parseInt(e.target.value)])}
              className="price-slider"
            />
            <div className="price-labels">
              <span>₹0</span>
              <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="products-main">
          <div className="products-toolbar">
            <div className="products-search">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <span className="result-count">{filtered.length} products</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <span>🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="products-grid-page">
              {filtered.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
