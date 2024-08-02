import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import "./EnrolledCourses.css";
import NavBarSecond from "./NavBarSecond";
import { Button } from "reactstrap";
import { FaLink } from "react-icons/fa";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);

  const userId = Cookies.get("userId");

  const deleteEnrollment = (id) => {
    axios.delete(`${base_url}/enrollments/${id}`).then(
      (response) => {
        toast.success("Enrollment deleted successfully");
        setCourses(courses.filter((course) => course.id !== id));
      },
      (error) => {
        toast.error("Course not deleted, Server problem");
      }
    );
  };

  const getAllCoursesEnrolledFromServer = () => {
    axios.get(`${base_url}/enrollments/user/${userId}`).then(
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
    getAllCoursesEnrolledFromServer();
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <>
      <NavBarSecond />
      <div className="center-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Code</th>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
              <th>URL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((enrollment) => (
              <tr key={enrollment.course.id}>
                <td>{enrollment.course.id}</td>
                <td>{enrollment.course.courseCode}</td>
                <td>{enrollment.course.title}</td>
                <td>{enrollment.course.description}</td>
                <td>{enrollment.course.author}</td>
                <td>
                  <a
                    href={enrollment.course.author}
                    style={{ marginLeft: "3px" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLink style={{ margin: "3px" }} />
                    view content
                  </a>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteEnrollment(enrollment.id);
                    }}
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EnrolledCourses;
