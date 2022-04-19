import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((err) => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  if (!orderNumber) {
    return "Loading";
  }

  const handleNewOrder = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };
  return (
    <div>
      <h2>Thank you!</h2>
      <h5>Your order number is {orderNumber}</h5>
      <p>as per our terms and conditions, nothing will happen now</p>
      <button onClick={handleNewOrder}>Create new order</button>
    </div>
  );
}

export default OrderConfirmation;
