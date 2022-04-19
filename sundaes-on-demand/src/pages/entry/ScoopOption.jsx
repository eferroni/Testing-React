import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [invalidValue, setInvalidValue] = useState(false);

  const onChangeScoopValue = (e) => {
    const scoopValue = e.target.value;
    const isInvalid =
      !scoopValue || scoopValue < 0 || scoopValue > 10 || scoopValue % 1 !== 0;
    setInvalidValue(isInvalid);
    if (isInvalid) {
      return;
    }
    updateItemCount(name, e.target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="text-center">
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} as={Row} className="mt-2">
        <Form.Label column xs={6} className="text-right">
          {name}
        </Form.Label>
        <Col xs={5} className="text-left">
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={onChangeScoopValue}
            className={invalidValue ? "is-invalid" : ""}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
