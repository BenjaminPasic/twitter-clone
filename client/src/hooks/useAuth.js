import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const { isAuth, setIsAuth, userInfo, setUserInfo } = useContext(AuthContext);

  return { isAuth, setIsAuth, userInfo, setUserInfo };
}
