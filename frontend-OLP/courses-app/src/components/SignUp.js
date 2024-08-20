import React, { useState, useContext } from "react";
import Navbar from "./LandingNavBar";
import { AuthContext } from "./contexts/AuthContext";
import "./SignUp.css";

const SignUp = () => {
  const { signup } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({
      email,
      userName,
      password,
      firstName,
      middleName,
      lastName,
      role,
    });
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-container">
          <div className="form-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <label>Username* </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
              />
              <label>Email* </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <label>Password* </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <label>First Name* </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
              <label>Middle Name </label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Enter your middle name"
              />
              <label>Last Name* </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
              <label htmlFor="role">Select Role* </label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select...</option>
                <option value="STUDENT">STUDENT</option>
                <option value="ADMIN">ADMIN</option>
                <option value="AUTHOR">AUTHOR</option>
              </select>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
