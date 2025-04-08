import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { r1, r2, r3, r4 } from '../../../assets/index';
import "./OurResturant.css";
import { BiSolidOffer } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { FaBowlFood } from "react-icons/fa6";
import { Card, Button, Form } from 'react-bootstrap';
import {
  FaRegHeart, FaHeart, FaArrowRight, FaLeaf,
} from "react-icons/fa";
import { BsGeoAlt } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import { useRestaurants, useWhislists } from '../../hooks/index';
import { useSelector } from 'react-redux';
const OurRestaurant = ({ selectedLocation }) => {
  const categories = useSelector((state) => state.menu.categories);
  const restaurantId = categories.length > 0 ? categories[0].restaurant_id : null;
  const { data: restaurants, isLoading } = useRestaurants();
  const { wishlistData, mutate: wishlistMutate } = useWhislists();
  const [filters, setFilters] = useState({
    veg: false,
    nonVeg: false,
    offers: false,
  });
  const [favorites, setFavorites] = useState({});
  useEffect(() => {
    if (wishlistData && wishlistData.length > 0) {
      const wishlistMap = {};
      wishlistData.forEach(item => {
        wishlistMap[item.id] = true;
      });
      setFavorites(wishlistMap);
    }
  }, [wishlistData]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const isFavorite = prev[id];
      return {
        ...prev,
        [id]: !isFavorite
      };
    });
    wishlistMutate({
      id,
      isFavorite: favorites[id] || false
    });
  };

  const resetFilters = () => {
    setFilters({
      veg: false,
      nonVeg: false,
      offers: false
    });
  };

  const filteredRestaurants = () => {
    let filtered = restaurants || [];

    const noFiltersActive = !filters.veg && !filters.nonVeg && !filters.offers;

    if (!noFiltersActive) {
      if (filters.veg && filters.nonVeg) {
        filtered = filtered.filter(restaurant =>
          restaurant.type === 'veg' || restaurant.type === 'non_veg'
        );
      } else if (filters.veg) {
        filtered = filtered.filter(restaurant => restaurant.type === 'veg');
      } else if (filters.nonVeg) {
        filtered = filtered.filter(restaurant => restaurant.type === 'non_veg');
      }

      if (filters.offers) {
        filtered = filtered.filter(restaurant => restaurant.bestOffer);
      }
    }
    if (selectedLocation) {
      filtered = filtered.filter(restaurant =>
        restaurant.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }
    return filtered.map(restaurant => ({
      id: restaurant.id,
      restaurant_name: restaurant.restaurant_name,
      opening_time: restaurant.opening_time,
      closing_time: restaurant.closing_time,
      location: restaurant.location,
      type: restaurant.type,
      images: restaurant.images,
      rating: restaurant.rating,
      opening_hours: restaurant.opening_hours,
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="text-warning">
          {i < Math.floor(rating) ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  const isOpen = (openingTime, closingTime) => {
    if (!openingTime || !closingTime) return false;

    const normalizeTime = (time) => time.trim().replace(/\s+/g, '');

    const [openHour, openMinutePart] = normalizeTime(openingTime).split(':');
    const openPeriod = openMinutePart.slice(-2);
    const openMinutes = openMinutePart.slice(0, -2);
    const openDate = new Date();
    openDate.setHours(
      parseInt(openHour) % 12 + (openPeriod.toUpperCase() === 'PM' ? 12 : 0),
      parseInt(openMinutes)
    );

    const [closeHour, closeMinutePart] = normalizeTime(closingTime).split(':');
    const closePeriod = closeMinutePart.slice(-2);
    const closeMinutes = closeMinutePart.slice(0, -2);
    const closeDate = new Date();
    closeDate.setHours(
      parseInt(closeHour) % 12 + (closePeriod.toUpperCase() === 'PM' ? 12 : 0),
      parseInt(closeMinutes)
    );

    const now = new Date();
    if (closeDate < openDate) {
      closeDate.setDate(closeDate.getDate() + 1);
    }

    return now >= openDate && now < closeDate;
  };

  return (
    <div className='container-fluid mt-5 py-4' id="Restaurants">
      <div className="text-center mb-4">
        <h2 className="all-heading mb-4 text-center underline">Most Popular Restaurants</h2>
      </div>

      <div className='row'>
        <div className='col-sm-4 px-3'>
          <Slider {...sliderSettings}>
            <div><img className="resturant-image" src={r1} alt="Restaurant 1" /></div>
            <div><img className="resturant-image" src={r2} alt="Restaurant 2" /></div>
            <div><img className="resturant-image" src={r3} alt="Restaurant 3" /></div>
            <div><img className="resturant-image" src={r4} alt="Restaurant 4" /></div>
          </Slider>
        </div>
        <div className='col-lg-8 col-md-12 px-3'>
          <div className="card shadow-sm mb-4 p-2 border-0">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-center mb-2">
                <BiFilterAlt size={20} className="me-2 text-success" />
                <h5 className="mb-0">Filter Restaurants</h5>
              </div>
              <Button
                variant="outline-success"
                size="sm"
                onClick={resetFilters}
                className="mb-2"
              >
                Reset Filters
              </Button>
            </div>

            <div className="d-flex flex-wrap gap-4 mt-2 fs-5">
              <Form.Check
                type="switch"
                id="veg-switch"
                label={<><FaLeaf className="text-success" /> Vegetarian</>}
                checked={filters.veg}
                onChange={() => toggleFilter('veg')}
                className="custom-switch"
              />
              <Form.Check
                type="switch"
                id="nonveg-switch"
                label={<><FaBowlFood className="text-danger" /> Non-Vegetarian</>}
                checked={filters.nonVeg}
                onChange={() => toggleFilter('nonVeg')}
                className="custom-switch"
              />
              <Form.Check
                type="switch"
                id="offers-switch"
                label={<><BiSolidOffer className="text-danger" /> Great Offer</>}
                checked={filters.offers}
                onChange={() => toggleFilter('offers')}
                className="custom-switch"
              />
              {selectedLocation && (
                <span className="text-dark">📍{selectedLocation}</span>
              )}
            </div>
          </div>

          <div className='row'>
            {isLoading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredRestaurants().length === 0 ? (
              <div className="col-12 text-center py-4">
                <p className="text-muted">No restaurants match your selected filters.</p>
              </div>
            ) : (
              filteredRestaurants().slice(0, 8).map((restaurant, index) => (
                <div className='col-md-6 mb-4' key={index}>
                  <Card className="h-100 position-relative shadow-sm hover-effect">
                    <div className="position-absolute" style={{ top: '10px', right: '10px', zIndex: 2 }}>
                      <Button
                        variant="link"
                        className={`p-0 ${favorites[restaurant.id] ? 'text-danger' : 'text-muted'} custom-dropdown-toggle`}
                        onClick={() => toggleFavorite(restaurant.id)}
                      >
                        {favorites[restaurant.id] ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                      </Button>
                    </div>
                    <div className={`position-absolute start-0 mt-2 ms-2 rounded-pill px-2 py-1 bg-${isOpen(restaurant.opening_time, restaurant.closing_time) ? 'success' : 'danger'} text-white small`} style={{ zIndex: 1 }}>
                      {isOpen(restaurant.opening_time, restaurant.closing_time) ? "OPEN NOW" : "CLOSED"}
                    </div>
                    <Card.Body className="p-3">
                      <div className="d-flex">
                        <div className="me-3">
                          <img
                            src={restaurant.images && restaurant.images[0] ? restaurant.images[0] : r1}
                            alt={restaurant.restaurant_name}
                            className="rounded shadow-sm"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <h5 className="mb-1 fw-bold">{restaurant.restaurant_name}</h5>
                            <div className="d-flex align-items-center">
                              <span className="me-1 mt-1">{renderStars(restaurant.rating)}</span>
                              <span className="small text-muted me-5">({restaurant.rating})</span>
                            </div>
                          </div>

                          <p className="mb-1 text-muted small">
                            <span className={`badge ${restaurant.type === 'veg' ? 'bg-success' : 'bg-danger'} me-2`}>
                              {restaurant.type}
                            </span>
                          </p>

                          <div className="d-flex align-items-center mb-2 small text-muted">
                            <BsGeoAlt size={14} className="me-1" />
                            <span className="me-2">{restaurant.location}</span>
                            <AiOutlineGlobal size={14} className="me-1" />
                            <span>India</span>
                          </div>

                          <div className="mt-2 d-flex gap-2">
                            <Link to={`/menu/${restaurant.id}`} onClick={scrollToTop}>
                              <Button variant="outline-success" size="sm" className="rounded-2 px-3 all-button text-light">
                                View Menu
                              </Button>
                            </Link>


                            <Link to="/menu" onClick={scrollToTop}>
                              <Button variant="outline-success" size="sm" className="rounded-2 px-3 all-button text-light">
                                View Table
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            )}
          </div>

          {filteredRestaurants().length > 6 && (
            <div className='text-center mt-2'>
              <Link to="/allresturant" className='text-dark text-decoration-none '>
                View More <FaArrowRight className='ms-2' />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurRestaurant;