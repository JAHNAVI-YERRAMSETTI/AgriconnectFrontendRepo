import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function ViewFarmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        // Corrected API path to include /api prefix
        const response = await axios.get(`${config.url}/api/admin/farmers`);
        setFarmers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching farmers:", err);
        setError("Failed to load farmers");
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      try {
        // Corrected API path to include /api prefix
        await axios.delete(`${config.url}/api/admin/farmer/${id}`);
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      } catch (err) {
        console.error("Error deleting farmer:", err);
        setError("Failed to delete farmer");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>All Farmers</h3>
      {farmers.length === 0 ? (
        <p>No farmers found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Username</th>
              <th>Mobile</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map(farmer => (
              <tr key={farmer.id}>
                <td>{farmer.id}</td>
                <td>{farmer.name}</td>
                <td>{farmer.gender}</td>
                <td>{farmer.email}</td>
                <td>{farmer.username}</td>
                <td>{farmer.mobileno}</td>
                <td>{farmer.location}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(farmer.id)} 
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