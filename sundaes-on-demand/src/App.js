import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  const ItemPhaseComponent =
    orderPhase === "inProgress"
      ? OrderEntry
      : orderPhase === "review"
      ? OrderSummary
      : OrderConfirmation;

  return (
    <Container>
      <OrderDetailsProvider>
        <ItemPhaseComponent setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
