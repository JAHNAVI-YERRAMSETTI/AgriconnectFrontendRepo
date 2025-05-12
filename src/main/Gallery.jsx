import React, { useState } from 'react';
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import pic4 from '../assets/pic4.jpg';
import pic5 from '../assets/pic5.jpg';
import pic6 from '../assets/pic6.jpg';
import pic7 from '../assets/pic7.jpg';
import pic8 from '../assets/pic8.jpg';
import pic9 from '../assets/pic9.jpg';
import pic12 from '../assets/pic12.jpg';
import pic13 from '../assets/pic13.jpg';
import pic14 from '../assets/pic14.jpg';
import pic15 from '../assets/pic15.jpeg';
import pic16 from '../assets/pic16.jpeg';
import pic17 from '../assets/pic17.jpg';
import pic18 from '../assets/pic18.jpeg';
import pic19 from '../assets/pic19.jpeg';
import pic23 from '../assets/pic23.jpeg';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'grains', label: 'Grains' }
  ];

  const galleryItems = [
    // Fruits Category
    { 
      image: pic1,
      category: 'fruits',
      title: 'Fresh Grapes',
      description: 'Sweet and juicy purple grapes, perfect for snacking'
    },
    { 
      image: pic4,
      category: 'fruits',
      title: 'Fresh Strawberries',
      description: 'Ripe and sweet seasonal strawberries'
    },
    { 
      image: pic5,
      category: 'fruits',
      title: 'Fresh Apples',
      description: 'Crisp and sweet apples from local orchards'
    },
    { 
      image: pic9,
      category: 'fruits',
      title: 'Green Grapes',
      description: 'Sweet and fresh green grape clusters'
    },
    { 
      image: pic12,
      category: 'fruits',
      title: 'Mixed Fruits',
      description: 'Assorted fresh fruits from local farms'
    },
    { 
      image: pic13,
      category: 'fruits',
      title: 'Seasonal Fruits',
      description: 'Fresh seasonal fruits hand-picked daily'
    },

    // Vegetables Category
    { 
      image: pic2,
      category: 'vegetables',
      title: 'Fresh Potatoes',
      description: 'Farm-fresh potatoes for your daily needs'
    },
    { 
      image: pic3,
      category: 'vegetables',
      title: 'Green Vegetables',
      description: 'Fresh green vegetables from local farms'
    },
    { 
      image: pic7,
      category: 'vegetables',
      title: 'Root Vegetables',
      description: 'Fresh root vegetables for cooking'
    },
    { 
      image: pic8,
      category: 'vegetables',
      title: 'Fresh Onions',
      description: 'Quality onions for your kitchen'
    },
    { 
      image: pic14,
      category: 'vegetables',
      title: 'Leafy Greens',
      description: 'Fresh leafy vegetables for healthy eating'
    },
    { 
      image: pic15,
      category: 'vegetables',
      title: 'Mixed Vegetables',
      description: 'Assorted fresh vegetables from local farms'
    },

    // Grains Category
    { 
      image: pic6,
      category: 'grains',
      title: 'Whole Grains',
      description: 'Nutritious whole grains for healthy living'
    },
    { 
      image: pic16,
      category: 'grains',
      title: 'Premium Rice',
      description: 'High-quality rice grains'
    },
    { 
      image: pic17,
      category: 'grains',
      title: 'Organic Wheat',
      description: 'Organic wheat grains from local farms'
    },
    { 
      image: pic18,
      category: 'grains',
      title: 'Mixed Grains',
      description: 'Assorted grains for diverse cooking needs'
    },
    { 
      image: pic19,
      category: 'grains',
      title: 'Special Grains',
      description: 'Special variety of grains for healthy diet'
    },
    { 
      image: pic23,
      category: 'grains',
      title: 'Premium Grains',
      description: 'Premium quality grains for your kitchen'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory.toLowerCase()
  );

  const styles = {
    container: {
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '2.5rem',
      color: '#1a3c34',
      marginBottom: '15px'
    },
    subtitle: {
      color: '#666',
      fontSize: '1rem',
      marginBottom: '30px'
    },
    categories: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '40px',
      flexWrap: 'wrap'
    },
    categoryButton: (isActive) => ({
      padding: '12px 24px',
      border: 'none',
      backgroundColor: isActive ? '#1a3c34' : '#B4D335',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      fontWeight: '500',
      borderRadius: '4px',
      textTransform: 'uppercase'
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '25px',
      padding: '20px'
    },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden',
      aspectRatio: '1',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      backgroundColor: '#fff'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease'
    },
    overlay: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(26, 60, 52, 0.9)',
      padding: '20px',
      transform: 'translateY(100%)',
      transition: 'transform 0.3s ease'
    },
    imageTitle: {
      color: 'white',
      margin: '0 0 8px 0',
      fontSize: '1.2rem',
      fontWeight: '600'
    },
    description: {
      color: '#B4D335',
      margin: '0',
      fontSize: '0.9rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Agricultural Products Gallery</h1>
        <p style={styles.subtitle}>
          Explore our fresh, organic, and locally sourced agricultural products
        </p>
      </div>

      <div style={styles.categories}>
        {categories.map(category => (
          <button
            key={category.id}
            style={styles.categoryButton(selectedCategory === category.label)}
            onClick={() => setSelectedCategory(category.label)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredItems.map((item, index) => (
          <div 
            key={index}
            style={styles.imageContainer}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img 
              src={item.image} 
              alt={item.title}
              style={{
                ...styles.image,
                transform: hoveredItem === index ? 'scale(1.1)' : 'scale(1)'
              }}
            />
            <div 
              style={{
                ...styles.overlay,
                transform: hoveredItem === index ? 'translateY(0)' : 'translateY(100%)'
              }}
            >
              <h3 style={styles.imageTitle}>{item.title}</h3>
              <p style={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 