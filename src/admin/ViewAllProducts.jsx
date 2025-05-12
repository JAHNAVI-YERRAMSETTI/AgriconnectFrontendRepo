import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewAllProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/product/viewall`);
      setProducts(response.data);
    } catch (err) {
      alert("Failed to fetch products");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${config.url}/product/delete?id=${id}`);
        fetchProducts();
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  const startEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleEditChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${config.url}/product/update?id=${editingProduct.id}`, editingProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert("Failed to update product");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', textDecoration: 'underline' }}>
        All Products
      </h3>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td style={tdStyle}>{prod.id}</td>
                <td style={tdStyle}>{editingProduct?.id === prod.id
                  ? <input name="name" value={editingProduct?.name || ""} onChange={handleEditChange} />
                  : prod.name}
                </td>
                <td style={tdStyle}>{editingProduct?.id === prod.id
                  ? <input name="category" value={editingProduct?.category || ""} onChange={handleEditChange} />
                  : prod.category}
                </td>
                <td style={tdStyle}>{editingProduct?.id === prod.id
                  ? <input type="number" name="quantity" value={editingProduct?.quantity ?? ""} onChange={handleEditChange} />
                  : prod.quantity}
                </td>
                <td style={tdStyle}>{editingProduct?.id === prod.id
                  ? <input type="number" name="price" value={editingProduct?.price ?? ""} onChange={handleEditChange} />
                  : `₹${prod.price}`}
                </td>
                <td style={tdStyle}>{editingProduct?.id === prod.id
                  ? <input name="description" value={editingProduct?.description || ""} onChange={handleEditChange} />
                  : prod.description}
                </td>
                <td style={tdStyle}>
                  {editingProduct?.id === prod.id ? (
                    <>
                      <button onClick={saveEdit} style={btnStyle}>Save</button>
                      <button onClick={() => setEditingProduct(null)} style={btnStyle}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(prod)} style={btnStyle}>Edit</button>
                      <button onClick={() => deleteProduct(prod.id)} style={btnStyle}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd'
};

const btnStyle = {
  margin: '2px',
  padding: '5px 10px',
  cursor: 'pointer'
};
