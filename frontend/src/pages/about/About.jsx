import './About.css';
import { FaLaptop, FaRecycle, FaUserShield, FaShippingFast, FaUsers, FaHandshake } from 'react-icons/fa';
import AboutCarousel from '../../components/AboutCarousel';
import aboutImg from '../../assets/pc.png';

export default function About() {
  return (
    <div className="about-main-container">
      <h1 className="about-title">About Technology Galore</h1>
      <section className="about-section about-intro">
        <div className="about-text">
          <h2 className="about-subheading">Who We Are</h2>
          <p>
            Technology Galore is South Africa's leading online destination for buying and selling laptops. Founded in 2022, our mission is to make high-quality technology accessible and affordable for everyone, whether you're a student, professional, or gamer.
          </p>
        </div>
        <div className="about-img-container">
          <img src={aboutImg} alt="About Technology Galore" className="about-img" />
        </div>
      </section>

      <section className="about-section about-features">
        <h2 className="about-subheading">What We Offer</h2>
        <AboutCarousel />
      </section>


      
      <section className="about-section about-vision">
        <div className="about-img-container">
          <img src={aboutImg} alt="Our Vision" className="about-img vision-img" />
        </div>
        <div className="about-text">
          <h2 className="about-subheading">Our Vision</h2>
          <p>
            To empower South Africans with affordable, reliable technology and world-class service, making it easy to buy, sell, and upgrade laptops online.
          </p>
        </div>
      </section>

      <section className="about-section about-mission">
        <div className="about-text">
          <h2 className="about-subheading">Our Mission</h2>
          <p>
            We strive to bridge the digital divide by making premium laptops accessible to all, supporting education, business, and creativity across South Africa.
          </p>
        </div>
        <div className="about-img-container">
          <img src={aboutImg} alt="Our Mission" className="about-img vision-img" />
        </div>
      </section>

      <section className="about-section about-quality">
        <div className="about-img-container">
          <img src={aboutImg} alt="Quality Promise" className="about-img vision-img" />
        </div>
        <div className="about-text">
          <h2 className="about-subheading">Quality Promise</h2>
          <p>
            Every device is thoroughly tested and certified by our experts, ensuring you receive only the best in performance and reliability.
          </p>
        </div>
      </section>

      <section className="about-section about-support">
        <div className="about-text">
          <h2 className="about-subheading">Customer Support</h2>
          <p>
            Our friendly support team is available 7 days a week to help you with any questions, from choosing the right laptop to after-sales service.
          </p>
        </div>
        <div className="about-img-container">
          <img src={aboutImg} alt="Customer Support" className="about-img vision-img" />
        </div>
      </section>

      <section className="about-section about-sustainability">
        <div className="about-img-container">
          <img src={aboutImg} alt="Sustainability" className="about-img vision-img" />
        </div>
        <div className="about-text">
          <h2 className="about-subheading">Sustainability</h2>
          <p>
            We are committed to reducing e-waste by refurbishing, recycling, and responsibly disposing of electronics, helping to protect our environment.
          </p>
        </div>
      </section>

      <section className="about-section about-community">
        <div className="about-text">
          <h2 className="about-subheading">Community Impact</h2>
          <p>
            We support local schools, charities, and tech initiatives, believing that technology can uplift and empower communities across South Africa.
          </p>
        </div>
        <div className="about-img-container">
          <img src={aboutImg} alt="Community Impact" className="about-img vision-img" />
        </div>
      </section>

      <section className="about-section about-why">
        <h2 className="about-subheading">Why Choose Us?</h2>
        <ul className="about-list">
          <li>Trusted by thousands of happy customers nationwide</li>
          <li>All devices undergo a 30-point quality check</li>
          <li>Flexible payment options and student discounts</li>
          <li>Eco-friendly: we refurbish and recycle electronics responsibly</li>
        </ul>
      </section>
    </div>
  );
}
