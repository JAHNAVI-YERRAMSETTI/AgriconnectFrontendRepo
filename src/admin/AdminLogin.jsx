import { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const { setIsAdminLoggedIn, setAdmin } = useAuth();

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Clear validation error when user starts typing
    if (validationErrors[id]) {
      setValidationErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${config.url}/api/admin/login`, formData);
      if (response.status === 200) {
        // Store the JWT token
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        
        setIsAdminLoggedIn(true);
        setAdmin(user);
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("admin", JSON.stringify(user));
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        navigate("/adminhome");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        setError(error.response.data.message || "Login failed. Please check your credentials and try again.");
      } else {
        setError("An unexpected error occurred. Please check the server connection.");
      }
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdmin(null);
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("admin");
    window.location.href = "/adminlogin";
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23B4D335\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm0 48c-9.9 0-18-8.1-18-18s8.1-18 18-18 18 8.1 18 18-8.1 18-18 18z\'/%3E%3C/g%3E%3C/svg%3E")',
      backgroundSize: '60px 60px',
      opacity: 0.5,
      zIndex: 0
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '40px',
      zIndex: 1
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
      cursor: 'pointer'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      color: '#B4D335'
    },
    logoIcon: {
      fontSize: '2.5rem',
      color: '#B4D335'
    },
    logoText: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#B4D335'
    },
    adminIcon: {
      width: '60px',
      height: '60px',
      background: '#B4D335',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(180, 211, 53, 0.3)',
      marginBottom: '10px'
    },
    adminIconInner: {
      fontSize: '1.8rem',
      color: '#1a3c34'
    },
    adminText: {
      fontSize: '1.1rem',
      color: '#B4D335',
      fontWeight: '500',
      textAlign: 'center',
      opacity: '0.9'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      position: 'relative',
      zIndex: 1,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(180, 211, 53, 0.2)'
    },
    title: {
      fontSize: '2rem',
      color: '#1a3c34',
      marginBottom: '30px',
      textAlign: 'center',
      fontWeight: '600'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      color: '#1a3c34',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    input: {
      padding: '12px 15px',
      borderRadius: '10px',
      border: '1px solid rgba(26, 60, 52, 0.2)',
      fontSize: '1rem'
    },
    submitButton: {
      background: '#B4D335',
      color: '#1a3c34',
      padding: '15px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px'
    },
    forgotPassword: {
      textAlign: 'right',
      color: '#1a3c34',
      fontSize: '0.8rem',
      cursor: 'pointer',
      marginTop: '10px'
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.header}>
        <div style={styles.logoContainer} onClick={() => navigate('/')}>
          <div style={styles.logo}>
            <i className="fas fa-leaf" style={styles.logoIcon}></i>
            <span style={styles.logoText}>AgriConnect</span>
          </div>
        </div>
        
        <div style={styles.adminIcon}>
          <i className="fas fa-user-shield" style={styles.adminIconInner}></i>
        </div>
        <div style={styles.adminText}>Admin Portal</div>
      </div>

      <div style={styles.formContainer}>
        <h1 style={styles.title}>Welcome Back</h1>
        
        {message ? (
          <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p>
        ) : (
          <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                borderColor: validationErrors.username ? '#dc3545' : 'rgba(26, 60, 52, 0.2)'
              }}
            />
            {validationErrors.username && (
              <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>
                {validationErrors.username}
              </div>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                borderColor: validationErrors.password ? '#dc3545' : 'rgba(26, 60, 52, 0.2)'
              }}
            />
            {validationErrors.password && (
              <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>
                {validationErrors.password}
              </div>
            )}
          </div>

          <div style={styles.forgotPassword} onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </div>

          <button type="submit" style={styles.submitButton}>Login</button>
        </form>
      </div>
    </div>
  );
}