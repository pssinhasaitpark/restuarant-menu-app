import React, { useState } from "react";
import { user } from "../../../assets/index.js";
import { Button, Form, Card, Container, Row, Col, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaEdit, FaSave } from "react-icons/fa";

const YourProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Container fluid className="py-3" >
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="border-0 shadow-lg overflow-hidden">
            <Card.Body className="p-0">
              <Row className="g-0">
             
                <Col md={4} className="position-relative">
                  <div 
                    className="h-100 d-flex flex-column justify-content-center align-items-center text-center p-4 all-button"
                  
                  >
                    <div 
                      className="position-relative mb-4"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <img
                        src={user}
                        alt="Profile"
                        className="rounded-circle border-4 border-white"
                        width="150"
                        height="150"
                        style={{ 
                         
                          transition: "all 0.3s ease",
                          transform: isHovered ? "scale(1.05)" : "scale(1)",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                        }}
                      />
                      {/* {isHovered && (
                        <div 
                          className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(216, 216, 216, 0.5)",
                          }}
                        >
                          <FaEdit size={40} color="white" />
                        </div>
                      )} */}
                    </div>

                    <h3 className="fw-bold text-light mb-1">Name</h3>
                    <p className="text-white-50 mb-4">Email</p>
                    
                    <div className="w-100 py-3 px-4 rounded mb-3" style={{ backgroundColor: "rgba(240, 240, 240, 0.2)" }}>
                      <div className="d-flex justify-content-between mb-2 text-light">
                        <span>Email</span>
                        <span>hello@example.com</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2 text-light">
                        <span>Joined</span>
                        <span>Jan 2023</span>
                      </div>
                      <div className="d-flex justify-content-between text-light">
                        <span>Status</span>
                        <span className="badge bg-success rounded-pill">Active</span>
                      </div>
                    </div>
                    
                    <Link to="/" className="mt-3 text-decoration-none">
                      <Button variant="light" className="w-100 fw-bold">
                        Back to Dashboard
                      </Button>
                    </Link>
                  </div>
                </Col>
                
                <Col md={8}>
                  <div className="p-5">
                    <h2 className="fw-bold mb-4">
                      <span className="border-bottom border-3 border-primary pb-2">Update Your Profile</span>
                    </h2>
                    
                    <Form className="mt-4">
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group controlId="firstName">
                            <Form.Label className="fw-bold">First Name</Form.Label>
                            <InputGroup className="mb-3 ">
                              <InputGroup.Text className="all-button"><FaUser className="text-light" /></InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                defaultValue="John"
                                className="py-2"
                              />
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="lastName">
                            <Form.Label className="fw-bold">Last Name</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Text className="all-button"><FaUser className="text-light"/></InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                defaultValue="Doe"
                                className="py-2"
                              />
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className="fw-bold">Email Address</Form.Label>
                        <InputGroup>
                          <InputGroup.Text  className="all-button"><FaEnvelope className="text-light"/></InputGroup.Text>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            defaultValue="john.doe@example.com"
                            className="py-2"
                          />
                        </InputGroup>
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label className="fw-bold">Current Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text  className="all-button"><FaLock className="text-light"/></InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Enter current password"
                            className="py-2"
                          />
                        </InputGroup>
                      </Form.Group>
                      
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group controlId="newPassword">
                            <Form.Label className="fw-bold">New Password</Form.Label>
                            <InputGroup>
                              <InputGroup.Text  className="all-button"><FaLock className="text-light"/></InputGroup.Text>
                              <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                className="py-2"
                              />
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="confirmPassword">
                            <Form.Label className="fw-bold">Confirm Password</Form.Label>
                            <InputGroup>
                              <InputGroup.Text  className="all-button"><FaLock className="text-light"/></InputGroup.Text>
                              <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                className="py-2"
                              />
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Tell us about yourself"
                          defaultValue="Full stack developer with 5 years of experience in React and Node.js."
                        />
                      </Form.Group>
                      
                      <div className="d-flex justify-content-end gap-3 mt-4">
                        <Button variant="outline-success" className="px-4 py-2">
                          Cancel
                        </Button>
                        <Button 
                          variant="primary" 
                          type="submit" 
                          className="px-4 py-2 d-flex align-items-center all-button"
                        
                        >
                          <FaSave className="me-2" /> Save Changes
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default YourProfile;