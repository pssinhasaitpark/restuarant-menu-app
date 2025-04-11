import React, { useState, useEffect } from "react";
import { user } from "../../../assets/index.js";
import { Button, Form, Card, Container, Row, Col, InputGroup, Alert, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaMobile,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaCheck
} from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
const YourProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Full stack developer with 5 years of experience in React and Node.js."
  });
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      setActiveStep(3);
      setCountdown(30);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      setActiveStep(1);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3500);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const resendOtp = () => {
    setCountdown(30);
  };

  const getProgressValue = () => {
    return (activeStep - 1) * 50;
  };

  return (
    <Container fluid className="py-4 bg-light" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="border-0 shadow-lg rounded-lg overflow-hidden">
            <Card.Header className="bg-white p-2 border-0">
              <Row className="align-items-center">
                <Col>
                  <h2 className="mb-0 ">Your Profile</h2>
               
                </Col>
                <Col xs="auto">
                  <Link to="/" className="text-decoration-none">
                    <Button variant="outline-success" className="rounded-pill">
                      <FaArrowLeft className="me-2" /> Back to Dashboard
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Header>

            {activeStep === 1 && showSuccess && (
              <Alert variant="success" className="m-4 d-flex align-items-center border-0 shadow-sm">
                <div className="bg-success rounded-circle p-2 me-3">
                  <FaCheckCircle className="text-white" size={20} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Profile updated successfully!</h6>
                  <p className="mb-0 small">Your profile has been verified and updated.</p>
                </div>
              </Alert>
            )}

            <Card.Body className="p-0">
              <Row className="g-0">
             
                <Col lg={4} className="border-end">
                  <div className="p-2">
                    <div className="text-center mb-4">
                      <div className="position-relative d-inline-block">
                        <div
                          className="position-relative rounded-circle overflow-hidden border border-3 border-success"
                          style={{ width: "150px", height: "150px" }}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <img
                            src={user}
                            alt="Profile"
                            className="w-100 h-100 object-cover"
                            style={{
                              transition: "all 0.3s ease",
                              transform: isHovered ? "scale(1.05)" : "scale(1)",
                            }}
                          />
                          
                        </div>
                      </div>

                      <h4 className="fw-bold mt-3 mb-1">{formData.firstName} {formData.lastName}</h4>
                      <p className="text-success mb-0">{formData.email}</p>
                    </div>

                    <div className="p-3 bg-light rounded-3 mb-3">
                      <h6 className="fw-bold text-uppercase text-muted mb-3 small">Account Information</h6>

                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Member Since</span>
                        <span className="fw-bold">Jan 2023</span>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Account Status</span>
                        <span className="badge bg-success rounded-pill px-3 py-2">Active</span>
                      </div>

                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Verification</span>
                        <span className={`badge rounded-pill px-3 py-2 ${showSuccess ? "bg-success" : "bg-warning text-dark"}`}>
                          {showSuccess ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>

                   
                  </div>
                </Col>

      
                <Col lg={8}>
                  <div className="p-5">
                    {activeStep === 1 && (
                      <>
                        <div className="mb-4 pb-2 border-bottom">
                          <h4 className="fw-bold">Registration</h4>
                          <p className="text-muted"></p>
                        </div>

                        <Form className="mt-4" onSubmit={handleFormSubmit}>
                          <Row className="mb-4">
                            <Col md={6}>
                              <Form.Group controlId="firstName">
                                <Form.Label className="fw-bold">Full Name</Form.Label>
                                <InputGroup className="shadow-sm">
                                  <InputGroup.Text className="bg-white border-end-0">
                                    <FaUser className="text-success" />
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    defaultValue={formData.firstName}
                                    className="py-2 border-start-0"
                                    onChange={handleInputChange}
                                  />
                                </InputGroup>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="lastName">
                                <Form.Label className="fw-bold">Mobile No</Form.Label>
                                <InputGroup className="shadow-sm">
                                  <InputGroup.Text className="bg-white border-end-0">
                                    <MdContactPhone className="text-success" />
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    defaultValue={formData.lastName}
                                    className="py-2 border-start-0"
                                    onChange={handleInputChange}
                                  />
                                </InputGroup>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-4" controlId="email">
                            <Form.Label className="fw-bold">Email Address</Form.Label>
                            <InputGroup className="shadow-sm">
                              <InputGroup.Text className="bg-white border-end-0">
                                <FaEnvelope className="text-success" />
                              </InputGroup.Text>
                              <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                defaultValue={formData.email}
                                className="py-2 border-start-0"
                                onChange={handleInputChange}
                              />
                            </InputGroup>
                          </Form.Group>

                  

                          

                          <div className="d-flex justify-content-end gap-3 mt-4">
                            <Button variant="outline-secondary" className="px-4 py-2 rounded-pill">
                              Cancel
                            </Button>
                            <Button
                              variant="success"
                              type="submit"
                              className="px-4 py-2 d-flex align-items-center rounded-pill shadow-sm"
                            >
                              <span>Continue</span> <FaArrowRight className="ms-2" />
                            </Button>
                          </div>
                        </Form>
                      </>
                    )}

                    {activeStep === 2 && (
                      <div className="verification-container"
                        style={{
                          animation: "slideIn 0.5s ease-out forwards"
                        }}>
                        <div className="mb-4">
                          <ProgressBar now={getProgressValue()} className="mb-4 " style={{ height: "8px" }} />
                          <div className="d-flex justify-content-between">
                            <span className="fw-bold ">Profile</span>
                            <span className={activeStep >= 2 ? "fw-bold " : "text-muted"}>Mobile</span>
                            <span className={activeStep >= 3 ? "fw-bold " : "text-muted"}>Verification</span>
                          </div>
                        </div>

                        <div className="text-center mb-4">
                          <div className="bg-light rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                            style={{ width: "80px", height: "80px" }}>
                            <FaMobile size={35} className="text-success" />
                          </div>
                          <h3 className="fw-bold">Mobile Verification</h3>
                          <p className="text-muted">Please enter your mobile number to continue</p>
                        </div>

                        <Form onSubmit={handleSendOtp} className="mt-5">
                          <Form.Group className="mb-4" controlId="mobileNumber">
                            <Form.Label className="fw-bold">Mobile Number</Form.Label>
                            <InputGroup className="shadow-sm">
                              <InputGroup.Text className="bg-white border-end-0">
                                <FaMobile className="text-success" />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="Enter your mobile number"
                                className="py-3 border-start-0 fw-bold"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                              />
                            </InputGroup>
                            <Form.Text className="text-muted">
                              We'll send a one-time password to this number
                            </Form.Text>
                          </Form.Group>

                          <div className="d-flex justify-content-between mt-5">
                            <Button
                              variant="outline-secondary"
                              className="px-4 py-2 rounded-pill"
                              onClick={() => setActiveStep(1)}
                            >
                              <FaArrowLeft className="me-2" /> Back
                            </Button>
                            <Button
                              variant="success"
                              type="submit"
                              className="px-4 py-2 rounded-pill shadow-sm d-flex align-items-center"
                              disabled={mobileNumber.length < 10}
                            >
                              <span>Send OTP</span> <FaArrowRight className="ms-2" />
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="verification-container"
                        style={{
                          animation: "slideIn 0.5s ease-out forwards"
                        }}>
                        <div className="mb-4">
                          <ProgressBar now={getProgressValue()} className="mb-4" style={{ height: "8px" }} />
                          <div className="d-flex justify-content-between">
                            <span className="fw-bold text-success">Profile</span>
                            <span className="fw-bold text-success">Mobile</span>
                            <span className="fw-bold text-success">Verification</span>
                          </div>
                        </div>

                        <div className="text-center mb-4">
                          <div className="bg-light rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                            style={{ width: "80px", height: "80px" }}>
                            <FaShieldAlt size={35} className="text-success" />
                          </div>
                          <h3 className="fw-bold">Enter OTP</h3>
                          <p className="text-muted mb-1">We've sent a 6-digit code to</p>
                          <p className="fw-bold">{mobileNumber}</p>
                        </div>

                        <Form onSubmit={handleVerifyOtp} className="mt-5">
                          <Form.Group className="mb-4" controlId="otp">
                            <Row className="justify-content-center">
                              <Col md={8}>
                                <InputGroup className="shadow-sm">
                                  <InputGroup.Text className="bg-white border-end-0">
                                    <FaShieldAlt className="text-success" />
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="text"
                                    placeholder="6-digit OTP"
                                    className="py-3 border-start-0 text-center fw-bold fs-5 letter-spacing-2"
                                    maxLength="6"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
                          </Form.Group>

                          <div className="text-center mb-4">
                            {countdown > 0 ? (
                              <p className="text-muted">Resend OTP in {countdown} seconds</p>
                            ) : (
                              <Button
                                variant="link"
                                className="p-0 text-decoration-none"
                                onClick={resendOtp}
                              >
                                Resend OTP
                              </Button>
                            )}
                          </div>

                          <div className="d-flex justify-content-between mt-5">
                            <Button
                              variant="outline-secondary"
                              className="px-4 py-2 rounded-pill"
                              onClick={() => setActiveStep(2)}
                            >
                              <FaArrowLeft className="me-2" /> Back
                            </Button>
                            <Button
                              variant="success"
                              type="submit"
                              className="px-4 py-2 rounded-pill shadow-sm d-flex align-items-center"
                              disabled={otp.length !== 6}
                            >
                              <FaCheck className="me-2" /> Verify & Save
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .letter-spacing-2 {
          letter-spacing: 3px;
        }
        .object-cover {
          object-fit: cover;
        }
      `}</style>
    </Container>
  );
};

export default YourProfile;