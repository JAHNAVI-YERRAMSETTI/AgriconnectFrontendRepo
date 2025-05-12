import { useEffect, useState } from "react";
import "./farmer.css"; // Adjust styling as needed
import config from '../config'
export default function UserFeedback() {
  const [feedbackMessages, setFeedbackMessages] = useState([]);

  useEffect(() => {
fetch(`${config.url}/api/contact/messages/farmer`)
      .then((res) => res.json())
      .then((data) => setFeedbackMessages(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  return (
    <div className="feedback-container">
      <h2>Feedback Received from Users</h2>
      {feedbackMessages.length === 0 ? (
        <p>No feedback messages available.</p>
      ) : (
        <ul className="feedback-list">
          {feedbackMessages.map((msg, index) => (
            <li key={index} className="feedback-item">
              <h4>{msg.name} ({msg.email})</h4>
              <p><strong>Phone:</strong> {msg.phone}</p>
              <p><strong>Message:</strong> {msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
