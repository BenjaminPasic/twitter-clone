import "./Login.css";
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

  const handleSubmit = (e) => {
    let error = false;

    if (!loginDetails.username) {
      error = true;
      setLoginDetailsError((prevData) => ({
        ...prevData,
        username: true,
        usernameErrorText: "You need to enter a username",
      }));
    }

    if (!loginDetails.password) {
      error = true;
      setLoginDetailsError((prevData) => ({
        ...prevData,
        password: true,
        passwordErrorText: "You need to enter a password",
      }));
    }

    if (!error) {
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
      </form>
    </div>
  );
}
