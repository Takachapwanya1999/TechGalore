import React, { useRef, useState, useEffect } from 'react';
import { useAuthCart } from '../../context/AuthCartContext';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiAlertTriangle, FiShield, FiCreditCard, FiZap } from 'react-icons/fi';
import { prepareOzowPayment, submitOzowPayment } from '../../utils/ozow';

// Add CSS for loading animation
const spinAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject CSS
if (!document.getElementById('checkout-spin-animation')) {
  const style = document.createElement('style');
  style.id = 'checkout-spin-animation';
  style.textContent = spinAnimation;
  document.head.appendChild(style);
}

// PayFast Sandbox Configuration
const PAYFAST_MERCHANT_ID = '10040118';
const PAYFAST_MERCHANT_KEY = 'skm5msi8i6q28';
const PAYFAST_URL = 'https://sandbox.payfast.co.za/eng/process'; // Sandbox PayFast URL

export default function Checkout() {
  const [cartLaptops, setCartLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('payfast'); // 'payfast' or 'ozow'
  const payfastFormRef = useRef();
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal, isConnected } = useAuthCart();

  useEffect(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      setCartLaptops([]);
      setLoading(false);
      return;
    }

    const cartIds = cart.map(item => item.id);

    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        const laptops = data
          .filter(l => cartIds.includes(l.id))
          .map(laptop => {
            const match = cart.find(c => c.id === laptop.id);
            return { ...laptop, quantity: match.quantity };
          });
        setCartLaptops(laptops);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching laptops:', error);
        // Fallback to cart data if API fails
        setCartLaptops(cart);
        setLoading(false);
      });
  }, [cart]);

  const total = getCartTotal();
  const payfastAmount = total > 0 ? total.toFixed(2) : '0.00';
  const itemName = 'Laptop Purchase';
  const orderId = 'ORDER-' + Date.now();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', notes: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.phone.trim()) errs.phone = 'Phone Number is required';
    if (!form.address.trim()) errs.address = 'Delivery Address is required';
    return errs;
  };

  const handlePayFast = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPaymentLoading(true);

    try {
      // Create order object
      const orderData = {
        items: cartLaptops,
        total: payfastAmount,
        delivery: form,
        createdAt: new Date().toISOString(),
        status: 'pending',
        orderId: orderId,
        paymentMethod: 'payfast'
      };

      // Save order to database
      try {
        await fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
      } catch (dbError) {
        console.log('Database save failed, continuing with payment...', dbError);
      }

      // Submit to PayFast
      if (payfastFormRef.current) {
        payfastFormRef.current.submit();
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please check your connection and try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleOzowPayment = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPaymentLoading(true);

    try {
      // Create order object
      const orderData = {
        items: cartLaptops,
        total: total,
        delivery: form,
        createdAt: new Date().toISOString(),
        status: 'pending',
        orderId: orderId,
        paymentMethod: 'ozow'
      };

      // Save order to database
      try {
        await fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
      } catch (dbError) {
        console.log('Database save failed, continuing with payment...', dbError);
      }

      // Prepare Ozow payment
      const ozowData = prepareOzowPayment(orderData, form);
      
      // Submit to Ozow
      await submitOzowPayment(ozowData);
      
    } catch (error) {
      console.error('Ozow payment error:', error);
      alert('Ozow payment processing failed. Please check your connection and try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePayment = (e) => {
    if (selectedPayment === 'payfast') {
      handlePayFast(e);
    } else if (selectedPayment === 'ozow') {
      handleOzowPayment(e);
    }
  };

  return (
    <div style={{ marginTop: '7rem', padding: '2rem', background: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#232f3e', fontWeight: 800 }}>Checkout</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiCheck style={{ color: isConnected ? '#059669' : '#dc2626', fontSize: '1rem' }} />
          <span style={{ fontSize: '0.875rem', color: isConnected ? '#059669' : '#dc2626' }}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {loading ? (
        <div style={{ color: '#1976d2' }}>Loading cart...</div>
      ) : cartLaptops.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ color: '#1976d2', fontSize: '1.1rem', marginBottom: '1rem' }}>
            Your cart is empty.
          </div>
          <button
            onClick={() => navigate('/buy')}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {/* Delivery Form */}
          <div style={{ flex: '1 1 300px', maxWidth: 400, background: '#fff', padding: '2rem', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
            <h3 style={{ marginBottom: 18 }}>Delivery Details</h3>
            <form onSubmit={handlePayment}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.name ? '1px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your full name"
                />
                {errors.name && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.email ? '1px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your email address"
                />
                {errors.email && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.phone ? '1px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.phone}</div>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>
                  Delivery Address *
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.address ? '1px solid #dc2626' : '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '1rem',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Enter your complete delivery address"
                />
                {errors.address && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.address}</div>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>
                  Additional Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '1rem',
                    minHeight: '60px',
                    resize: 'vertical'
                  }}
                  placeholder="Any special delivery instructions or notes"
                />
              </div>
            </form>
          </div>

          {/* Cart Summary */}
          <div style={{ flex: '1 1 300px', maxWidth: 400, background: '#fff', padding: '2rem', borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Order Summary</h3>
              <div style={{ 
                background: '#f3f4f6', 
                padding: '0.5rem 1rem', 
                borderRadius: 20, 
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151'
              }}>
                {cartLaptops.length} {cartLaptops.length === 1 ? 'item' : 'items'}
              </div>
            </div>
            
            {/* Cart Items */}
            <div style={{ marginBottom: '1.5rem' }}>
              {cartLaptops.map(l => (
                <div key={l.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '1rem 0', 
                  borderBottom: '1px solid #f3f4f6',
                  gap: '1rem'
                }}>
                  <img 
                    src={l.image} 
                    alt={l.title} 
                    style={{ 
                      width: 60, 
                      height: 60, 
                      objectFit: 'cover', 
                      borderRadius: 8,
                      border: '1px solid #e5e7eb'
                    }} 
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{l.title}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Qty: {l.quantity}</div>
                    <div style={{ color: '#059669', fontWeight: 600, marginTop: '0.25rem' }}>
                      R {(l.price * l.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div style={{ 
              borderTop: '2px solid #e5e7eb', 
              paddingTop: '1rem', 
              marginBottom: '1.5rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal:</span>
                <span>R {total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Shipping:</span>
                <span>R 0.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Tax:</span>
                <span>R 0.00</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 700, 
                fontSize: '1.125rem',
                color: '#059669',
                borderTop: '1px solid #e5e7eb',
                paddingTop: '0.5rem'
              }}>
                <span>Total:</span>
                <span>R {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Payment Method</h4>
              
              {/* PayFast Option */}
              <div 
                style={{ 
                  padding: '1rem', 
                  border: selectedPayment === 'payfast' ? '2px solid #2563eb' : '2px solid #e5e7eb', 
                  borderRadius: 8, 
                  background: selectedPayment === 'payfast' ? '#f0f9ff' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
                onClick={() => setSelectedPayment('payfast')}
              >
                <FiCreditCard style={{ fontSize: '1.5rem', color: '#2563eb' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>PayFast Sandbox Payment</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Test Mode - Credit Card, EFT, Mobile Money</div>
                </div>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  border: selectedPayment === 'payfast' ? '2px solid #2563eb' : '2px solid #d1d5db',
                  background: selectedPayment === 'payfast' ? '#2563eb' : '#fff'
                }}></div>
              </div>

              {/* Ozow Option */}
              <div 
                style={{ 
                  padding: '1rem', 
                  border: selectedPayment === 'ozow' ? '2px solid #059669' : '2px solid #e5e7eb', 
                  borderRadius: 8, 
                  background: selectedPayment === 'ozow' ? '#f0fdf4' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
                onClick={() => setSelectedPayment('ozow')}
              >
                <FiZap style={{ fontSize: '1.5rem', color: '#059669' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>Ozow Instant EFT</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Instant bank transfer - South African banks</div>
                </div>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  border: selectedPayment === 'ozow' ? '2px solid #059669' : '2px solid #d1d5db',
                  background: selectedPayment === 'ozow' ? '#059669' : '#fff'
                }}></div>
              </div>

              <div style={{ 
                marginTop: '0.5rem',
                padding: '0.75rem', 
                background: '#fef3c7', 
                borderRadius: 6,
                border: '1px solid #f59e0b',
                fontSize: '0.875rem',
                color: '#92400e',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiAlertTriangle style={{ fontSize: '1rem' }} />
                Test Mode - No real money will be charged
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                background: paymentLoading ? '#9ca3af' : (selectedPayment === 'ozow' ? '#059669' : '#2563eb'), 
                color: '#fff', 
                border: 'none',
                borderRadius: 8, 
                fontWeight: 700, 
                fontSize: '1.125rem',
                cursor: paymentLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                if (!paymentLoading) {
                  e.target.style.background = selectedPayment === 'ozow' ? '#047857' : '#1d4ed8';
                }
              }}
              onMouseOut={(e) => {
                if (!paymentLoading) {
                  e.target.style.background = selectedPayment === 'ozow' ? '#059669' : '#2563eb';
                }
              }}
            >
              {paymentLoading ? (
                <>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    border: '2px solid #fff', 
                    borderTop: '2px solid transparent', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite' 
                  }}></div>
                  Redirecting to {selectedPayment === 'ozow' ? 'Ozow' : 'PayFast'}...
                </>
              ) : (
                <>
                  {selectedPayment === 'ozow' ? (
                    <FiZap style={{ fontSize: '1.25rem' }} />
                  ) : (
                    <FiCreditCard style={{ fontSize: '1.25rem' }} />
                  )}
                  {isConnected ? 'Pay R ' + total.toLocaleString() : 'Pay R ' + total.toLocaleString() + ' (Offline)'}
                </>
              )}
            </button>

            {/* Security Notice */}
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: '#f0fdf4', 
              borderRadius: 6,
              border: '1px solid #059669',
              fontSize: '0.875rem',
              color: '#065f46',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FiShield style={{ fontSize: '1rem' }} />
              Test Mode - Powered by {selectedPayment === 'ozow' ? 'Ozow' : 'PayFast'}
            </div>
          </div>

          {/* Hidden PayFast Form */}
          <form action={PAYFAST_URL} method="post" ref={payfastFormRef} style={{ display: 'none' }}>
            <input type="hidden" name="merchant_id" value={PAYFAST_MERCHANT_ID} />
            <input type="hidden" name="merchant_key" value={PAYFAST_MERCHANT_KEY} />
            <input type="hidden" name="amount" value={payfastAmount} />
            <input type="hidden" name="item_name" value={itemName} />
            <input type="hidden" name="name_first" value={form.name.split(' ')[0] || ''} />
            <input type="hidden" name="name_last" value={form.name.split(' ').slice(1).join(' ') || ''} />
            <input type="hidden" name="email_address" value={form.email} />
            <input type="hidden" name="cell_number" value={form.phone} />
            <input type="hidden" name="custom_str1" value={form.address} />
            <input type="hidden" name="custom_str2" value={form.notes} />
            <input type="hidden" name="return_url" value={window.location.origin + '/payment-success'} />
            <input type="hidden" name="cancel_url" value={window.location.origin + '/checkout'} />
            <input type="hidden" name="notify_url" value={window.location.origin + '/api/payfast-notify'} />
            <input type="hidden" name="custom_str3" value={orderId} />
          </form>
        </div>
      )}
    </div>
  );
}
