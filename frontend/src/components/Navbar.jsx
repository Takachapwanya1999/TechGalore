import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { key: 'buy', label: 'Shop Laptops', path: '/buy' },
  { key: 'sell', label: 'Sell a Device', path: '/sell' },
  { key: 'finance', label: 'Financing & Support', path: '/finance' },
  { key: 'locations', label: 'Store Locator', path: '/locations' },
  { key: 'about', label: 'Our Story', path: '/about' },
  { key: 'contact', label: 'Contact', path: '/contact' },
  { key: 'signup', label: 'Create Account', path: '/signup' },
  { key: 'login', label: 'Sign In', path: '/login' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <nav className="navbar">
        <button
          className="navbar-dashboard-link"
          style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', padding: 0 }}
          onClick={() => navigate('/')}
        >
          View Store
        </button>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        Technology Galore
      </div>
      <button
        className="navbar-hamburger"
        aria-label="Open navigation menu"
        onClick={() => {}}
        style={{ display: 'none' }}
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>
      <ul className="navbar-links">
        {navItems.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
