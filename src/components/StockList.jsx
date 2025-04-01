import { useEffect, useState } from "react";
import axios from "axios";
import "./StockList.css";  // ✅ Ensure you have the CSS file

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        console.log("Fetching stocks from backend...");
        
        const response = await axios.get("https://smart-invest-4n35.onrender.com/stocks");
        
        console.log("Response:", response);

        if (response.data && Array.isArray(response.data)) {
          console.log("Data received:", response.data);
          setStocks(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setError("Invalid data format.");
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setError("Failed to load stocks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <p>Loading stocks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stock-list">
      <h2>Stock Rankings</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Recommended Buy Price</th>
            <th>Score (1-10)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{stock.country || "N/A"}</td>
              <td>{stock.symbol}</td>
              <td>{stock.current_price ? `₹${stock.current_price.toFixed(2)}` : "N/A"}</td>
              <td>{stock.recommended_buy_price ? `₹${stock.recommended_buy_price.toFixed(2)}` : "N/A"}</td>
              <td>{stock.score ? stock.score.toFixed(2) : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
