import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import First from '../assets/First.jpg';
import Second from '../assets/Second.jpg';
import Third from '../assets/third.jpg';
import axios from 'axios';

const howItWorksSteps = [
  {
    icon: "fas fa-user-plus",
    title: "Create Account",
    description: "Sign up as a farmer or buyer to join our agricultural marketplace",
    color: "#B4D335"
  },
  {
    icon: "fas fa-store",
    title: "List Products",
    description: "Farmers can list their fresh produce, while buyers browse available items",
    color: "#1a3c34"
  },
  {
    icon: "fas fa-comments-dollar",
    title: "Market & Negotiate",
    description: "Find the best deals and negotiate prices directly with farmers or buyers",
    color: "#B4D335"
  },
  {
    icon: "fas fa-truck",
    title: "Delivery",
    description: "Coordinate pickup or delivery of agricultural products",
    color: "#1a3c34"
  }
];

const seasonalProducts = [
  {
    season: "Spring",
    months: "March - May",
    color: "#B4D335",
    icon: "fas fa-seedling",
    products: [
      { name: "Green Peas", price: "₹40/kg", discount: "20%" },
      { name: "Strawberries", price: "₹120/kg", discount: "15%" },
      { name: "Spinach", price: "₹30/kg", discount: "10%" },
      { name: "Asparagus", price: "₹90/kg", discount: "25%" }
    ]
  },
  {
    season: "Summer",
    months: "June - August",
    color: "#FF7E47",
    icon: "fas fa-sun",
    products: [
      { name: "Tomatoes", price: "₹35/kg", discount: "15%" },
      { name: "Mangoes", price: "₹80/kg", discount: "10%" },
      { name: "Watermelon", price: "₹25/kg", discount: "30%" },
      { name: "Sweet Corn", price: "₹40/kg", discount: "20%" }
    ]
  },
  {
    season: "Autumn",
    months: "September - November",
    color: "#D68438",
    icon: "fas fa-leaf",
    products: [
      { name: "Pumpkin", price: "₹45/kg", discount: "25%" },
      { name: "Sweet Potato", price: "₹35/kg", discount: "15%" },
      { name: "Apples", price: "₹90/kg", discount: "20%" },
      { name: "Carrots", price: "₹30/kg", discount: "10%" }
    ]
  },
  {
    season: "Winter",
    months: "December - February",
    color: "#4A90E2",
    icon: "fas fa-snowflake",
    products: [
      { name: "Cauliflower", price: "₹40/kg", discount: "20%" },
      { name: "Green Peas", price: "₹50/kg", discount: "15%" },
      { name: "Potatoes", price: "₹25/kg", discount: "30%" },
      { name: "Cabbage", price: "₹30/kg", discount: "25%" }
    ]
  }
];

