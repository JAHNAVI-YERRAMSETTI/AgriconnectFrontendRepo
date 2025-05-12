import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const validatePassword = () => {
    const errors = {};
    
    if (!formData.newPassword) {
      errors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters long';
    } else if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(formData.newPassword)) {
      errors.newPassword = 'Password can only contain letters, numbers, and special characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${config.url}/auth/forgot-password`, { email: formData.email });
      if (response.data.success) {
        setStep(2);
        setMessage('OTP sent to your email. Please check your inbox.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${config.url}/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });
      if (response.data.success) {
        setStep(3);
        setMessage('OTP verified successfully. Please set your new password.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await axios.post(`${config.url}/auth/reset-password`, {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      if (response.data.success) {
        setMessage('Password reset successful. Please login with your new password.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
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
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%231a3c34\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm0 48c-9.9 0-18-8.1-18-18s8.1-18 18-18 18 8.1 18 18-8.1 18-18 18z\'/%3E%3C/g%3E%3C/svg%3E")',
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
      color: '#1a3c34'
    },
    logoIcon: {
      fontSize: '2.5rem',
      color: '#B4D335'
    },
    logoText: {
      fontSize: '2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(26, 60, 52, 0.1)',
      width: '100%',
      maxWidth: '400px',
      position: 'relative',
      zIndex: 1,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(26, 60, 52, 0.1)'
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
        borderColor: '#1a3c34',
        boxShadow: '0 0 0 3px rgba(26, 60, 52, 0.2)'
      }
    },
    submitButton: {
      background: 'linear-gradient(135deg, #1a3c34 0%, #2a5a4e 100%)',
      color: 'white',
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
        boxShadow: '0 5px 15px rgba(26, 60, 52, 0.3)'
      }
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#666',
      fontSize: '0.9rem'
    },
    loginButton: {
      color: '#1a3c34',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '5px',
      cursor: 'pointer',
      '&:hover': {
        color: '#B4D335'
      }
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
      </div>

      <div style={styles.formContainer}>
        <h1 style={styles.title}>Reset Password</h1>
        
        {message && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}
        
        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOTP} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                style={styles.input}
                autoComplete="email"
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="otp" style={styles.label}>Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                placeholder="Enter OTP sent to your email"
                style={styles.input}
                autoComplete="one-time-code"
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="newPassword" style={styles.label}>New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                placeholder="Enter new password"
                style={{
                  ...styles.input,
                  borderColor: validationErrors.newPassword ? '#dc3545' : 'rgba(26, 60, 52, 0.2)'
                }}
                autoComplete="new-password"
              />
              {validationErrors.newPassword && (
                <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>
                  {validationErrors.newPassword}
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm new password"
                style={{
                  ...styles.input,
                  borderColor: validationErrors.confirmPassword ? '#dc3545' : 'rgba(26, 60, 52, 0.2)'
                }}
                autoComplete="new-password"
              />
              {validationErrors.confirmPassword && (
                <div style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '4px' }}>
                  {validationErrors.confirmPassword}
                </div>
              )}
            </div>
            <button type="submit" style={styles.submitButton}>
              Reset Password
            </button>
          </form>
        )}

        <div style={styles.loginLink}>
          Remember your password?
          <span 
            style={styles.loginButton}
            onClick={() => navigate('/buyerlogin')}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
} 