import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1 className="text-center mt-4" style={{ color: "red" }}>
        Page Not Found
      </h1>
      <p className="text-center mt-4">
        <Link to="/">
          <button className="btn btn-primary">Back</button>
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
