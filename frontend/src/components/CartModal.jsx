import React from 'react';
import { useAuthCart } from '../context/AuthCartContext';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import './CartModal.css';

export default function CartModal({ isOpen, onClose }) {
  const { cart, cartCount, isConnected, getCartTotal, removeFromCart, updateQuantity } = useAuthCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h3>Shopping Cart</h3>
          <button className="cart-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-modal-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>

        {cartCount === 0 ? (
          <div className="cart-modal-empty">
            <FiShoppingCart style={{ fontSize: '3rem', marginBottom: '1rem', color: '#9ca3af' }} />
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Your cart is empty</p>
            <button 
              className="cart-checkout-btn"
              onClick={() => {
                onClose();
                navigate('/buy');
              }}
              style={{ maxWidth: '200px' }}
            >
              <FiShoppingBag style={{ fontSize: '1.25rem' }} />
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-modal-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-modal-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <p>R {item.price?.toLocaleString()}</p>
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-modal-footer">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <span>Items: {cart.length}</span>
                <span>Subtotal: R {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="cart-total">
                <span>Order Total:</span>
                <strong>R {getCartTotal().toLocaleString()}</strong>
              </div>
              <button 
                className="cart-checkout-btn"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
              >
                <FiShoppingCart style={{ fontSize: '1.25rem' }} />
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
