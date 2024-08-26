import React from "react";
import { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Teaser from "./components/Teaser";
import UserProfile from "./components/UserProfile";

import "./components/styles.css";
import "./components/homepage.css";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={user ? <HomePage /> : <Teaser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
