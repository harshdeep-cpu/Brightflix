import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const heroSlides = [
  { title: 'Smart Living',  highlight: 'Starts Here',   subtitle: 'Premium Home Appliances for Modern India.',              tag: '4K Ultra HD' },
  { title: 'Stay Cool',     highlight: 'This Summer',   subtitle: 'Energy-efficient ACs & Coolers at unbeatable prices.',  tag: '5-Star Rated' },
  { title: 'Fresh Food,',   highlight: 'Every Day',     subtitle: 'Smart refrigerators that keep your food fresher longer.', tag: 'Frost Free' },
];

const features = [
  { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹999'       },
  { icon: '🔄', title: 'Easy Returns',  desc: '10-day return policy'        },
  { icon: '🛡️', title: 'Warranty',      desc: '1-5 years on all appliances' },
  { icon: '💳', title: 'EMI Available', desc: '0% EMI on 6-24 months'       },
];

const testimonials = [
  { name: 'Priya Sharma', location: 'Delhi, India',     rating: 5, text: 'Absolutely love my new 4K TV from BrightFlix! Super fast delivery and excellent after-sales support.' },
  { name: 'Rahul Verma',  location: 'Mumbai, India',    rating: 5, text: 'Got an AC just before summer — best decision ever. BrightFlix had the best price and delivery was in 2 days!' },
  { name: 'Sunita Patel', location: 'Ahmedabad, India', rating: 4, text: 'Great quality appliances at honest prices. The EMI option made it so easy to upgrade our kitchen.' },
];

const getMockProducts = () => [
  { _id: '1', name: '4K Ultra HD Smart TV 55"',       price: 45999, originalPrice: 65000, badge: 'Best Seller', rating: 4.8, reviews: 2341, category: 'Home Appliances' },
  { _id: '2', name: 'Inverter Split AC 1.5 Ton',      price: 38999, originalPrice: 52000, badge: 'Hot',         rating: 4.7, reviews: 1823, category: 'Home Appliances' },
  { _id: '3', name: 'Solar Water Heater 200L',        price: 72999, originalPrice: 95000, badge: 'New',         rating: 4.6, reviews: 987,  category: 'Solar'          },
  { _id: '4', name: 'LED Strip Lights 5m',            price: 1999,  originalPrice: 3500,                        rating: 4.5, reviews: 1456, category: 'Lights'         },
];

const getSliderImages = () => [
  { emoji: '💡',    tag: null          },
  { emoji: '📺❄️', tag: '4K Ultra HD' },
  { emoji: '☀️💡', tag: null          },
];

/* ─────────────────────────────────────────────────────── */

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const slideRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [products, setProducts]       = useState([]);
  const [categories, setCategories]   = useState([]);      // ✅ useState for categories
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCats, setLoadingCats]         = useState(true);

  // ── Define ALL fetch functions BEFORE useEffect ──

  const fetchCategories = async () => {                    // ✅ proper async function
    try {
      setLoadingCats(true);
      const res  = await fetch('http://localhost:5000/api/categories');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      // fallback
      setCategories([
        { _id: '1', name: 'Home Appliances', icon: '🏠', subcategories: [] },
        { _id: '2', name: 'Solar',           icon: '☀️', subcategories: [] },
        { _id: '3', name: 'Lights',          icon: '💡', subcategories: [] },
      ]);
    } finally {
      setLoadingCats(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res  = await fetch('http://localhost:5000/api/products?featured=true&limit=8');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setProducts(data.products || data);
    } catch {
      setProducts(getMockProducts());
    } finally {
      setLoadingProducts(false);
    }
  };

  // ✅ useEffect calls both fetch functions
  useEffect(() => {
    fetchCategories();
    fetchProducts();
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-left dot-pattern" />
        <div className="hero-bg-right" />
        <div className="container hero-content">
          <div className="hero-text" key={activeSlide}>
            <span className="hero-badge">✨ Best Deals This Week</span>
            <h1 className="hero-title">
              {heroSlides[activeSlide].title}{' '}
              <span className="hero-highlight">{heroSlides[activeSlide].highlight}</span>
            </h1>
            <p className="hero-subtitle">{heroSlides[activeSlide].subtitle}</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => user ? navigate('/products') : navigate('/login')}>
                Shop Now
              </button>
              <button className="btn-outline" onClick={() => user ? navigate('/products') : navigate('/login')}>
                Explore Products
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="hero-slider" ref={slideRef}>
            <button className="slider-arrow left" onClick={() => setActiveSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)}>‹</button>
            <div className="slider-track">
              {getSliderImages().map((img, i) => (
                <div key={i} className={`slider-card ${i === 1 ? 'main' : ''}`}>
                  <div className="slider-img-placeholder">{img.emoji}</div>
                  {img.tag && <div className="product-tag">{img.tag}</div>}
                </div>
              ))}
            </div>
            <button className="slider-arrow right" onClick={() => setActiveSlide(s => (s + 1) % heroSlides.length)}>›</button>
            <div className="slider-dots">
              {heroSlides.map((_, i) => (
                <button key={i} className={`dot ${i === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <section className="features-bar">
        <div className="container features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-item">
              <span className="feature-icon">{f.icon}</span>
              <div><h4>{f.title}</h4><p>{f.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOGIN PROMPT BANNER ── */}
      {!user && (
        <div className="login-prompt-banner">
          <div className="login-prompt-inner">
            <div className="login-prompt-text">
              <span>🔒</span>
              <div>
                <h3>Unlock the Full BrightFlix Experience</h3>
                <p>Login to browse all products, add to cart &amp; place orders</p>
              </div>
            </div>
            <Link to="/login" className="login-prompt-btn">Login Now →</Link>
          </div>
        </div>
      )}

      {/* ── CATEGORIES — fetched from DB ── */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by <span>Category</span></h2>
            <p className="section-subtitle">Browse our wide range of products</p>
          </div>

          {loadingCats ? (
            // ✅ skeleton while loading
            <div className="categories-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="category-card skeleton-card" style={{ height: 140 }} />
              ))}
            </div>
          ) : (
            <div className="categories-grid">
              {categories.map(cat => (
                <div
                  key={cat._id}
                  className="category-card"
                  onClick={() => user ? navigate(`/products?category=${cat.name}`) : navigate('/login')}
                >
                  <div className="cat-icon">{cat.icon}</div>
                  <h3>{cat.name}</h3>
                  {/* subcategory tags */}
                  {cat.subcategories?.length > 0 && (
                    <div className="cat-subs">
                      {cat.subcategories.slice(0, 3).map(sub => (
                        <span key={sub._id} className="cat-sub-tag">{sub.name}</span>
                      ))}
                      {cat.subcategories.length > 3 && (
                        <span className="cat-sub-tag">+{cat.subcategories.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS — fetched from DB ── */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured <span>Products</span></h2>
              <p className="section-subtitle">Handpicked deals you'll love</p>
            </div>
            {user && <Link to="/products" className="view-all-btn">View All →</Link>}
          </div>

          <div className={`products-wrapper ${!user ? 'locked' : ''}`}>
            {loadingProducts ? (
              <div className="products-skeleton">
                {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}
              </div>
            ) : products.length === 0 ? (
              // ✅ empty state
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-mid)' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>📦</div>
                <p>No featured products yet. Admin can mark products as featured.</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((p, i) => (
                  <ProductCard key={p._id || i} product={p} />
                ))}
              </div>
            )}

            {!user && (
              <div className="locked-overlay">
                <span>🔒</span>
                <h3>Login to see featured products</h3>
                <p>Join thousands of smart shoppers on BrightFlix</p>
                <Link to="/login" className="login-prompt-btn">Get Started →</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── OFFER BANNER ── */}
      <section className="offer-banner">
        <div className="container">
          <div className="banner-inner">
            <div className="banner-left dot-pattern" />
            <div className="banner-content">
              <span className="banner-tag">🔥 Limited Time Offer</span>
              <h2>Up to <span>40% OFF</span> on Premium Appliances</h2>
              <p>This weekend only — Don't miss out on the biggest sale of the season!</p>
              <button className="btn-primary" onClick={() => user ? navigate('/products') : navigate('/login')}>
                Grab the Deal
              </button>
            </div>
            <div className="banner-right-img">
              <div className="banner-appliances">
                <span>🛒</span><span>📺</span><span>❄️</span><span>☀️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>What Our <span>Customers</span> Say</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Trusted by 10 Lakh+ happy households across India</p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">{'★'.repeat(t.rating)}</div>
                <p>"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.name[0]}</div>
                  <div><strong>{t.name}</strong><span>{t.location}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;