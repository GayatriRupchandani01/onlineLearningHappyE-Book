import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetch from "node-fetch";
import "./SignUp.css";
import Navbar from "./LandingNavBar";
import { toast } from "react-toastify";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid Email format",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
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

  const handleFirstName = (e) => {
    const value = e.target.value;
    setFirstName(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First Name is required",
      }));
    } else if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First name must contain only alphabets",
      }));
    } else {
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
  };

  const handleMiddleName = (e) => {
    const value = e.target.value;
    setMiddleName(value);

    if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        middleName: "Middle name must contain only alphabets",
      }));
    } else {
      setErrors((prev) => ({ ...prev, middleName: "" }));
    }
  };

  const handleLastname = (e) => {
    const value = e.target.value;
    setLastName(value);

    if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        lastName: "Last name must contain only alphabets",
      }));
    } else {
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        role: "Role is required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, role: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        userName,
        password,
        firstName,
        middleName,
        lastName,
        role,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("User created successfully");

          navigate("/login");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong");
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
                id="username"
                placeholder="Enter your username"
                value={userName}
                onChange={handleUsernameChange}
              />
              {errors.userName && <span>{errors.userName}</span>}
              <label>Email* </label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email"
                required
              />
              {errors.email && <span>{errors.email}</span>}
              <label>Password* </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                required
              />
              {errors.password && <span>{errors.password}</span>}
              <label>First name* </label>
              <input
                type="text"
                value={firstName}
                placeholder="Enter first name"
                onChange={handleFirstName}
                required
              />
              {errors.firstName && <span>{errors.firstName}</span>}

              <label>Middle name </label>
              <input
                type="text"
                value={middleName}
                placeholder="Enter middle name"
                onChange={handleMiddleName}
              />
              {errors.middleName && <span>{errors.middleName}</span>}
              <label>Last name </label>
              <input
                type="text"
                value={lastName}
                placeholder="Enter last name"
                onChange={handleLastname}
              />
              {errors.lastName && <span>{errors.lastName}</span>}

              <label htmlFor="role">Select Role* </label>
              <select id="role" onChange={handleRoleChange}>
                <option value="">Select...</option>
                <option value="STUDENT">STUDENT</option>
                <option value="ADMIN">ADMIN</option>
                <option value="AUTHOR">AUTHOR</option>
              </select>
              {errors.role && <span>{errors.role}</span>}
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
