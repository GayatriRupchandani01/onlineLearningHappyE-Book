import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Navbar from "./LandingNavBar";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/login.jpg";

const Home = () => {
  useEffect(() => {
    document.title = "Home || Learn courses with Happy E-Book";
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container
        fluid
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "746px",
        }}
      >
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Col
            md={6}
            className="text-center"
            style={{
              color: "2F4F4F",
              backgroundColor: "#F5F5DC",
              padding: "10px",
              width: "40vw",
              borderRadius: "10px",
            }}
          >
            <h1>Welcome to Our Happy E-Book</h1>
            <p>
              Explore a wide range of courses and expand your knowledge at your
              own pace.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
