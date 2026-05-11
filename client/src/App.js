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

// 👇 Add ProtectedRoute here — after context exports
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('brightflix_user');
    if (savedUser) setUser(JSON.parse(savedUser));

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
                  {/* Public routes */}
                  <Route path="/"      element={<Home />}  />
                  <Route path="/login" element={<Login />} />

                  {/* Protected routes 👇 */}
                  <Route path="/products" element={
                    <ProtectedRoute><Products /></ProtectedRoute>
                  } />
                  <Route path="/products/:id" element={
                    <ProtectedRoute><ProductDetail /></ProtectedRoute>
                  } />
                  <Route path="/about" element={
                    <ProtectedRoute><About /></ProtectedRoute>
                  } />
                  <Route path="/services" element={
                    <ProtectedRoute><Services /></ProtectedRoute>
                  } />
                  <Route path="/contact" element={
                    <ProtectedRoute><Contact /></ProtectedRoute>
                  } />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/cart" element={
                    <ProtectedRoute><Cart /></ProtectedRoute>
                  } />
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