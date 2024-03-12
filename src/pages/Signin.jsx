import styles from "../styles/Signin.module.css";
import { AuthContectProvider } from "../context/AuthContext";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const { auth, setAuth } = useContext(AuthContectProvider);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    mail: "",
    password: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...userData };
    localStorage.setItem("userData", JSON.stringify(data));
    alert("Accounted Created");
    setUserData({
      name: "",
      mail: "",
      password: "",
    });
    setAuth(true);

    navigate("/account");
  }

  return (
    <div className={styles.parent}>
      <form action="#" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <div>
          <dl>
            <dt>
              <label htmlFor="name">Name :</label>
            </dt>
            <dd>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Your Full Name"
                id="name"
                name="name"
                onChange={handleChange}
                value={userData.name}
              />
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>
              <label htmlFor="mail">Email :</label>
            </dt>
            <dd>
              <input
                className="form-control"
                type="email"
                placeholder="Enter Your Email"
                id="mail"
                name="mail"
                onChange={handleChange}
                value={userData.mail}
              />
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>
              <label htmlFor="password">Password :</label>
            </dt>
            <dd>
              <input
                className="form-control"
                type="password"
                placeholder="Create Password"
                id="password"
                name="password"
                onChange={handleChange}
                value={userData.password}
              />
            </dd>
          </dl>
        </div>
        <div className="text-center">
          {" "}
          <Link to="/">
            <button className="btn btn-link me-4 text-white">Back</button>
          </Link>
          <input type="submit" value="Register" className="btn btn-success" />
          <Link to="/login">
            <button className="btn btn-primary ms-4">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Signin;
