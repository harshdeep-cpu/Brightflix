import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AuthContext, CartContext } from '../App';
import LightsIntro from '../components/LightsIntro';
import HomeAppliancesIntro from '../components/HomeAppliancesIntro';
import SolarIntro from '../components/SolarIntro';
import './Products.css';


const Products = () => {
  const [searchParams]              = useSearchParams();
  const { user }                    = useContext(AuthContext);
  const { setCartCount }            = useContext(CartContext);

  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  const [selectedCategory, setSelectedCategory]   = useState(searchParams.get('category') || 'All');
  const [selectedSub, setSelectedSub]             = useState('All');
  const [subOptions, setSubOptions]               = useState([]);
  const [sortBy, setSortBy]                       = useState('default');
  const [priceRange, setPriceRange]               = useState([0, 200000]);
  const [search, setSearch]                       = useState('');
  const [showLightsIntro, setShowLightsIntro] = useState(
  searchParams.get('category') === 'Lights');
  const [showHomeIntro, setShowHomeIntro] = useState(
  searchParams.get('category') === 'Home Appliances');
  const [showSolarIntro, setShowSolarIntro] = useState(
  searchParams.get('category') === 'Solar');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Update subcategory options when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setSubOptions([]);
      setSelectedSub('All');
    } else {
      const cat = categories.find(c => c.name === selectedCategory);
      setSubOptions(cat?.subcategories || []);
      setSelectedSub('All');
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
  if (searchParams.get('category') === 'Lights') {
    setShowLightsIntro(true);
  }
}, [searchParams]);

  const fetchCategories = async () => {
    try {
      const res  = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res  = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data.products || data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart function passed to ProductCard
  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setCartCount(data.items?.length || 0);
      return true;
    } catch (err) {
      console.error('Add to cart failed:', err);
      return false;
    }
  };

  const filtered = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => selectedSub === 'All' || p.subcategory === selectedSub)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating')     return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

    if (showLightsIntro) {
  return <LightsIntro onComplete={() => setShowLightsIntro(false)} />;}
if (showHomeIntro)    return <HomeAppliancesIntro onComplete={() => setShowHomeIntro(false)} />;
if (showSolarIntro)   return <SolarIntro onComplete={() => setShowSolarIntro(false)} />;

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="container">
          <h1>Our <span>Products</span></h1>
          <p>Browse {products.length}+ premium products</p>
        </div>
      </div>

      <div className="container products-layout">

        {/* ── Sidebar ── */}
        <aside className="products-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul className="category-list">

              {/* All */}
              <li>
                <button
                  className={`cat-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory('All'); setSelectedSub('All'); }}
                >
                  All
                  <span className="cat-count">{products.length}</span>
                </button>
              </li>

              {/* DB categories */}
              {categories.map(cat => (
                <li key={cat._id}>
                  <button
                    className={`cat-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                    onClick={() => { if (cat.name === 'Lights')           setShowLightsIntro(true); 
                      if (cat.name === 'Home Appliances')  setShowHomeIntro(true); 
                      if (cat.name === 'Solar')            setShowSolarIntro(true); 
                      setSelectedCategory(cat.name);}}>
                    <span>{cat.icon}</span> {cat.name}
                    <span className="cat-count">
                      {products.filter(p => p.category === cat.name).length}
                    </span>
                  </button>

                  {/* Subcategories — show when this category is selected */}
                  {selectedCategory === cat.name && cat.subcategories?.length > 0 && (
                    <ul className="sub-category-list">
                      <li>
                        <button
                          className={`sub-cat-btn ${selectedSub === 'All' ? 'active' : ''}`}
                          onClick={() => setSelectedSub('All')}
                        >
                          All {cat.name}
                        </button>
                      </li>
                      {cat.subcategories.map(sub => (
                        <li key={sub._id}>
                          <button
                            className={`sub-cat-btn ${selectedSub === sub.name ? 'active' : ''}`}
                            onClick={() => setSelectedSub(sub.name)}
                          >
                            {sub.icon} {sub.name}
                            <span className="cat-count">
                              {products.filter(p => p.category === cat.name && p.subcategory === sub.name).length}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Price Range</h3>
            <input
              type="range" min="0" max="200000" step="1000"
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

        {/* ── Main ── */}
        <div className="products-main">
          <div className="products-toolbar">
            <div className="products-search">
              <input
                type="text" placeholder="Search products..."
                value={search} onChange={e => setSearch(e.target.value)}
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

          {loading ? (
            <div className="products-grid-page">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <span>🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or price range</p>
            </div>
          ) : (
            <div className="products-grid-page">
              {filtered.map(p => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onAddToCart={handleAddToCart}  // 👈 pass cart function
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;