import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(`http://localhost:5000${url}`, {
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
    <div className="login-page">
      <div className="login-left dot-pattern" />
      <div className="login-card">
        <div className="login-logo">
          <span>☀</span>
          <span className="bright">Bright</span><span className="flix">Flix</span>
        </div>
        <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
        <p className="login-sub">{isLogin ? 'Sign in to your BrightFlix account' : 'Join millions of smart shoppers'}</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
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
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="login-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
