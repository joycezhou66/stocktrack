import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Stocks from "./pages/Stocks";
import StockDetails from "./pages/StockDetails";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import "./styles/App.css";

const PrivateRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/stocks" element={<PrivateRoute><Stocks /></PrivateRoute>} />
        <Route path="/stock/:id" element={<PrivateRoute><StockDetails /></PrivateRoute>} />
        <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
