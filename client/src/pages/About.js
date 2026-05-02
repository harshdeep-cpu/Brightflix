// About.js
import React from 'react';
import './About.css';

const About = () => (
  <div className="about-page">
    <div className="about-hero dot-pattern">
      <div className="container">
        <h1>About <span>BrightFlix</span></h1>
        <p>Empowering Modern Indian Homes with Premium Appliances</p>
      </div>
    </div>
    <div className="container about-content">
      <div className="about-grid">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>BrightFlix, under BharatSolarNetworkLimited, is India's fastest-growing home appliances brand. We bring premium-quality electronics and appliances to every Indian household at honest, transparent prices.</p>
          <p>Founded with a mission to make smart living accessible, we serve over 10 lakh happy customers across 500+ cities in India.</p>
          <div className="about-stats">
            <div className="stat"><strong>10L+</strong><span>Happy Customers</span></div>
            <div className="stat"><strong>500+</strong><span>Cities Covered</span></div>
            <div className="stat"><strong>1200+</strong><span>Products</span></div>
            <div className="stat"><strong>15+</strong><span>Years Experience</span></div>
          </div>
        </div>
        <div className="about-visual">
          <div className="about-card-grid">
            {['📺', '❄️', '🧊', '🫧'].map((e, i) => (
              <div key={i} className="about-product-card">{e}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
