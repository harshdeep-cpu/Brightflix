import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';

const categoryEmojis = {
  'Television': '📺', 'Air Conditioner': '❄️', 'Refrigerator': '🧊',
  'Washing Machine': '🫧', 'Air Cooler': '💨', 'Kitchen': '🍳',
  'Home Care': '🏠', 'Air Purifier': '🌿', 'Solar': '☀️', 'Lights': '💡',
};

const ProductDetail = () => {
  const { id }           = useParams();
  const { setCartCount } = useContext(CartContext);
  const { user }         = useContext(AuthContext);

  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [qty, setQty]           = useState(1);
  const [added, setAdded]       = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res  = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ handleAdd is its own function — NOT nested inside anything
  const handleAdd = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: qty }),
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      const data = await res.json();
      setCartCount(data.items?.length || 0);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  }; // ✅ handleAdd closes here

  // ✅ loading check is at component level — NOT inside handleAdd
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-mid)' }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>⏳</div>
        <p>Loading product...</p>
      </div>
    </div>
  );

  // ✅ error check is at component level — NOT inside handleAdd
  if (error || !product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
        <h2>Product not found</h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: 20 }}>{error}</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    </div>
  );

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  // ✅ main return is at component level
  return (
    <div style={{ minHeight: '100vh', padding: '48px 0' }}>
      <div className="container">

        {/* Breadcrumb */}
        <div style={{ marginBottom: 24, fontSize: '0.875rem', color: 'var(--text-light)' }}>
          <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> ›{' '}
          <Link to="/products" style={{ color: 'var(--primary)' }}>Products</Link> ›{' '}
          {product.name}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

          {/* ── Left: Images + Video ── */}
          <div>
            {/* Main image */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)',
              borderRadius: 'var(--radius-lg)', aspectRatio: '1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '8rem', border: '1.5px solid var(--border)',
              overflow: 'hidden', marginBottom: 12
            }}>
              {product.images?.length > 0 ? (
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                categoryEmojis[product.category] || '📦'
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: 64, height: 64, borderRadius: 8, overflow: 'hidden',
                      border: `2px solid ${i === activeImg ? 'var(--primary)' : 'var(--border)'}`,
                      cursor: 'pointer', background: '#FFF8F0',
                    }}
                  >
                    <img src={img} alt={`thumb-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Product Video */}
            {product.video && (
              <div style={{ marginTop: 20 }}>
                <h4 style={{ marginBottom: 10, fontWeight: 600 }}>📹 Product Video</h4>
                <video
                  src={product.video}
                  controls
                  style={{ width: '100%', borderRadius: 12, border: '1.5px solid var(--border)' }}
                />
              </div>
            )}
          </div>

          {/* ── Right: Product Info ── */}
          <div>
            {product.badge && (
              <span style={{
                display: 'inline-block', background: 'var(--primary)', color: 'white',
                fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px',
                borderRadius: 6, marginBottom: 12
              }}>{product.badge}</span>
            )}

            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>
              {product.name}
            </h1>

            {/* Category / Subcategory */}
            <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: 12 }}>
              {product.category}
              {product.subcategory && <> › {product.subcategory}</>}
            </p>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ color: '#FFB300', fontSize: '1rem', letterSpacing: 2 }}>
                {'★'.repeat(Math.floor(product.rating || 0))}
              </span>
              <span style={{ fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                ({product.reviews?.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: '2rem', fontWeight: 900 }}>
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
              {discount && (
                <span style={{
                  background: '#ECFDF5', color: '#22c55e',
                  fontSize: '0.85rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6
                }}>{discount}% off</span>
              )}
            </div>

            {/* Stock */}
            {product.stock !== undefined && (
              <p style={{ fontSize: '0.88rem', marginBottom: 16, fontWeight: 600,
                color: product.stock > 0 ? '#22c55e' : '#ef4444'
              }}>
                {product.stock > 0 ? `✅ In Stock (${product.stock} left)` : '❌ Out of Stock'}
              </p>
            )}

            {/* Description */}
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>
              {product.description}
            </p>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                border: '1.5px solid var(--border)', borderRadius: 10, overflow: 'hidden'
              }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                  width: 40, height: 44, background: 'var(--off-white)',
                  border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontFamily: 'Poppins'
                }}>−</button>
                <span style={{ width: 48, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock || 99, q + 1))} style={{
                  width: 40, height: 44, background: 'var(--off-white)',
                  border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontFamily: 'Poppins'
                }}>+</button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                onClick={handleAdd}
                className="btn-primary"
                disabled={product.stock === 0}
                style={{ flex: 1, padding: 16, background: added ? '#22c55e' : '' }}
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="btn-outline" style={{ flex: 1, padding: 16 }}>
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['🚚 Free Delivery', '🔄 10-Day Returns', '🛡️ Warranty Included'].map(f => (
                <span key={f} style={{
                  fontSize: '0.8rem', color: 'var(--text-mid)',
                  background: 'var(--off-white)', padding: '6px 12px',
                  borderRadius: 6, border: '1px solid var(--border)'
                }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;