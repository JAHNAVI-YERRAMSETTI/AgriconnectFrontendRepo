import React, { useState } from 'react';
import axios from 'axios';

function SubmitFeedback() {
  const role = 'Farmer';

  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
    role: role,
  });

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/feedback', feedback) // ✅ Only path, no full URL
      .then(() => {
        alert('Feedback submitted successfully!');
        setFeedback({ name: '', email: '', message: '', role });
      })
      .catch((err) => {
        console.error('Error submitting feedback:', err);
        alert('Something went wrong. Please try again later.');
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={feedback.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={feedback.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={feedback.message}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0', height: '100px' }}
        ></textarea>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmitFeedback;
