import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaHistory,
  FaClock,
  FaThumbsUp,
  FaVideo,
} from "react-icons/fa";

/*

*/

import "../styles/Home.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      // Check if screen width is 768px or below
      if (window.innerWidth <= 768) {
        setShowMenu(false); // Close sidebar if screen width is 768px or below
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="toggle-button" onClick={toggleMenu}>
            <span>
              <FaBars size={25} />
            </span>
          </div>
          <div className="navbar-brand">
            <a href="#">
              <h2>Logo</h2>
            </a>
          </div>
          <div className="navbar-icons">
            <div className="input-group search-div">
              <input
                type="text"
                className="form-control "
                placeholder="Search Movies"
              />
              <button className="btn btn-light text-dark ">
                {" "}
                <span>Search</span>
              </button>
            </div>
            <div className="login">
              <p>
                <FaUser size={22} />
                Login/signin
              </p>
            </div>
            <div className="icons">
              <a href="#">
                <span>
                  <FaShoppingCart size={22} />
                </span>
              </a>{" "}
              <a href="#">
                <span>
                  <FaHeart size={22} />
                </span>
              </a>{" "}
              <a href="#">
                <span>Profile</span>
              </a>
            </div>
          </div>
        </div>
        <div className={`sidebar ${showMenu ? "active" : ""}`}>
          <div className="sidebar-content">
            <button className="close-button" onClick={closeMenu}>
              <span>
                <FaTimes size={25} />
              </span>
            </button>
            <div className="sidebar-logo">
              <a href="#">
                <h2>Logo</h2>
              </a>
              <a href="#">Login/Signin</a>
              <div className="sidebar_link">
                <div>
                  <FaUser style={{ marginRight: "10px" }} />
                  Account
                </div>
                <div>
                  <FaHistory style={{ marginRight: "10px" }} />
                  History
                </div>
                <div>
                  <FaClock style={{ marginRight: "10px" }} />
                  Watch Later
                </div>
                <div>
                  <FaThumbsUp style={{ marginRight: "10px" }} />
                  Liked Movies
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
