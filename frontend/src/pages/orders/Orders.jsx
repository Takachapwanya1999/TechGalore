
import React, { useState, useEffect, useCallback } from 'react';
import socket from '../../utils/socket';
import './Orders.css';
import OrderTimeline from '../../components/OrderTimeline';
import '../../components/OrderTimeline.css';

const ORDERS_API = 'http://localhost:3001/orders';

const fetchOrdersFromApi = async () => {
  const res = await fetch(ORDERS_API);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrdersFromApi();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  }, []);


  // Listen for real-time order updates via Socket.IO
  useEffect(() => {
    setLoading(true);
    fetchOrders(); // Initial fetch for fast load
    const handleOrdersUpdate = (orders) => {
      setOrders(Array.isArray(orders) ? orders : []);
      setLoading(false);
    };
    socket.on('ordersUpdate', handleOrdersUpdate);
    return () => {
      socket.off('ordersUpdate', handleOrdersUpdate);
    };
  }, [fetchOrders]);

  if (loading) return <div className="orders-page">Loading orders...</div>;
  if (error) return <div className="orders-page" style={{color:'#dc2626',fontWeight:600}}>{error}</div>;

  return (
    <div className="orders-page">
      <h1 style={{color:'#2563eb',fontWeight:800,letterSpacing:'-1px',marginBottom:32}}>Your Orders</h1>
      {orders.length === 0 ? (
        <div style={{color:'#888',fontWeight:600}}>No orders found.</div>
      ) : orders.map(order => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <span className="order-id">Order #{order.id}</span>
            <span className="order-date">{order.date}</span>
            <span className="order-total">Order Total: <span style={{color:'#059669',fontWeight:700}}>R {order.total?.toLocaleString?.() ?? order.total}</span></span>
          </div>
          <div className="order-content">
            <div className="order-merchant">
              <h2 style={{color:'#2563eb',fontWeight:700,marginBottom:8}}>Technology Galore</h2>
              {order.items && order.items.map((item, idx) => (
                <div key={idx} style={{display:'flex',alignItems:'flex-start',gap:16,marginBottom:18}}>
                  <img src={item.image} alt={item.name} style={{width:80,borderRadius:8,boxShadow:'0 2px 8px #e0e0e0'}} />
                  <div>
                    <strong style={{fontSize:'1.08rem'}}>{item.name}</strong>
                    <div style={{color:'#059669',fontWeight:600}}>R {item.price?.toLocaleString?.() ?? item.price}</div>
                    <div style={{fontSize:'0.98rem',margin:'2px 0'}}>Qty: {item.qty}</div>
                    {item.details && item.details.map((d, i) => <div key={i} style={{fontSize:'0.95rem',color:'#555'}}>{d}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-shipping">
              <h3 style={{color:'#2563eb',fontWeight:700}}>Shipping Info</h3>
              <div style={{fontWeight:600}}>{order.customer} <span style={{color:'#888',fontWeight:400}}>{order.customerEmail && `(${order.customerEmail})`}</span></div>
              <div style={{color:'#444'}}>{order.address}</div>
              <div style={{color:'#444'}}>{order.phone}</div>
              <div style={{color:'#444'}}>Payment: {order.paymentMethod}</div>
              <div style={{color:'#444'}}>Shipping: {order.shippingMethod}</div>
              {order.notes && <div style={{color:'#888',fontStyle:'italic',marginTop:4}}>Note: {order.notes}</div>}
            </div>
            <div className="order-status">
              <h3 style={{color:'#2563eb',fontWeight:700}}>Order Status</h3>
              <OrderTimeline status={order.status || 'Getting Ready'} />
              <div className="timeline-estimate">Estimated arrival: <span style={{color:'#059669',fontWeight:600}}>{order.estimated || '-'}</span></div>
              <div style={{margin:'8px 0',color:'#444'}}>Tracking: <span style={{color:'#2563eb',fontWeight:600}}>{order.trackingNumber}</span></div>
              <button className="track-btn">Track Package</button>
            </div>
            <div className="order-summary">
              <h3 style={{color:'#2563eb',fontWeight:700,marginTop:16}}>Order Summary</h3>
              <div>Subtotal: <span style={{color:'#444'}}>R {order.subtotal?.toLocaleString?.() ?? order.subtotal}</span></div>
              <div>Shipping Fee: <span style={{color:'#444'}}>R {order.shippingFee?.toLocaleString?.() ?? order.shippingFee}</span></div>
              <div>Tax: <span style={{color:'#444'}}>R {order.tax?.toLocaleString?.() ?? order.tax}</span></div>
              <div style={{fontWeight:700}}>Total: <span style={{color:'#059669'}}>R {order.total?.toLocaleString?.() ?? order.total}</span></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
