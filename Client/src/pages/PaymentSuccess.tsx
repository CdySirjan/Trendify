import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const dataQuery = searchParams.get("data");
  const [data, setData] = useState<{ total_amount?: string }>({});

  useEffect(() => {
    if (dataQuery) {
      try {
        const resData = atob(dataQuery);
        const resObject = JSON.parse(resData);
        console.log(resObject);

        setData(resObject);
      } catch (error) {
        console.error("Error parsing payment data:", error);
      }
    }
  }, [dataQuery]);

  return (
    <div className="payment-container">
      <img src="/check.svg" alt="Payment Success" />
      <p className="price">NRS. {data.total_amount}</p>
      <p className="status">Payment Successful</p>
    </div>
  );
};

export default PaymentSuccess;