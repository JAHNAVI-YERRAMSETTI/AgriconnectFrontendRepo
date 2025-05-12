import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';
import { useCart } from './cartContext';
import './buyer.css';

import riceImg from '../assets/rice.jpeg';
import wheatImg from '../assets/wheat.jpeg';
import mangoImg from '../assets/mango.jpeg';
import grainsImg from '../assets/pic16.jpeg';
import dalImg from '../assets/pic18.jpeg';
import peanutImg from '../assets/pic6.jpg';
import chilliImg from '../assets/redchillypic.jpeg';
import jeeraImg from '../assets/jeera.webp';

const productImages = {
  rice: riceImg,
  wheat: wheatImg,
  mango: mangoImg,
  grains: grainsImg,
  dal: dalImg,
  peanut: peanutImg,
  chilly: chilliImg,
  chilli: chilliImg,
  jeera: jeeraImg,
};

export default function ViewProducts() {
  const { buyer } = useAuth();
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const getAvailableStock = (product) => {
    const cartItem = cart.find(item => item.product.id === product.id);
    return product.quantity - (cartItem ? cartItem.quantity : 0);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/product/viewall`);
      setProducts(response.data);
    } catch (err) {
      setError("Error fetching products");
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      fetchProducts();
      return;
    }

    try {
      const response = await axios.get(`${config.url}/product/search/${searchTerm}`);
      setProducts(response.data);
    } catch (err) {
      setError("Search failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!buyer) {
      alert("Please log in to add to cart.");
      return;
    }
    const available = getAvailableStock(product);
    if (available <= 0) {
      setMessage('Out of stock!');
      setTimeout(() => setMessage(''), 1500);
      return;
    }
    addToCart(product, 1);
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 1500);
  };

  return (
    <div className="view-products-container">
      <h3 className="view-products-title modern-title">Available Products</h3>

      <div className="search-bar modern-search-bar">
        <input
          type="text"
          placeholder="Search for fresh produce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}><i className="fas fa-search"></i> Search</button>
      </div>

      {error && <p className="error-msg">{error}</p>}
      {message && <p className="success-msg">{message}</p>}

      <div className="product-cards-grid">
        {products.map(p => {
          const available = getAvailableStock(p);
          const imageUrl = p.image
            ? `http://localhost:2047/uploads/${p.image}`
            : productImages[p.name?.toLowerCase()] || null;

          return (
            <div key={p.id} className="product-card">
              <div className="product-image-placeholder">
                {imageUrl ? (
                  <img src={imageUrl} alt={p.name} className="product-image" />
                ) : (
                  <span>{p.name}</span>
                )}
              </div>
              <div className="product-card-content">
                <h4 className="product-name">{p.name}</h4>
                <div className="product-meta">
                  <span className="product-category">{p.category}</span>
                  <span className="product-farmer">By: {p.farmer?.name || 'N/A'}</span>
                </div>
                <p className="product-description">{p.description || 'No description available.'}</p>
                <div className="product-details-row">
                  <span className="product-price">₹{p.price}</span>
                  <span className="product-quantity">Stock: {available}</span>
                </div>
                <div className="product-action-row">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="add-to-cart-btn"
                    disabled={available <= 0}
                  >
                    {available <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
