import React from "react";
import { Link } from "react-router-dom";
import "./SupportCompo.css";
import { BsGeoAlt } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { LuTwitter } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";

const SupportCompo = () => {
  return (
    <div className="bg-light py-3 mt-2" id="support">
      <div className="container">
        <section className="contact-sec sec-pad mt-2 border">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6">
                <div className="contact-detail ">
                  <h1 className="section-title ms-5 all-heading">Support</h1>

                  <ul className="contact-ul list-unstyled my-2 fs-5 ms-5">
                    <li className="d-flex align-items-center mb-2">
                      <BsGeoAlt size={18} className="me-2" />
                      91, Ram Nagar, Ram Mandir, Delhi
                    </li>

                    <li className="d-flex align-items-center mb-2">
                      <MdOutlineLocalPhone size={18} className="me-2" />
                      <Link
                        to="tel:08510004495"
                        className="text-decoration-none text-dark"
                      >
                        0255000XXXX
                      </Link>
                    </li>

                    <li className="d-flex align-items-center mb-2">
                      <MdOutlineEmail size={18} className="me-2" />
                      <Link
                        to="mailto:pardeepkumar4bjp@gmail.com"
                        className="text-decoration-none text-dark"
                      >
                        demounknown@gmail.com
                      </Link>
                    </li>
                  </ul>

                  <span className=" d-lg-flex ms-5">
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
                <form action="#" className="contFrm" method="POST">
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="inptFld"
                        required
                      />
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="inptFld"
                        required
                      />
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="inptFld"
                        required
                      />
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="sub"
                        placeholder="Subject"
                        className="inptFld"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        className="inptFld"
                        rows=""
                        cols=""
                        placeholder="Your Message..."
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <input
                        type="submit"
                        name="submit"
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
