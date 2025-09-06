import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ESewaPaymentProps {
  amount: number;
  productId: string;
  productName: string;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}

const ESewaPayment: React.FC<ESewaPaymentProps> = ({
  amount,
  productId,
  productName,
  onSuccess,
  onFailure
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initiateESewaPayment = () => {
    try {
      setIsLoading(true);
      
      // eSewa payment configuration
      const eSewaConfig = {
        amt: amount,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: amount,
        pid: productId,
        scd: 'EPAYTEST', // Merchant code (use 'EPAYTEST' for testing)
        su: `${window.location.origin}/payment-success`, // Success URL
        fu: `${window.location.origin}/payment-failure`, // Failure URL
      };

      console.log('Initiating eSewa payment with config:', eSewaConfig);

      // Create a form element
      const form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('action', 'https://uat.esewa.com.np/epay/main'); // Use 'https://esewa.com.np/epay/main' for production
      form.setAttribute('target', '_self'); // Open in same window

      // Create input fields for eSewa parameters
      for (const [key, value] of Object.entries(eSewaConfig)) {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', value.toString());
        form.appendChild(input);
      }

      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setIsLoading(false);
      if (onFailure) onFailure(error);
      console.error('eSewa payment initiation failed:', error);
    }
  };

  return (
    <button 
      onClick={initiateESewaPayment}
      className="esewa-payment-button px-16 py-3 text-sm"
      type="button"
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Pay with eSewa'}
    </button>
  );
};

export default ESewaPayment;