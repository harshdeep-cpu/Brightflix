import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Admin from './pages/Admin';
import VideoIntro from './components/VideoIntro';

export const CartContext = React.createContext();
export const AuthContext = React.createContext();

// ✅ ProtectedRoute must be INSIDE a component to use useContext
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  // ✅ cartCount initialized from localStorage directly
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem('brightflix_cart_count');
    return saved ? parseInt(saved) : 0;
  });
  const [user, setUser]         = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  // ✅ sync cartCount to localStorage
  useEffect(() => {
    localStorage.setItem('brightflix_cart_count', cartCount);
  }, [cartCount]);

  // ✅ single useEffect — not nested
  useEffect(() => {
    const savedUser = localStorage.getItem('brightflix_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // fetch real cart count on app load
      fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${parsedUser.token}` },
      })
        .then(res => res.json())
        .then(data => {
          const count = data.items?.length || 0;
          setCartCount(count);
          localStorage.setItem('brightflix_cart_count', count);
        })
        .catch(() => {});
    }

    const deviceType = /Android|iPhone|iPod|BlackBerry|Windows Phone|Mobile/i.test(navigator.userAgent)
      ? 'mobile'
      : /iPad|Tablet|Kindle/i.test(navigator.userAgent)
      ? 'tablet'
      : 'desktop';

    const introKey = `intro_shown_${deviceType}`;
    const hasSeenIntro = sessionStorage.getItem(introKey);
    if (hasSeenIntro) setShowIntro(false);
  }, []);

  const handleIntroEnd = () => {
    setShowIntro(false);
    const deviceType = /Android|iPhone|iPod|BlackBerry|Windows Phone|Mobile/i.test(navigator.userAgent)
      ? 'mobile'
      : /iPad|Tablet|Kindle/i.test(navigator.userAgent)
      ? 'tablet'
      : 'desktop';
    sessionStorage.setItem(`intro_shown_${deviceType}`, 'true');
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cartCount, setCartCount }}>
        <Router>
          {showIntro && <VideoIntro onEnd={handleIntroEnd} />}
          {!showIntro && (
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/"      element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                  <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
                  <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                  <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                  <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;