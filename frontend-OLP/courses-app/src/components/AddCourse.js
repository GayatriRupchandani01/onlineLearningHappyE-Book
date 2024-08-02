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

const AddCourse = () => {
  useEffect(() => {
    document.title = "Add Courses || Learn courses with E-Kaksha";
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

  useNavigate();

  const handleCourseDetailsChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));

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

  const handleForm = (e) => {
    console.log(course);
    postDataToServer(course);
    e.preventDefault();
  };

  const postDataToServer = (data) => {
    axios.post(`${base_url}/courses`, data).then(
      (response) => {
        console.log(response);
        toast.success("Course added successfully");
      },
      (error) => {
        console.log(error);
        toast.error("Error!, Something went Wrong");
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
                  onChange={handleCourseDetailsChange}
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
                      onChange={handleCourseDetailsChange}
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
                      onChange={handleCourseDetailsChange}
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
                  style={{ height: 100 }}
                  onChange={handleCourseDetailsChange}
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
                  style={{ height: 100 }}
                  onChange={handleCourseDetailsChange}
                />
              </FormGroup>

              <Container className="text-center">
                <Button type="submit" color="success">
                  Add Course
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

export default AddCourse;
