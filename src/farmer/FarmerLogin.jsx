import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';
import './farmer.css';

export default function FarmerLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { setIsFarmerLoggedIn, setFarmer } = useAuth();

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (validationErrors[id]) {
      setValidationErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${config.url}/farmer/checkfarmerlogin`, formData);

      if (response.status === 200) {
        setIsFarmerLoggedIn(true);
        setFarmer(response.data);
        sessionStorage.setItem("isFarmerLoggedIn", "true");
        sessionStorage.setItem("farmer", JSON.stringify(response.data));
        navigate("/farmerhome");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setError(error.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="farmer-login-container">
      <div className="farmer-login-pattern"></div>

      <div className="farmer-login-header">
        <div className="farmer-login-icon">
          <i className="fas fa-tractor"></i>
        </div>
        <h3>Farmer Portal</h3>
      </div>

      <div className="farmer-form-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          {validationErrors.username && <p className="farmer-message" style={{ color: 'red' }}>{validationErrors.username}</p>}

          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {validationErrors.password && <p className="farmer-message" style={{ color: 'red' }}>{validationErrors.password}</p>}

          <button type="submit">Login</button>
          {message && <p className="farmer-message" style={{ color: 'green' }}>{message}</p>}
          {error && <p className="farmer-message" style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
