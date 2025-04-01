import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import StockList from "./components/StockList";

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        // ✅ Fetch data from the backend
        const response = await axios.get("https://smart-invest-4n35.onrender.com/stocks");
        console.log("API Response:", response.data);

        // ✅ Check if data exists before setting it
        if (Array.isArray(response.data)) {
          setStocks(response.data);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        console.error("Failed to load stocks:", error);
        setError("Failed to load stocks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="App">
      <h1>Stock Ranking App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <StockList stocks={stocks} />
      )}
    </div>
  );
};

export default App;
