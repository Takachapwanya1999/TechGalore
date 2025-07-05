import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle, FiShield, FiZap, FiCreditCard } from 'react-icons/fi';
import { validateOzowResponse } from '../utils/ozow';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('unknown');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Check if this is a PayFast return
    if (searchParams.get('payment_status')) {
      const status = searchParams.get('payment_status');
      const pf_payment_id = searchParams.get('pf_payment_id');
      const amount = searchParams.get('amount_gross');
      
      setPaymentMethod('payfast');
      
      if (status === 'COMPLETE') {
        setPaymentStatus('success');
        setPaymentDetails({
          transactionId: pf_payment_id,
          amount: amount,
          method: 'PayFast'
        });
      } else {
        setPaymentStatus('failed');
        setPaymentDetails({
          error: 'Payment was not completed',
          method: 'PayFast'
        });
      }
    }
    // Check if this is an Ozow return
    else if (searchParams.get('TransactionId')) {
      const transactionId = searchParams.get('TransactionId');
      const status = searchParams.get('Status');
      const amount = searchParams.get('Amount');
      const bankReference = searchParams.get('BankReference');
      
      setPaymentMethod('ozow');
      
      // Validate Ozow response
      const ozowResponse = {
        TransactionId: transactionId,
        Status: status,
        Amount: amount,
        BankReference: bankReference
      };
      
      const validation = validateOzowResponse(ozowResponse);
      
      if (validation.isValid && status === 'Complete') {
        setPaymentStatus('success');
        setPaymentDetails({
          transactionId: transactionId,
          amount: amount,
          bankReference: bankReference,
          method: 'Ozow'
        });
      } else {
        setPaymentStatus('failed');
        setPaymentDetails({
          error: 'Payment was not completed',
          transactionId: transactionId,
          method: 'Ozow'
        });
      }
    }
    // If no payment parameters, assume success for demo
    else {
      setPaymentStatus('success');
      setPaymentDetails({
        transactionId: 'DEMO_' + Date.now(),
        amount: '0.00',
        method: 'Demo'
      });
    }
  }, [location]);

  const getStatusIcon = () => {
    if (paymentStatus === 'success') {
      return <FiCheckCircle style={{ fontSize: '4rem', color: '#059669' }} />;
    } else if (paymentStatus === 'failed') {
      return <FiAlertCircle style={{ fontSize: '4rem', color: '#dc2626' }} />;
    } else {
      return <div style={{ 
        width: '4rem', 
        height: '4rem', 
        border: '4px solid #2563eb', 
        borderTop: '4px solid transparent', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite' 
      }}></div>;
    }
  };

  const getStatusTitle = () => {
    if (paymentStatus === 'success') {
      return 'Payment Successful!';
    } else if (paymentStatus === 'failed') {
      return 'Payment Failed';
    } else {
      return 'Processing Payment...';
    }
  };

  const getStatusMessage = () => {
    if (paymentStatus === 'success') {
      return 'Your order has been confirmed and payment received. We will process your order shortly.';
    } else if (paymentStatus === 'failed') {
      return 'There was an issue with your payment. Please try again or contact support.';
    } else {
      return 'Please wait while we verify your payment...';
    }
  };

  const getMethodIcon = () => {
    if (paymentMethod === 'ozow') {
      return <FiZap style={{ fontSize: '1.5rem', color: '#059669' }} />;
    } else if (paymentMethod === 'payfast') {
      return <FiCreditCard style={{ fontSize: '1.5rem', color: '#2563eb' }} />;
    } else {
      return <FiShield style={{ fontSize: '1.5rem', color: '#6b7280' }} />;
    }
  };

  return (
    <div style={{ 
      marginTop: '7rem', 
      padding: '2rem', 
      background: '#f8fafc',
      minHeight: 'calc(100vh - 7rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '500px', 
        width: '100%', 
        background: '#fff', 
        padding: '3rem', 
        borderRadius: 12, 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        {/* Status Icon */}
        <div style={{ marginBottom: '2rem' }}>
          {getStatusIcon()}
        </div>

        {/* Status Title */}
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: paymentStatus === 'success' ? '#059669' : paymentStatus === 'failed' ? '#dc2626' : '#2563eb',
          marginBottom: '1rem'
        }}>
          {getStatusTitle()}
        </h1>

        {/* Status Message */}
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#6b7280', 
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          {getStatusMessage()}
        </p>

        {/* Payment Details */}
        {paymentDetails && (
          <div style={{ 
            background: '#f9fafb', 
            padding: '1.5rem', 
            borderRadius: 8, 
            marginBottom: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              color: '#374151', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              {getMethodIcon()}
              Payment Details
            </h3>
            
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Method:</span>
                <span style={{ fontWeight: 600 }}>{paymentDetails.method}</span>
              </div>
              
              {paymentDetails.transactionId && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280' }}>Transaction ID:</span>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{paymentDetails.transactionId}</span>
                </div>
              )}
              
              {paymentDetails.bankReference && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280' }}>Bank Reference:</span>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{paymentDetails.bankReference}</span>
                </div>
              )}
              
              {paymentDetails.amount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280' }}>Amount:</span>
                  <span style={{ fontWeight: 600, color: '#059669' }}>R {parseFloat(paymentDetails.amount).toLocaleString()}</span>
                </div>
              )}
              
              {paymentDetails.error && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  background: '#fef2f2', 
                  borderRadius: 6,
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.875rem'
                }}>
                  {paymentDetails.error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.background = '#2563eb'}
          >
            Continue Shopping
          </button>
          
          {paymentStatus === 'failed' && (
            <button
              onClick={() => navigate('/checkout')}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#b91c1c'}
              onMouseOut={(e) => e.target.style.background = '#dc2626'}
            >
              Try Again
            </button>
          )}
        </div>

        {/* Security Notice */}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: '#f0fdf4', 
          borderRadius: 8,
          border: '1px solid #059669',
          fontSize: '0.875rem',
          color: '#065f46',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <FiShield style={{ fontSize: '1rem' }} />
          Secure Payment - Powered by {paymentDetails?.method || 'TechGalore'}
        </div>
      </div>
    </div>
  );
} 