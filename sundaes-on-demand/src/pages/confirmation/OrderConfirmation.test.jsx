import { render, screen } from "../../test-utils/testing-library-utils";
import OrderConfirmation from "./OrderConfirmation";
import { rest } from "msw";
import { server } from "../../mocks/server";

describe("Order Confirmation", () => {
  test("if alert appears if the axios post call catches an error", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);
    const alertEl = await screen.findByRole("alert");
    expect(alertEl).toBeInTheDocument();
  });
});
