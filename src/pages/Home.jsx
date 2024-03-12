import { useState, useEffect } from "react";
import axios from "axios";
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
import "../styles/Home.css";

// Import Local Component
import Debouncing from "../component/Debouncing";

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

  //////////////////////////////////// Pagination Logic ////////////////////////

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResponse, setTotalResponse] = useState(null);

  const totalPages = Math.ceil(totalResponse / 10);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  // ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?s=all&apikey=e9868d94&t&t&page=${currentPage}`
        );
        setData(res.data.Search);
        setTotalResponse(res.data.totalResults);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [currentPage]);
  // ......................................................
  const categories = ["All", "Movie", "Series", "TV Shows"];
  const [data, setData] = useState(null);
  // https://www.omdbapi.com/?s=all&apikey=e9868d94&t
  const fetchData = async (category) => {
    try {
      if (category === "All") {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=all&apikey=e9868d94&t&t&page=${currentPage}`
        );
        setData(response.data.Search);
        setTotalResponse(response.data.totalResults);
        setDebouncedSearchTerm("");
      } else {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=all&apikey=e9868d94&t&type=${category.toLowerCase()}&page=${currentPage}`
        );
        setData(response.data.Search);
        setTotalResponse(response.data.totalResults);
        setDebouncedSearchTerm("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // ...........................................................
  /////////////////////////Debouncing/////////////////////////////////////
  const [searchMovie, setSearchMovie] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // State to track if user is typing
  const Api_key = "e9868d94&t";

  const handleInputChange = (event) => {
    setSearchMovie(event.target.value);
    setIsTyping(true); // User is typing
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchMovie);
      setIsTyping(false); // User stopped typing
    }, 600); // Delay time in milliseconds, adjust as needed

    return () => clearTimeout(debounceTimeout);
  }, [searchMovie]);

  useEffect(() => {
    const makeApi = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${Api_key}&s=${debouncedSearchTerm}`
        );
        setSearchData(response.data.Search);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (debouncedSearchTerm && !isTyping) {
      // Check if user stopped typing
      makeApi();
    }
  }, [debouncedSearchTerm, isTyping]);
  //////////////////////////////////////////////////////////////
  return (
    <div className="home_page">
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
                  value={searchMovie}
                  onChange={handleInputChange}
                  onClick={() => setIsTyping(true)}
                />
                <button
                  className="btn btn-light text-dark "
                  onClick={handleInputChange}
                >
                  {" "}
                  <span>Search</span>
                </button>
              </div>
              <div className="login">
                <p>
                  <FaUser size={22} />
                  Login
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
                <a href="#">Login</a>
                <a href="#">Register</a>
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
      <section>
        <div className="movies_list">
          <div className="mt-3">
            {categories.map((category, index) => (
              <button
                className="btn btn-success"
                key={index}
                onClick={() => fetchData(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {data === undefined ? (
            <h2 className="text-center mt-4"> Movies Not Found</h2>
          ) : (
            ""
          )}
        </div>
        <div>
          <Debouncing
            searchData={searchData}
            debouncedSearchTerm={debouncedSearchTerm}
          />
        </div>
        <div className="display_data">
          <div>
            {data &&
              data.map((item, ind) => {
                return (
                  <div key={ind}>
                    <img src={item.Poster} alt={item.Title} />
                    <p>{item.Title}</p>
                    <p>Type : {item.Type}</p>
                    <button className="btn btn-danger mb-3 mt-4">
                      Play Now
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="parent_pagination">
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            {renderPageButtons()}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
