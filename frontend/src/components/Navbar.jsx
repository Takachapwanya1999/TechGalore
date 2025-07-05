import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../pages/dashboard/assets/logo.png';
import { FiShoppingBag } from 'react-icons/fi';
import { useAuthCart } from '../context/AuthCartContext';
import CartModal from './CartModal';
import { useState } from 'react';
import './Navbar.css';

const navItems = [
  { key: 'buy', label: 'Shop Laptops', path: '/buy' },
  { key: 'sell', label: 'Sell a Device', path: '/sell' },
  { key: 'orders', label: 'Orders', path: '/orders' },
  { key: 'finance', label: 'Financing & Support', path: '/finance' },
  { key: 'locations', label: 'Store Locator', path: '/locations' },
  { key: 'about', label: 'Our Story', path: '/ourstory' },
  { key: 'contact', label: 'Contact', path: '/contact' },
  { key: 'cart', label: 'Cart', path: '/cart' },
  { key: 'signup', label: 'Sign Up', path: '/signup' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.startsWith('/dashboard');
  // Simulate logged in state
  const loggedIn = true;
  // Get cart data from context
  const { cartCount, isConnected } = useAuthCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Logo" style={{ height: 40, width: 40, objectFit: 'contain' }} />
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
        {navItems.map((item) => {
          if (item.key === 'cart') {
            return (
              <li key={item.key} style={{ position: 'relative' }}>
                <button onClick={() => setIsCartModalOpen(true)} style={{ position: 'relative', display: 'flex', alignItems: 'center', fontSize: '1.3rem' }}>
                  <FiShoppingBag style={{ fontSize: '1.5rem', marginRight: 2 }} />
                  {cartCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: -8,
                      right: -12,
                      background: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 7px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      zIndex: 1,
                    }}>{cartCount}</span>
                  )}
                </button>
              </li>
            );
          }
          if (item.key === 'signup') {
            return loggedIn ? (
              <li key={item.key} className="navbar-logout">
                <button onClick={() => {/* handle logout here */}}>
                  Log Out
                </button>
              </li>
            ) : (
              <li key={item.key}>
                <button onClick={() => navigate(item.path)}>
                  Sign Up
                </button>
              </li>
            );
          }
          return (
            <li key={item.key}>
              <button
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
      
      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)} 
      />
    </nav>
  );
}
