import React, { useState, useEffect } from "react";
import "./phonesearch.css";

export default function LaptopSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of items per page

  const searchLaptops = async (query, page) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://spec-zone.vercel.app/all?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "An error occurred while searching for laptops",
        );
      }
      const data = await response.json();
      setResults(data.laptops);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Error searching for laptops:", error);
      setError(
        error.message ||
          "An error occurred while searching for laptops. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setPage(1); // Reset to first page on new search
      searchLaptops(query, 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchLaptops(query, newPage);
  };

  return (
    <div className="phone-search-container">
      <h2>Laptop Search</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Laptop name"
          className="search-input"
        />
        <button type="submit" disabled={isLoading} className="search-button">
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {results.length > 0 && (
        <div className="results-container">
          {results.map((device) => (
            <div key={device.title} className="device-card">
              <img
                src={device.image_url}
                alt={device.title}
                className="device-image"
              />
              <div className="device-info">
                <h3 className="device-title">{device.title}</h3>
                <p className="device-detail">{device.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}