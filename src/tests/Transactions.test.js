import { render, screen, fireEvent } from "@testing-library/react";
import Transactions from "../pages/Transactions";

// Test 6: Check if Transactions component renders without crashing
test("renders Transactions component without crashing", () => {
  render(<Transactions />);
  expect(screen.getByText(/My Transactions/i)).toBeInTheDocument();
});

// Test 7: Check if form inputs exist
test("renders all inputs in the form", () => {
  render(<Transactions />);
  expect(screen.getByLabelText(/Stock Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Mark as high-priority/i)).toBeInTheDocument();
});

// Test 8: Check if transaction type radio buttons exist
test("renders radio buttons for buy and sell", () => {
  render(<Transactions />);
  expect(screen.getByLabelText(/Buy/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Sell/i)).toBeInTheDocument();
});

// Test 9: Check if form submission works
test("submits the form and adds a transaction", async () => {
  render(<Transactions />);

  fireEvent.change(screen.getByLabelText(/Stock Name/i), {
    target: { value: "Apple" },
  });
  fireEvent.change(screen.getByLabelText(/Quantity/i), {
    target: { value: "5" },
  });
  fireEvent.change(screen.getByLabelText(/Price/i), {
    target: { value: "150" },
  });

  fireEvent.click(screen.getByText(/Add Transaction/i));

  const newTransaction = await screen.findByText(/Apple/i);
  expect(newTransaction).toBeInTheDocument();
});

// Test 10: Check if deleting a transaction works
test("deletes a transaction from the list", async () => {
  render(<Transactions />);

  fireEvent.click(screen.getByText(/Delete/i));

  const deletedTransaction = screen.queryByText(/Deleted Transaction/i);
  expect(deletedTransaction).not.toBeInTheDocument();
});
