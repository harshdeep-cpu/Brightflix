import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';

const heroSlides = [
  {
    title: 'Smart Living',
    highlight: 'Starts Here',
    subtitle: 'Premium Home Appliances for Modern India.',
    image: 'living-room',
    tag: '4K Ultra HD'
  },
  {
    title: 'Stay Cool',
    highlight: 'This Summer',
    subtitle: 'Energy-efficient ACs & Coolers at unbeatable prices.',
    image: 'ac',
    tag: '5-Star Rated'
  },
  {
    title: 'Fresh Food,',
    highlight: 'Every Day',
    subtitle: 'Smart refrigerators that keep your food fresher longer.',
    image: 'refrigerator',
    tag: 'Frost Free'
  },
];

const categories = [
  { name: 'Television', icon: '📺', count: '120+ Products' },
  { name: 'Air Conditioner', icon: '❄️', count: '85+ Products' },
  { name: 'Refrigerator', icon: '🧊', count: '60+ Products' },
  { name: 'Washing Machine', icon: '🫧', count: '45+ Products' },
  { name: 'Air Cooler', icon: '💨', count: '70+ Products' },
  { name: 'Kitchen', icon: '🍳', count: '200+ Products' },
  { name: 'Home Care', icon: '🏠', count: '90+ Products' },
  { name: 'Air Purifier', icon: '🌿', count: '35+ Products' },
];

