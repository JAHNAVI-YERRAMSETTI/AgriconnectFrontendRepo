import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function AddProduct() {
  const { farmer } = useAuth();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (farmer) {
      setLoading(false);
    }
  }, [farmer]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!farmer || !farmer.id) {
      setError("Farmer information is missing.");
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('farmerId', farmer.id);
    formData.append('image', product.image);

    try {
      const response = await axios.post(`${config.url}/product/addwithimage`, formData);
      setMessage(response.data);
      setError('');
      setProduct({
        name: '',
        category: '',
        description: '',
        price: '',
        quantity: '',
        image: null,
      });
    } catch (err) {
      console.error("Product Add Error:", err);
      setError(err.response?.data || 'Something went wrong');
      setMessage('');
    }
  };

  if (loading) return <p>Loading farmer data...</p>;

  return (
    <div className="add-product-card" style={{ minHeight: '100vh', background: '#f6f8f7', padding: '40px 0' }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', textDecoration: 'underline', color: '#1a3c34', marginBottom: 24 }}>Add Product</h3>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="add-product-form" encType="multipart/form-data">
          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
          <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}
