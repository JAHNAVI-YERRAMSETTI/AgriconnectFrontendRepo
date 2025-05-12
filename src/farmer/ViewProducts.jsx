import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function ViewProducts() {
  const { farmer } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.post(`${config.url}/product/viewbyfarmer`, farmer);
      setProducts(response.data);
    } catch (err) {
      setError("Error fetching products");
    }
  };

  useEffect(() => {
    if (farmer) fetchProducts();
  }, [farmer]);

  return (
    <div>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Your Products</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}