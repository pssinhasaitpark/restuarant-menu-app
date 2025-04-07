import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import {  MdOutlineLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { RxActivityLog } from "react-icons/rx";
import './NavbarCompo.css';

const Navbarcompo = () => {
  return (
    <div className='border border-bottom'>
      <div className='container-fluid'>
        <div className='py-2'>
          <Navbar expand='lg' sticky='top' className='header-nav p-0'>
            <Container className='d-flex justify-content-between p-0'>
              <Navbar.Toggle aria-controls='navbar' className='button-all o border-0' />
              <Navbar.Collapse id='navbar' className='bg-white'>
                <div>
                  <Link to='/' className='text-decoration-none'>
                    <h1 className='all-heading fs-2'>Restaurant Booking</h1>
                  </Link>
                </div>
                <Nav className='mx-auto'>
                  <Nav.Link href='#Restaurants' className='fs-5'>Top Restaurants</Nav.Link>
                  <Nav.Link href='#launch' className='fs-5'>New Launch</Nav.Link>
                  <Nav.Link href='#services' className='fs-5'>Services</Nav.Link>
                  <Nav.Link href='#testimonial' className='fs-5'>Testimonial</Nav.Link>
                  <Nav.Link href='#support' className='fs-5'>Support</Nav.Link>
                </Nav>
              </Navbar.Collapse>

              <div className='d-flex'>
                <Dropdown>
                  <Dropdown.Toggle variant='' id='dropdown-basic' className='custom-dropdown-toggle opacity-75 '>
                    <FaRegCircleUser size={30} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='align-items-center'>
                    <Dropdown.Item href='/order'>
                      <IoFastFoodSharp size={20} className='mx-2 my-1 text-success' />Your Order
                    </Dropdown.Item>
                    <Dropdown.Item href='/profile'>
                      <FaUserAlt size={20} className='mx-2 my-1 text text-success' />Your Profile
                    </Dropdown.Item>
                    <Dropdown.Item href='/whislist'>
                      <FaRegHeart size={20} className='mx-2 my-1 text text-success' />Whislist
                    </Dropdown.Item>
                    <Dropdown.Item href='/activity'>
                      <RxActivityLog size={20} className='mx-2 my-1 text text-success' />Your Activity
                    </Dropdown.Item>
                    <Dropdown.Item href='#'>
                      <MdOutlineLogout size={20} className='mx-2 my-1 text text-primary' />Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Link to='/allresturant'>
                  <button className='btn btn-success all-button'>Book Now</button>
                </Link>
              </div>

            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

export default Navbarcompo;
