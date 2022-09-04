import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import axios from "axios";

export default function RouteGuard() {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const { setIsAuth } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const res = await axios.get("http://localhost:3001/user/verifyToken", {
        headers: { Auth: localStorage.getItem("token") },
      });
      if (res?.data?.isValid) {
        setIsTokenValid(true);
        setIsAuth(true);
      } else {
        setIsTokenValid(false);
        setIsAuth(false);
      }
    };

    if (!localStorage.getItem("token")) {
      setIsTokenValid(false);
    } else {
      verifyToken();
    }
  }, []);

  return isTokenValid == null ? (
    <p>Loading...</p>
  ) : isTokenValid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
