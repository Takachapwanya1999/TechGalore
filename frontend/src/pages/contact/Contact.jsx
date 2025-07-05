import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaBuilding } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our team for any inquiries or support</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <FaBuilding />
              </div>
              <div className="contact-details">
                <h3>Company Information</h3>
                <p><strong>Technology Galore (Pty) Ltd</strong></p>
                <p>Registration: 2013/013521/07</p>
                <p>Suite 45 Building 1, Prism Business Park</p>
                <p>1 Ruby Close, Fourways</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+27 62 016 7209</p>
                <p>Available: Monday - Friday, 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>sales@technologygalore.co.za</p>
                <p>neil@technologygalore.co.za</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaWhatsapp />
              </div>
              <div className="contact-details">
                <h3>WhatsApp</h3>
                <p>+27 62 016 7209</p>
                <p>Quick responses for urgent inquiries</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaClock />
              </div>
              <div className="contact-details">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h3>Visit Us</h3>
                <p>Suite 45 Building 1</p>
                <p>Prism Business Park</p>
                <p>1 Ruby Close, Fourways</p>
                <p>Johannesburg, South Africa</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2 className="section-title">Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="sales">Sales Question</option>
                  <option value="support">Technical Support</option>
                  <option value="warranty">Warranty Claim</option>
                  <option value="trade-in">Trade-in Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Please describe your inquiry in detail..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="contact-footer">
        <h3>Why Choose Technology Galore?</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>Expert Support</h4>
            <p>Our team of tech experts is here to help you with any questions about our products and services.</p>
          </div>
          <div className="feature">
            <h4>Quality Guarantee</h4>
            <p>All our products undergo thorough testing and come with our quality assurance guarantee.</p>
          </div>
          <div className="feature">
            <h4>Fast Response</h4>
            <p>We typically respond to inquiries within 2-4 hours during business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
