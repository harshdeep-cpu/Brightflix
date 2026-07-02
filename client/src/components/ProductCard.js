import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import './ProductCard.css';

const categoryEmojis = {
  'Television': '📺', 'Air Conditioner': '❄️', 'Refrigerator': '🧊',
  'Washing Machine': '🫧', 'Air Cooler': '💨', 'Kitchen': '🍳',
  'Home Care': '🏠', 'Air Purifier': '🌿', 'Solar': '☀️', 'Lights': '💡',
};

const ProductCard = ({ product, onAddToCart }) => {
  const { setCartCount } = useContext(CartContext);
  const { user }         = useContext(AuthContext);
  const [adding, setAdding] = useState(false);
  const [added, setAdded]   = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = async (e) => {
    e.preventDefault(); // prevent navigating to product detail
    e.stopPropagation();

    if (adding) return;
    setAdding(true);

    try {
      // If parent passed onAddToCart use it, otherwise call API directly
      if (onAddToCart) {
        await onAddToCart(product._id, 1);
      } else {
        // Direct API call (used when ProductCard is used outside Products.js)
        const res = await fetch('https://brightflix.onrender.com/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ productId: product._id, quantity: 1 }),
        });
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setCartCount(data.items?.length || 0);
      }

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Add to cart failed:', err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card">

      {/* Badge */}
      {product.badge && (
        <div className={`product-badge ${
          product.badge === 'Best Seller' ? 'badge-orange' :
          product.badge === 'New'         ? 'badge-blue'   : 'badge-red'
        }`}>
          {product.badge}
        </div>
      )}
      {discount && <div className="discount-tag">-{discount}%</div>}

      {/* Product Image */}
      <div className="product-img-wrap">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="product-emoji">
            {categoryEmojis[product.category] || '📦'}
          </div>
        )}
        <div className="product-hover-overlay">
          <button className="wishlist-btn" onClick={e => e.preventDefault()}>♡</button>
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <span className="product-category">
          {product.category}
          {product.subcategory && <> › {product.subcategory}</>}
        </span>
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

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={adding}
          style={{ background: added ? '#22c55e' : '' }}
        >
          {adding ? 'Adding...' : added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;