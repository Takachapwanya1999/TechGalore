import React, { useState } from 'react';
import { FaCreditCard, FaCalculator, FaShieldAlt, FaTruck, FaTools, FaHandshake, FaClock, FaStar, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUsers, FaGraduationCap, FaBuilding, FaPiggyBank, FaChartLine, FaAward, FaHeadset, FaGift } from 'react-icons/fa';
import './Finance.css';

export default function Finance() {
  const [selectedService, setSelectedService] = useState('');

  return (
    <div className="finance-page">
      {/* Hero Section */}
      <div className="finance-hero">
        <div className="hero-content">
          <h1 className="hero-title">Your Complete Guide to Tech Financing</h1>
          <p className="hero-subtitle">
            Discover flexible payment solutions, comprehensive services, and expert support 
            designed to make your technology investment seamless and affordable.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaUsers />
              <span>500+ Happy Customers</span>
            </div>
            <div className="stat-item">
              <FaAward />
              <span>5-Star Service Rating</span>
            </div>
            <div className="stat-item">
              <FaShieldAlt />
              <span>100% Secure Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="finance-content">
        {/* Introduction Section */}
        <section className="intro-section">
          <div className="section-header">
            <h2>Why Choose TechGalore for Your Tech Needs?</h2>
            <p>
              At TechGalore, we understand that technology is an investment in your future. 
              That's why we've created a comprehensive ecosystem of services, financing options, 
              and support systems to ensure you get the best value for your money.
            </p>
          </div>
        </section>

        {/* Services Section with Moving Boxes */}
        <section className="services-section">
          <div className="section-header">
            <h2>Our Comprehensive Services</h2>
            <p>From fast shipping to expert support, we've got you covered every step of the way.</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FaTruck />
              </div>
              <h3>Fast & Secure Shipping</h3>
              <p>Get your devices delivered within 2-3 business days across South Africa with complete tracking and insurance coverage.</p>
              <div className="service-features">
                <span className="feature-badge">Nationwide Delivery</span>
                <span className="feature-badge">Real-time Tracking</span>
                <span className="feature-badge">Insurance Included</span>
                <span className="feature-badge">Secure Packaging</span>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaHeadset />
              </div>
              <h3>Expert Customer Support</h3>
              <p>Our dedicated team is available to help you with pre-sales consultation, technical support, and after-sales service.</p>
              <div className="service-features">
                <span className="feature-badge">24/7 Support</span>
                <span className="feature-badge">Expert Technicians</span>
                <span className="feature-badge">Remote Assistance</span>
                <span className="feature-badge">Warranty Claims</span>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaShieldAlt />
              </div>
              <h3>Guaranteed Savings</h3>
              <p>We're committed to providing the best value with competitive pricing, bulk discounts, and special offers.</p>
              <div className="service-features">
                <span className="feature-badge">Competitive Pricing</span>
                <span className="feature-badge">Bulk Discounts</span>
                <span className="feature-badge">Student Discounts</span>
                <span className="feature-badge">Trade-in Options</span>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaTools />
              </div>
              <h3>Maintenance & Repairs</h3>
              <p>Professional maintenance and repair services for all computer hardware, output devices, and office machinery.</p>
              <div className="service-features">
                <span className="feature-badge">Hardware Repairs</span>
                <span className="feature-badge">Software Installation</span>
                <span className="feature-badge">Virus Removal</span>
                <span className="feature-badge">Data Recovery</span>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Solutions Section */}
        <section className="payment-section">
          <div className="section-header">
            <h2>Flexible Payment Solutions</h2>
            <p>Choose the payment method that works best for your budget and lifestyle.</p>
          </div>
          
          <div className="payment-grid">
            <div className="payment-card">
              <div className="payment-icon">
                <FaCreditCard />
              </div>
              <h3>PayFast Integration</h3>
              <p>Secure online payments through South Africa's most trusted payment gateway with multiple payment options.</p>
              <div className="payment-features">
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Credit & Debit Cards</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>EFT Payments</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Instant EFT</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Secure Processing</span>
                </div>
              </div>
            </div>

            <div className="payment-card">
              <div className="payment-icon">
                <FaCalculator />
              </div>
              <h3>Flexible Payment Plans</h3>
              <p>Spread the cost of your technology investment with our customizable payment plans designed for your budget.</p>
              <div className="payment-features">
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Monthly Installments</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>0% Interest Options</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Quick Approval</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>No Hidden Fees</span>
                </div>
              </div>
            </div>

            <div className="payment-card">
              <div className="payment-icon">
                <FaGift />
              </div>
              <h3>Trade-In Program</h3>
              <p>Upgrade your device by trading in your old laptop for instant credit towards your new purchase.</p>
              <div className="payment-features">
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Fair Market Value</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Instant Credit</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Free Assessment</span>
                </div>
                <div className="feature-item">
                  <FaCheckCircle />
                  <span>Data Security</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financing Solutions Section */}
        <section className="financing-section">
          <div className="section-header">
            <h2>Specialized Financing Solutions</h2>
            <p>Tailored financing options designed for different customer segments and needs.</p>
          </div>
          
          <div className="financing-options">
            <div className="financing-card">
              <div className="financing-icon">
                <FaGraduationCap />
              </div>
              <h3>Student Financing</h3>
              <p>Special financing options designed specifically for students with flexible payment terms and reduced rates to support your educational journey.</p>
              <div className="financing-benefits">
                <div className="benefit-item">
                  <FaStar />
                  <span>Student ID Required</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Reduced Interest Rates</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Flexible Payment Terms</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>No Credit Check</span>
                </div>
              </div>
            </div>

            <div className="financing-card">
              <div className="financing-icon">
                <FaBuilding />
              </div>
              <h3>Business Financing</h3>
              <p>Corporate payment solutions designed for businesses with volume discounts, extended payment terms, and dedicated account management.</p>
              <div className="financing-benefits">
                <div className="benefit-item">
                  <FaStar />
                  <span>Volume Discounts</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Extended Payment Terms</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Corporate Accounts</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Dedicated Support</span>
                </div>
              </div>
            </div>

            <div className="financing-card">
              <div className="financing-icon">
                <FaPiggyBank />
              </div>
              <h3>Lay-by Program</h3>
              <p>Reserve your laptop with a deposit and pay the balance over time with no interest charges or hidden fees.</p>
              <div className="financing-benefits">
                <div className="benefit-item">
                  <FaStar />
                  <span>No Interest Charges</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Flexible Payment Schedule</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Secure Storage</span>
                </div>
                <div className="benefit-item">
                  <FaStar />
                  <span>Easy Cancellation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty & Support Section */}
        <section className="warranty-section">
          <div className="section-header">
            <h2>Comprehensive Warranty & Support</h2>
            <p>Rest easy knowing your investment is protected with our comprehensive warranty coverage and expert support.</p>
          </div>
          
          <div className="warranty-grid">
            <div className="warranty-card">
              <div className="warranty-icon">
                <FaShieldAlt />
              </div>
              <h3>Product Warranty</h3>
              <p>All our products come with comprehensive warranty coverage that protects your investment and ensures peace of mind.</p>
              <div className="warranty-details">
                <div className="detail-item">
                  <strong>New Products:</strong> 12-24 months warranty
                </div>
                <div className="detail-item">
                  <strong>Refurbished:</strong> 6-12 months warranty
                </div>
                <div className="detail-item">
                  <strong>Coverage:</strong> Parts and labor included
                </div>
                <div className="detail-item">
                  <strong>Service:</strong> Quick turnaround times
                </div>
              </div>
            </div>

            <div className="warranty-card">
              <div className="warranty-icon">
                <FaHeadset />
              </div>
              <h3>Technical Support</h3>
              <p>Expert technical support available through multiple channels to help you get the most out of your technology investment.</p>
              <div className="warranty-details">
                <div className="detail-item">
                  <strong>Phone:</strong> +27 62 016 7209
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> sales@technologygalore.co.za
                </div>
                <div className="detail-item">
                  <strong>WhatsApp:</strong> Available for quick support
                </div>
                <div className="detail-item">
                  <strong>Remote:</strong> Assistance available
                </div>
              </div>
            </div>

            <div className="warranty-card">
              <div className="warranty-icon">
                <FaCheckCircle />
              </div>
              <h3>Return Policy</h3>
              <p>Customer satisfaction is our priority with a flexible return policy that ensures you're completely satisfied with your purchase.</p>
              <div className="warranty-details">
                <div className="detail-item">
                  <strong>Return Window:</strong> 7 days from delivery
                </div>
                <div className="detail-item">
                  <strong>Condition:</strong> Original packaging required
                </div>
                <div className="detail-item">
                  <strong>Fees:</strong> No restocking fees
                </div>
                <div className="detail-item">
                  <strong>Options:</strong> Full refund or exchange
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="section-header">
            <h2>Ready to Get Started?</h2>
            <p>Contact our team today to discuss your technology needs and find the perfect financing solution for you.</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <h3>Call Us</h3>
              <p className="contact-number">+27 62 016 7209</p>
              <p className="contact-hours">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="contact-note">Speak directly with our expert team</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <h3>Email Us</h3>
              <p className="contact-email">sales@technologygalore.co.za</p>
              <p className="contact-email">neil@technologygalore.co.za</p>
              <p className="contact-note">Get detailed quotes and information</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Visit Us</h3>
              <p className="contact-address">Suite 45 Building 1, Prism Business Park</p>
              <p className="contact-address">1 Ruby Close, Fourways, Johannesburg</p>
              <p className="contact-note">Showroom and service center</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Transform Your Tech Experience Today</h2>
            <p>Join hundreds of satisfied customers who have chosen TechGalore for their technology needs. Experience the difference that expert service, flexible financing, and comprehensive support can make.</p>
            <div className="cta-buttons">
              <button className="cta-button primary">Start Shopping</button>
              <button className="cta-button secondary">Learn More</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
