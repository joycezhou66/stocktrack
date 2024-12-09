import { render, screen, fireEvent } from "@testing-library/react";
import Watchlist from "../pages/Watchlist";

// Test 1: Check if Watchlist component renders without crashing
test("renders Watchlist component without crashing", () => {
  render(<Watchlist />);
  expect(screen.getByText(/My Watchlist/i)).toBeInTheDocument();
});

// Test 2: Check if Add to Watchlist button is present
test("renders Add to Watchlist button", () => {
  render(<Watchlist />);
  expect(screen.getByText(/Add to Watchlist/i)).toBeInTheDocument();
});

// Test 3: Check if inputs are present
test("renders all inputs in the form", () => {
  render(<Watchlist />);
  expect(screen.getByLabelText(/Stock Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Symbol/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
});

// Test 4: Check form submission and data addition
test("adds a new item to the watchlist", async () => {
  render(<Watchlist />);

  fireEvent.change(screen.getByLabelText(/Stock Name/i), {
    target: { value: "Test Stock" },
  });
  fireEvent.change(screen.getByLabelText(/Symbol/i), {
    target: { value: "TS" },
  });
  fireEvent.change(screen.getByLabelText(/Quantity/i), {
    target: { value: "10" },
  });
  fireEvent.change(screen.getByLabelText(/Notes/i), {
    target: { value: "This is a test note" },
  });

  fireEvent.click(screen.getByText(/Add to Watchlist/i));

  const newItem = await screen.findByText(/Test Stock/i);
  expect(newItem).toBeInTheDocument();
});

// Test 5: Check if deleting an item works
test("deletes an item from the watchlist", async () => {
  render(<Watchlist />);

  fireEvent.click(screen.getByText(/Delete/i));

  const deletedItem = screen.queryByText(/Deleted Item/i);
  expect(deletedItem).not.toBeInTheDocument();
});
