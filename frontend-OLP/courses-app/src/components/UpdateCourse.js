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
import "./AddCourse.css";

const UpdateCourse = () => {
  useEffect(() => {
    document.title = "Update Course || Learn courses with E-Kaksha";
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

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
    axios
      .get(`${base_url}/courses/${courseId}`)
      .then((response) => {
        setCourseDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error!, Something went Wrong");
      });
  }, [courseId]);

  const handleCourseDetailsChange = (e) => {
    const { name, value } = e.target;

    setCourseDetails((prev) => ({ ...prev, [name]: value }));

    if (name === "courseCode" && !value) {
      errors.courseCode = "Code is required";
    } else if (name === "courseCode" && !/^[a-zA-Z0-9]+$/.test(value)) {
      errors.courseCode = "Code must be alphanumeric";
    } else {
      errors.courseCode = "";
    }

    if (name === "title" && !value) {
      errors.title = "Title is required";
    } else if (name === "title" && !/^[A-Za-z\s]+$/.test(value)) {
      errors.title = "Title must contain only alphabets";
    } else {
      errors.title = "";
    }

    if (name === "description" && !value) {
      errors.description = "Description is required";
    } else {
      errors.description = "";
    }

    if (name === "url" && !value) {
      errors.url = "Course URL is required";
    } else if (
      name === "url" &&
      !/^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=]+$/.test(
        value
      )
    ) {
      errors.url = "Invalid URL format";
    } else {
      errors.url = "";
    }

    if (name === "author" && !value) {
      errors.author = "Author is required";
    } else if (name === "author" && !/^[A-Za-z\s]+$/.test(value)) {
      errors.author = "Author must contain only alphabets";
    } else {
      errors.author = "";
    }

    setErrors((prev) => ({ ...prev, ...errors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${base_url}/courses/${courseId}`, courseDetails)
      .then((response) => {
        console.log("Course updated successfully:", response.data);
        navigate("/view-courses");
        toast.success("Course updated successfully");
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
                  value={courseDetails.title}
                  onChange={(e) => {
                    setCourseDetails({
                      ...courseDetails,
                      title: e.target.value,
                    });
                  }}
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
                      onChange={(e) => {
                        setCourseDetails({
                          ...courseDetails,
                          courseCode: e.target.value,
                        });
                      }}
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
                      value={courseDetails.author}
                      onChange={(e) => {
                        setCourseDetails({
                          ...courseDetails,
                          author: e.target.value,
                        });
                      }}
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
                  name="description"
                  style={{ height: 100 }}
                  value={courseDetails.description}
                  onChange={(e) => {
                    setCourseDetails({
                      ...courseDetails,
                      description: e.target.value,
                    });
                  }}
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
                  onChange={(e) => {
                    setCourseDetails({ ...courseDetails, url: e.target.value });
                  }}
                />
                {errors.url && <span className="error">{errors.url}</span>}
              </FormGroup>
              <FormGroup>
                <label for="preRequisites">Pre-requisites</label>
                <Input
                  type="textarea"
                  placeholder="Enter course preRequisites here"
                  id="preRequisites"
                  value={courseDetails.preRequisites}
                  style={{ height: 100 }}
                  onChange={(e) => {
                    setCourseDetails({
                      ...courseDetails,
                      preRequisites: e.target.value,
                    });
                  }}
                />
              </FormGroup>

              <Container className="text-center">
                <Button type="submit" color="success">
                  Save
                </Button>
                <Button
                  type="reset"
                  color="warning"
                  style={{ marginLeft: "20px" }}
                >
                  Clear
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
