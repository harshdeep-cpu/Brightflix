import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import VideoIntro from './components/VideoIntro';

export const CartContext = React.createContext();
export const AuthContext = React.createContext();

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('brightflix_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // Store intro flag PER DEVICE TYPE so mobile always gets mobile video
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
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
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
