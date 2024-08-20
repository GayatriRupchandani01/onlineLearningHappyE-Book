import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
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
import { useLocation, useNavigate } from "react-router-dom";
import NavBarSecond from "./NavBarSecond";
import { useAuth } from "./contexts/AuthContext";
import "./AddCourse.css";

const UpdateCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authToken } = useAuth();

  useEffect(() => {
    document.title = "Update Courses || Learn courses with Happy E-Book";
  }, []);

  const courseId = location.state?.id;
  console.log(courseId);

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    courseCode: "",
    author: "",
    url: "",
    preRequisites: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!courseId) {
      toast.error("Couldn't fetch course");
      return;
    }
    axios
      .get(`${base_url}/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setCourseDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error!, Something went Wrong");
      });
  }, [courseId, authToken]);

  const handleCourseDetailsChange = (e) => {
    const { name, value } = e.target;

    setCourseDetails((prev) => ({ ...prev, [name]: value }));

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
        errors.url = "First character cannot be a space";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please provide valid input before submitting.");
      return;
    }
    axios
      .put(`${base_url}/courses/${courseId}`, courseDetails, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Course updated successfully:", response.data);
        navigate("/view-courses");
        toast.success("Course updated successfully");
        navigate(`/view-course-details/${courseId}`, {
          state: { id: courseId },
        });
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        toast.error("Error updating course");
      });
  };

  return (
    <>
      <NavBarSecond />
      <div className="form-details">
        <Card className="glass-card">
          <h2 className="text-center my-1">Update Course Details</h2>
          <hr />
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label for="title">Course Title*</label>
                <Input
                  type="text"
                  placeholder="Enter title here"
                  name="title"
                  id="title"
                  maxLength={30}
                  value={courseDetails.title}
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
                      placeholder="Enter code here"
                      id="courseCode"
                      name="courseCode"
                      value={courseDetails.courseCode}
                      readOnly
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
                      placeholder="Enter author here"
                      id="author"
                      name="author"
                      maxLength={25}
                      value={courseDetails.author}
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
                  placeholder="Enter description here"
                  id="description"
                  maxLength={250}
                  name="description"
                  style={{ height: 100 }}
                  value={courseDetails.description}
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
                  placeholder="Enter course url here"
                  id="url"
                  name="url"
                  value={courseDetails.url}
                  onChange={handleCourseDetailsChange}
                  required
                />
                {errors.url && <span className="error">{errors.url}</span>}
              </FormGroup>
              <FormGroup>
                <label for="preRequisites">Pre-requisites</label>
                <Input
                  type="textarea"
                  placeholder="Enter course preRequisites here"
                  id="preRequisites"
                  name="preRequisites"
                  maxLength={250}
                  value={courseDetails.preRequisites}
                  style={{ height: 100 }}
                  onChange={handleCourseDetailsChange}
                />
              </FormGroup>

              <Container className="text-center">
                <Button type="submit" color="success">
                  Save
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default UpdateCourse;
