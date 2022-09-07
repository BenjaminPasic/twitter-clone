import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { CircularProgress } from "@mui/material";
import Login from "./components/Login";
import Register from "./components/Register";
import RouteGuard from "./components/RouteGuard";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const { userInfo, setUserInfo, setIsAuth } = useAuth();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/user/getUserInfoByToken",
          {
            headers: { auth: localStorage.getItem("token") },
          }
        );
        setUserInfo({ user_id: res.data.user_id, username: res.data.username });
        setIsAuth(true);
      } catch (error) {
        if (error?.response?.data?.error === "Invalid token") {
          window.location.href = "/login";
        }
      }
    };

    if (localStorage.getItem("token")) {
      getUserInfo();
    }
  }, []);

  return userInfo ? (
    <main className="App">
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route element={<RouteGuard />}>
          <Route exact path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </main>
  ) : (
    <CircularProgress />
  );
}

export default App;
