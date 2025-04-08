import React from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./BookTable.css";
import { useBookTables } from "../../hooks/index";
import { FaUser,FaMobile,FaCalendar } from "react-icons/fa";
import { IoPeopleSharp,IoTimeSharp } from "react-icons/io5";
const phoneRegExp =
  /^(\+?\d{0-9})?\s?-?\s?(\(?\d{7}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const BookTable = () => {
  const { mutate } = useBookTables();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      people: "",
      date: "",
      time: "",
      specialRequests: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      contact_no: Yup.string()
        .required("Required")
        .matches(phoneRegExp, "Phone number is not valid"),
      people: Yup.number()
        .required("Required")
        .min(1, "Must be at least 1")
        .max(20, "Must be at most 20"),
      date: Yup.date().required("Required"),
      time: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const bookingData = {
        customer_name: values.name,
        contact_no: values.contact_no,
        num_of_people: values.people,
        booking_time: values.time,
        date: values.date,
        instruction: values.specialRequests || "",
      };

      mutate(bookingData);
      formik.resetForm();
    },
  });

  return (
    <Container fluid className="py-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <Card className="shadow border-0">
            <Card.Header className="text-center p-4 all-button text-white">
              <h2 className="fw-bold">RESERVE YOUR TABLE</h2>
              <p className="mb-0">
                Experience exceptional dining at our restaurant
              </p>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Your Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className=" all-button">
                        <FaUser className="text-light"/>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.name && formik.errors.name}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.name}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Mobile Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text  className=" all-button">
                        <FaMobile className="text-light"/>
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="contact_no"
                          placeholder="Enter your contact number"
                          value={formik.values.contact_no}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.touched.contact_no &&
                            formik.errors.contact_no
                          }
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.contact_no}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">
                        Number of Guests
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text  className=" all-button">
                        <IoPeopleSharp className="text-light"/>

                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="people"
                          placeholder="Number of people"
                          min="1"
                          max="20"
                          value={formik.values.people}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.touched.people && formik.errors.people
                          }
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.people}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Date</Form.Label>
                      <InputGroup>
                        <InputGroup.Text  className=" all-button">
                        <FaCalendar className="text-light"/>
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formik.values.date}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.date && formik.errors.date}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.date}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Time</Form.Label>
                      <InputGroup>
                        <InputGroup.Text  className=" all-button">
                        <IoTimeSharp className="text-light" />
                        </InputGroup.Text>
                        <Form.Control
                          type="time"
                          name="time"
                          value={formik.values.time}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.time && formik.errors.time}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.time}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">
                        Selected Menu Items
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Selected Menu Items for Dinning....."
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Special Requests</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="specialRequests"
                    placeholder="Any special requests or dietary requirements (optional)"
                    value={formik.values.specialRequests}
                    onChange={formik.handleChange}
                  />
                </Form.Group>

                <div className="d-grid gap-2 col-md-6 mx-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="py-3 fw-bold all-button"
                  >
                    CONFIRM RESERVATION
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookTable;
