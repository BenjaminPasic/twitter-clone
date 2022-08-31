import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  console.log("context:", useContext(AuthContext));
  return useContext(AuthContext);
};

export default useAuth;
