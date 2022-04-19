import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render App
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const cherrieCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherrieCheckbox);

  // find and click order button
  const orderButtonEl = screen.getByRole("button", { name: "Order" });
  userEvent.click(orderButtonEl);

  // check summary information based on order
  const summaryHeadingEl = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeadingEl).toBeInTheDocument();

  const scoopsHeadingEl = screen.getByRole("heading", {
    name: "Scoops: $2.00",
  });
  expect(scoopsHeadingEl).toBeInTheDocument();

  const toppingsHeadingEl = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeadingEl).toBeInTheDocument();

  expect(screen.getByText("Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const termsEl = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  userEvent.click(termsEl);

  const confirmButtonEl = screen.getByRole("button", { name: "Confirm order" });
  userEvent.click(confirmButtonEl);

  // confirm order number on confirmation page - and loading appears and disappers
  const loadingEl = screen.getByText("Loading");
  expect(loadingEl).toBeInTheDocument();

  const orderNumberEl = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumberEl).toHaveTextContent("123456");

  const notLoadingEl = screen.queryByText("Loading");
  expect(notLoadingEl).not.toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButtonEl = screen.getByRole("button", {
    name: "Create new order",
  });
  userEvent.click(newOrderButtonEl);

  // check if scoops an toppings subtotals have been reset
  const scoopsSubtotalEl = screen.getByText("Scoops total:", { exact: false });
  expect(scoopsSubtotalEl).toHaveTextContent("0.00");

  const toppingsSubTotalEl = screen.getByText("Toppings total:", {
    exact: false,
  });
  expect(toppingsSubTotalEl).toHaveTextContent("0.00");
});

test("toppings not appears in summary when not selected", async () => {
  // render the component
  render(<App />);

  // select a scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  // click in order button
  const orderButtonEl = screen.getByRole("button", { name: "Order" });
  userEvent.click(orderButtonEl);

  // check if summary appears
  const summaryHeadingEl = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeadingEl).toBeInTheDocument();

  // check if scoops head appears
  const scoopsHeadingEl = screen.getByRole("heading", {
    name: "Scoops: $4.00",
  });
  expect(scoopsHeadingEl).toBeInTheDocument();

  // checks if toppings not appears
  const toppingsHeadingEl = screen.queryByRole("heading", {
    name: /toppings: /i,
  });
  expect(toppingsHeadingEl).not.toBeInTheDocument();
});
