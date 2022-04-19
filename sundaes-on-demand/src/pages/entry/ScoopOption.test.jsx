import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "./ScoopOption";

test("border turns red when input is invalid", () => {
  render(
    <ScoopOption name="Vanilla" imagePath="" updateItemCount={jest.fn()} />
  );

  const vanillaInput = screen.getByRole("spinbutton", { name: "Vanilla" });
  expect(vanillaInput).not.toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(vanillaInput).not.toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(vanillaInput).not.toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");
  expect(vanillaInput).not.toHaveClass("is-invalif");
});
