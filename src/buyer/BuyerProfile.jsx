import React, { useEffect, useState } from 'react';
import './buyer.css'; // Optional: use your CSS styles

export default function BuyerProfile() {
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
  const storedBuyer = sessionStorage.getItem('buyer') || localStorage.getItem('buyer');
  if (storedBuyer) {
    setBuyer(JSON.parse(storedBuyer));
  }
}, []);


  if (!buyer) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 style={{ marginBottom: '20px', color: '#1a3c34' }}>Buyer Profile</h2>
        <p><strong>Name:</strong> {buyer.name}</p>
        <p><strong>Gender:</strong> {buyer.gender}</p>
        <p><strong>Date of Birth:</strong> {buyer.dob}</p>
        <p><strong>Email:</strong> {buyer.email}</p>
        <p><strong>Username:</strong> {buyer.username}</p>
        <p><strong>Mobile No:</strong> {buyer.mobileno}</p>
        <p><strong>Location:</strong> {buyer.location}</p>
      </div>
    </div>
  );
}
