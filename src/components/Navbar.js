import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">StockTrack</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stocks">All Stocks</Link>
        </li>
        <li>
          <Link to="/watchlist">My Watchlist</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        {currentUser ? (
          <>
            <li className="navbar-user">Welcome, {currentUser.name}</li>
            <li>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
