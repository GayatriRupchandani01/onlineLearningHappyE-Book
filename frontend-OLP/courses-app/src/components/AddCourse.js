import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import NavBarSecond from "./NavBarSecond";
import { Card, CardBody } from "reactstrap";
import "./AddCourse.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "./contexts/AuthContext"; // Import useAuth hook

const AddCourse = () => {
  const { authToken } = useAuth(); // Get the token from AuthContext

  useEffect(() => {
    document.title = "Add Courses || Learn courses with Happy E-Book";
  }, []);

  const [course, setCourse] = useState({
    courseCode: "",
    title: "",
    description: "",
    preRequisites: "",
    url: "",
    author: "",
  });
  const [errors, setErrors] = useState({});
  const [instructorId, setInstructorId] = useState([]);

  const navigate = useNavigate();

  const handleCourseDetailsChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));

    if (name === "courseCode") {
      if (!value) {
        errors.courseCode = "Code is required";
      } else if (value.startsWith(" ")) {
        errors.courseCode = "First character cannot be a space";
      } else if (!/^[0-9]+$/.test(value)) {
        errors.courseCode = "Code must contain only numbers";
      } else {
        errors.courseCode = "";
      }
    }

    if (name === "title") {
      if (!value) {
        errors.title = "Title is required";
      } else if (value.startsWith(" ")) {
        errors.title = "First character cannot be a space";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errors.title = "Title must contain only alphabets";
      } else {
        errors.title = "";
      }
    }

    if (name === "description" && !value) {
      errors.description = "Description is required";
    } else if (value.startsWith(" ")) {
      errors.description = "First character cannot be a space";
    } else {
      errors.description = "";
    }

    if (name === "url") {
      if (!value) {
        errors.url = "Course URL is required";
      } else if (value.startsWith(" ")) {
        errors.value = "First character cannot be a space";
      } else if (
        !/^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=]+$/.test(
          value
        )
      ) {
        errors.url = "Invalid URL format";
      } else {
        errors.url = "";
      }
    }

    if (name === "author") {
      if (!value) {
        errors.author = "Author is required";
      } else if (value.startsWith(" ")) {
        errors.author = "First character cannot be a space";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errors.author = "Author must contain only alphabets";
      } else {
        errors.author = "";
      }
    }

    setErrors((prev) => ({ ...prev, ...errors }));
  };

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setInstructorId(userId);
      console.log(userId + " user ");
      console.log(instructorId + " instructor");
    }
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please provide valid input before submitting.");
      return;
    }
    postDataToServer(course, instructorId);
  };

  const postDataToServer = (data, instructorId) => {
    axios
      .post(`${base_url}/courses/${instructorId}`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(
        (response) => {
          console.log(response);
          toast.success("Course added successfully");
          navigate("/view-courses");
        },
        (error) => {
          if (error.response && error.response.status === 409) {
            toast.error("Course already exist with this courseCode");
          } else if (errors != "") {
            toast.error("Course already exist with this courseCode");
          } else {
            toast.error("Something went wrong!");
          }
        }
      );
  };

  return (
    <>
      <NavBarSecond />
      <div className="form-details">
        <Card className="glass-card">
          <h2 className="text-center my-1">Fill Course Details</h2>
          <hr />
          <CardBody>
            <Form onSubmit={handleForm}>
              <FormGroup>
                <label for="title">Course Title*</label>
                <Input
                  type="text"
                  value={course.title}
                  name="title"
                  placeholder="Enter title here"
                  id="title"
                  maxLength={30}
                  onChange={handleCourseDetailsChange}
                  required
                />
                {errors.title && <span className="error">{errors.title}</span>}
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <label for="courseCode">Code*</label>
                    <Input
                      type="text"
                      value={course.courseCode}
                      name="courseCode"
                      placeholder="Enter code here"
                      id="courseCode"
                      maxLength={6}
                      onChange={handleCourseDetailsChange}
                      required
                    />
                    {errors.courseCode && (
                      <span className="error">{errors.courseCode}</span>
                    )}
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <label for="author">Author*</label>
                    <Input
                      type="text"
                      value={course.author}
                      name="author"
                      placeholder="Enter author here"
                      id="author"
                      maxLength={25}
                      onChange={handleCourseDetailsChange}
                      required
                    />
                    {errors.author && (
                      <span className="error">{errors.author}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <label for="description">Description*</label>
                <Input
                  type="textarea"
                  value={course.description}
                  name="description"
                  placeholder="Enter description here"
                  id="description"
                  maxLength={250}
                  style={{ height: 100 }}
                  onChange={handleCourseDetailsChange}
                  required
                />
                {errors.description && (
                  <span className="error">{errors.description}</span>
                )}
              </FormGroup>
              <FormGroup>
                <label for="url">Course url*</label>
                <Input
                  type="text"
                  value={course.url}
                  name="url"
                  placeholder="Enter course url here"
                  id="url"
                  onChange={handleCourseDetailsChange}
                  required
                />
                {errors.url && <span className="error">{errors.url}</span>}
              </FormGroup>
              <FormGroup>
                <label for="preRequisites">Pre-requisites</label>
                <Input
                  type="textarea"
                  value={course.preRequisites}
                  name="preRequisites"
                  placeholder="Enter course preRequisites here"
                  id="preRequisites"
                  maxLength={250}
                  style={{ height: 100 }}
                  onChange={handleCourseDetailsChange}
                />
              </FormGroup>

              <Container className="text-center">
                <Button type="submit" color="success">
                  Add Course
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AddCourse;
