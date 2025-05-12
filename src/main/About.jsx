import "./style.css";
import pic20 from "../assets/pic20.jpg";
import pic21 from "../assets/pic21.jpeg";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" style={{ backgroundImage: `url(${pic20})` }}>
        <div className="about-hero-overlay">
          <h1 className="about-title">about us</h1>
          <p className="about-tagline">Bridging the gap between those who grow and those who consume</p>
          <p className="about-subtitle">Cultivating connections, nurturing communities, and growing a sustainable future.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="about-mission-content">
          <div className="about-mission-text">
            <h2><span className="about-mission-fade">The way we work</span><br/>We live for <span className="about-green">Green</span> work for green</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts</p>
            <ul>
              <li><span className="about-green">Our Work Culture</span> - Far far away, behind the word mountains, far from the countries Vokalia</li>
            </ul>
            <button className="about-contact-btn" onClick={() => navigate('/contact')}>Contact us</button>
          </div>
        </div>
      </section>

      {/* Transparency/Process Section */}
      <section className="about-process">
        <div className="about-process-content">
          <div className="about-process-left">
            <h2 className="about-process-title">Full Transparency When It Comes To Our Practices</h2>
            <hr className="about-process-divider" />
            <ul className="about-process-steps">
              <li>
                <span className="about-process-step-num">01</span>
                <div>
                  <span className="about-process-step-title about-green">Explore Our Offerings</span>
                  <p className="about-process-step-desc">Our mission is simple: to bring the freshest, most nutritious produce directly from our fields to your table.</p>
                </div>
              </li>
              <li>
                <span className="about-process-step-num">02</span>
                <span className="about-process-step-title">Place Your Order</span>
              </li>
              <li>
                <span className="about-process-step-num">03</span>
                <span className="about-process-step-title">We Harvest and Prepare</span>
              </li>
              <li>
                <span className="about-process-step-num">04</span>
                <span className="about-process-step-title">Enjoy Fresh Produce</span>
              </li>
            </ul>
          </div>
          <div className="about-process-right-bg" style={{ backgroundImage: `url(${pic21})` }}>
            <div className="about-process-right-overlay"></div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values">
        <h3>Our Values</h3>
        <div className="about-values-list">
          <div className="about-value-card">
            <span className="about-value-icon">🌱</span>
            <h4>Sustainability</h4>
            <p>We are committed to eco-friendly and sustainable farming practices.</p>
          </div>
          <div className="about-value-card">
            <span className="about-value-icon">🤝</span>
            <h4>Community</h4>
            <p>We empower local farmers and build strong communities.</p>
          </div>
          <div className="about-value-card">
            <span className="about-value-icon">💡</span>
            <h4>Innovation</h4>
            <p>We use technology to improve agriculture for everyone.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="about-cta about-cta-centered">
        <h3>Ready to join us?</h3>
        <p>Contact us or sign up to be part of the AgriConnect community!</p>
        <button className="about-contact-btn" onClick={() => navigate('/buyerregistration')}>Get Started</button>
      </section>
    </div>
  );
}
