import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import FeatureSection from "./FeatureSection";
import "./teaser.css";

export default function Teaser() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Menu Toggled");

    setMenuOpen(!menuOpen);
  };
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // User is scrolling down
        setShowNavbar(false);
      } else {
        // User is scrolling up
        setShowNavbar(true);
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={showNavbar ? "" : "navbar-hidden"}>
        <div className="navbar">
          <div className="logo">
            <a href="#">SpecZone</a>
          </div>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`menu ${menuOpen ? "open" : ""}`}>
            <li>
              <a href="#Home">Home</a>
            </li>
            <li>
              <a href="#Contact">Contact</a>
            </li>
            <li>
              <a href="#Feedback">Feedback</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="teaser-container">
        <h1>Welcome to SpecZone</h1>
        <p>
          Experience the future of productivity with our cutting-edge AI
          solution.
        </p>
        <div className="teaser-actions">
          <Link to="/Login" className="btn">
            Get Started
          </Link>
          <Link to="#" className="btn">
            Learn More
          </Link>
        </div>
        <About />
        <FeatureSection />
        <div className="pricing-section">
          <h2>Choose Your Plan</h2>
          <div className="pricing-cards">
            <div className="card">
              <h3>Basic</h3>
              <div className="price">$0/mo</div>
              <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
              <Link to="#" className="btn">
                Select Plan
              </Link>
            </div>
            <div className="card">
              <h3>Pro</h3>
              <div className="price">$9/mo</div>
              <ul>
                <li>All Basic Features</li>
                <li>Feature 4</li>
                <li>Feature 5</li>
                <li>Feature 6</li>
              </ul>
              <Link to="#" className="btn">
                Select Plan
              </Link>
            </div>
            <div className="card">
              <h3>Enterprise</h3>
              <div className="price">$19/mo</div>
              <ul>
                <li>All Pro Features</li>
                <li>Feature 7</li>
                <li>Feature 8</li>
                <li>Priority Support</li>
              </ul>
              <Link to="#" className="btn">
                Select Plan
              </Link>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <h2>What Our Customers Say</h2>
          <div className="reviews">
            <div className="review">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Sarah Johnson"
              />
              <p>
                "This service has completely transformed our workflow. Highly
                recommended!"
              </p>
              <p>Sarah Johnson, CEO</p>
            </div>
            <div className="review">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Michael Chen"
              />
              <p>
                "Intuitive, powerful, and cost-effective. It's a game-changer
                for our team."
              </p>
              <p>Michael Chen, CTO</p>
            </div>
            <div className="review">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Emily Rodriguez"
              />
              <p>
                "The customer support is outstanding. They go above and beyond
                every time."
              </p>
              <p>Emily Rodriguez, Manager</p>
            </div>
          </div>
        </div>

        <div className="teaser-actions">
          <Link to="/Login" className="btn">
            Get Started
          </Link>
        </div>

        <div className="footer">
          <div className="footer-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Contact Us</Link>
          </div>
          <p>© 2024 SpecZone. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
