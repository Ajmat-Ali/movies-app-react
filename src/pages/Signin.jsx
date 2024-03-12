import styles from "../styles/Signin.module.css";

import { useState } from "react";

function Signin() {
  const [userData, setUserData] = useState({
    name: "",
    mail: "",
    password: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
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
          <input type="submit" value="Register" className="btn btn-success" />
        </div>
      </form>
    </div>
  );
}
export default Signin;
