import React, { useState } from "react";
import "./phonesearch.css";

export default function PhoneSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPhones = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://speczone-api-kirubelwebs-projects.vercel.app/search?q=${encodeURIComponent(query)}`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "An error occurred while searching for phones",
        );
      }
      const devices = await response.json();
      setResults(devices);
    } catch (error) {
      console.error("Error searching for phones:", error);
      setError(
        error.message ||
          "An error occurred while searching for phones. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchPhones();
    }
  };

  const extractFeatures = (description) => {
    const features = {
      announced: "N/A",
      camera: "N/A",
      chipset: "N/A",
      battery: "N/A",
      storage: "N/A",
    };

    const announcedMatch = description.match(/(\d+\.?\d*)″ Announced/);
    if (announcedMatch) features.announced = announcedMatch[1] + '"';

    const cameraMatch = description.match(/(\d+) MP primary camera/);
    if (cameraMatch) features.camera = cameraMatch[1] + " MP";

    const chipsetMatch = description.match(/(\w+) chipset/);
    if (chipsetMatch) features.chipset = chipsetMatch[1];

    const batteryMatch = description.match(/(\d+) mAh battery/);
    if (batteryMatch) features.battery = batteryMatch[1] + " mAh";

    const storageMatch = description.match(/(\d+) GB storage/);
    if (storageMatch) features.storage = storageMatch[1] + " GB";

    return features;
  };

  return (
    <div className="phone-search-container">
      <h2>Phone Search</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter phone name"
          className="search-input"
        />
        <button type="submit" disabled={isLoading} className="search-button">
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {results.length > 0 && (
        <div className="results-container">
          {results.map((device) => {
            const features = extractFeatures(device.description);
            return (
              <div key={device.id} className="device-card">
                <img
                  src={device.img}
                  alt={device.name}
                  className="device-image"
                />
                <div className="device-info">
                  <h3 className="device-name">{device.name}</h3>
                  <p className="device-description">{device.description}</p>
                  <ul className="device-features">
                    <li>Display: {features.announced}</li>
                    <li>Camera: {features.camera}</li>
                    <li>Chipset: {features.chipset}</li>
                    <li>Battery: {features.battery}</li>
                    <li>Storage: {features.storage}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
