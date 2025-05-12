import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useAuth } from '../contextapi/AuthContext';

export default function ManageProducts() {
  const { farmer } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

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

  const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${config.url}/product/delete?id=${id}`);
    alert(response.data);
    fetchProducts();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data || "Failed to delete product");
  }
};


  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${config.url}/product/update?id=${currentProduct.id}`, 
        formData
      );
      alert("Product updated successfully");
      setEditMode(false);
      setCurrentProduct(null);
      fetchProducts();
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setCurrentProduct(null);
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Manage Products</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {editMode ? (
        <div className="edit-form">
          <h4>Edit Product</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <input 
                type="text" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input 
                type="number" 
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Button onClick={cancelEdit} variant="outlined">
              Cancel
            </Button>
          </form>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    startIcon={<EditIcon />} 
                    onClick={() => handleEdit(p)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<DeleteIcon />} 
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}