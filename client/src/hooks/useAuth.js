import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const { isAuth, setIsAuth, currentUserId, setCurrentUserId } =
    useContext(AuthContext);

  return { isAuth, setIsAuth, currentUserId, setCurrentUserId };
}
