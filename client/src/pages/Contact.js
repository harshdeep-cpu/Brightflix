import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFE8CC)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900 }}>Contact <span style={{ color: 'var(--primary)' }}>Us</span></h1>
          <p style={{ color: 'var(--text-light)', marginTop: 12 }}>We'd love to hear from you. Drop us a message!</p>
        </div>
      </div>

      <div className="container" style={{ padding: '64px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Info */}
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 24, color: 'var(--text-dark)' }}>Get in Touch</h2>
          {[
            { icon: '📞', label: 'Phone', val: '1800-XXX-XXXX (Toll Free)' },
            { icon: '✉️', label: 'Email', val: 'support@brightflix.in' },
            { icon: '📍', label: 'Address', val: 'BrightFlix HQ, New Delhi – 110001, India' },
            { icon: '⏰', label: 'Hours', val: 'Mon–Sat: 9 AM – 7 PM IST' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, background: 'var(--off-white)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, border: '1px solid var(--border)' }}>{c.icon}</div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.875rem', marginBottom: 2, color: 'var(--text-dark)' }}>{c.label}</strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{c.val}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 40, border: '1.5px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-light)' }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>Send a Message</h3>
              {['name', 'email', 'subject'].map(field => (
                <input key={field} type={field === 'email' ? 'email' : 'text'} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                  required style={{ padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'Poppins', fontSize: '0.9rem', outline: 'none' }}
                />
              ))}
              <textarea placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                required rows={5} style={{ padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'Poppins', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
              />
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
