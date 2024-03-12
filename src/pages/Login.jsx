import React, { useContext, useState } from "react";
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";

import { AuthContectProvider } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [{ mail, password }, setData] = useState({ mail: "", password: "" });
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { setAuth } = useContext(AuthContectProvider);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ mail, password, [name]: value });
    console.log(mail, password);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userData.mail === mail && userData.password === password) {
      setAuth(true);
      navigate("/account");
    } else {
      navigate("/register");
    }
  }

  return (
    <div className={styles.parent}>
      <h2>Login</h2>
      <form action="#" onSubmit={handleSubmit}>
        <p>Enter Email</p>
        <div className={`input-group`}>
          <input
            className={`form-control`}
            type="email"
            name="mail"
            onChange={handleChange}
            placeholder="Enter Email"
            value={mail}
          />
        </div>
        <p>Enter Password</p>
        <div className={`input-group`}>
          <input
            className={`form-control ${showPassword ? "visible" : ""}`}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            value={password}
          />
          <button
            className={`btn btn-primary`}
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <Link to="/">
          <button className={`btn btn-link text-white ${styles.back}`}>
            Back
          </button>
        </Link>
        <input type="submit" className={`btn btn-success`} />
        <Link to="/register">
          <button className="btn btn-primary ms-4">Register</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
