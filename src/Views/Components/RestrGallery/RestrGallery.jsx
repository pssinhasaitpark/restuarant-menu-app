import React from 'react';
import { r1, r2, r3, r4 } from '../../../assets/index';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Button } from 'react-bootstrap';
import './RestroGallery.css'; 

const RestaurantGallery = () => {
  const restaurantDetails = {
    name: "The Gourmet Kitchen",
    location: "Downtown Manhattan"
  };

  const images = [r1, r2, r3, r4];

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold ">Our Featured Restaurants</h2>


      <div className="main-gallery-slider">
        <Slider {...mainSliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="position-relative">
              <img src={image} alt={restaurantDetails.name} className="w-100" style={{ height: '50vh', objectFit: 'cover' }} />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-25 p-4">
                <h3 className="text-white">{restaurantDetails.name}</h3>
                <div className="d-flex align-items-center text-white">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  <p className="m-0">{restaurantDetails.location}</p>
                </div>
                <Button variant="success" className="rounded-pill">Book Now</Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default RestaurantGallery;
