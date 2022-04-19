import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { render, screen } from "../../../test-utils/testing-library-utils";

describe("total Updates", () => {
  test("update scoop subtotal when scoops change", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // total starts out $0
    const scoopsSubtotal = screen.getByText("Scoops total:", {
      exact: false,
    });

    expect(scoopsSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("6.00");
  });

  test("update topping subtotal when checkbox changes", async () => {
    render(<Options optionType="toppings" />);

    const toppingSubtotal = screen.getByText("Toppings total:", {
      exact: false,
    });
    expect(toppingSubtotal).toHaveTextContent("0.00");

    const cherrieCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherrieCheckbox);
    expect(cherrieCheckbox).toBeChecked();
    expect(toppingSubtotal).toHaveTextContent("1.50");

    const mmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(mmsCheckbox);
    expect(mmsCheckbox).toBeChecked();
    expect(toppingSubtotal).toHaveTextContent("3.00");

    userEvent.click(cherrieCheckbox);
    expect(cherrieCheckbox).not.toBeChecked();
    expect(toppingSubtotal).toHaveTextContent("1.50");
  });
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotalEl = screen.getByText("Grand total:", { exact: false });
    expect(grandTotalEl).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotalEl = screen.getByText("Grand total:", { exact: false });

    // update vanilla scoops to 1 and check the grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotalEl).toHaveTextContent("4.00");

    const cherrieCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherrieCheckbox);
    expect(grandTotalEl).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotalEl = screen.getByText("Grand total:", { exact: false });

    const cherrieCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherrieCheckbox);
    expect(grandTotalEl).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotalEl).toHaveTextContent("3.50");
  });

  test("grand total updates properly if removed", async () => {
    render(<OrderEntry />);
    const grandTotalEl = screen.getByText("Grand total:", { exact: false });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const cherrieCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherrieCheckbox);

    expect(grandTotalEl).toHaveTextContent("3.50");

    userEvent.click(cherrieCheckbox);
    expect(grandTotalEl).toHaveTextContent("2.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(grandTotalEl).toHaveTextContent("0.00");
  });
});
