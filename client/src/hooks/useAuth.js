import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return { isAuth, setIsAuth };
}
