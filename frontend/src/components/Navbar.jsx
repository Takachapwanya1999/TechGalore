import { useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
  { key: 'buy', label: 'Shop Laptops', path: '/buy' },
  { key: 'sell', label: 'Sell a Device', path: '/sell' },
  { key: 'finance', label: 'Financing & Support', path: '/finance' },
  { key: 'locations', label: 'Store Locator', path: '/locations' },
  { key: 'about', label: 'Our Story', path: '/about' },
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
  // Real cart count from localStorage (or default 0)
  const [cartCount, setCartCount] = useState(() => {
    // Ensure initial cart count is always 0 if cart is missing or invalid
    let cart;
    try {
      cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      cart = [];
    }
    if (!Array.isArray(cart)) {
      localStorage.setItem('cart', '[]');
      return 0;
    }
    return cart.length;
  });

  useEffect(() => {
    // Set initial cart count
    const updateCartCount = () => {
      let cart;
      try {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
      } catch {
        cart = [];
        localStorage.setItem('cart', '[]');
      }
      if (!Array.isArray(cart)) {
        cart = [];
        localStorage.setItem('cart', '[]');
      }
      setCartCount(cart.length);
    };
    updateCartCount();
    // Listen for cart changes in this tab
    window.addEventListener('cart-updated', updateCartCount);
    // Listen for changes from other tabs
    const handleStorage = (e) => {
      if (e.key === 'cart') updateCartCount();
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

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
        {navItems.map((item) => {
          if (item.key === 'cart') {
            return (
              <li key={item.key} style={{ position: 'relative' }}>
                <button onClick={() => navigate(item.path)} style={{ position: 'relative', display: 'flex', alignItems: 'center', fontSize: '1.3rem' }}>
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
              <button onClick={() => navigate(item.path)}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
