import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Login.css';
import logoText from '../assets/Brightflix-Text.png';
import { useRef } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  /* ---------- 3D tilt on mouse move ---------- */
  const handleMouseMove = (e) => {
    const root = e.currentTarget;
    const rect = root.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    if (cardRef.current) {
      cardRef.current.style.animation = "none";
      cardRef.current.style.transform = `rotateX(${4 - dy * 8}deg) rotateY(${dx * 10}deg) translateY(-4px)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.animation = "floatCard 5s ease-in-out infinite";
      cardRef.current.style.transform = "";
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(`https://brightflix.onrender.com${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUser(data);
      localStorage.setItem('brightflix_user', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp-root" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

        {/* Kitchen background */}
        <div className="lp-bg" />
        <div className="lp-light" />
        <div className="app-fridge" />
        <div className="app-micro" />
        <div className="app-stove" />
        <div className="lp-burner" style={{ left: "11%", bottom: "60%" }} />
        <div className="lp-burner" style={{ left: "16%", bottom: "60%" }} />
        <div className="lp-burner" style={{ left: "11%", bottom: "51%" }} />
        <div className="lp-burner" style={{ left: "16%", bottom: "51%" }} />
        <div className="lp-counter-grid" />

        {/* 3-D card */}
        <div className="lp-scene">
          <div className="lp-card" ref={cardRef}>
            <div className="lp-card-glow" />

            <div className="lp-logo">
              {/* swap <img> back if you prefer the logoText asset */}
               <img src={logoText} alt="BrightFlix" /> 
            </div>

            <h2 className="lp-h2">{isLogin ? "Welcome Back!" : "Create Account"}</h2>
            <p className="lp-sub">
              {isLogin ? "Sign in to your BrightFlix account" : "Join millions of smart shoppers"}
            </p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="lp-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="lp-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="lp-form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="lp-btn" disabled={loading}>
                {loading ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

          <div className="lp-divider" />
            <p className="lp-toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setIsLogin(!isLogin); setError(""); }}>
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login;
