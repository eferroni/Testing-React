import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.keys());
  const scoopList = scoopArray.map((key) => <li key={key}>{key}</li>);

  const toppingArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h2>Order Summary</h2>
      {scoopArray.length > 0 ? (
        <>
          <h5>Scoops: {orderDetails.totals.scoops}</h5>
          <ul>{scoopList}</ul>
        </>
      ) : null}
      {toppingArray.length > 0 ? (
        <>
          <h5>Toppings: {orderDetails.totals.toppings}</h5>
          <ul>{toppingList}</ul>
        </>
      ) : null}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
