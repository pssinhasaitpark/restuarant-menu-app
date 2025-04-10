import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { postSupportData } from '../../Redux/Slice/SupportSlice/SupportSlice'
import "./SupportCompo.css";
import { BsGeoAlt } from "react-icons/bs";
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { LuTwitter } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";

const phoneRegExp = /^(\+?\d{0-9})?\s?-?\s?(\(?\d{7}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const SupportCompo = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone_no: '',
      subject: '',
      issues: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone_no: Yup.string()
        .required("Required")
        .matches(phoneRegExp, "Phone number is not valid"),
      subject: Yup.string().required("Required"),
      issues: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(postSupportData(values));
    },
  });

  return (
    <div className="bg-light py-3 mt-2" id="support">
      <div className="container">
        <section className="contact-sec sec-pad mt-2 border">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6">
                <div className="contact-detail">
                  <h1 className="section-title ms-5 all-heading">Support</h1>

                  <ul className="contact-ul list-unstyled my-2 fs-5 ms-5">
                    <li className="d-flex align-items-center mb-2">
                      <BsGeoAlt size={18} className="me-2" />
                      91, Ram Nagar, Ram Mandir, Delhi
                    </li>

                    <li className="d-flex align-items-center mb-2">
                      <MdOutlineLocalPhone size={18} className="me-2" />
                      <Link to="tel:08510004495" className="text-decoration-none text-dark">
                        0255000XXXX
                      </Link>
                    </li>

                    <li className="d-flex align-items-center mb-2">
                      <MdOutlineEmail size={18} className="me-2" />
                      <Link to="mailto:pardeepkumar4bjp@gmail.com" className="text-decoration-none text-dark">
                        demounknown@gmail.com
                      </Link>
                    </li>
                  </ul>

                  <span className="d-lg-flex ms-5">
                    <Link to="/facebook" className="fb">
                      <FaFacebookF size={20} />
                    </Link>
                    <Link to="/instagram" className="insta">
                      <FaInstagram size={20} />
                    </Link>
                    <Link to="/twitter" className="twitter">
                      <LuTwitter size={20} />
                    </Link>
                  </span>
                </div>
              </div>

              <div className="col-md-6 mt-5">
                <form onSubmit={formik.handleSubmit} className="contFrm">
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="inptFld"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                      ) : null}
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="inptFld"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                      ) : null}
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="tel"
                        name="phone_no"
                        placeholder="Phone Number"
                        className="inptFld"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone_no}
                      />
                      {formik.touched.phone_no && formik.errors.phone_no ? (
                        <div className="error">{formik.errors.phone_no}</div>
                      ) : null}
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="inptFld"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subject}
                      />
                      {formik.touched.subject && formik.errors.subject ? (
                        <div className="error">{formik.errors.subject}</div>
                      ) : null}
                    </div>

                    <div className="col-12">
                      <textarea
                        name="issues"
                        className="inptFld"
                        placeholder="Your issues..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.issues}
                      ></textarea>
                      {formik.touched.issues && formik.errors.issues ? (
                        <div className="error">{formik.errors.issues}</div>
                      ) : null}
                    </div>

                    <div className="col-12">
                      <input
                        type="submit"
                        value="SUBMIT"
                        className="all-button btn btn-success btn-lg"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportCompo;
