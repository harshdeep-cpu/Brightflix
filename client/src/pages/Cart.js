import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

const Cart = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <div style={{ minHeight: '100vh', padding: '64px 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 32 }}>Shopping <span style={{ color: 'var(--primary)' }}>Cart</span></h1>
        {cartCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-dark)' }}>Your cart is empty</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: 28 }}>Explore our products and add items to your cart</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
            <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', padding: 24 }}>
              <p style={{ color: 'var(--text-light)' }}>{cartCount} item(s) in your cart. Connect backend to view details.</p>
            </div>
            <div style={{ background: 'white', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', padding: 24, height: 'fit-content' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  <span>Subtotal</span><span>--</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  <span>Delivery</span><span style={{ color: 'green' }}>FREE</span>
                </div>
                <div style={{ height: 1, background: 'var(--border)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Total</span><span>--</span>
                </div>
              </div>
              <button className="btn-primary" style={{ width: '100%', padding: 14 }}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
