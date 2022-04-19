import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";
import OrderEntry from "./OrderEntry";
import { rest } from "msw";
import { server } from "../../mocks/server";
import userEvent from "@testing-library/user-event";

describe("Order Entry", () => {
  test("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry />);
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  test("order button disables when no scoops are added", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // find Vanilla topping
    const vanillaScoopEl = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    expect(vanillaScoopEl).toBeInTheDocument();

    // find order button
    const orderButtonEl = screen.getByRole("button", { name: "Order" });
    expect(orderButtonEl).toBeInTheDocument();

    // expect order button is disabled
    expect(orderButtonEl).toBeDisabled();

    // enter a value in vanilla el
    userEvent.clear(vanillaScoopEl);
    userEvent.type(vanillaScoopEl, "1");

    // expect the grand total changes to 2.00
    const grandTotalEl = screen.getByText("Grand Total:", { exact: false });
    expect(grandTotalEl).toHaveTextContent("2.00");

    // expect order button is enabled
    expect(orderButtonEl).toBeEnabled();

    // clear the value in vanilla el
    userEvent.clear(vanillaScoopEl);
    userEvent.type(vanillaScoopEl, "0");

    // expect order button is disabled
    expect(orderButtonEl).toBeDisabled();
  });

  test("if scoops totals and grand total change value when the input is invalid", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // find Vanilla topping
    const vanillaScoopEl = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaScoopEl);
    userEvent.type(vanillaScoopEl, "-1");

    const scoopTotalEl = screen.getByText("Scoops total", { exact: false });
    expect(scoopTotalEl).toHaveTextContent("$0.00");

    const grandTotalEl = screen.getByText("Grand total", { exact: false });
    expect(grandTotalEl).toHaveTextContent("$0.00");

    userEvent.clear(vanillaScoopEl);
    userEvent.type(vanillaScoopEl, "1");

    expect(scoopTotalEl).toHaveTextContent("$2.00");
    expect(grandTotalEl).toHaveTextContent("$2.00");
  });
});
