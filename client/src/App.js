import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RouteGuard from "./components/RouteGuard";

function App() {
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
