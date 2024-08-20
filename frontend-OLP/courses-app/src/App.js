import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import AddCourse from "./components/AddCourse";
import AllCourses from "./components/AllCourses";
import CourseDetails from "./components/CourseDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UpdateCourse from "./components/UpdateCourse";
import EnrolledCourses from "./components/EnrolledCourses";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="backgroundImage">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/view-courses" element={<AllCourses />} />
          <Route path="/view-course-details/:id" element={<CourseDetails />} />
          <Route path="/update-course-details/:id" element={<UpdateCourse />} />
          <Route path="/enrolled-courses" element={<EnrolledCourses />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
