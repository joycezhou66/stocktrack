// src/services/api.js
export const fetchWatchlist = async () => {
  try {
    const response = await fetch("http://localhost:3001/watchlist");
    if (!response.ok) {
      throw new Error("Failed to fetch watchlist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
