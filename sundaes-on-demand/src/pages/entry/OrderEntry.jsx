import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const buttonDisabled = orderDetails.totals.scoops === "$0.00";

  return (
    <div>
      <div className="mt-5">
        <Options optionType="scoops" />
      </div>
      <div className="mt-5">
        <Options optionType="toppings" />
      </div>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => setOrderPhase("review")} disabled={buttonDisabled}>
        Order
      </button>
    </div>
  );
};

export default OrderEntry;
