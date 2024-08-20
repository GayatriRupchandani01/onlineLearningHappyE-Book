import React from "react";
import "./LandingnavBar.css";
import { useNavigate } from "react-router-dom";
import myImage from "../assets/ELearning.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        style={{ color: "white", fontFamily: "Playfair Display" }}
      >
        <img
          src={myImage}
          height="40"
          style={{ marginLeft: "7px" }}
          alt="Logo"
        />{" "}
        Happy E-Book
      </div>
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="navbar-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="navbar-button"
          style={{ marginRight: "11px" }}
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
