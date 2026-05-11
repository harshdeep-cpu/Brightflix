import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import logo from '../assets/Brightflix-Text.png';
import './Footer.css';

const Footer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProtectedLink = (path) => {
    user ? navigate(path) : navigate('/login');
  };

  const quickLinks = [
    { label: 'Home',       path: '/',           protected: false },
    { label: 'Products',   path: '/products',   protected: true  },
    { label: 'About',      path: '/about',      protected: true  },
    { label: 'Services',   path: '/services',   protected: true  },
    { label: 'Contact Us', path: '/contact',    protected: true  },
  ];

  const categories = [
    'Television', 'Air Conditioner', 'Refrigerator',
    'Washing Machine', 'Air Cooler', 'Kitchen Appliances'
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div>
                <img src={logo} alt="Brightflix Logo" className="footer-logo-img" />
                <p className="footer-logo-sub">Bharat Solar Network Limited</p>
              </div>
            </div>
            <p className="footer-tagline">
              Premium Home Appliances for Modern India. Smart living solutions powered by technology.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">▶️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map(link => (
                <li key={link.label}>
                  {link.protected ? (
                    // 👇 protected links use button to check login
                    <button
                      className="footer-link-btn"
                      onClick={() => handleProtectedLink(link.path)}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link to={link.path}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-col">
            <h4>Categories</h4>
            <ul>
              {categories.map(c => (
                <li key={c}>
                  {/* 👇 all categories are protected */}
                  <button
                    className="footer-link-btn"
                    onClick={() => handleProtectedLink(`/products?category=${c}`)}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-links-col">
            <h4>Customer Care</h4>
            <ul>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns & Refunds</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">EMI Calculator</a></li>
              <li><a href="#">Service Centres</a></li>
            </ul>
            <div className="footer-contact">
              <p>📞 1800-XXX-XXXX (Toll Free)</p>
              <p>✉️ support@brightflix.in</p>
              <p>📍 New Delhi, India</p>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2025 BrightFlix — BharatSolarNetworkLimited. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
