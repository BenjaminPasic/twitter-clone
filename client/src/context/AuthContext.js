import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
