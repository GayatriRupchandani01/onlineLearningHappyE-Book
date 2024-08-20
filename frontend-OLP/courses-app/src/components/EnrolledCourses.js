import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import "./EnrolledCourses.css";
import NavBarSecond from "./NavBarSecond";
import { Button } from "reactstrap";
import { FaLink } from "react-icons/fa";
import { useAuth } from "./contexts/AuthContext";

const EnrolledCourses = () => {
  useEffect(() => {
    document.title = "My Enrollments || Learn courses with Happy E-Book";
  }, []);

  const [courses, setCourses] = useState([]);
  const { authToken } = useAuth();

  const userId = Cookies.get("userId");

  const deleteEnrollment = (id) => {
    axios
      .delete(`${base_url}/enrollments/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(
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
    axios
      .get(`${base_url}/enrollments/user/${userId}`, {
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
    getAllCoursesEnrolledFromServer();
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <>
      <NavBarSecond />
      <div className="center-table">
        {courses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>URL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((enrollment) => (
                <tr key={enrollment.course.courseCode}>
                  <td>{enrollment.course.courseCode}</td>
                  <td>{enrollment.course.title}</td>
                  <td>{enrollment.course.description}</td>
                  <td>{enrollment.course.author}</td>
                  <td>
                    <a
                      href={enrollment.course.url}
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
                    >
                      Disenroll
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 style={{ marginLeft: "40vw" }}>No enrollment found !!</h2>
        )}
      </div>
    </>
  );
};

export default EnrolledCourses;
