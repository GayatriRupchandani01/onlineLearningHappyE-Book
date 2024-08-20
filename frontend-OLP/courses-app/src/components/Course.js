import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Container,
} from "reactstrap";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import { IoPersonCircle } from "react-icons/io5";
import { useAuth } from "./contexts/AuthContext";
import Cookies from "js-cookie";

const Course = ({ course, update }) => {
  let navigate = useNavigate();
  const role = Cookies.get("role");
  const userId = Cookies.get("userId");
  const { authToken } = useAuth();

  const confirmAndDelete = (id) => {
    axios
      .get(`${base_url}/enrollments/course/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(
        (response) => {
          if (response.data == true) {
            toast.error(
              "Couldn't delete the course as some people have already enrolled for this course."
            );
          } else {
            deleteCourse(id);
          }
        },
        (error) => {
          toast.error("Something went wrong");
        }
      );
  };

  const deleteCourse = (id) => {
    axios
      .delete(`${base_url}/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(
        (response) => {
          toast.success("Course deleted successfully");
          update(id);
        },
        (error) => {
          toast.error("Course not deleted, Server problem");
        }
      );
  };

  function handleClick(id) {
    navigate(`/view-course-details/${id}`, {
      state: { id: id },
    });
  }

  const isAuthor = () => {
    const userIdN = parseInt(userId);
    const instructorId = course.instructorId;
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

  const showButton = shouldShowEditButton(role);

  return (
    <Card
      style={{
        width: "19rem",
        height: "9rem",
        float: "left",
        backgroundColor: "#61c0bf",
      }}
      className="m-2 p-1"
    >
      <CardBody className="text-center">
        <CardSubtitle style={{ fontWeight: "bold" }}>
          {course.title}
        </CardSubtitle>
        <CardText>
          <IoPersonCircle style={{ marginRight: "2px", marginBottom: "3px" }} />
          {course.author}
        </CardText>
        <Container className="text-center">
          {showButton && (
            <Button
              color="danger"
              onClick={() => {
                confirmAndDelete(course.id);
              }}
            >
              Delete
            </Button>
          )}
          <Button
            style={{ marginLeft: "10px", backgroundColor: "#085f63" }}
            onClick={() => {
              handleClick(course.id);
            }}
          >
            View More Details
          </Button>
        </Container>
      </CardBody>
    </Card>
  );
};

export default Course;
