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
import Cookies from "js-cookie";

const Course = ({ course, update }) => {
  let navigate = useNavigate();
  const role = Cookies.get("role");

  const confirmAndDelete = (id) => {
    axios.get(`${base_url}/enrollments/course/${id}`).then(
      (response) => {
        if (response) {
          const deletionConfirm = window.confirm(
            "Some people have enrolled for this course, Do you really want to delete this"
          );
          if (deletionConfirm) {
            deleteCourse(id);
          }
        } else {
          deleteCourse(id);
        }
      },
      (error) => {
        toast.error("Something wnet wrong");
      }
    );
  };

  const deleteCourse = (id) => {
    axios.delete(`${base_url}/courses/${id}`).then(
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

  return (
    <Card
      style={{
        width: "19rem",
        height: "9rem",
        float: "left",
        backgroundColor: "#f2f1e7",
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
          {role !== "STUDENT" && (
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
            color="warning"
            style={{ marginLeft: "10px" }}
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
