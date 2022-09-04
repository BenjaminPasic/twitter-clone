import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, currentUserId, setCurrentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
