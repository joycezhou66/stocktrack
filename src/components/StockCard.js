// src/components/StockCard.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/StockCard.css";

const StockCard = ({ stock }) => {
  return (
    <div className="stock-card">
      <h2>
        {stock?.name} ({stock?.symbol})
      </h2>
      <Link to={`/stock/${stock?.id}`} className="details-link">
        View Details
      </Link>
    </div>
  );
};

export default StockCard;
