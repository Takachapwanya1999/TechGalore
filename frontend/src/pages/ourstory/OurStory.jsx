import React from "react";
import { FaRocket, FaUsers, FaHandshake, FaStar, FaHeart, FaLightbulb, FaGlobe, FaChartLine, FaAward, FaShieldAlt, FaGraduationCap, FaBuilding, FaLeaf, FaMobile, FaLaptop, FaHeadset, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import "./OurStory.css";
import logoImage from '../../assets/logo.png';

export default function OurStory() {
  return (
    <div className="ourstory-page">
      {/* Hero Section */}
      <div className="ourstory-hero">
        <img src={logoImage} alt="TechGalore Logo" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-title">The TechGalore Story</h1>
          <p className="hero-subtitle">
            From a simple idea to South Africa's trusted technology partner - 
            discover the journey that shaped our mission to bridge the digital divide.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaUsers />
              <span>10,000+ Happy Customers</span>
            </div>
            <div className="stat-item">
              <FaAward />
              <span>5-Star Service Rating</span>
            </div>
            <div className="stat-item">
              <FaGlobe />
              <span>Nationwide Coverage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ourstory-content">
        {/* Introduction Section */}
        <section className="intro-section">
          <div className="section-header">
            <h2>The Genesis of TechGalore</h2>
            <p>
              In the heart of Johannesburg, a group of tech enthusiasts and entrepreneurs 
              came together with a shared vision: to democratize access to quality technology 
              in South Africa. What started as a simple idea has grown into a movement 
              that's transforming how people access and interact with technology.
            </p>
          </div>
        </section>

        {/* The Beginning Section */}
        <section className="beginning-section">
          <div className="section-header">
            <h2>How It All Started</h2>
            <p>The story of TechGalore is one of passion, perseverance, and purpose.</p>
          </div>
          
          <div className="story-grid">
            <div className="story-card">
              <div className="story-icon">
                <FaLightbulb />
              </div>
              <div className="story-content">
                <h3>The Lightbulb Moment</h3>
                <p>
                  It was 2022 when our founders, Neil and his team, noticed a growing 
                  digital divide in South Africa. While technology was advancing rapidly, 
                  many people were being left behind due to high costs and limited access 
                  to quality devices.
                </p>
                <p>
                  The idea was simple yet powerful: create a platform where people could 
                  buy, sell, and upgrade laptops with confidence, transparency, and 
                  exceptional service. No hidden fees, no complicated processes, just 
                  straightforward technology solutions for everyone.
                </p>
              </div>
            </div>

            <div className="story-card">
              <div className="story-icon">
                <FaBuilding />
              </div>
              <div className="story-content">
                <h3>From Garage to Growth</h3>
                <p>
                  Starting from a small office in Fourways, Johannesburg, we began with 
                  just a handful of laptops and a big dream. Our first customers were 
                  friends and family who believed in our vision and trusted us with their 
                  technology needs.
                </p>
                <p>
                  Word spread quickly about our honest approach, quality products, and 
                  exceptional customer service. What started as a local operation soon 
                  expanded to serve customers across South Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section with Moving Boxes */}
        <section className="milestones-section">
          <div className="section-header">
            <h2>Our Journey Through Time</h2>
            <p>Every milestone represents a step forward in our mission to serve South Africa's technology needs.</p>
          </div>
          
          <div className="milestones-grid">
            <div className="milestone-card">
              <div className="milestone-icon">
                <FaRocket />
              </div>
              <div className="milestone-content">
                <h3>2022 - The Launch</h3>
                <p>Technology Galore is founded and launches its online store with a vision to bridge the digital divide in South Africa.</p>
                <div className="milestone-achievements">
                  <span className="achievement-tag">First 100 Customers</span>
                  <span className="achievement-tag">Online Platform</span>
                  <span className="achievement-tag">Quality Promise</span>
                </div>
              </div>
            </div>

            <div className="milestone-card">
              <div className="milestone-icon">
                <FaStar />
              </div>
              <div className="milestone-content">
                <h3>2023 - Quality Assurance</h3>
                <p>Introduced certified pre-owned laptops and a comprehensive 30-point quality check process to ensure customer satisfaction.</p>
                <div className="milestone-achievements">
                  <span className="achievement-tag">Quality Certification</span>
                  <span className="achievement-tag">1,000+ Customers</span>
                  <span className="achievement-tag">Warranty Program</span>
                </div>
              </div>
            </div>

            <div className="milestone-card">
              <div className="milestone-icon">
                <FaHandshake />
              </div>
              <div className="milestone-content">
                <h3>2024 - Service Expansion</h3>
                <p>Expanded to offer trade-ins, student discounts, and eco-friendly recycling programs for sustainable technology.</p>
                <div className="milestone-achievements">
                  <span className="achievement-tag">Trade-in Program</span>
                  <span className="achievement-tag">Student Discounts</span>
                  <span className="achievement-tag">Eco-friendly</span>
                </div>
              </div>
            </div>

            <div className="milestone-card">
              <div className="milestone-icon">
                <FaUsers />
              </div>
              <div className="milestone-content">
                <h3>2025 - Growth & Innovation</h3>
                <p>Reached 10,000+ customers and launched our mobile-friendly platform with enhanced user experience.</p>
                <div className="milestone-achievements">
                  <span className="achievement-tag">10K+ Customers</span>
                  <span className="achievement-tag">Mobile Platform</span>
                  <span className="achievement-tag">Real-time Cart</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="section-header">
            <h2>The Principles That Guide Us</h2>
            <p>Our values are the foundation of everything we do and every decision we make.</p>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Customer First</h3>
              <p>Every decision we make is centered around providing the best experience for our customers. Your satisfaction is our priority.</p>
              <div className="value-features">
                <span className="feature-badge">Personalized Service</span>
                <span className="feature-badge">24/7 Support</span>
                <span className="feature-badge">Customer Feedback</span>
              </div>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaShieldAlt />
              </div>
              <h3>Quality Assurance</h3>
              <p>We never compromise on quality. Every device undergoes thorough testing to ensure it meets our high standards.</p>
              <div className="value-features">
                <span className="feature-badge">30-Point Check</span>
                <span className="feature-badge">Certified Products</span>
                <span className="feature-badge">Warranty Coverage</span>
              </div>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaHandshake />
              </div>
              <h3>Trust & Transparency</h3>
              <p>We believe in building lasting relationships through honest communication and transparent business practices.</p>
              <div className="value-features">
                <span className="feature-badge">No Hidden Fees</span>
                <span className="feature-badge">Clear Pricing</span>
                <span className="feature-badge">Honest Reviews</span>
              </div>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaLightbulb />
              </div>
              <h3>Innovation</h3>
              <p>We continuously evolve our services and technology to meet the changing needs of our customers and the market.</p>
              <div className="value-features">
                <span className="feature-badge">Latest Technology</span>
                <span className="feature-badge">Digital Solutions</span>
                <span className="feature-badge">Future-Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mission-vision-section">
          <div className="section-header">
            <h2>Our Mission & Vision</h2>
            <p>The driving force behind everything we do at TechGalore.</p>
          </div>
          
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <FaGlobe />
              </div>
              <h3>Our Mission</h3>
              <p>
                We strive to bridge the digital divide by making premium laptops accessible 
                to all, supporting education, business, and creativity across South Africa. 
                Our commitment is to provide reliable, affordable technology solutions that 
                empower individuals and organizations to achieve their goals.
              </p>
              <div className="mission-goals">
                <div className="goal-item">
                  <FaGraduationCap />
                  <span>Support Education</span>
                </div>
                <div className="goal-item">
                  <FaBuilding />
                  <span>Empower Business</span>
                </div>
                <div className="goal-item">
                  <FaLaptop />
                  <span>Enable Creativity</span>
                </div>
              </div>
            </div>

            <div className="vision-card">
              <div className="vision-icon">
                <FaChartLine />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be South Africa's most trusted technology partner, known for exceptional 
                service, quality products, and innovative solutions that drive digital 
                transformation and economic growth across the continent.
              </p>
              <div className="vision-aspirations">
                <div className="aspiration-item">
                  <FaStar />
                  <span>Trusted Partner</span>
                </div>
                <div className="aspiration-item">
                  <FaGlobe />
                  <span>Continental Growth</span>
                </div>
                <div className="aspiration-item">
                  <FaAward />
                  <span>Industry Leader</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate individuals behind TechGalore's success story.</p>
          </div>
          
          <div className="team-grid">
            <div className="team-card">
              <div className="team-icon">
                <FaUsers />
              </div>
              <h3>Leadership Team</h3>
              <p>Experienced professionals with decades of combined experience in technology, business, and customer service.</p>
              <div className="team-highlights">
                <span className="highlight-tag">Strategic Vision</span>
                <span className="highlight-tag">Industry Expertise</span>
                <span className="highlight-tag">Customer Focus</span>
              </div>
            </div>

            <div className="team-card">
              <div className="team-icon">
                <FaHeadset />
              </div>
              <h3>Support Team</h3>
              <p>Dedicated customer service professionals committed to providing exceptional support and technical assistance.</p>
              <div className="team-highlights">
                <span className="highlight-tag">24/7 Support</span>
                <span className="highlight-tag">Technical Expertise</span>
                <span className="highlight-tag">Quick Response</span>
              </div>
            </div>

            <div className="team-card">
              <div className="team-icon">
                <FaShieldAlt />
              </div>
              <h3>Quality Team</h3>
              <p>Certified technicians and quality assurance specialists ensuring every product meets our high standards.</p>
              <div className="team-highlights">
                <span className="highlight-tag">Certified Technicians</span>
                <span className="highlight-tag">Quality Testing</span>
                <span className="highlight-tag">Warranty Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Future Section */}
        <section className="future-section">
          <div className="section-header">
            <h2>Looking Ahead</h2>
            <p>The future is bright, and we're excited about what's coming next.</p>
          </div>
          
          <div className="future-content">
            <div className="future-card">
              <h3>Our Roadmap</h3>
              <p>
                As we continue to grow, our focus remains on delivering exceptional value, 
                service, and innovation. We're committed to expanding our reach, enhancing 
                our services, and building stronger relationships with our customers and partners.
              </p>
              <div className="future-plans">
                <div className="plan-item">
                  <FaMobile />
                  <span>Enhanced Mobile Experience</span>
                </div>
                <div className="plan-item">
                  <FaLeaf />
                  <span>Sustainable Technology</span>
                </div>
                <div className="plan-item">
                  <FaGlobe />
                  <span>Expanded Coverage</span>
                </div>
              </div>
            </div>

            <div className="future-card">
              <h3>Join Our Journey</h3>
              <p>
                Thank you for being part of our story! Together, we're building a future 
                where quality technology is accessible to everyone in South Africa. Your 
                trust and support drive us to be better every day.
              </p>
              <div className="join-options">
                <div className="option-item">
                  <FaHandshake />
                  <span>Become a Customer</span>
                </div>
                <div className="option-item">
                  <FaUsers />
                  <span>Partner With Us</span>
                </div>
                <div className="option-item">
                  <FaStar />
                  <span>Share Your Story</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you and share more about our story.</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <h3>Call Us</h3>
              <p className="contact-number">+27 62 016 7209</p>
              <p className="contact-hours">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="contact-note">Speak directly with our team</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <h3>Email Us</h3>
              <p className="contact-email">sales@technologygalore.co.za</p>
              <p className="contact-email">neil@technologygalore.co.za</p>
              <p className="contact-note">Share your feedback and ideas</p>
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
            <h2>Be Part of Our Story</h2>
            <p>Join thousands of satisfied customers who have chosen TechGalore for their technology needs. Experience the difference that passion, quality, and innovation can make.</p>
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
