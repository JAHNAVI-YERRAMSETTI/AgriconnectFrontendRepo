import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function BuyerLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const { setIsBuyerLoggedIn, setBuyer } = useAuth();

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(formData.password)) {
      errors.password = 'Password can only contain letters, numbers, and special characters';
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
      const response = await axios.post(`${config.url}/buyer/checkbuyerlogin`, formData);

      if (response.status === 200) {
        setIsBuyerLoggedIn(true);
        setBuyer(response.data);
        localStorage.setItem("isBuyerLoggedIn", "true");
        localStorage.setItem("buyer", JSON.stringify(response.data));
        navigate("/buyerhome");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      setError(error.response?.data || "Login failed. Please check your credentials and try again.");
    }
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
    buyerIcon: {
      width: '60px',
      height: '60px',
      background: '#B4D335',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(180, 211, 53, 0.3)',
      marginBottom: '10px',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 20px rgba(180, 211, 53, 0.4)'
      }
    },
    buyerIconInner: {
      fontSize: '1.8rem',
      color: '#1a3c34'
    },
    buyerText: {
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
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      '&:focus': {
        outline: 'none',
        borderColor: '#B4D335',
        boxShadow: '0 0 0 3px rgba(180, 211, 53, 0.2)'
      }
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
      transition: 'all 0.3s ease',
      marginTop: '20px',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(180, 211, 53, 0.3)'
      }
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#1a3c34',
      fontSize: '0.9rem'
    },
    registerButton: {
      color: '#B4D335',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '5px',
      cursor: 'pointer',
      '&:hover': {
        color: '#1a3c34'
      }
    },
    forgotPassword: {
      textAlign: 'right',
      fontSize: '0.9rem',
      color: '#1a3c34',
      textDecoration: 'none',
      fontWeight: '500',
      marginTop: '-15px',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#B4D335'
      }
    },
    messageContainer: {
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24'
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
        
        <div style={styles.buyerIcon}>
          <i className="fas fa-shopping-cart" style={styles.buyerIconInner}></i>
        </div>
        <div style={styles.buyerText}>Buyer Portal</div>
      </div>

      <div style={styles.formContainer}>
        <h1 style={styles.title}>Welcome Back</h1>
        
        {message && (
          <div style={{...styles.messageContainer, ...styles.successMessage}}>
            {message}
          </div>
        )}
        {error && (
          <div style={{...styles.messageContainer, ...styles.errorMessage}}>
            {error}
          </div>
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
              placeholder="Enter your username"
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
              placeholder="Enter your password"
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

          <button type="submit" style={{
            ...styles.submitButton,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 15px rgba(180, 211, 53, 0.3)'
            }
          }}>
            Login
          </button>
        </form>

        <div style={styles.registerLink}>
          Don't have an account?
          <span 
            style={styles.registerButton}
            onClick={() => navigate('/buyerregistration')}
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}