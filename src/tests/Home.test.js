import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // for routing
import Home from "../pages/Home";

// Test 11: Renders the homepage without crashing
test("renders homepage without crashing", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getByText(/Welcome to StockTrack!/i)).toBeInTheDocument();
});

// Test 12: Check if navigation buttons exist
test("renders navigation links on the homepage", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getByText(/Watchlist/i)).toBeInTheDocument();
  expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
});

// Test 13: Verify the homepage has the correct title
test("sets the correct document title for the homepage", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(document.title).toEqual("Home - StockTrack");
});
