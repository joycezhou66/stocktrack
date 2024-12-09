// src/pages/StockDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/StockDetails.css";

const StockDetails = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/stocks/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        return response.json();
      })
      .then((data) => {
        setStock(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stock details:", error);
        setError("Unable to load stock details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading stock details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stock-details">
      <h1>
        {stock?.name} ({stock?.symbol})
      </h1>
      <p>Price: ${stock?.price}</p>
      <p>Industry: {stock?.industry}</p>
    </div>
  );
};

export default StockDetails;
