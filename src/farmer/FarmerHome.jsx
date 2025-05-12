import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './farmer.css';
import { useAuth } from '../contextapi/AuthContext';

import farmPic from '../assets/farm-field.jpg';
import turmericpic from '../assets/turmericpic.webp';
import redchillypic from '../assets/redchillypic.jpeg';
import wheatpic from '../assets/wheatpic.webp';
import organicricepics from '../assets/organicricepics.png';
import farmerwelcompic from '../assets/farmerwelcompic.jpg';
import raisingdemand from '../assets/raisingdemand.jpg';
import seasonalforecast from '../assets/seasonalforecast.avif';
import direct from '../assets/direct.jpg';

export default function FarmerHome() {
  const { farmer } = useAuth();
  const [farmerName, setFarmerName] = useState('');
  const [weather, setWeather] = useState(null);
  const [openTrendId, setOpenTrendId] = useState(null);
  const [openProductId, setOpenProductId] = useState(null);

  useEffect(() => {
    let currentFarmer = farmer;

    if (!currentFarmer || !currentFarmer.username) {
      try {
        const stored = sessionStorage.getItem('farmer');
        if (stored && stored !== 'undefined') {
          currentFarmer = JSON.parse(stored);
        }
      } catch (e) {
        console.error("❌ Failed to parse farmer from sessionStorage:", e.message);
      }
    }

    if (currentFarmer?.username) {
      setFarmerName(currentFarmer.username);
    }

    const city = currentFarmer?.location?.trim() || 'Hyderabad';

    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:2047/farmer/weather?city=${city}`);
        setWeather(response.data);
      } catch (error) {
        console.error(`❌ Failed to fetch weather for "${city}":`, error.message);
      }
    };

    fetchWeather();
  }, [farmer]);

  const marketTrends = [
    {
      id: 1,
      title: 'Rising Demand for Organic Produce',
      insight: '30% GROWTH',
      description: 'Organic vegetables and fruits are seeing increased consumer interest',
      image: raisingdemand,
    },
    {
      id: 2,
      title: 'Seasonal Crop Price Forecast',
      insight: 'PRICE ALERT',
      description: 'Upcoming monsoon may affect crop prices - plan your planting accordingly',
      image: seasonalforecast,
    },
    {
      id: 3,
      title: 'Direct-to-Consumer Sales',
      insight: '40% MARGINS',
      description: 'Farmers using direct sales channels report higher profit margins',
      image: direct,
    },
  ];

  const topSellingProducts = [
    {
      id: 1,
      name: 'Organic Rice',
      price: '₹60/kg',
      image: organicricepics,
      description: 'Pesticide-free rice variety with high market demand.',
      bestSeason: 'Kharif',
      avgRating: '4.7/5',
    },
    {
      id: 2,
      name: 'Red Chillies',
      price: '₹120/kg',
      image: redchillypic,
      description: 'Premium quality spicy chillies sought after by wholesalers.',
      bestSeason: 'Winter',
      avgRating: '4.5/5',
    },
    {
      id: 3,
      name: 'Fresh Turmeric',
      price: '₹80/kg',
      image: turmericpic,
      description: 'High-curcumin content turmeric with medicinal properties.',
      bestSeason: 'Year-round',
      avgRating: '4.8/5',
    },
    {
      id: 4,
      name: 'Organic Wheat',
      price: '₹45/kg',
      image: wheatpic,
      description: 'Premium whole grain wheat with no chemical fertilizers.',
      bestSeason: 'Rabi',
      avgRating: '4.6/5',
    },
  ];

  return (
    <div className="farmer-home">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <h1>{farmerName ? `Welcome, ${farmerName}!` : 'Welcome to AgriConnect'}</h1>
          <p>Your platform for selling produce directly to consumers and accessing market insights</p>
          <div className="welcome-image">
            <div style={{
              background: '#f6f8f7',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '180px',
              minWidth: '320px',
              maxWidth: '100%',
              boxShadow: '0 2px 12px rgba(26,60,52,0.10)',
              overflow: 'hidden',
              height: '220px'
            }}>
              <img src={farmerwelcompic} alt="Farmer Welcome"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  display: 'block'
                }} />
            </div>
          </div>
        </div>
      </section>

      {/* Weather */}
      {weather ? (
       <section className="weather-section">
  <div className="weather-icon">🌤</div>
  <h2>Current Weather in {weather.name}</h2>
  <p>{weather.weather[0].description}, {weather.main.temp}°C</p>
  <p>Humidity: {weather.main.humidity}%</p>
  <p>Wind: {weather.wind.speed} m/s</p>
</section>

      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>Fetching weather updates...</p>
      )}

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/addproduct" className="action-button">
            <div className="action-icon"><i className="fas fa-plus-circle"></i></div>
            <span>Add Product</span>
            <p>Add a new product to your inventory</p>
          </Link>
          <Link to="/viewproducts" className="action-button">
            <div className="action-icon"><i className="fas fa-box-open"></i></div>
            <span>View Products</span>
            <p>See all your listed products</p>
          </Link>
          <Link to="/manageproducts" className="action-button">
            <div className="action-icon"><i className="fas fa-warehouse"></i></div>
            <span>Manage Products</span>
            <p>Edit or remove your products</p>
          </Link>
        </div>
      </section>

      {/* Market Trends */}
      <section className="market-trends">
        <h2>Market Trends <i className="fas fa-chart-bar highlight-icon"></i></h2>
        <div className="trends-grid">
          {marketTrends.map(trend => (
            <div key={trend.id} className="trend-card" style={{ position: 'relative' }}>
              <div className="trend-image">
                <img src={trend.image} alt={trend.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px' }} />
                <div className="insight-badge">{trend.insight}</div>
              </div>
              <div className="trend-details">
                <h3>{trend.title}</h3>
                <p>{trend.description}</p>
                <button className="trend-details-btn" onClick={() => setOpenTrendId(trend.id)}>Learn More</button>
              </div>
              {openTrendId === trend.id && (
                <div className="trend-details-overlay">
                  <div className="trend-details-content">
                    <button className="close-btn" onClick={() => setOpenTrendId(null)}>&times;</button>
                    <h4>About {trend.title}</h4>
                    <p>{trend.description} Our market analysis shows this trend continuing. Consider adjusting your planning accordingly.</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="top-products">
        <h2>Top Selling Products <i className="fas fa-star highlight-icon"></i></h2>
        <div className="products-content">
          <p>These products are consistently in high demand on our platform</p>
          <div className="products-grid">
            {topSellingProducts.map(product => (
              <div key={product.id} className="product-card" style={{ position: 'relative' }}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price}</p>
                  <p>{product.description}</p>
                  <p><b>Best Season:</b> {product.bestSeason}</p>
                  <p><b>Customer Rating:</b> {product.avgRating}</p>
                  <button className="product-details-btn" onClick={() => setOpenProductId(product.id)}>View Details</button>
                </div>
                {openProductId === product.id && (
                  <div className="product-details-overlay">
                    <div className="product-details-content">
                      <button className="close-btn" onClick={() => setOpenProductId(null)}>&times;</button>
                      <h4>About {product.name}</h4>
                      <p>{product.name} is one of our top-selling products. Buyers are looking for organic quality and consistent supply.</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" style={{ background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)', color: '#fff', padding: '50px 0', marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '30px', color: '#B4D335' }}>
          Grow Your Farm Business<span style={{ color: '#fff' }}>!</span>
        </h2>
        <div className="benefits-content" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px',
          margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderRadius: '18px', boxShadow: '0 4px 24px rgba(26,60,52,0.10)', padding: '30px 0'
        }}>
          {/* Left */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'flex-end', padding: '0 30px' }}>
            <Benefit icon="fas fa-hand-holding-usd" title="Better Profits" text="Cut out middlemen and earn up to 40% more on your produce." />
            <Benefit icon="fas fa-users" title="Direct Customer Access" text="Build relationships with loyal customers who value quality." />
          </div>

          {/* Center */}
          <div style={{ flex: '2 1 400px', textAlign: 'center', padding: '0 30px' }}>
            <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '18px', marginTop: '10px', opacity: 0.95 }}>
              AgriConnect helps farmers like you reach customers directly, get better prices for your produce, and grow your agricultural business sustainably.
            </p>
            <img src={farmPic} alt="Farm Field" style={{ width: '260px', borderRadius: '16px', margin: '0 auto 20px auto', boxShadow: '0 2px 12px rgba(26,60,52,0.10)' }} />
          </div>

          {/* Right */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'flex-start', padding: '0 30px' }}>
            <Benefit icon="fas fa-chart-pie" title="Market Insights" text="Access data-driven trends to optimize your crop selection." />
            <Benefit icon="fas fa-truck" title="Simplified Logistics" text="Our network helps get your produce to customers efficiently." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
      <div style={{ background: '#B4D335', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className={icon} style={{ color: '#1a3c34', fontSize: '2rem' }}></i>
      </div>
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>{title}</div>
        <div style={{ color: '#fff', fontSize: '1rem', opacity: 0.85 }}>{text}</div>
      </div>
    </div>
  );
}
