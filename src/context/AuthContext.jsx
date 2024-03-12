import { createContext, useState } from "react";

export const AuthContectProvider = createContext();

function AuthContext({ children }) {
  const [auth, setAuth] = useState(false);

  const Authentication = {
    auth,
    setAuth,
  };

  return (
    <AuthContectProvider.Provider value={Authentication}>
      {children}
    </AuthContectProvider.Provider>
  );
}
export default AuthContext;
