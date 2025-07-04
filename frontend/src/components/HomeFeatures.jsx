import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

export default function HomeFeatures() {
  return (
    <section style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2.5rem',
      margin: '3rem 0 2rem 0',
      flexWrap: 'wrap',
      alignItems: 'stretch',
    }}>
      <div style={featureCard}>
        <FiTruck size={36} style={{ color: '#2563eb', marginBottom: 10 }} />
        <h4 style={featureTitle}>Fast Delivery</h4>
        <p style={featureDesc}>Get your laptop delivered anywhere in SA within 2-4 days.</p>
      </div>
      <div style={featureCard}>
        <FiShield size={36} style={{ color: '#2563eb', marginBottom: 10 }} />
        <h4 style={featureTitle}>Secure Payments</h4>
        <p style={featureDesc}>Pay safely online with PayFast and bank-level encryption.</p>
      </div>
      <div style={featureCard}>
        <FiRefreshCw size={36} style={{ color: '#2563eb', marginBottom: 10 }} />
        <h4 style={featureTitle}>Easy Returns</h4>
        <p style={featureDesc}>14-day hassle-free returns on all purchases, no questions asked.</p>
      </div>
      <div style={featureCard}>
        <FiHeadphones size={36} style={{ color: '#2563eb', marginBottom: 10 }} />
        <h4 style={featureTitle}>Support</h4>
        <p style={featureDesc}>Friendly support 7 days a week via chat, email, or phone.</p>
      </div>
    </section>
  );
}

const featureCard = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(60,60,60,0.07)',
  padding: '2rem 1.5rem',
  minWidth: 220,
  maxWidth: 260,
  flex: '1 1 220px',
  textAlign: 'center',
  margin: '0.5rem 0',
};
const featureTitle = {
  fontSize: '1.1rem',
  fontWeight: 700,
  margin: '0 0 0.5rem 0',
  color: '#232f3e',
};
const featureDesc = {
  fontSize: '1rem',
  color: '#444',
  margin: 0,
};
