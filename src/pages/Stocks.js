// src/pages/Stocks.js
import React, { useEffect, useState } from "react";
import StockCard from "../components/StockCard";
import "../styles/Stocks.css";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stocks");
        }
        return response.json();
      })
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
        setError("Unable to load stock list.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stocks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stocks-page">
      <h1>My Stocks</h1>
      <div className="stock-list">
        {stocks.map((stock) => (
          <StockCard key={stock.id} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default Stocks;
