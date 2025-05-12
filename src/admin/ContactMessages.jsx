import { useEffect, useState } from "react";
import config from '../config'
export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
  fetch(`${config.url}/api/contact/messages/admin`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => alert("Failed to load messages."));
  }, []);

  return (
    <div className="contact-messages">
      <h2>Contact Messages for Admin</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.name}</strong> ({msg.email})<br />
              <em>{msg.subject}</em><br />
              {msg.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
