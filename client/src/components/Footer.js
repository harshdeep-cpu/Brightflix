import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">☀</span>
              <div>
                <span className="footer-logo-bright">Bright</span>
                <span className="footer-logo-flix">Flix</span>
                <p className="footer-logo-sub">BharatSolarNetworkLimited</p>
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

          {/* Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              {['Home', 'Products', 'About', 'Services', 'Contact Us'].map(l => (
                <li key={l}><Link to={`/${l === 'Home' ? '' : l.toLowerCase().replace(' ', '-')}`}>{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Categories</h4>
            <ul>
              {['Television', 'Air Conditioner', 'Refrigerator', 'Washing Machine', 'Air Cooler', 'Kitchen Appliances'].map(c => (
                <li key={c}><Link to={`/products?category=${c}`}>{c}</Link></li>
              ))}
            </ul>
          </div>

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
