import React from 'react';
import { r1, r2, r3, r4 } from '../../../assets/index';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Button } from 'react-bootstrap';
import './RestroGallery.css'; 

const RestaurantGallery = ({ restaurant }) => {
  const images = [r1, r2, r3, r4];

  const mainSliderSettings = {
    dots: false,
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
    <Container className="mt-3 mb-2">
      <h2 className="text-center fs-2 all-heading">Our Featured Restaurants</h2>
     <div className="main-gallery-slider">
        <Slider {...mainSliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="position-relative">
              <img src={image} alt={restaurant ? restaurant.restaurant_name : "Restaurant"} className="w-100" style={{ height: '40vh', objectFit: 'cover' }} />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-25 p-4">
                {restaurant && (
                  <>
                    <h3 className="text-white">{restaurant.restaurant_name}</h3>
                    <div className="d-flex align-items-center text-white">
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      <p className="m-0">{restaurant.location}</p>
                    </div>
                  </>
                )}
                {/* Uncomment to add a booking button */}
                {/* <Button variant="success" className="rounded-pill">Book Now</Button> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default RestaurantGallery;

