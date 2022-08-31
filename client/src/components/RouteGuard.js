import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RouteGuard() {
  const { auth } = useAuth();
  console.log(auth);
  return auth?.token ? <Outlet /> : <Navigate to="/login" />;
}
