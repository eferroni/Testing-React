import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const [orderDetails, updateItemCount] = useOrderDetails();

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  return (
    <>
      <h2>{title}</h2>
      <p>price per item: {formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>
        {items.map(({ name, imagePath }) => (
          <ItemComponent
            key={name}
            name={name}
            imagePath={imagePath}
            updateItemCount={(itemName, newItemCount) =>
              updateItemCount(itemName, newItemCount, optionType)
            }
          />
        ))}
      </Row>
    </>
  );
};

export default Options;
