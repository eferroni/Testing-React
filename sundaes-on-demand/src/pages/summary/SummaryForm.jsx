import React, { useState } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
);

const SummaryForm = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setAccepted(e.target.checked)}
            defaultChecked={accepted}
          />
          I agree to{" "}
          <OverlayTrigger placement="right" overlay={popover}>
            <span style={{ color: "blue" }}>Terms and Conditions</span>
          </OverlayTrigger>
        </label>
      </div>
      <div>
        <button disabled={!accepted}>Confirm order</button>
      </div>
    </div>
  );
};

export default SummaryForm;
