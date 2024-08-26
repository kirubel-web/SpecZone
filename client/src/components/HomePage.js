import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import PhoneSearch from "./PhoneSearch";
export default function HomePage() {
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const goToProfile = () => {
    navigate("/profile"); // Navigate to the user profile page
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-content">
          <h1 className="welcome-text">
            Welcome, {user?.username || user.user.username}!
          </h1>
          <button className="profile-button" onClick={goToProfile}>
            Profile
          </button>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
        <p className="subtitle">
          Your go-to place for tech device specifications and reviews.
        </p>
      </header>

      {/* Search Form */}
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <PhoneSearch />

      {/* Main Content */}
      <main>
        {/* Popular Categories Section */}
        <section className="content-section">
          <h3 className="section-title">Popular Categories</h3>
          <div className="grid">
            {["Smartphones", "Laptops", "Wearables"].map((category, index) => (
              <div key={index} className="grid-item">
                <h4 className="item-title">{category}</h4>
                <p className="item-description">
                  Explore the latest and greatest in {category.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Devices Section */}
        <section className="content-section">
          <h3 className="section-title">Featured Devices</h3>
          <div className="grid">
            {[
              {
                name: "iPhone 14 Pro",
                desc: "Latest flagship from Apple with a stunning display.",
              },
              {
                name: "MacBook Air M2",
                desc: "Powerful and portable, the best of both worlds.",
              },
              {
                name: "Samsung Galaxy Watch 5",
                desc: "Track your health with Samsung's latest wearable.",
              },
            ].map((device, index) => (
              <div key={index} className="grid-item">
                <h4 className="item-title">{device.name}</h4>
                <p className="item-description">{device.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="homepage-footer">
        <p>&copy; 2024 SpecZone. All rights reserved.</p>
      </footer>
    </div>
  );
}
