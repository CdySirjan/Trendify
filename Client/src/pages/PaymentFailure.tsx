import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-container">
      <img src="/error.svg" alt="Payment Failed" />
      <p className="status" style={{ color: '#e74c3c' }}>Payment Failed</p>
      <p>Your payment could not be processed.</p>
      <button 
        onClick={() => navigate('/place-order')}
        className="retry-button"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailure;