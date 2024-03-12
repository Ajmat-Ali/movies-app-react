import styles from "../styles/Login.module.css";

function Login() {
  return (
    <div className={styles.parent}>
      <h2>Login</h2>
      <form action="#">
        <p>Enter Email</p>
        <div className={`input-group`}>
          <input
            className={`form-control`}
            type="text"
            name=""
            id=""
            placeholder="Enter Email"
          />
        </div>
        <p>Enter Password</p>
        <div className={`input-group`}>
          <input
            className={`form-control`}
            type="password"
            name="password"
            id=""
            placeholder="Enter Password"
          />
          <button className={`btn btn-primary`}>Eye</button>
        </div>
        <input type="submit" className={`btn btn-success`} />
      </form>
    </div>
  );
}

export default Login;
