import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartLaptops, setCartLaptops] = useState([]);
  const navigate = useNavigate();

  // Fetch cart laptops, refetch when cart changes
  useEffect(() => {
    const fetchCartLaptops = () => {
      let cart;
      try {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
      } catch {
        cart = [];
      }
      if (!Array.isArray(cart) || cart.length === 0) {
        setCartLaptops([]);
        return;
      }
      fetch('http://localhost:3001/laptops')
        .then(res => res.json())
        .then(data => {
          const laptops = data.filter(l => cart.includes(l.id));
          setCartLaptops(laptops);
        });
    };
    fetchCartLaptops();
    // Listen for cart-updated event to refresh cart
    window.addEventListener('cart-updated', fetchCartLaptops);
    return () => window.removeEventListener('cart-updated', fetchCartLaptops);
  }, []);

  const total = cartLaptops.reduce((sum, l) => sum + (l.price || 0), 0);
  // Store total in localStorage for checkout page
  useEffect(() => {
    if (cartLaptops.length > 0) {
      localStorage.setItem('cartTotal', total.toString());
    } else {
      localStorage.removeItem('cartTotal');
    }
  }, [total, cartLaptops.length]);

  return (
    <div style={{ padding: '2rem', marginTop: '7rem' }}>
      <h2>Your Shopping Cart</h2>
      {cartLaptops.length === 0 ? (
        <div style={{ color: '#1976d2', fontWeight: 500, fontSize: '1.1rem', marginTop: '2rem' }}>
          Your cart is empty.
        </div>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <thead>
              <tr style={{ background: '#f3f6fa' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Condition</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>CPU</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>RAM</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Storage</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartLaptops.map(laptop => (
                <tr key={laptop.id}>
                  <td style={{ padding: '0.7rem' }}><img src={laptop.image} alt={laptop.title} style={{ width: 70, borderRadius: 6 }} /></td>
                  <td style={{ padding: '0.7rem' }}>{laptop.title}</td>
                  <td style={{ padding: '0.7rem' }}>{laptop.condition}</td>
                  <td style={{ padding: '0.7rem' }}>{laptop.cpu}</td>
                  <td style={{ padding: '0.7rem' }}>{laptop.ram}</td>
                  <td style={{ padding: '0.7rem' }}>{laptop.storage}</td>
                  <td style={{ padding: '0.7rem', fontWeight: 600 }}>R {laptop.price.toLocaleString()}</td>
                  <td style={{ padding: '0.7rem' }}>
                    <button
                      style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => {
                        let cart;
                        try {
                          cart = JSON.parse(localStorage.getItem('cart') || '[]');
                        } catch {
                          cart = [];
                        }
                        if (!Array.isArray(cart)) cart = [];
                        cart = cart.filter(id => id !== laptop.id);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        window.dispatchEvent(new Event('cart-updated'));
                      }}
                    >Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '2rem', gap: '2rem' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1976d2' }}>
              Total: R {total.toLocaleString()}
            </div>
            <button
              style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '0.9rem 2.5rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(25,118,210,0.08)' }}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Payment & Delivery
            </button>
          </div>
        </>
      )}
    </div>
  );
}
