import "./Register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAxios from "../hooks/useAxios";
import { useState } from "react";

export default function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [userDataFormError, setUserDataFormError] = useState({
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
    repeatPasswordFormErrorMessage: "",
  });

  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    let error = false;

    setUserDataFormError({
      username: false,
      email: false,
      password: false,
      repeatPassword: false,
      repeatPasswordFormErrorMessage: "",
    });

    if (!userData.username) {
      setUserDataFormError((prevData) => ({ ...prevData, username: true }));
      error = true;
    }
    if (!userData.email) {
      setUserDataFormError((prevData) => ({ ...prevData, email: true }));
      error = true;
    }
    if (!userData.password) {
      setUserDataFormError((prevData) => ({ ...prevData, password: true }));
      error = true;
    }
    if (!userData.repeatPassword) {
      setUserDataFormError((prevData) => ({
        ...prevData,
        repeatPassword: true,
      }));
      error = true;
    }
    if (userData.password !== userData.repeatPassword) {
      setUserDataFormError((prevData) => ({
        ...prevData,
        password: true,
        repeatPassword: true,
        repeatPasswordFormErrorMessage: "Passwords do not match",
      }));
      error = true;
    }

    if (!error) {
      //submit data to database
      //Also include toast ?? maybe
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
          error={userDataFormError.username}
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
          error={userDataFormError.email}
        />
        <TextField
          onChange={(e) => handleChange(e)}
          name="password"
          margin="normal"
          label="Password"
          variant="outlined"
          size="small"
          required
          error={userDataFormError.password}
          type="password"
          helperText={
            userDataFormError.repeatPasswordFormErrorMessage
              ? userDataFormError.repeatPasswordFormErrorMessage
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
          error={userDataFormError.repeatPassword}
          helperText={
            userDataFormError.repeatPasswordFormErrorMessage
              ? userDataFormError.repeatPasswordFormErrorMessage
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
