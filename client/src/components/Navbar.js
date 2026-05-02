import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import './Navbar.css';
import icon from "../assets/Brightflix-icon.jpeg";
import text from "../assets/Brightflix-text.jpeg";
import logo from "../assets/brightflix-logo.png";

const Navbar = () => {
  const location = useLocation();
  const { cartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className='navbar-logo'>
          <img src={logo} alt="Brightflix Logo" className='logo-icon'/>
        </Link>

        {/* <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <span className="logo-sun">
              <img src={icon} alt="Brightflix Logo"/>
            </span>
          </div>
          <div className="logo-text">
            <img src={text} alt="Brightflix Logo"/>
            <span className="logo-sub">BharatSolarNetworkLimited</span>
          </div>
        </Link>  */}

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          <div className="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="search-dot" />
          </div>

          <Link to="/cart" className="icon-btn cart-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link to="/login" className="icon-btn user-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {user && <span className="user-badge">2</span>}
          </Link>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
