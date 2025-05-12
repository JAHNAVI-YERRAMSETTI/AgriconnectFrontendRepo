import { useState } from 'react';

export default function OtpVerification({ email }) {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');

  const handleOtpSubmit = (e) => {
    e.preventDefault();
  
    setStatus("❌ OTP not sent. Please try again later.");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>OTP Verification</h2>
        <p style={styles.subtitle}>
          We’ve sent a verification code to your email:<br />
          <span style={styles.email}>{email}</span>
        </p>

        <form onSubmit={handleOtpSubmit} style={styles.form}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter verification code"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>

        {status && <p style={styles.error}>{status}</p>}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #c3ecb2 0%, #7dd56f 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    fontSize: '24px',
    color: '#1a3c34',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px'
  },
  email: {
    fontWeight: 'bold',
    color: '#1a3c34'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    background: '#1a3c34',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: {
    marginTop: '15px',
    color: '#d32f2f',
    fontWeight: '500'
  }
};
