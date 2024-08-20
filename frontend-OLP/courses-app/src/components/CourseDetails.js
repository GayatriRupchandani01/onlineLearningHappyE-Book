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
import { useAuth } from "./contexts/AuthContext";

const CourseDetails = () => {
  const location = useLocation();

  const courseId = location.state?.id;
  const { authToken } = useAuth();

  useEffect(() => {
    document.title = "Course Details || Learn courses with Happy E-Book";
  }, []);

  let navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState([]);
  const role = Cookies.get("role");

  const userId = Cookies.get("userId");

  useEffect(() => {
    if (!courseId || courseId === "undefined") {
      toast.error("Couldn't fetch course");
    }
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCourseDetails(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Couldn't fetch course");
      }
    };

    fetchCourseDetails();
  }, [courseId, authToken]);

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
      const response = await axios.post(
        "http://localhost:8080/enrollments",
        {
          userId,
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Enrolled successfully", response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("You have already enrolled in this course.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleEnroll = () => {
    enrollUser(courseId);
  };

  const isAuthor = () => {
    const userIdN = parseInt(userId);
    const instructorId = courseDetails.instructorId;
    const result = instructorId === userIdN;
    return result;
  };

  const isAuthorvar = isAuthor();

  const shouldShowEditButton = (role) => {
    if (role === "ADMIN") {
      return true;
    } else if (isAuthorvar) {
      return true;
    } else if (role === "STUDENT") {
      return false;
    } else {
      return false;
    }
  };

  const shouldEnroll = (role) => {
    if (role === "ADMIN" || role === "AUTHOR") {
      return false;
    } else if (role === "STUDENT") {
      return true;
    } else {
      return false;
    }
  };

  const showButton = shouldShowEditButton(role);
  const showEnroll = shouldEnroll(role);

  return (
    <>
      <NavBarSecond />

      <Container className="course-details-container">
        <Row>
          <Col md="6" className="course-details">
            <div className="course-details-panel">
              {showEnroll && (
                <button className="button-enroll" onClick={handleEnroll}>
                  Enroll
                </button>
              )}
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
          <Col md="6" className="course-image">
            <img src={myImage} alt="Course" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseDetails;
