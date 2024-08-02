import React, { useState, useEffect } from "react";
import Course from "./Course";
import base_url from "./../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";
import NavBarSecond from "./NavBarSecond";
import { Container } from "reactstrap";

const AllCourses = () => {
  useEffect(() => {
    document.title = "All Courses || Learn courses with E-Kaksha";
  }, []);

  const getAllCoursesFromServer = () => {
    axios.get(`${base_url}/courses`).then(
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
  }, []);

  const [courses, setCourses] = useState([]);

  const updateCourses = (id) => {
    setCourses(courses.filter((c) => c.id != id));
  };

  return (
    <>
      <NavBarSecond />

      <Container>
        <div>
          <h2 className="all-courses"> All Courses</h2>
        </div>
        {courses.length > 0
          ? courses.map((item) => (
              <Course key={item.id} course={item} update={updateCourses} />
            ))
          : "No courses"}
      </Container>
    </>
  );
};

export default AllCourses;
