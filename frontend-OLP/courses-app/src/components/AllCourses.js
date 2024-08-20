import React, { useState, useEffect } from "react";
import Course from "./Course";
import base_url from "./../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";
import NavBarSecond from "./NavBarSecond";
import { Container } from "reactstrap";
import { useAuth } from "./contexts/AuthContext";

const AllCourses = () => {
  const { authToken } = useAuth();
  useEffect(() => {
    document.title = "All Courses || Learn courses with Happy E-Book";
  }, []);

  const getAllCoursesFromServer = () => {
    axios
      .get(`${base_url}/courses`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(
        (response) => {
          console.log(response);
          setCourses(response.data);
        },
        (error) => {
          console.log(error);
          toast.error("Something went wrong");
        }
      );
  };

  useEffect(() => {
    getAllCoursesFromServer();
  }, [authToken]);

  const [courses, setCourses] = useState([]);

  const updateCourses = (id) => {
    setCourses(courses.filter((c) => c.id != id));
  };

  return (
    <>
      <NavBarSecond />
      <Container className="all-courses-container">
        <div>
          <h2 className="all-courses"> All Courses</h2>
        </div>
        {courses.length > 0 ? (
          courses.map((item) => (
            <Course key={item.id} course={item} update={updateCourses} />
          ))
        ) : (
          <div style={{ fontSize: "24px" }}>No courses</div>
        )}
      </Container>
    </>
  );
};

export default AllCourses;
