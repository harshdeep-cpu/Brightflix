import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';

const Cart = () => {
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);
  const { user }         = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
  try {
    setLoading(true);
    const res = await fetch('https://brightflix.onrender.com/api/cart', {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch cart');
    const data = await res.json();
    setCartItems(data.items || []);

    // 👇 sync count with actual DB items
    const count = data.items?.length || 0;
    setCartCount(count);
    localStorage.setItem('brightflix_cart_count', count); // 👈 save to localStorage
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const updateQty = async (productId, quantity) => {
    if (quantity < 1) return removeItem(productId);
    try {
      await fetch('https://brightflix.onrender.com/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      fetchCart();
    } catch (err) { console.error(err); }
  };

  const removeItem = async (productId) => {
    try {
      await fetch(`https://brightflix.onrender.com/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      fetchCart();
    } catch (err) { console.error(err); }
  };

  const clearCart = async () => {
    if (!window.confirm('Clear entire cart?')) return;
    try {
      await fetch('https://brightflix.onrender.com/api/cart/clear', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setCartItems([]);
      setCartCount(0);
    } catch (err) { console.error(err); }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const savings  = cartItems.reduce((sum, item) => sum + ((item.product?.originalPrice || item.product?.price || 0) - (item.product?.price || 0)) * item.quantity, 0);
  const delivery = subtotal > 999 ? 0 : 99;
  const total    = subtotal + delivery;

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>⏳</div>
        <p style={{ color: 'var(--text-mid)' }}>Loading your cart...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '48px 0', background: '#f9f9f9' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 32 }}>
          Shopping <span style={{ color: 'var(--primary)' }}>Cart</span>
          {cartItems.length > 0 && (
            <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-mid)', marginLeft: 12 }}>
              ({cartItems.length} items)
            </span>
          )}
        </h1>

        {error && (
          <div style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)', color: '#dc3545', padding: '12px 16px', borderRadius: 10, marginBottom: 24 }}>
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Your cart is empty</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: 28 }}>Explore our products and add items to your cart</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>

            {/* ── Cart Items ── */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <button onClick={clearCart} style={{
                  background: 'none', border: '1px solid #ddd', borderRadius: 8,
                  padding: '6px 14px', fontSize: '0.82rem', color: 'var(--text-mid)', cursor: 'pointer'
                }}>🗑 Clear Cart</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cartItems.map(item => (
                  <div key={item.product?._id} style={{
                    background: 'white', borderRadius: 14,
                    border: '1.5px solid var(--border)', padding: 20,
                    display: 'flex', gap: 20, alignItems: 'center'
                  }}>
                    {/* Image */}
                    <div style={{
                      width: 90, height: 90, borderRadius: 10, flexShrink: 0,
                      background: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2.5rem', border: '1px solid var(--border)', overflow: 'hidden'
                    }}>
                      {item.product?.images?.[0]
                        ? <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : '📦'
                      }
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4 }}>
                        {item.product?.name}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-mid)', marginBottom: 8 }}>
                        {item.product?.category}
                        {item.product?.subcategory && ` › ${item.product.subcategory}`}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                          ₹{item.product?.price?.toLocaleString('en-IN')}
                        </span>
                        {item.product?.originalPrice > item.product?.price && (
                          <>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                              ₹{item.product?.originalPrice?.toLocaleString('en-IN')}
                            </span>
                            <span style={{ fontSize: '0.78rem', background: '#ECFDF5', color: '#22c55e', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
                              {Math.round((1 - item.product.price / item.product.originalPrice) * 100)}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Qty + Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                        <button onClick={() => updateQty(item.product?._id, item.quantity - 1)}
                          style={{ width: 36, height: 38, background: '#f5f5f5', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>−</button>
                        <span style={{ width: 40, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.product?._id, item.quantity + 1)}
                          style={{ width: 36, height: 38, background: '#f5f5f5', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>+</button>
                      </div>
                      <button onClick={() => removeItem(item.product?._id)} style={{
                        background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.2)',
                        color: '#dc3545', borderRadius: 8, padding: '8px 10px', cursor: 'pointer'
                      }}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div style={{
              background: 'white', borderRadius: 14,
              border: '1.5px solid var(--border)', padding: 24,
              position: 'sticky', top: 90
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-mid)' }}>
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {savings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#22c55e' }}>
                    <span>Savings</span>
                    <span>−₹{savings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-mid)' }}>
                  <span>Delivery</span>
                  <span style={{ color: delivery === 0 ? '#22c55e' : 'inherit' }}>
                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>

                {delivery > 0 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', background: '#FFF8F0', padding: '8px 10px', borderRadius: 8 }}>
                    Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for FREE delivery
                  </p>
                )}

                <div style={{ height: 1, background: 'var(--border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
  className="btn-primary"
  style={{ width: '100%', padding: 14, fontSize: '1rem' }}
  onClick={() => navigate('/contact')} 
>
  Proceed to Checkout →
</button>
              <Link to="/products" style={{
                display: 'block', textAlign: 'center', marginTop: 12,
                fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'underline'
              }}>
                Continue Shopping
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;