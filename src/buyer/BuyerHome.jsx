import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './buyer.css';
import pic20 from '../assets/pic20.jpg';
import { useAuth } from '../contextapi/AuthContext'; // Import the auth context
import FirstImg from '../assets/First.jpg';
import SecondImg from '../assets/Second.jpg';
import ThirdImg from '../assets/third.jpg';
import WelcomeImg from '../assets/pic21.jpeg'; // Or .png if you uploaded a PNG
import MangoImg from '../assets/mango.jpeg';
import TomatoImg from '../assets/tomato.jpg';
import PeasImg from '../assets/pic18.jpeg';
import CarrotImg from '../assets/carrot.webp';


export default function BuyerHome() {
  const { buyer } = useAuth(); // Get the buyer object from auth context
  const [buyerName, setBuyerName] = useState("");

  // Extract buyer name when component mounts or buyer data changes
  useEffect(() => {
    if (buyer && buyer.username) {
      setBuyerName(buyer.username);
    } else {
      // Try to get buyer info from session storage if context is empty
      const storedBuyer = JSON.parse(sessionStorage.getItem('buyer'));
      if (storedBuyer && storedBuyer.username) {
        setBuyerName(storedBuyer.username);
      }
    }
  }, [buyer]);

  const specialOffers = [
    {
      id: 1,
      title: 'Fresh Organic Vegetables',
      discount: '20% OFF',
      description: 'Get fresh organic vegetables directly from local farmers',
      image: FirstImg
    },
    {
      id: 2,
      title: 'Seasonal Fruits',
      discount: '15% OFF',
      description: 'Enjoy seasonal fruits at discounted prices',
      image: SecondImg
    },
    {
      id: 3,
      title: 'Premium Grains',
      discount: '25% OFF',
      description: 'High-quality grains from certified farmers',
      image: ThirdImg
    }
  ];

  const seasonalProducts = [
  {
    id: 1,
    name: 'Fresh Mangoes',
    price: '₹80/kg',
    image: MangoImg,
  },
  {
    id: 2,
    name: 'Organic Tomatoes',
    price: '₹40/kg',
    image: TomatoImg,
  },
  {
    id: 3,
    name: 'Green Peas',
    price: '₹60/kg',
    image: PeasImg,
  },
  {
    id: 4,
    name: 'Red Carrots',
    price: '₹50/kg',
    image: CarrotImg,
  },
];

  const [openSeasonalId, setOpenSeasonalId] = useState(null);
  const [openOfferId, setOpenOfferId] = useState(null);

  return (
    <div className="buyer-home">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <h1>
            {buyerName ? `Welcome, ${buyerName}!` : 'Welcome to AgriConnect'}
          </h1>
          <p>Your one-stop destination for fresh, organic produce directly from local farmers</p>
         <div className="welcome-image">
  <img src={WelcomeImg} alt="Welcome" style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
</div>

        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/buyerviewproducts" className="action-button">
            <div className="action-icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <span>Browse Products</span>
            <p>Explore our wide range of fresh produce</p>
          </Link>
          <Link to="/myorders" className="action-button">
            <div className="action-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <span>My Orders</span>
            <p>Track and manage your orders</p>
          </Link>
          <Link to="/contact" className="action-button">
            <div className="action-icon">
              <i className="fas fa-comment-alt"></i>
            </div>
            <span>Submit Feedback</span>
            <p>Share your experience with us</p>
          </Link>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Special Offers */}
      <section className="special-offers">
        <h2>
          Special Offers
          <i className="fas fa-star highlight-icon"></i>
        </h2>
        <div className="offers-grid">
          {specialOffers.map(offer => (
            <div key={offer.id} className="offer-card" style={{ position: 'relative' }}>
              <div className="offer-image">
                <img src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="discount-badge">{offer.discount}</div>
              </div>
              <div className="offer-details">
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <button className="offer-details-btn" onClick={() => setOpenOfferId(offer.id)} style={{ marginTop: '10px', display: 'inline-block', fontSize: '1rem', padding: '8px 20px', background: '#B4D335', color: '#1a3c34', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>View Details</button>
              </div>
              {openOfferId === offer.id && (
                <div className="offer-details-overlay">
                  <div className="offer-details-content">
                    <button className="close-btn" onClick={() => setOpenOfferId(null)}>&times;</button>
                    <h4>About {offer.title}</h4>
                    <p style={{ margin: '18px 0 0 0', color: '#1a3c34', fontWeight: 500 }}>
                      {offer.description} This offer is available for a limited time. Don't miss out on these savings!
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Picks */}
      <section className="seasonal-picks">
        <h2>
          Seasonal Picks
          <i className="fas fa-leaf highlight-icon"></i>
        </h2>
        <div className="seasonal-content">
          <p>Discover the freshest seasonal produce from our local farmers</p>
          <div className="seasonal-grid">
            {seasonalProducts.map(product => (
              <div key={product.id} className="seasonal-card" style={{ position: 'relative' }}>
               <div className="seasonal-image">
  <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
</div>

                <div className="seasonal-details">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price}</p>
                  <p style={{ color: '#666', fontSize: '0.95rem', margin: '8px 0 0 0' }}>{product.description}</p>
                  <p style={{ color: '#1a3c34', fontSize: '0.9rem', margin: '4px 0 0 0' }}><b>Origin:</b> {product.origin}</p>
                  <p style={{ color: '#B4D335', fontSize: '0.9rem', margin: '4px 0 10px 0' }}><b>Freshness:</b> {product.freshness}</p>
                  <button className="seasonal-details-btn" onClick={() => setOpenSeasonalId(product.id)} style={{ marginTop: '10px', display: 'inline-block', fontSize: '1rem', padding: '8px 20px', background: '#1a3c34', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>View Details</button>
                  <Link to="/buyerviewproducts" className="seasonal-button" style={{ marginTop: '10px', display: 'inline-block', fontSize: '1rem', padding: '8px 20px' }}>Order Now</Link>
                </div>
                {openSeasonalId === product.id && (
                  <div className="seasonal-details-overlay">
                    <div className="seasonal-details-content">
                      <button className="close-btn" onClick={() => setOpenSeasonalId(null)}>&times;</button>
                      <h4>About {product.name}</h4>
                      <p style={{ margin: '18px 0 0 0', color: '#1a3c34', fontWeight: 500 }}>
                        This {product.name.toLowerCase()} is specially selected for its freshness and quality. Enjoy the best of the season, directly from our trusted farmers!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section" style={{ background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)', color: '#fff', padding: '50px 0 0 0', marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '30px', color: '#B4D335' }}>Why Choose Us<span style={{ color: '#fff' }}>!!!</span></h2>
        <div className="why-choose-us-content" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderRadius: '18px', boxShadow: '0 4px 24px rgba(26,60,52,0.10)', padding: '30px 0 0 0' }}>
          {/* Left Features */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'flex-end', padding: '0 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ background: '#B4D335', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-seedling" style={{ color: '#1a3c34', fontSize: '2rem' }}></i>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>100% Organic</div>
                <div style={{ color: '#fff', fontSize: '1rem', opacity: 0.85 }}>Fresh, chemical-free produce directly from trusted local farmers.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ background: '#B4D335', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-award" style={{ color: '#1a3c34', fontSize: '2rem' }}></i>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>Award Winning</div>
                <div style={{ color: '#fff', fontSize: '1rem', opacity: 0.85 }}>Recognized for quality, sustainability, and customer satisfaction.</div>
              </div>
            </div>
          </div>
          {/* Center Content */}
          <div style={{ flex: '2 1 400px', textAlign: 'center', padding: '0 30px' }}>
            <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '18px', marginTop: '10px', opacity: 0.95 }}>
              Experience the best of agriculture with AgriConnect. We connect you to a wide variety of fresh, organic, and locally sourced products. Our platform ensures transparency, fair pricing, and a seamless buying experience for all your needs.
            </p>
            <img src={pic20} alt="Fresh Vegetables" style={{ width: '260px', borderRadius: '16px', margin: '0 auto 20px auto', boxShadow: '0 2px 12px rgba(26,60,52,0.10)' }} />
          </div>
          {/* Right Features */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'flex-start', padding: '0 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ background: '#B4D335', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-tractor" style={{ color: '#1a3c34', fontSize: '2rem' }}></i>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>Modern Farming</div>
                <div style={{ color: '#fff', fontSize: '1rem', opacity: 0.85 }}>Empowering farmers with technology for better yield and quality.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ background: '#B4D335', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-headset" style={{ color: '#1a3c34', fontSize: '2rem' }}></i>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>24/7 Support</div>
                <div style={{ color: '#fff', fontSize: '1rem', opacity: 0.85 }}>Our team is always here to help you with your queries and orders.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}