import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RouteGuard() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/verifyToken", {
          headers: { Auth: localStorage.getItem("token") },
        });
        setIsAuth(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (!localStorage.getItem("token")) {
      setIsAuth(false);
    } else {
      verifyToken();
    }
  }, []);

  return isAuth == null ? (
    <p>Loading...</p>
  ) : isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
