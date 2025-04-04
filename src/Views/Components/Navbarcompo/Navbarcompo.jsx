import React from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
const Navbarcompo = () => {
  return (
    <div className='border border-bottom  '>
      <div className=" container-fluid ">
        <div className="py-2">
          <Navbar expand="lg" sticky="top" className="header-nav p-0 ">
            <Container className="d-flex justify-content-between p-0">
              <Navbar.Toggle aria-controls="navbar" className="button-all o border-0 " />
              <Navbar.Collapse id="navbar" className='bg-white'>
                <div className="">
                  <Link to="/" className='text-decoration-none'>
                    <h1 className='all-heading fs-2  '>Restaurant Booking</h1></Link>
                </div>
                <Nav className="mx-auto">
                  <Nav.Link href="/" className="fs-5   ">Home</Nav.Link>
                  <Nav.Link href="#Restaurants" className="fs-5  ">Top Resturants</Nav.Link>
                  <Nav.Link href="#launch" className="fs-5  ">New Launch</Nav.Link>
                  <Nav.Link href="#services" className="fs-5  ">Services</Nav.Link>

                  <Nav.Link href="#testimonial" className="fs-5  ">Testimonial</Nav.Link>
                  <Nav.Link href="#support" className="fs-5  ">Support</Nav.Link>
                </Nav>

              </Navbar.Collapse>
              <div className="">
                <Link to="/whislist">
                  <Button variant="link" className="p-0 text-muted mx-3 ">
                    <FaRegHeart size={25} />
                  </Button></Link>
                <Link to="/allresturant">
                  <button className="btn btn-success all-button">All Restaurants</button></Link>
              </div>
            </Container>
          </Navbar>
        </div></div>
    </div>
  )
}

export default Navbarcompo