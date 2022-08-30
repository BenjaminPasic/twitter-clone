import "./Login.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAxios from "../hooks/useAxios";
import { useEffect, useState, useRef } from "react";

export default function Login() {
  const usernameRef = useRef(null);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [loginDetailsError, setLoginDetailsError] = useState({
    username: false,
    password: false,
    usernameErrorText: "",
    passwordErrorText: "",
  });

  const [formError, setFormError] = useState(false);

  //On initial render, focus the username field
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  //If the user changes their username or password, reset the error state.
  useEffect(() => {
    setLoginDetailsError({
      username: false,
      password: false,
      usernameErrorText: "",
      passwordErrorText: "",
    });
  }, [loginDetails.username, loginDetails.password]);

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let error = false;
    if (!loginDetails.username) {
      setLoginDetailsError((prevData) => ({
        ...prevData,
        username: true,
        usernameErrorText: "You need to enter a username",
      }));
      error = true;
    }

    if (!loginDetails.password) {
      setLoginDetailsError((prevData) => ({
        ...prevData,
        password: true,
        passwordErrorText: "You need to enter a password",
      }));
      error = true;
    }

    if (!formError) {
      console.log(loginDetails);
    }
  };

  return (
    <div className="login">
      <form>
        <h2 className="title">Login</h2>
        <TextField
          inputRef={usernameRef}
          onChange={(e) => handleChange(e)}
          name="username"
          margin="normal"
          label="Username"
          variant="outlined"
          size="small"
          required
          type="text"
          error={loginDetailsError.username}
          helperText={
            loginDetailsError.usernameErrorText
              ? loginDetailsError.usernameErrorText
              : ""
          }
        />
        <TextField
          onChange={(e) => handleChange(e)}
          name="password"
          margin="normal"
          label="Username"
          variant="outlined"
          size="small"
          required
          type="password"
          error={loginDetailsError.password}
          helperText={
            loginDetailsError.passwordErrorText
              ? loginDetailsError.passwordErrorText
              : ""
          }
        />
        <Button sx={{ mt: 2 }} variant="contained" onClick={handleSubmit}>
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
