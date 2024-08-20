import React, { useState, useContext } from "react";
import Navbar from "./LandingNavBar";
import { Button } from "reactstrap";
import { AuthContext } from "./contexts/AuthContext";
import "./login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ userName, password });
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
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group-login">
            <label htmlFor="password">Password* </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
