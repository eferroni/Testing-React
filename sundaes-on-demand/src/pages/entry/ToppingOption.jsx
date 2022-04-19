import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const onCheck = (e) => {
    if (e.target.checked) {
      updateItemCount(name, 1);
    } else {
      updateItemCount(name, 0);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="text-center mb-5">
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
      <Form.Group controlId={`${name}-count`} as={Row} className="mt-2">
        <Col xs={12} className="text-center d-flex justify-content-center">
          <Form.Check type="checkbox" label={name} onChange={onCheck} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
