import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import axios from "axios";

export default function RouteGuard() {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/verifyToken", {
          headers: { auth: localStorage.getItem("token") },
        });
        if (res?.data.isValid) setIsTokenValid(true);
      } catch (error) {
        console.log(error);
        setIsTokenValid(false);
      }
    };
    if (!localStorage.getItem("token")) {
      setIsTokenValid(true);
    } else {
      verifyToken();
    }
  });

  return isTokenValid == null ? (
    <p>Loading...</p>
  ) : isTokenValid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
