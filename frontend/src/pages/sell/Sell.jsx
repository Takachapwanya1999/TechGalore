import React, { useState } from 'react';
import { FaLaptop, FaMoneyBillWave, FaShieldAlt, FaTruck, FaCalculator, FaCheckCircle, FaClock, FaStar, FaCamera } from 'react-icons/fa';
import './Sell.css';

export default function Sell() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    laptopBrand: '',
    laptopModel: '',
    condition: '',
    age: '',
    description: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Check if adding these files would exceed the limit
    if (images.length + newFiles.length > 5) {
      alert('You can only upload a maximum of 5 images. Please remove some images first.');
      return;
    }
    
    // Add new files to existing images
    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);
    
    // Create preview URLs for new files
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    
    // Clear the input so the same file can be selected again
    e.target.value = '';
  };

  const removeImage = (index) => {
    // Remove from images array
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    
    // Remove from previews array and revoke the URL to free memory
    const removedPreview = imagePreviews[index];
    URL.revokeObjectURL(removedPreview);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration, just log the form data and images
    console.log('Sell form submitted:', formData);
    console.log('Images:', images);
    alert('Thank you! We will contact you within 24 hours with a quote for your laptop.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      laptopBrand: '',
      laptopModel: '',
      condition: '',
      age: '',
      description: ''
    });
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="sell-page">
      <div className="sell-header">
        <h1 className="sell-title">Sell Your Laptop</h1>
        <p className="sell-subtitle">Get the best value for your laptop with our fair pricing and quick payment</p>
      </div>

      <div className="sell-content">
        <div className="sell-benefits">
          <h2 className="section-title">Why Sell to Technology Galore?</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaMoneyBillWave />
              </div>
              <h3>Best Prices</h3>
              <p>We offer competitive prices based on current market value and condition of your device.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaShieldAlt />
              </div>
              <h3>Secure Process</h3>
              <p>Your data is completely wiped and device is securely handled throughout the process.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaTruck />
              </div>
              <h3>Free Collection</h3>
              <p>We offer free collection from your location or you can drop off at our store.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaClock />
              </div>
              <h3>Quick Payment</h3>
              <p>Receive payment within 24 hours after device inspection and agreement.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaCheckCircle />
              </div>
              <h3>Quality Check</h3>
              <p>Professional assessment of your device's condition and functionality.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaStar />
              </div>
              <h3>Trusted Service</h3>
              <p>Over 10 years of experience in the computer hardware industry.</p>
            </div>
          </div>
        </div>

        <div className="sell-process">
          <h2 className="section-title">How It Works</h2>
          
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Contact Us</h3>
                <p>Fill out the form below with your laptop details or call us at +27 62 016 7209</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get a Quote</h3>
                <p>We'll assess your laptop and provide you with a fair market price within 24 hours</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Device Inspection</h3>
                <p>Our experts will thoroughly test your laptop to verify its condition and functionality</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Receive Payment</h3>
                <p>Once approved, you'll receive immediate payment via bank transfer or cash</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sell-form-section">
          <h2 className="section-title">Get Your Quote</h2>
          <form className="sell-form" onSubmit={handleSubmit}>
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
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="laptopBrand">Laptop Brand *</label>
                <select
                  id="laptopBrand"
                  name="laptopBrand"
                  value={formData.laptopBrand}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="Acer">Acer</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Asus">Asus</option>
                  <option value="Apple">Apple</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Huawei">Huawei</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="laptopModel">Model/Series</label>
                <input
                  type="text"
                  id="laptopModel"
                  name="laptopModel"
                  value={formData.laptopModel}
                  onChange={handleChange}
                  placeholder="e.g., ThinkPad X1 Carbon, MacBook Pro"
                />
              </div>
              <div className="form-group">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent - Like new</option>
                  <option value="Good">Good - Minor wear</option>
                  <option value="Fair">Fair - Some wear</option>
                  <option value="Poor">Poor - Significant wear</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age of Laptop</label>
                <select
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                >
                  <option value="">Select Age</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="3-4 years">3-4 years</option>
                  <option value="4+ years">4+ years</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Additional Details</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Specifications, issues, upgrades, etc."
                ></textarea>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-row">
              <div className="form-group">
                <div className="image-upload-container">
                  <label htmlFor="images" className="image-upload-label">
                    Upload Images (up to 5)
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    max={5}
                    className="image-upload-input"
                  />
                  <label htmlFor="images" className="image-upload-button">
                    <FaCamera className="image-upload-icon" />
                    Choose Images
                  </label>
                  {imagePreviews.length > 0 && (
                    <div className="upload-status">
                      {imagePreviews.length} image{imagePreviews.length !== 1 ? 's' : ''} selected
                    </div>
                  )}
                  {imagePreviews.length > 0 && (
                    <div className="image-previews">
                      {imagePreviews.map((src, idx) => (
                        <div key={idx} className="preview-container">
                          <img
                            src={src}
                            alt={`Preview ${idx + 1}`}
                            className="preview-img"
                          />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => removeImage(idx)}
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Get Quote
            </button>
          </form>
        </div>

        <div className="sell-info">
          <h2 className="section-title">What We Accept</h2>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Laptop Brands</h3>
              <ul>
                <li>Apple MacBooks</li>
                <li>Dell Latitude & Inspiron</li>
                <li>HP EliteBook & Pavilion</li>
                <li>Lenovo ThinkPad & IdeaPad</li>
                <li>Acer Aspire & TravelMate</li>
                <li>Asus ZenBook & Vivobook</li>
                <li>Microsoft Surface</li>
                <li>Huawei MateBook</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Requirements</h3>
              <ul>
                <li>Laptop must power on</li>
                <li>Screen must be functional</li>
                <li>Keyboard must work</li>
                <li>No major physical damage</li>
                <li>Original charger preferred</li>
                <li>Data backup completed</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>What We Don't Accept</h3>
              <ul>
                <li>Severely damaged devices</li>
                <li>Stolen or lost devices</li>
                <li>Devices with water damage</li>
                <li>Non-functional screens</li>
                <li>Devices that won't power on</li>
                <li>Counterfeit products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
