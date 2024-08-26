import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./userprofile.css";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || user.user.username,
    email: user?.email || user.user.email,
    bio: user?.bio || user.user.bio || "No bio yet.",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically send the updated user data to your backend
    console.log("Saving user data:", editedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header className="userprofile-header">
        <h1>User Profile</h1>
      </header>

      <main className="userprofile-main">
        <section className="profile-section user-info">
          <div className="profile-picture">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <button className="change-picture-btn">Change Picture</button>
          </div>
          <div className="profile-details">
            {isEditing ? (
              <>
                <input
                  name="username"
                  value={editedUser.username}
                  onChange={handleChange}
                  className="edit-input"
                />
                <input
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  className="edit-input"
                />
                <textarea
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleChange}
                  className="edit-input bio-input"
                />
              </>
            ) : (
              <>
                <h2>{editedUser.username}</h2>
                <p>{editedUser.email}</p>
                <p className="user-bio">{editedUser.bio}</p>
              </>
            )}
            <p className="member-since">
              <strong>Member Since:</strong>{" "}
              {new Date(
                user?.createdAt || user.user.createdAt,
              ).toLocaleDateString()}
            </p>
            {isEditing ? (
              <button className="edit-button save" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="edit-button" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>
        </section>

        <section className="profile-section">
          <h3 className="profile-title">Recent Activity</h3>
          <ul className="activity-list">
            <li>
              <span className="activity-icon">👁️</span>
              <span className="activity-text">Viewed: iPhone 14 Pro</span>
            </li>
            <li>
              <span className="activity-icon">🔍</span>
              <span className="activity-text">Searched: Laptops</span>
            </li>
            <li>
              <span className="activity-icon">❤️</span>
              <span className="activity-text">
                Added: Samsung Galaxy Watch 5 to wishlist
              </span>
            </li>
          </ul>
        </section>

        <section className="profile-section">
          <h3 className="profile-title">Your Reviews</h3>
          <div className="reviews-list">
            <div className="review-card">
              <h4>iPhone 14 Pro</h4>
              <div className="rating">★★★★☆</div>
              <p>Great phone with amazing camera capabilities!</p>
            </div>
            <div className="review-card">
              <h4>MacBook Air M2</h4>
              <div className="rating">★★★★★</div>
              <p>
                Incredible performance and battery life. Highly recommended!
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="userprofile-footer">
        <button className="back-button" onClick={() => window.history.back()}>
          Back to Home
        </button>
      </footer>
    </div>
  );
}
