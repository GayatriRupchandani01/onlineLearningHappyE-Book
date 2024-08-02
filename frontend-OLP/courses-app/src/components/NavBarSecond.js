import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingnavBar.css";
import myImage from "../assets/ELearning.png";
import Cookies from "js-cookie";

const NavBarSecond = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role");

  return (
    <nav class="navbar" style={{ width: "100%" }}>
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
        {role !== "STUDENT" && (
          <button
            className="navbar-button"
            onClick={() => navigate("/add-course")}
          >
            Add Course
          </button>
        )}
        <button
          className="navbar-button"
          onClick={() => navigate("/enrolled-courses")}
        >
          My Courses
        </button>
        <button
          className="navbar-button"
          onClick={() => navigate("/view-courses")}
        >
          View Courses
        </button>

        <button
          className="navbar-button"
          onClick={() => navigate("/")}
          style={{ marginRight: "11px" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBarSecond;
