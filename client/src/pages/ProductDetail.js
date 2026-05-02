import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../App';

const categoryEmojis = { 'Television': '📺', 'Air Conditioner': '❄️', 'Refrigerator': '🧊', 'Washing Machine': '🫧', 'Air Cooler': '💨', 'Kitchen': '🍳', 'Home Care': '🏠', 'Air Purifier': '🌿' };

const mockProducts = {
  '1': { _id: '1', name: '4K Ultra HD Smart TV 55"', price: 45999, originalPrice: 65000, badge: 'Best Seller', rating: 4.8, reviews: 2341, category: 'Television', description: 'Experience stunning 4K visuals with Dolby Vision and HDR10+. Smart TV with built-in Wi-Fi, Bluetooth, and 50+ apps pre-installed. Ultra-thin bezel design for immersive viewing.' },
  '2': { _id: '2', name: 'Inverter Split AC 1.5 Ton', price: 38999, originalPrice: 52000, badge: 'Hot', rating: 4.7, reviews: 1823, category: 'Air Conditioner', description: '5-star energy rating with Wi-Fi control and PM 2.5 filter. Auto-clean function, sleep mode, and turbo cool for instant cooling.' },
};

const ProductDetail = () => {
  const { id } = useParams();
  const { setCartCount } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = mockProducts[id] || { _id: id, name: 'Product', price: 29999, originalPrice: 45000, rating: 4.5, reviews: 100, category: 'Television', description: 'Premium quality appliance.' };
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAdd = () => {
    setCartCount(c => c + qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '48px 0' }}>
      <div className="container">
        <div style={{ marginBottom: 24, fontSize: '0.875rem', color: 'var(--text-light)' }}>
          <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> › <Link to="/products" style={{ color: 'var(--primary)' }}>Products</Link> › {product.name}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          {/* Image */}
          <div style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)', borderRadius: 'var(--radius-lg)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem', border: '1.5px solid var(--border)' }}>
            {categoryEmojis[product.category] || '📦'}
          </div>
          {/* Info */}
          <div>
            {product.badge && <span style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 6, marginBottom: 12 }}>{product.badge}</span>}
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ color: '#FFB300', fontSize: '1rem', letterSpacing: 2 }}>{'★'.repeat(Math.floor(product.rating))}</span>
              <span style={{ fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>({product.reviews?.toLocaleString()} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: '2rem', fontWeight: 900 }}>₹{product.price?.toLocaleString('en-IN')}</span>
              {product.originalPrice && <span style={{ fontSize: '1rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>₹{product.originalPrice?.toLocaleString('en-IN')}</span>}
              {discount && <span style={{ background: '#ECFDF5', color: '#22c55e', fontSize: '0.85rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>{discount}% off</span>}
            </div>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>{product.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 44, background: 'var(--off-white)', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontFamily: 'Poppins' }}>−</button>
                <span style={{ width: 48, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 44, background: 'var(--off-white)', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontFamily: 'Poppins' }}>+</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={handleAdd} className="btn-primary" style={{ flex: 1, padding: 16, background: added ? '#22c55e' : '' }}>
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="btn-outline" style={{ flex: 1, padding: 16 }}>Buy Now</button>
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['🚚 Free Delivery', '🔄 10-Day Returns', '🛡️ Warranty Included'].map(f => (
                <span key={f} style={{ fontSize: '0.8rem', color: 'var(--text-mid)', background: 'var(--off-white)', padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)' }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
