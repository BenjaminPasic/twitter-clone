import "./Register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function Register() {
  const [userData, setUserData] = useState({
    username: null,
    email: null,
    password: null,
    repeatPassword: null,
  });

  const [userDataError, setUserDataError] = useState({
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
    repeatPasswordErrorMessage: "",
  });

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setUserDataError({
      username: false,
      email: false,
      password: false,
      repeatPassword: false,
      repeatPasswordErrorMessage: "",
    });

    if (!userData.username) {
      setUserDataError((prevData) => ({ ...prevData, username: true }));
    }
    if (!userData.email) {
      setUserDataError((prevData) => ({ ...prevData, email: true }));
    }
    if (!userData.password) {
      setUserDataError((prevData) => ({ ...prevData, password: true }));
    }
    if (!userData.repeatPassword) {
      setUserDataError((prevData) => ({ ...prevData, repeatPassword: true }));
    }
    if (userData.password !== userData.repeatPassword) {
      setUserDataError((prevData) => ({
        ...prevData,
        password: true,
        repeatPassword: true,
        repeatPasswordErrorMessage: "Passwords do not match",
      }));
    }
  };

  return (
    <div className="register">
      <form>
        <TextField
          onChange={(e) => handleChange(e)}
          name="username"
          margin="normal"
          label="Username"
          variant="outlined"
          size="small"
          required
          type="text"
          error={userDataError.username}
        />
        <TextField
          onChange={(e) => handleChange(e)}
          name="email"
          margin="normal"
          label="Email"
          variant="outlined"
          size="small"
          type="email"
          required
          error={userDataError.email}
        />
        <TextField
          onChange={(e) => handleChange(e)}
          name="password"
          margin="normal"
          label="Password"
          variant="outlined"
          size="small"
          required
          error={userDataError.password}
          type="password"
          helperText={
            userDataError.repeatPasswordErrorMessage
              ? userDataError.repeatPasswordErrorMessage
              : ""
          }
        />
        <TextField
          onChange={(e) => handleChange(e)}
          name="repeatPassword"
          margin="normal"
          label="Confirm Password"
          variant="outlined"
          size="small"
          type="password"
          required
          error={userDataError.repeatPassword}
          helperText={
            userDataError.repeatPasswordErrorMessage
              ? userDataError.repeatPasswordErrorMessage
              : ""
          }
        />
        <Button sx={{ mt: 2 }} onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}
