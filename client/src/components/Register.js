import "./Register.css";
import toast, { Toaster } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";

export default function Register() {
  const { data, axiosError, isPending, postData } = useAxios(
    "http://localhost:3001/user",
    "POST"
  );

  const [formError, setFormError] = useState(null);

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
    usernameFormErrorMessage: "",
  });

  useEffect(() => {
    if (axiosError === "Username already exists") {
      setUserDataFormError((prevData) => ({
        ...prevData,
        username: true,
        usernameFormErrorMessage: axiosError,
      }));
    }
  }, [axiosError]);

  useEffect(() => {
    if (data) {
      toast.success("Done");
    }
  }, [data]);

  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setUserDataFormError({
      username: false,
      email: false,
      password: false,
      repeatPassword: false,
      repeatPasswordFormErrorMessage: "",
      usernameFormErrorMessage: "",
    });

    if (!userData.username) {
      setUserDataFormError((prevData) => ({ ...prevData, username: true }));
      setFormError(true);
    }
    if (!userData.email) {
      setUserDataFormError((prevData) => ({ ...prevData, email: true }));
      setFormError(true);
    }
    if (!userData.password) {
      setUserDataFormError((prevData) => ({ ...prevData, password: true }));
      setFormError(true);
    }
    if (!userData.repeatPassword) {
      setUserDataFormError((prevData) => ({
        ...prevData,
        repeatPassword: true,
      }));
      setFormError(true);
    }
    if (userData.password !== userData.repeatPassword) {
      setUserDataFormError((prevData) => ({
        ...prevData,
        password: true,
        repeatPassword: true,
        repeatPasswordFormErrorMessage: "Passwords do not match",
      }));
      setFormError(true);
    }

    if (!formError) {
      postData(userData);
    }
  };

  return (
    <div className="register">
      <Toaster position="top-right" />
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
          helperText={
            userDataFormError.usernameFormErrorMessage
              ? userDataFormError.usernameFormErrorMessage
              : ""
          }
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
        {isPending && (
          <Button sx={{ mt: 2 }} variant="contained" disabled>
            Loading
          </Button>
        )}
        {!isPending && (
          <Button sx={{ mt: 2 }} onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