const features = [
  { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: '🔄', title: 'Easy Returns', desc: '10-day return policy' },
  { icon: '🛡️', title: 'Warranty', desc: '1-5 years on all appliances' },
  { icon: '💳', title: 'EMI Available', desc: '0% EMI on 6-24 months' },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const slideRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products?featured=true&limit=8');
      const data = await res.json();
      setProducts(data.products || getMockProducts());
    } catch {
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero-section">
        {/* TOP-LEFT orange sun blob — exact match to theme */}
        <svg className="hero-blob-tl" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="blobGradTL" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF8C00" stopOpacity="1"/>
              <stop offset="45%" stopColor="#FFA500" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5"/>
            </radialGradient>
          </defs>
          <path d="M60,0 C160,-20 320,10 400,80 C480,150 520,280 480,380 C440,480 300,540 180,500 C60,460 -40,340 -20,200 C0,60 -40,20 60,0Z" fill="url(#blobGradTL)"/>
        </svg>

        {/* BOTTOM-RIGHT orange sun blob */}
        <svg className="hero-blob-br" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="blobGradBR" cx="70%" cy="70%" r="70%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="1"/>
              <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.4"/>
            </radialGradient>
          </defs>
          <path d="M440,500 C340,520 180,490 100,420 C20,350 -20,220 20,120 C60,20 200,-40 320,0 C440,40 540,160 520,300 C500,440 540,480 440,500Z" fill="url(#blobGradBR)"/>
        </svg>

        {/* LEFT dot grid pattern */}
        <svg className="hero-dots-left" viewBox="0 0 220 400" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 20 }).map((_, row) =>
            Array.from({ length: 11 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="#F47F1F" opacity="0.45"/>
            ))
          )}
        </svg>

        {/* RIGHT dot grid pattern */}
        <svg className="hero-dots-right" viewBox="0 0 220 400" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 20 }).map((_, row) =>
            Array.from({ length: 11 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="#F47F1F" opacity="0.45"/>
            ))
          )}
        </svg>

        <div className="container hero-content">
          <div className="hero-text" key={activeSlide}>
            <span className="hero-badge">✨ Best Deals This Week</span>
            <h1 className="hero-title">
              {heroSlides[activeSlide].title}{' '}
              <span className="hero-highlight">{heroSlides[activeSlide].highlight}</span>
            </h1>
            <p className="hero-subtitle">{heroSlides[activeSlide].subtitle}</p>
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">Shop Now</Link>
              <Link to="/products" className="btn-outline">Explore Products</Link>
            </div>
          </div>

          {/* Product Slider Images */}
          <div className="hero-slider" ref={slideRef}>
            <button className="slider-arrow left" onClick={() => setActiveSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)}>
              ‹
            </button>

            <div className="slider-track">
              {getSliderImages().map((img, i) => (
                <div key={i} className={`slider-card ${i === 1 ? 'main' : ''}`}>
                  <div className="slider-img-placeholder">
                    {img.emoji}
                  </div>
                  {img.tag && <div className="product-tag">{img.tag}</div>}
                </div>
              ))}
            </div>

            <button className="slider-arrow right" onClick={() => setActiveSlide(s => (s + 1) % heroSlides.length)}>
              ›
            </button>

            {/* Dots */}
            <div className="slider-dots">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="features-bar">
        <div className="container features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-item">
              <span className="feature-icon">{f.icon}</span>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by <span>Category</span></h2>
            <p className="section-subtitle">Browse our wide range of home appliances</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link key={i} to={`/products?category=${cat.name}`} className="category-card">
                <div className="cat-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured <span>Products</span></h2>
              <p className="section-subtitle">Handpicked deals you'll love</p>
            </div>
            <Link to="/products" className="view-all-btn">View All →</Link>
          </div>

          {loading ? (
            <div className="products-skeleton">
              {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p, i) => (
                <ProductCard key={p._id || i} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="offer-banner">
        <div className="container">
          <div className="banner-inner">
            <div className="banner-left dot-pattern" />
            <div className="banner-content">
              <span className="banner-tag">🔥 Limited Time Offer</span>
              <h2>Up to <span>40% OFF</span> on Premium Appliances</h2>
              <p>This weekend only — Don't miss out on the biggest sale of the season!</p>
              <Link to="/products" className="btn-primary">Grab the Deal</Link>
            </div>
            <div className="banner-right-img">
              <div className="banner-appliances">
                <span>🛒</span>
                <span>📺</span>
                <span>❄️</span>
                <span>🫧</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
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
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const getMockProducts = () => [
  { _id: '1', name: '4K Ultra HD Smart TV 55"', price: 45999, originalPrice: 65000, badge: 'Best Seller', rating: 4.8, reviews: 2341, category: 'Television' },
  { _id: '2', name: 'Inverter Split AC 1.5 Ton', price: 38999, originalPrice: 52000, badge: 'Hot', rating: 4.7, reviews: 1823, category: 'Air Conditioner' },
  { _id: '3', name: 'French Door Refrigerator 500L', price: 72999, originalPrice: 95000, badge: 'New', rating: 4.6, reviews: 987, category: 'Refrigerator' },
  { _id: '4', name: 'Front Load Washing Machine 8kg', price: 34999, originalPrice: 48000, rating: 4.5, reviews: 1456, category: 'Washing Machine' },
  { _id: '5', name: 'Tower Air Cooler 50L', price: 12999, originalPrice: 18000, badge: 'Hot', rating: 4.4, reviews: 3210, category: 'Air Cooler' },
  { _id: '6', name: 'Microwave Oven 28L Convection', price: 14999, originalPrice: 22000, rating: 4.3, reviews: 765, category: 'Kitchen' },
  { _id: '7', name: 'Robot Vacuum Cleaner', price: 24999, originalPrice: 35000, badge: 'New', rating: 4.6, reviews: 543, category: 'Home Care' },
  { _id: '8', name: 'Air Purifier HEPA 13', price: 18999, originalPrice: 26000, rating: 4.7, reviews: 1234, category: 'Air Purifier' },
];

const getSliderImages = () => [
  { emoji: '💡', tag: null },
  { emoji: '📺❄️', tag: '4K Ultra HD' },
  { emoji: '🧊🫧', tag: null },
];

const testimonials = [
  { name: 'Priya Sharma', location: 'Delhi, India', rating: 5, text: 'Absolutely love my new 4K TV from BrightFlix! Super fast delivery and excellent after-sales support.' },
  { name: 'Rahul Verma', location: 'Mumbai, India', rating: 5, text: 'Got an AC just before summer — best decision ever. BrightFlix had the best price and delivery was in 2 days!' },
  { name: 'Sunita Patel', location: 'Ahmedabad, India', rating: 4, text: 'Great quality appliances at honest prices. The EMI option made it so easy to upgrade our kitchen.' },
];

export default Home;

