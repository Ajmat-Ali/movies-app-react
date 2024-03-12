import { useContext } from "react";
import { Navigate } from "react-router-dom";

// local Import
import { AuthContectProvider } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContectProvider);
  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
