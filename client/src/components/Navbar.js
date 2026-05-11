import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import './Navbar.css';
import logo from "../assets/brightflix-logo.png";

const Navbar = () => {
  const location = useLocation();
  const { cartCount } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext); 
  const navigate = useNavigate();                      
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('brightflix_user');
    setUser(null);
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products', protected: true },
    { path: '/about', label: 'About', protected: true },
    { path: '/services', label: 'Services', protected: true },
    { path: '/contact', label: 'Contact Us', protected: true },
  ];

  const visibleLinks = navLinks.filter(link => !link.protected || user);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">

        {/* Logo */}
        <Link to="/" className='navbar-logo'>
          <img src={logo} alt="Brightflix Logo" className='logo-icon'/>
        </Link>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {visibleLinks.map(link => (
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

        {user?.isAdmin && (
          <Link to="/admin" className="login-btn" style={{ color: 'var(--primary)' }}>
            Admin
          </Link>
        )}

        {/* Right Actions */}
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

  {/* Cart — only when logged in */}
  {user && (
    <Link to="/cart" className="icon-btn cart-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </Link>
  )}

  {/* 👇 Admin link moved inside navbar-actions */}
  {user?.isAdmin && (
    <Link to="/admin" className="login-btn" >
      🛠 Admin
    </Link>
  )}

  {user ? (
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  ) : (
    <Link to="/login" className="login-btn">Login</Link>
  )}

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