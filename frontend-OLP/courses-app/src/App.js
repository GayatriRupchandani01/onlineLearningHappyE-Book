import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCourse from "./components/AddCourse";
import AllCourses from "./components/AllCourses";
import CourseDetails from "./components/CourseDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UpdateCourse from "./components/UpdateCourse";
import EnrolledCourses from "./components/EnrolledCourses";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="backgroundImage">
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" Component={Login} exact />
            <Route path="/sign-up" Component={SignUp} exact />
            <Route path="/add-course" Component={AddCourse} exact />
            <Route path="/view-courses" Component={AllCourses} exact />
            <Route
              path="/view-course-details/:id"
              Component={CourseDetails}
              exact
            />
            <Route
              path="/update-course-details/:id"
              Component={UpdateCourse}
              exact
            />
            <Route path="/enrolled-courses" Component={EnrolledCourses} exact />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
