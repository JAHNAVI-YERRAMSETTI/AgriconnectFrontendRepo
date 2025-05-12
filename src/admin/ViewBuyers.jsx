import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewBuyers() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        // Corrected API path to include /api prefix
        const response = await axios.get(`${config.url}/api/admin/buyers`);
        setBuyers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching buyers:", err);
        setError("Failed to load buyers");
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this buyer?")) {
      try {
        // Corrected API path to include /api prefix
        await axios.delete(`${config.url}/api/admin/buyer/${id}`);
        setBuyers(buyers.filter(buyer => buyer.id !== id));
      } catch (err) {
        console.error("Error deleting buyer:", err);
        setError("Failed to delete buyer");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>All Buyers</h3>
      {buyers.length === 0 ? (
        <p>No buyers found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map(buyer => (
              <tr key={buyer.id}>
                <td>{buyer.id}</td>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>{buyer.username}</td>
                <td>{buyer.mobileno}</td>
                <td>{buyer.address}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(buyer.id)} 
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}