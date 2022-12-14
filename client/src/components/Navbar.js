import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Navbar() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return (
      <div className="navbar">
        <nav>
          <ul>
            <li className="title">
              <Link to="/">Twitter clone</Link>
            </li>
            <li>
              <LogoutIcon className="logout-icon" style={{ color: "white" }} />
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <nav>
          <ul>
            <li className="title">
              <Link to="/">Twitter clone</Link>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
