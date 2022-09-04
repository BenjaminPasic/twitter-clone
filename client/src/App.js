import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RouteGuard from "./components/RouteGuard";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const { currentUserId, setCurrentUserId } = useAuth();

  useEffect(() => {
    const getUserId = async () => {
      const res = await axios.get(
        "http://localhost:3001/user/getUserIdByToken",
        {
          headers: { auth: localStorage.getItem("token") },
        }
      );
      if (res?.data?.user_id) {
        setCurrentUserId(res.data.user_id);
      }
    };

    if (!currentUserId && localStorage.getItem("token")) {
      getUserId();
    }
  }, []);

  return (
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
  );
}

export default App;
