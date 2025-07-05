import React from 'react'
import './Locations.css' // Assuming you have a CSS file for styling
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa'

const whatsappNumber = '27721234567' // WhatsApp number without +
const whatsappMessage = encodeURIComponent('Hi! I would like to know more about your store.')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

// This component displays the location of the store with a map and contact information
const Locations = () => {
  return (
    <div className="contact-container">
      <div className="map-section">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.5250471092836!2d28.006866474504548!3d-26.016371477192777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9577e5549fd733%3A0x88c2c2dc2aa65b17!2sTECHNOLOGY%20GALORE%20-%20TG!5e0!3m2!1sen!2sza!4v1751699111797!5m2!1sen!2sza&t=m&z=15" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="TechGalore Store Location"
        />
      </div>
      <div className="info-section">
        <h1 className="locations-heading"><FaMapMarkerAlt style={{ marginRight: 8, color: '#2563eb' }} />Store Locator</h1>
        <h2 className="locations-subheading">Visit Our TechGalore Showroom</h2>
        <div className="locations-detail-row">
          <FaMapMarkerAlt className="icon" />
          <span><strong>Address:</strong> 123 Tech Avenue, Sandton, Johannesburg</span>
        </div>
        <div className="locations-detail-row">
          <FaPhoneAlt className="icon" />
          <span><strong>Phone:</strong> <a href="tel:+27721234567">+27 72 123 4567</a></span>
        </div>
        <div className="locations-detail-row">
          <FaEnvelope className="icon" />
          <span><strong>Email:</strong> <a href="mailto:support@yourstore.co.za">support@yourstore.co.za</a></span>
        </div>
        <div className="locations-detail-row">
          <FaClock className="icon" />
          <span><strong>Business Hours:</strong></span>
        </div>
        <ul className="locations-hours">
          <li>Mon–Fri: 9:00 AM – 6:00 PM</li>
          <li>Sat: 10:00 AM – 4:00 PM</li>
          <li>Sun & Public Holidays: Closed</li>
        </ul>
        <a
          href={whatsappUrl}
          className="whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="icon" /> Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Locations
