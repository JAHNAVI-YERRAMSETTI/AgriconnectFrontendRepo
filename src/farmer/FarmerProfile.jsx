import React, { useEffect, useState } from 'react';
import './farmer.css'; // Reuse buyer styles if needed

export default function FarmerProfile() {
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('farmer'); // ✅ sessionStorage
    if (stored) {
      setFarmer(JSON.parse(stored));
    }
  }, []);

  if (!farmer) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 style={{ marginBottom: '20px', color: '#1a3c34' }}>Farmer Profile</h2>
        <p><strong>Name:</strong> {farmer.name}</p>
        <p><strong>Gender:</strong> {farmer.gender}</p>
        <p><strong>Date of Birth:</strong> {farmer.dob}</p>
        <p><strong>Email:</strong> {farmer.email}</p>
        <p><strong>Username:</strong> {farmer.username}</p>
        <p><strong>Mobile No:</strong> {farmer.mobileno}</p>
        <p><strong>Location:</strong> {farmer.location}</p>
      </div>
    </div>
  );
}
