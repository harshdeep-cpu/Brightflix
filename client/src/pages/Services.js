import React from 'react';

const services = [
  { icon: '🔧', title: 'Installation & Setup', desc: 'Professional installation of all appliances at your doorstep within 24 hours of delivery.' },
  { icon: '🛡️', title: 'Extended Warranty', desc: 'Get up to 5 years of extended warranty with our BrightFlix Shield protection plans.' },
  { icon: '🔄', title: 'AMC Service', desc: 'Annual Maintenance Contracts for hassle-free appliance upkeep all year round.' },
  { icon: '🚚', title: 'Express Delivery', desc: 'Same-day and next-day delivery available in 50+ major cities across India.' },
  { icon: '💳', title: 'Easy EMI', desc: '0% EMI options available on all appliances above ₹5000 with leading banks.' },
  { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer support via call, chat, or email.' },
];

const Services = () => (
  <div style={{ minHeight: '100vh' }}>
    <div style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFE8CC)', padding: '64px 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900 }}>Our <span style={{ color: 'var(--primary)' }}>Services</span></h1>
        <p style={{ color: 'var(--text-light)', marginTop: 12, fontSize: '1.05rem' }}>Everything you need for a seamless appliance experience</p>
      </div>
    </div>
    <div className="container" style={{ padding: '64px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '36px 28px', border: '1.5px solid var(--border)', textAlign: 'center', transition: 'var(--transition)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--primary-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>{s.icon}</div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10, color: 'var(--text-dark)' }}>{s.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', lineHeight: 1.7 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Services;