const specialOffers = [
  {
    title: "First Time Buyer",
    discount: "25% OFF",
    description: "Get 25% off on your first purchase",
    icon: "fas fa-gift",
    color: "#FF6B6B"
  },
  {
    title: "Bulk Purchase",
    discount: "30% OFF",
    description: "30% off on orders above ₹2000",
    icon: "fas fa-box",
    color: "#4ECDC4"
  },
  {
    title: "Weekend Special",
    discount: "20% OFF",
    description: "Special weekend discount on all products",
    icon: "fas fa-calendar-alt",
    color: "#45B7D1"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  const slides = [
    {
      image: First,
      title: "WELCOME TO",
      subtitle: "AGRICONNECT",
      description: "See how your users experience your website in realtime or view trends to see any changes in performance over time."
    },
    {
      image: Second,
      title: "WELCOME TO",
      subtitle: "AGRICONNECT",
      description: "Direct access to fresh, organic produce from local farmers"
    },
    {
      image: Third,
      title: "WELCOME TO",
      subtitle: "AGRICONNECT",
      description: "Premium quality agricultural products at fair prices"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f7fa'
    },
    heroSection: {
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    },
    slide: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      transition: 'opacity 0.5s ease-in-out'
    },
    activeSlide: {
      opacity: 1
    },
    slideBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    },
    slideOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    slideContent: {
      textAlign: 'center',
      maxWidth: '800px',
      padding: '0 20px',
      color: 'white',
      zIndex: 2
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '10px',
      fontWeight: '600'
    },
    subtitle: {
      fontSize: '4rem',
      marginBottom: '20px',
      fontWeight: '800'
    },
    description: {
      fontSize: '1.2rem',
      marginBottom: '30px',
      lineHeight: '1.6'
    },
    registerBtn: {
      backgroundColor: '#B4D335',
      color: 'white',
      padding: '15px 40px',
      fontSize: '1.2rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      fontWeight: '600'
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#B4D335',
      color: 'white',
      border: 'none',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    prevButton: {
      left: 0
    },
    nextButton: {
      right: 0
    },
    portalCards: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      gap: '20px',
      padding: '80px 60px',
      background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)',
      position: 'relative',
      zIndex: 1,
      marginTop: '-50px',
      maxWidth: '1400px',
      margin: '-50px auto 0',
      flexWrap: 'nowrap',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '20px 20px',
        opacity: 0.1
      }
    },
    portalCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      padding: '30px 20px',
      textAlign: 'center',
      flex: '1 1 0',
      maxWidth: '400px',
      minWidth: '280px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    cardIcon: {
      width: '70px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1a3c34',
      fontSize: '35px',
      marginBottom: '20px',
      background: '#f5f9ff',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a3c34',
      marginBottom: '15px',
      fontFamily: 'Montserrat, sans-serif'
    },
    cardDescription: {
      color: '#666',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '20px',
      height: '63px',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      padding: '0 10px'
    },
    portalBtn: {
      background: '#1a3c34',
      color: 'white',
      border: 'none',
      padding: '12px 0',
      width: '90%',
      borderRadius: '5px',
      fontWeight: '500',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginTop: 'auto'
    },
    howItWorks: {
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%231a3c34" fill-opacity="0.03"%3E%3Cpath d="M20 0L0 20h20zm0 40V20h20z"/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '40px 40px',
        opacity: 0.4
      }
    },
    sectionTitle: {
      fontSize: '2.5rem',
      color: '#1a3c34',
      marginBottom: '15px',
      position: 'relative'
    },
    sectionSubtitle: {
      color: '#666',
      fontSize: '1.1rem',
      maxWidth: '800px',
      margin: '0 auto 50px'
    },
    timelineContainer: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      padding: '50px 30px',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(26, 60, 52, 0.1)'
    },
    timelineBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(26, 60, 52, 0.03) 0%, rgba(180, 211, 53, 0.03) 100%)',
      zIndex: 1
    },
    timeline: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: '40px 0',
      zIndex: 2
    },
    timelineLine: {
      position: 'absolute',
      top: '50%',
      left: '50px',
      right: '50px',
      height: '4px',
      background: 'rgba(26, 60, 52, 0.2)',
      transform: 'translateY(-50%)',
      zIndex: 1
    },
    stepsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      zIndex: 2
    },
    step: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 15px',
      position: 'relative',
      transition: 'all 0.3s ease'
    },
    iconContainer: {
      width: '80px',
      height: '80px',
      backgroundColor: '#B4D335',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      position: 'relative',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      '&:hover': {
        transform: 'translateY(-5px) scale(1.1)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
      }
    },
    icon: {
      fontSize: '2rem',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    stepNumber: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      width: '30px',
      height: '30px',
      backgroundColor: '#1a3c34',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      border: '2px solid #B4D335'
    },
    stepContent: {
      textAlign: 'center',
      maxWidth: '200px'
    },
    stepTitle: {
      color: '#1a3c34',
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '10px'
    },
    stepDescription: {
      color: '#666',
      fontSize: '0.9rem',
      lineHeight: '1.4'
    },
    seasonalSection: {
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23B4D335" fill-opacity="0.05"%3E%3Cpath d="M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm0 48c-9.9 0-18-8.1-18-18s8.1-18 18-18 18 8.1 18 18-8.1 18-18 18z"/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '60px 60px',
        opacity: 0.3
      }
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    seasonalTitle: {
      fontSize: '2.5rem',
      color: props => props.section === 'offers' ? '#ffffff' : '#1a3c34',
      marginBottom: '15px'
    },
    seasonalSubtitle: {
      color: props => props.section === 'offers' ? 'rgba(255, 255, 255, 0.8)' : '#666',
      fontSize: '1.1rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    seasonTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '40px',
      flexWrap: 'wrap'
    },
    seasonTab: {
      padding: '12px 25px',
      borderRadius: '30px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1rem',
      border: '2px solid transparent'
    },
    seasonContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px'
    },
    productCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
      }
    },
    productName: {
      fontSize: '1.2rem',
      color: '#1a3c34',
      marginBottom: '10px'
    },
    productPrice: {
      fontSize: '1.1rem',
      color: '#666',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    discount: {
      background: '#B4D335',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.9rem'
    },
    offersSection: {
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="52" height="26" viewBox="0 0 52 26" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23B4D335" fill-opacity="0.1"%3E%3Cpath d="M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z" /%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '52px 26px',
        opacity: 0.15
      }
    },
    offersContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      gap: '30px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    offerCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      width: '300px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.25)'
      }
    },
    offerIcon: {
      fontSize: '3rem',
      marginBottom: '20px',
      background: 'rgba(255, 255, 255, 0.2)',
      width: '80px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.3s ease'
    },
    offerDiscount: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#1a3c34',
      background: 'linear-gradient(135deg, #B4D335 0%, #1a3c34 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    offerTitle: {
      color: '#1a3c34',
      fontSize: '1.5rem',
      marginBottom: '15px',
      fontWeight: '600'
    },
    offerDescription: {
      color: '#666',
      fontSize: '1.1rem',
      lineHeight: '1.5',
      marginBottom: '20px'
    },
    portalSection: {
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    },
    portalGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    portalItem: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '40px 30px',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      border: '1px solid rgba(26, 60, 52, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      height: '400px'
    },
    portalContent: {
      position: 'relative',
      zIndex: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    portalBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(26, 60, 52, 0.05) 0%, rgba(180, 211, 53, 0.05) 100%)',
      transition: 'all 0.4s ease',
      opacity: 0,
      transform: 'scale(1.1)'
    },
    portalIcon: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      background: '#f5f9ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      color: '#1a3c34',
      marginBottom: '25px',
      transition: 'all 0.4s ease',
      border: '2px solid transparent'
    },
    portalTitle: {
      fontSize: '1.8rem',
      color: '#1a3c34',
      marginBottom: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    portalDescription: {
      color: '#666',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      marginBottom: '30px',
      transition: 'all 0.3s ease'
    },
    portalButton: {
      padding: '12px 30px',
      background: '#1a3c34',
      color: '#ffffff',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    footer: {
      background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)',
      color: '#ffffff',
      padding: '80px 0 40px',
      position: 'relative',
      overflow: 'hidden'
    },
    footerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '40px',
      marginBottom: '60px'
    },
    footerColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    footerLogo: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#B4D335',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    footerAbout: {
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.6',
      marginBottom: '20px'
    },
    footerTitle: {
      color: '#B4D335',
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '20px',
      position: 'relative',
      paddingBottom: '10px',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '40px',
        height: '2px',
        background: '#B4D335'
      }
    },
    footerLink: {
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      '&:hover': {
        color: '#B4D335',
        transform: 'translateX(5px)'
      }
    },
    socialLinks: {
      display: 'flex',
      gap: '15px',
      marginTop: '20px'
    },
    socialIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: '#B4D335',
        transform: 'translateY(-3px)'
      }
    },
    newsletterForm: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    },
    newsletterInput: {
      flex: '1',
      padding: '12px 15px',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      fontSize: '0.9rem',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)'
      }
    },
    newsletterButton: {
      padding: '12px 25px',
      borderRadius: '25px',
      background: '#B4D335',
      color: '#ffffff',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: '#9cb82b',
        transform: 'translateY(-2px)'
      }
    },
    footerBottom: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },
    copyright: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9rem'
    },
    footerNav: {
      display: 'flex',
      gap: '20px'
    },
    footerNavLink: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9rem',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#B4D335'
      }
    },
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePlaceOrder = async (productId, buyerId, buyerName) => {
    const orderData = {
      product: { id: productId },
      buyer: { id: buyerId },
      quantity: 2,
      orderDate: "",
      buyerName: buyerName,
      status: "",
      totalPrice: 0,
      location: location,
    };

    try {
      const response = await axios.post('http://localhost:8080/order/place', orderData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        console.log('Order placed successfully');
        // Handle success
      } else {
        console.error('Failed to place order');
        // Handle failure
      }
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. Hero Section - First impression */}
      <div style={styles.heroSection}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              ...(index === currentSlide ? styles.activeSlide : {})
            }}
          >
            <div 
              style={{
                ...styles.slideBackground,
                backgroundImage: `url(${slide.image})`
              }}
            />
            <div style={styles.slideOverlay}>
              <div style={styles.slideContent}>
                <h2 style={styles.title}>{slide.title}</h2>
                <h1 style={styles.subtitle}>{slide.subtitle}</h1>
                <p style={styles.description}>{slide.description}</p>
                <button 
                  style={styles.registerBtn}
                  onClick={() => navigate('/buyerregistration')}
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          style={{...styles.navButton, ...styles.prevButton}}
          onClick={handlePrevSlide}
        >
          ‹
        </button>
        <button 
          style={{...styles.navButton, ...styles.nextButton}}
          onClick={handleNextSlide}
        >
          ›
        </button>
      </div>

      {/* 2. Portal Section */}
      <div style={styles.portalSection}>
        <div style={styles.sectionHeader}>
          <h2 style={{...styles.seasonalTitle, marginBottom: '20px'}}>Access Portals</h2>
          <p style={styles.seasonalSubtitle}>Choose your portal to get started</p>
        </div>
        <div style={styles.portalGrid}>
          {/* Buyer Portal */}
          <div 
            style={styles.portalItem}
            onClick={() => navigate('/buyerlogin')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              e.currentTarget.querySelector('.portal-icon').style.background = '#1a3c34';
              e.currentTarget.querySelector('.portal-icon').style.color = '#B4D335';
              e.currentTarget.querySelector('.portal-icon').style.borderColor = '#B4D335';
              e.currentTarget.querySelector('.portal-background').style.opacity = '1';
              e.currentTarget.querySelector('.portal-background').style.transform = 'scale(1)';
              e.currentTarget.querySelector('.portal-button').style.background = '#B4D335';
              e.currentTarget.querySelector('.portal-button').style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.querySelector('.portal-icon').style.background = '#f5f9ff';
              e.currentTarget.querySelector('.portal-icon').style.color = '#1a3c34';
              e.currentTarget.querySelector('.portal-icon').style.borderColor = 'transparent';
              e.currentTarget.querySelector('.portal-background').style.opacity = '0';
              e.currentTarget.querySelector('.portal-background').style.transform = 'scale(1.1)';
              e.currentTarget.querySelector('.portal-button').style.background = '#1a3c34';
              e.currentTarget.querySelector('.portal-button').style.transform = 'translateY(0)';
            }}
          >
            <div className="portal-background" style={styles.portalBackground}></div>
            <div style={styles.portalContent}>
              <div>
                <div className="portal-icon" style={styles.portalIcon}>
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3 style={styles.portalTitle}>BUYER PORTAL</h3>
                <p style={styles.portalDescription}>
                  Access fresh produce directly from local farmers. Browse and purchase quality agricultural products.
                </p>
              </div>
              <button className="portal-button" style={styles.portalButton}>
                START SHOPPING
              </button>
            </div>
          </div>

          {/* Farmer Portal */}
          <div 
            style={styles.portalItem}
            onClick={() => navigate('/farmerlogin')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              e.currentTarget.querySelector('.portal-icon').style.background = '#1a3c34';
              e.currentTarget.querySelector('.portal-icon').style.color = '#B4D335';
              e.currentTarget.querySelector('.portal-icon').style.borderColor = '#B4D335';
              e.currentTarget.querySelector('.portal-background').style.opacity = '1';
              e.currentTarget.querySelector('.portal-background').style.transform = 'scale(1)';
              e.currentTarget.querySelector('.portal-button').style.background = '#B4D335';
              e.currentTarget.querySelector('.portal-button').style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.querySelector('.portal-icon').style.background = '#f5f9ff';
              e.currentTarget.querySelector('.portal-icon').style.color = '#1a3c34';
              e.currentTarget.querySelector('.portal-icon').style.borderColor = 'transparent';
              e.currentTarget.querySelector('.portal-background').style.opacity = '0';
              e.currentTarget.querySelector('.portal-background').style.transform = 'scale(1.1)';
              e.currentTarget.querySelector('.portal-button').style.background = '#1a3c34';
              e.currentTarget.querySelector('.portal-button').style.transform = 'translateY(0)';
            }}
          >
            <div className="portal-background" style={styles.portalBackground}></div>
            <div style={styles.portalContent}>
              <div>
                <div className="portal-icon" style={styles.portalIcon}>
                  <i className="fas fa-tractor"></i>
                </div>
                <h3 style={styles.portalTitle}>FARMER PORTAL</h3>
                <p style={styles.portalDescription}>
                  List your products, manage inventory, and connect directly with buyers. Grow your business.
                </p>
              </div>
              <button className="portal-button" style={styles.portalButton}>
                SELL PRODUCTS
              </button>
            </div>
          </div>

          {/* Admin Portal */}
          <div 
            style={styles.portalItem}
            onClick={() => navigate('/adminlogin')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              e.currentTarget.querySelector('.portal-icon').style.background = '#1a3c34';
              e.currentTarget.querySelector('.portal-icon').style.color = '#B4D335';
              e.currentTarget.querySelector('.portal-icon').style.borderColor = '#B4D335';
              e.currentTarget.querySelector('.portal-background').style.opacity = '1';
              e.currentTarget.querySelector('.portal-background').style.transform = 'scale(1)';
              e.currentTarget.querySelector('.portal-button').style.background = '#B4D335';
              e.currentTarget.querySelector('.portal-button').style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.querySelector('.portal-icon').style.background = '#f5f9ff';
              e.currentTarget.querySelector('.portal-icon').style.color = '#1a3c34';
              e.currentTarget.querySelector('.portal-icon').style.borderColor = 'transparent';
              e.currentTarget.querySelector('.portal-background').style.opacity = '0';
              e.currentTarget.querySelector('.portal-background').style.transform = 'scale(1.1)';
              e.currentTarget.querySelector('.portal-button').style.background = '#1a3c34';
              e.currentTarget.querySelector('.portal-button').style.transform = 'translateY(0)';
            }}
          >
            <div className="portal-background" style={styles.portalBackground}></div>
            <div style={styles.portalContent}>
              <div>
                <div className="portal-icon" style={styles.portalIcon}>
                  <i className="fas fa-user-shield"></i>
                </div>
                <h3 style={styles.portalTitle}>ADMIN PORTAL</h3>
                <p style={styles.portalDescription}>
                  Monitor platform activities, manage users, and ensure smooth operations. Complete control.
                </p>
              </div>
              <button className="portal-button" style={styles.portalButton}>
                MANAGE PLATFORM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. How It Works - Understanding the platform */}
      <div style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How AgriConnect Works</h2>
        <p style={styles.sectionSubtitle}>
          Connect directly with farmers and buyers through our simple four-step process
        </p>
        <div style={styles.timelineContainer}>
          <div style={styles.timelineBackground}></div>
          <div style={styles.timeline}>
            <div style={styles.timelineLine}></div>
            <div style={styles.stepsContainer}>
              {howItWorksSteps.map((step, index) => (
                <div 
                  key={index}
                  style={styles.step}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('.icon-container').style.transform = 'translateY(-5px) scale(1.1)';
                    e.currentTarget.querySelector('.icon-container').style.backgroundColor = step.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('.icon-container').style.transform = 'none';
                    e.currentTarget.querySelector('.icon-container').style.backgroundColor = '#B4D335';
                  }}
                >
                  <div className="icon-container" style={styles.iconContainer}>
                    <i className={step.icon} style={styles.icon}></i>
                    <div style={styles.stepNumber}>{index + 1}</div>
                  </div>
                  <div style={styles.stepContent}>
                    <h3 style={styles.stepTitle}>{step.title}</h3>
                    <p style={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Special Offers - Incentives for users */}
      <div style={styles.offersSection}>
        <div style={styles.sectionHeader}>
          <h2 style={{...styles.seasonalTitle, color: '#ffffff'}}>Special Offers</h2>
          <p style={{...styles.seasonalSubtitle, color: 'rgba(255, 255, 255, 0.8)'}}>
            Take advantage of our exclusive deals and save big
          </p>
        </div>
        <div style={styles.offersContainer}>
          {specialOffers.map((offer, index) => (
            <div key={index} style={styles.offerCard}>
              <div style={{...styles.offerIcon, color: offer.color}}>
                <i className={offer.icon}></i>
              </div>
              <h3 style={styles.offerDiscount}>{offer.discount}</h3>
              <h4 style={styles.offerTitle}>{offer.title}</h4>
              <p style={styles.offerDescription}>{offer.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Seasonal Products - Showcasing current offerings */}
      <div style={styles.seasonalSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.seasonalTitle}>Seasonal Products</h2>
          <p style={styles.seasonalSubtitle}>
            Discover fresh and seasonal products available right now
          </p>
        </div>
        <div style={styles.seasonTabs}>
          {seasonalProducts.map((season, index) => (
            <div
              key={index}
              style={{
                ...styles.seasonTab,
                background: currentSeason === index ? season.color : 'transparent',
                color: currentSeason === index ? 'white' : '#666',
                borderColor: currentSeason === index ? 'transparent' : season.color
              }}
              onClick={() => setCurrentSeason(index)}
            >
              <i className={season.icon}></i>
              {season.season}
            </div>
          ))}
        </div>
        <div style={styles.seasonContent}>
          {seasonalProducts[currentSeason].products.map((product, index) => (
            <div key={index} style={styles.productCard}>
              <div>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productPrice}>
                  <span>{product.price}</span>
                  <span style={styles.discount}>{product.discount} OFF</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div id="services" style={{
        display: 'flex',
        gap: '40px',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(26,60,52,0.07)',
        margin: '40px 0',
        padding: '40px 30px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '1 1 260px',
          minWidth: '220px',
          maxWidth: '320px'
        }}>
          <h5 style={{color: '#4CAF50', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '1px'}}>SERVICES</h5>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1a3c34', marginBottom: '18px', lineHeight: '1.1'}}>Organic<br />Farm<br />Services</h2>
          <p style={{color: '#6c757d', fontSize: '1.1rem', marginBottom: 0}}>
            Tempor erat elitr at rebum at at clita. Diam dolor diam ipsum et tempor sit.
            Clita erat ipsum et lorem et sit sed stet labore
          </p>
        </div>
        <div style={{
          display: 'flex',
          gap: '30px',
          flex: '2 1 400px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: '#f5f7fa',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(26,60,52,0.07)',
            padding: '36px 28px 28px 28px',
            textAlign: 'center',
            minWidth: '220px',
            maxWidth: '260px',
            flex: '1 1 220px',
            marginBottom: '10px',
            transition: 'box-shadow 0.2s, transform 0.2s'
          }}>
            <div style={{marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {/* Carrot SVG */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path d="M28 50C39.0457 50 48 41.0457 48 30C48 18.9543 39.0457 10 28 10C16.9543 10 8 18.9543 8 30C8 41.0457 16.9543 50 28 50Z" fill="#B4D335"/>
                <path d="M36 20L20 36" stroke="#1a3c34" strokeWidth="3" strokeLinecap="round"/>
                <path d="M32 16L40 24" stroke="#1a3c34" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{color: '#1a3c34', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px'}}>Fresh Vegetables</h3>
            <p style={{color: '#6c757d', fontSize: '1rem', margin: 0}}>Labore justo vero ipsum sit clita erat lorem magna clita nonumy dolor magna dolor vero</p>
          </div>
          <div style={{
            background: '#f5f7fa',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(26,60,52,0.07)',
            padding: '36px 28px 28px 28px',
            textAlign: 'center',
            minWidth: '220px',
            maxWidth: '260px',
            flex: '1 1 220px',
            marginBottom: '10px',
            transition: 'box-shadow 0.2s, transform 0.2s'
          }}>
            <div style={{marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {/* Apple SVG */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <ellipse cx="28" cy="34" rx="18" ry="16" fill="#B4D335"/>
                <ellipse cx="28" cy="34" rx="14" ry="12" fill="url(#appleGradient)"/>
                <defs>
                  <linearGradient id="appleGradient" x1="14" y1="22" x2="42" y2="46" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B4D335"/>
                    <stop offset="1" stopColor="#FFA500"/>
                  </linearGradient>
                </defs>
                <rect x="26" y="16" width="4" height="8" rx="2" fill="#1a3c34"/>
                <path d="M28 16C29.5 13 32 12 34 14" stroke="#1a3c34" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{color: '#1a3c34', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px'}}>Fresh Fruits</h3>
            <p style={{color: '#6c757d', fontSize: '1rem', margin: 0}}>Labore justo vero ipsum sit clita erat lorem magna clita nonumy dolor magna dolor vero</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)', color: '#fff', marginTop: '60px'}}>
        {/* Top Bar with Social Icons */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', background: '#29443b', padding: '18px 40px 12px 40px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'}}>
          <a href="https://www.linkedin.com/in/jahnavi-yerramsetty-170582286" target="_blank" rel="noopener noreferrer" style={{marginRight: '18px', color: '#B4D335', fontSize: '1.7rem', background: '#22332c', borderRadius: '6px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><i className="fab fa-linkedin-in"></i></a>
  
          <a href="https://github.com/JAHNAVI-YERRAMSETTI" target="_blank" rel="noopener noreferrer" style={{color: '#B4D335', fontSize: '1.7rem', background: '#22332c', borderRadius: '6px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><i className="fab fa-github"></i></a>
        </div>
        {/* Bottom Bar with Navigation */}
        <div style={{background: '#1a3c34', padding: '18px 0 10px 0', textAlign: 'center', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
  <nav style={{marginBottom: '8px'}}>
    <a href="/" style={{color: '#B4D335', margin: '0 18px', fontWeight: 600, textDecoration: 'none'}}>Home</a>

    <span style={{color: '#fff', opacity: 0.3}}>|</span>
    <a href="#services" style={{color: '#fff', margin: '0 18px', textDecoration: 'none'}}>Services</a>
    <span style={{color: '#fff', opacity: 0.3}}>|</span>
    <span style={{color: '#fff', margin: '0 18px'}}>Contact: +91-9876543210</span>
  </nav>
  <div style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem'}}>
    © {new Date().getFullYear()} AgriConnect. All rights reserved.
  </div>
</div>

      </footer>
    </div>
  );
}
