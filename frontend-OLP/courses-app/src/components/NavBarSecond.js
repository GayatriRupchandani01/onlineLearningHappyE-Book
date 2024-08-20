import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingnavBar.css";
import myImage from "../assets/ELearning.png";
import humanImage from "../assets/humanEmoji.jpg";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";

const NavBarSecond = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role");

  const shouldShowEditButton = (role) => {
    if (role === "ADMIN" || role === "AUTHOR") {
      return true;
    } else if (role === "STUDENT") {
      return false;
    } else {
      return false;
    }
  };

  const showButton = shouldShowEditButton(role);
  const userName = Cookies.get("userName");
  const email = Cookies.get("email");

  const handleSignOut = () => {
    Cookies.remove("userName");
    Cookies.remove("email");
    Cookies.remove("role");
    navigate("/login");
  };

  return (
    <Navbar>
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
          {showButton && (
            <button
              className="navbar-button"
              onClick={() => navigate("/add-course")}
            >
              Add Course
            </button>
          )}
          <button
            className="navbar-button"
            onClick={() => navigate("/view-courses")}
          >
            View Courses
          </button>
          {!showButton && (
            <button
              className="navbar-button"
              onClick={() => navigate("/enrolled-courses")}
            >
              My Enrollments
            </button>
          )}

          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: "white" }}>
                <FaUser size={20} />
              </DropdownToggle>
              <DropdownMenu
                right
                className="user-dropdown-menu"
                style={{ position: "absolute", top: "100%", right: 0 }}
              >
                <DropdownItem header>
                  <div className="user-info">
                    <img
                      src={humanImage}
                      alt="User Icon"
                      className="user-icon"
                    />
                    <div>
                      <div className="user-username">
                        Hi, <strong>{userName}</strong>
                      </div>
                      <div className="user-email">{email}</div>
                      <div className="user-role">{role}</div>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={handleSignOut}
                  style={{ textAlign: "center" }}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      </nav>
    </Navbar>
  );
};

export default NavBarSecond;
