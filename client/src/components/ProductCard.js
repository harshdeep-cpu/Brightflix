import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import './ProductCard.css';

const categoryEmojis = {
  'Television': '📺',
  'Air Conditioner': '❄️',
  'Refrigerator': '🧊',
  'Washing Machine': '🫧',
  'Air Cooler': '💨',
  'Kitchen': '🍳',
  'Home Care': '🏠',
  'Air Purifier': '🌿',
};

const ProductCard = ({ product }) => {
  const { setCartCount } = useContext(CartContext);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    setCartCount(c => c + 1);
    // Show toast-like feedback
    const btn = e.currentTarget;
    btn.textContent = '✓ Added!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.style.background = '';
    }, 1500);
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      {/* Badge */}
      {product.badge && (
        <div className={`product-badge ${product.badge === 'Best Seller' ? 'badge-orange' : product.badge === 'New' ? 'badge-blue' : 'badge-red'}`}>
          {product.badge}
        </div>
      )}
      {discount && (
        <div className="discount-tag">-{discount}%</div>
      )}

      {/* Product Image */}
      <div className="product-img-wrap">
        <div className="product-emoji">
          {categoryEmojis[product.category] || '📦'}
        </div>
        <div className="product-hover-overlay">
          <button className="wishlist-btn" onClick={e => e.preventDefault()}>♡</button>
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars-filled">{'★'.repeat(Math.floor(product.rating || 4))}</span>
          <span className="rating-num">{product.rating}</span>
          <span className="rating-count">({(product.reviews || 0).toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="product-price-row">
          <span className="price-current">₹{product.price?.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
          )}
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
