import React, { useState } from "react";
import "./login.css";
import Navbar from "./LandingNavBar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", userName, "Password:", password);

    try {
      const response = await fetch("http://localhost:8080/user/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      const data = await response.json();
      const userId = data.id;
      navigate("/view-courses");

      Cookies.set("userId", userId);

      const role = data.role;
      Cookies.set("role", role);
      const name = `${data.firstName} ${data.middleName} ${data.lastName}`;

      Cookies.set("name", name);
      console.log(name);
      toast.success("Login successful!");
    } catch (error) {
      setErrors(error.message);
      console.error("Login error:", error);
      toast.error("Invalid username or password");
    }
  };

  const handleUsernameChange = (e) => {
    const name = e.target;
    const value = e.target.value;
    setUserName(value);
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        userName: "Username is required",
      }));
    } else if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        userName: "Username must contain only letters and spaces",
      }));
    } else if (value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        userName: "Username must be at least 3 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, userName: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else if (value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group-login">
            <label htmlFor="username">Username* </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
            {errors.userName && <span>{errors.userName}</span>}
          </div>
          <div className="form-group-login">
            <label htmlFor="password">Password* </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={handlePasswordChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <Button className="login-box-button" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
