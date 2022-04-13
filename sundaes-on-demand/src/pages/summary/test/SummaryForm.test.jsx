import SummaryForm from "../SummaryForm";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
  test("check if the checkbox is unchecked by default", () => {
    render(<SummaryForm />);
    const checkboxEl = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    expect(checkboxEl).not.toBeChecked();
  });

  test("if checking checkbox enables button", () => {
    render(<SummaryForm />);
    const checkboxEl = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const buttonEl = screen.getByRole("button", { name: "Confirm order" });

    expect(buttonEl).toBeDisabled();

    userEvent.click(checkboxEl);

    expect(buttonEl).toBeEnabled();
  });

  test("if unchecking checkbox disables button", () => {
    render(<SummaryForm />);
    const checkboxEl = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const buttonEl = screen.getByRole("button", { name: "Confirm order" });

    userEvent.click(checkboxEl);
    expect(checkboxEl).toBeChecked();

    userEvent.click(checkboxEl);
    expect(checkboxEl).not.toBeChecked();
    expect(buttonEl).toBeDisabled();
  });
});

describe("Popover", () => {
  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    let popoverEl = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popoverEl).not.toBeInTheDocument();

    // popover appears upon a mouseover of checkbox label
    const labelEl = screen.getByText(/terms and conditions/i);
    userEvent.hover(labelEl);

    popoverEl = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popoverEl).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(labelEl);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
