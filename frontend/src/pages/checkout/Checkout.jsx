import React, { useRef, useState } from 'react';

// PayFast sandbox merchant details (for your merchant)
const PAYFAST_MERCHANT_ID = '10040118';
const PAYFAST_MERCHANT_KEY = 'skm5msi8i6q28';
const PAYFAST_URL = 'https://sandbox.payfast.co.za/eng/process';


export default function Checkout() {
  // Get cart IDs from localStorage
  const cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cartLaptops, setCartLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const payfastFormRef = useRef();

  // Fetch full laptop details for cart
  React.useEffect(() => {
    if (!Array.isArray(cartIds) || cartIds.length === 0) {
      setCartLaptops([]);
      setLoading(false);
      return;
    }
    fetch('http://localhost:3001/laptops')
      .then(res => res.json())
      .then(data => {
        const laptops = data.filter(l => cartIds.includes(l.id));
        setCartLaptops(laptops);
        setLoading(false);
      });
  }, [cartIds]);

  // Calculate total from actual cart items
  const total = cartLaptops.reduce((sum, l) => sum + (l.price || 0), 0);
  const payfastAmount = total > 0 ? total.toFixed(2) : '0.00';
  const itemName = 'Laptop Purchase';

  // Delivery form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  // Validate required fields
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.phone.trim()) errs.phone = 'Phone Number is required';
    if (!form.address.trim()) errs.address = 'Delivery Address is required';
    return errs;
  };

  // Store order in backend and then submit PayFast form
  const handlePayFast = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // Save order to backend (json-server) with full cart structure
    await fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartLaptops,
        total: payfastAmount,
        delivery: form,
        createdAt: new Date().toISOString(),
        status: 'pending',
      }),
    });
    // Clear cart after successful order creation
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');
    window.dispatchEvent(new Event('cart-updated'));
    // Submit PayFast form
    if (payfastFormRef.current) payfastFormRef.current.submit();
  };

  return (
    <div style={{ marginTop: '7rem', padding: '2rem', minHeight: '80vh', background: '#f8fafc' }}>
      <h2 style={{ color: '#232f3e', marginBottom: '2.5rem', fontWeight: 800, letterSpacing: '-1px' }}>Checkout</h2>
      {loading ? (
        <div style={{ color: '#1976d2', fontWeight: 500, fontSize: '1.1rem', marginTop: '2rem' }}>Loading cart...</div>
      ) : cartLaptops.length === 0 ? (
        <div style={{ color: '#1976d2', fontWeight: 500, fontSize: '1.1rem', marginTop: '2rem' }}>Your cart is empty.</div>
      ) : (
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        {/* Left: Delivery Details (real form) */}
        <div style={{
          flex: '1 1 320px',
          maxWidth: 400,
          background: '#fff',
          borderRadius: 10,
          padding: '2rem',
          boxShadow: '0 2px 12px rgba(60, 60, 60, 0.07)',
          minWidth: 280,
          border: '1px solid #e5e7eb',
        }}>
          <h3 style={{ color: '#232f3e', marginBottom: 18, fontWeight: 700 }}>Delivery Details</h3>
          <form autoComplete="on" onSubmit={e => e.preventDefault()}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                style={{ width: '100%', padding: '0.6rem', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb' }}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              {errors.name && <div style={{ color: 'red', fontSize: 13 }}>{errors.name}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                style={{ width: '100%', padding: '0.6rem', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb' }}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              {errors.email && <div style={{ color: 'red', fontSize: 13 }}>{errors.email}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Phone Number</label>
              <input
                type="tel"
                required
                placeholder="e.g. 081 234 5678"
                style={{ width: '100%', padding: '0.6rem', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb' }}
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
              {errors.phone && <div style={{ color: 'red', fontSize: 13 }}>{errors.phone}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Delivery Address</label>
              <textarea
                required
                placeholder="Street, City, Province, Postal Code"
                style={{ width: '100%', padding: '0.6rem', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb', minHeight: 60 }}
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
              />
              {errors.address && <div style={{ color: 'red', fontSize: 13 }}>{errors.address}</div>}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Notes (optional)</label>
              <textarea
                placeholder="Any special instructions?"
                style={{ width: '100%', padding: '0.6rem', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb', minHeight: 40 }}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </form>
        </div>

        {/* Right: Cart Summary and PayFast Payment (hidden form, submitted after delivery form) */}
        <div style={{
          flex: '1 1 320px',
          maxWidth: 400,
          background: '#fff',
          borderRadius: 10,
          padding: '2rem',
          boxShadow: '0 2px 12px rgba(60, 60, 60, 0.07)',
          minWidth: 280,
          border: '1px solid #e5e7eb',
          marginTop: 24,
        }}>
          <h3 style={{ color: '#232f3e', marginBottom: 18, fontWeight: 700 }}>Order Summary</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 18 }}>
            {cartLaptops.map(l => (
              <li key={l.id} style={{ marginBottom: 10, borderBottom: '1px solid #eee', paddingBottom: 6 }}>
                <span style={{ fontWeight: 500 }}>{l.title}</span>
                <span style={{ float: 'right', color: '#1976d2', fontWeight: 600 }}>R {l.price?.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#232f3e', marginBottom: 18, borderTop: '1px solid #e5e7eb', paddingTop: 10 }}>
            Total: R {payfastAmount}
          </div>
          <button
            onClick={handlePayFast}
            style={{ width: '100%', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '0.9rem 2.2rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)', letterSpacing: '0.5px', marginTop: 10 }}
          >
            Pay & Complete Order
          </button>
        </div>
        <form action={PAYFAST_URL} method="post" ref={payfastFormRef} style={{ display: 'none' }}>
          <input type="hidden" name="merchant_id" value={PAYFAST_MERCHANT_ID} />
          <input type="hidden" name="merchant_key" value={PAYFAST_MERCHANT_KEY} />
          <input type="hidden" name="amount" value={payfastAmount} />
          <input type="hidden" name="item_name" value={itemName} />
        </form>
      </div>
      )}
    </div>
  );
}
