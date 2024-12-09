import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    name: "Guest",
  };
  const [dailyNews, setDailyNews] = useState(null);

  // Fetch daily news (pretend it's a new daily highlight)
  useEffect(() => {
    fetch("http://localhost:3001/news")
      .then((response) => response.json())
      .then((data) => {
        // Randomly select a news item to highlight (this changes on every page load)
        const randomNews = data[Math.floor(Math.random() * data.length)];
        setDailyNews(randomNews);
      })
      .catch((error) => console.error("Error fetching daily news:", error));
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome back, {currentUser?.name} 👋</h1>

      <section className="daily-news">
        <h2>Today's Market Highlight</h2>
        {dailyNews ? (
          <div className="news-highlight">
            <h3>{dailyNews.headline}</h3>
            <p>Source: {dailyNews.source}</p>
            <p>
              Sentiment:{" "}
              <span className={`sentiment ${dailyNews.sentiment}`}>
                {dailyNews.sentiment}
              </span>
            </p>
            <p>
              Published At:{" "}
              {new Date(dailyNews.publishedAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Loading today's market highlight...</p>
        )}
      </section>

      <section className="actions">
        <h2>Navigate</h2>
        <div className="action-buttons">
          <Link to="/stocks" className="btn btn-primary">
            Browse Stocks
          </Link>
          <Link to="/watchlist" className="btn btn-secondary">
            View Your Watchlist
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
