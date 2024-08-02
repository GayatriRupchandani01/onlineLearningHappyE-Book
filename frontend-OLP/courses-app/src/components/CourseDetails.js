import React, { useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { MdEdit } from "react-icons/md";
import NavBarSecond from "./NavBarSecond";
import { IoPersonCircle } from "react-icons/io5";
import "./CourseDetails.css";
import Cookies from "js-cookie";
import myImage from "../assets/Elearning_platform.jpg";

const CourseDetails = () => {
  let navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState([]);

  const location = useLocation();

  const courseId = location.state?.id;
  console.log(courseId);

  const role = Cookies.get("role");
  console.log(role);

  const name = Cookies.get("name");
  console.log(name);

  useEffect(() => {
    if (!courseId || courseId === "undefined") {
      toast.error("Couldn't fetch course");
    }
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/courses/${courseId}`);
        setCourseDetails(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Couldn't fetch course");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  function handleClick(id) {
    navigate(`/update-course-details/${id}`, {
      state: { id: id },
    });
  }

  const enrollUser = async (courseId) => {
    const userId = Cookies.get("userId");
    try {
      const response = await axios.post("http://localhost:8080/enrollments", {
        userId,
        courseId,
      });
      toast.success("enrolled successfully", response.data);
    } catch (error) {
      toast.error("Error enrolling user", error);
    }
  };

  const handleEnroll = () => {
    enrollUser(courseId);
  };

  const authorName = courseDetails.author;

  const isAuthor = () => {
    const nameN = name.trim().toLowerCase;
    const authorNameN = name.trim().toLowerCase;
    return nameN === authorNameN;
  };

  console.log(isAuthor() && role === "AUTHOR");

  const shouldShowEditButton = (role, name, authorName) => {
    if (role === "ADMIN") {
      return true;
    } else if (role === "AUTHOR" && isAuthor()) {
      return true;
    } else if (role === "STUDENT") {
      return false;
    } else {
      return false;
    }
  };

  const showButton = shouldShowEditButton();
  console.log("show button" + showButton);

  return (
    <>
      <NavBarSecond />
      <Container className="course-details-container">
        <Row>
          <Col md="8" className="course-details">
            <div className="course-details-panel">
              <button
                className="btn bg-primary"
                id="button-enroll"
                onClick={handleEnroll}
              >
                Enroll
              </button>
              {showButton && (
                <button
                  onClick={() => {
                    handleClick(courseDetails.id);
                  }}
                  className="button-edit"
                >
                  <MdEdit />
                </button>
              )}
              <h3>
                {courseDetails.courseCode} | {courseDetails.title}
              </h3>
              <h6>
                {" "}
                <IoPersonCircle
                  style={{ marginRight: "2px", marginBottom: "3px" }}
                />
                Author: {courseDetails.author}
              </h6>
              <hr />
              <p>
                <strong>What will you learn:</strong>{" "}
                {courseDetails.description}
              </p>
              <p>
                <strong>Prerequisites:</strong> {courseDetails.preRequisites}
              </p>
            </div>
          </Col>
          <Col md="4" className="course-image">
            <img src={myImage} alt="Course" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseDetails;
