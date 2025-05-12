import "./style.css";
import pic20 from "../assets/pic20.jpg";
import { useState } from "react";
import config from '../config'
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Question", // optional: can be removed if backend doesn't need it
    message: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
  
    const { name, email, phone, message, subject } = form;
  
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      alert("Please fill out all the required fields.");
      return;
    }
  
    // Decide recipient based on subject
    const recipientRole = subject === "Feedback" ? "farmer" : "admin";
  
    const payload = { ...form, recipientRole };
  
   fetch(`${config.url}/api/contact/submit`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.text())
      .then(() => {
        alert("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "General Question",
          message: ""
        });
      })
      .catch(() => alert("Something went wrong!"));
  }
  
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-form-section">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-desc">
            Interested in knowing more, requesting a large product order, or would just like to say hi? Fill the form below to get in touch with our team.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="contact-input" />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="contact-input" />
            </div>
            <div className="contact-row">
              <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="contact-input" />
              {/* Optional: remove subject field if not needed */}
              <select name="subject" value={form.subject} onChange={handleChange} className="contact-input">
                <option>General Question</option>
                <option>Order Inquiry</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="contact-input contact-message" rows={4}></textarea>

            {/* Removed recipientRole selection completely */}

            <button type="submit" className="contact-send-btn">Send Message &rarr;</button>
          </form>
        </div>
        <div className="contact-image-section" style={{ backgroundImage: `url(${pic20})` }}>
          <div className="contact-image-overlay"></div>
        </div>
      </div>
    </div>
  );
}
