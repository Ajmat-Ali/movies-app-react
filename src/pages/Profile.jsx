import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Profile.module.css";

function Profile() {
  const initialUserData = JSON.parse(localStorage.getItem("userData")) || {};
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!initialUserData) {
      // If there's no user data in local storage, initialize with empty object
      localStorage.setItem("userData", JSON.stringify({}));
    }
  }, []);

  const generatePlaceholderImage = (name) => {
    if (name && name.length > 0) {
      const initials = name.trim().charAt(0).toUpperCase();
      return `https://via.placeholder.com/150?text=${initials}`;
    } else {
      return `https://via.placeholder.com/150`;
    }
  };

  const handleEditSave = () => {
    if (isEditing) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result; // Base64 string
      setUserData({
        ...userData,
        profileImage: imageData,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.parent}>
      <h2 className="text-center">
        <span>Ajmat's Movies App</span>
      </h2>
      <div>
        <div
          className={styles.profileImageContainer}
          onClick={handleProfileImageClick}
        >
          {userData.profileImage ? (
            <img
              src={userData.profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <img
              src={generatePlaceholderImage(userData.name)}
              alt="Profile"
              className={styles.profileImage}
            />
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          )}
        </div>
        <dl>
          <dt>Name:</dt>
          <dd>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              userData.name
            )}
          </dd>
          <dt>Email:</dt>
          <dd>
            {isEditing ? (
              <input
                type="email"
                name="mail"
                value={userData.mail}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              userData.mail
            )}
          </dd>
          <dt>Password:</dt>
          <dd>
            {isEditing ? (
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="form-control"
                />
                <button
                  className="btn btn-primary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            ) : (
              "*********"
            )}
          </dd>
        </dl>
        <button className="btn btn-info" onClick={handleEditSave}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <Link to="/">
          <button className="btn btn-secondary ms-4">Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
