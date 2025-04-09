import React, { useEffect, useState } from 'react';
import { useRestaurants, useWhislists } from '../../hooks/index';
import { Card, Button, Form } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaLeaf, } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BsGeoAlt } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FaBowlFood } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";
import { useSelector } from 'react-redux';
const Wishlist = () => {
  const categories = useSelector((state) => state.menu.categories);
  const restaurantId = categories.length > 0 ? categories[0].restaurant_id : null;
  const { wishlistData, isLoading, refetch, mutate } = useWhislists();
  const [filters, setFilters] = useState({
    veg: false,
    nonVeg: false,
    offers: false,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleToggleWishlist = (restaurant) => {
    const isFavorite = wishlistData.some(item => item.id === restaurant.id);
    mutate({ id: restaurant.id, isFavorite }, {
      onSuccess: () => console.log(`${isFavorite ? 'Removed from' : 'Added to'} wishlist:`, restaurant.id),
    });
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

  const resetFilters = () => {
    setFilters({
      veg: false,
      nonVeg: false,
      offers: false,
    });
  };

  const filteredRestaurants = () => {
    let filtered = wishlistData || [];

    if (!filters.veg && !filters.nonVeg && !filters.offers) {
      return filtered;
    }

    if (filters.veg) {
      filtered = filtered.filter(restaurant => restaurant.type === 'veg');
    }
    if (filters.nonVeg) {
      filtered = filtered.filter(restaurant => restaurant.type === 'non_veg');
    }
    if (filters.offers) {
      filtered = filtered.filter(restaurant => restaurant.bestOffer);
    }
    if (selectedLocation) {
      filtered = filtered.filter(restaurant =>
        restaurant.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    return filtered;
  };

  if (isLoading) {
    return (
      <div className="container mt-5 py-4 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const hasRestaurants = filteredRestaurants().length > 0;
  const hasWishlist = wishlistData.length > 0;
  return (
    <div className='container-fluid  mt-5'>
      <h2 className="all-heading  text-center underline">Your Wishlist</h2>

      <div className=' py-4 d-flex justify-content-center'>

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
            {!hasWishlist ? (
              <div className="col-12 text-center py-4">
                <p className="text-dark fs-5">Your Wishlist is empty.</p>
                <Link to="/#Restaurants" className="btn btn-outline-success">
                  Browse Restaurants
                </Link>
              </div>
            ) : !hasRestaurants ? (
              <div className="col-12 text-center py-4">
                <p className="text-dark fs-5">No restaurants match your selected filters.</p>
              </div>
            ) : (
              filteredRestaurants().map((restaurant) => (
                <div className='col-md-6 mb-4' key={restaurant.id}>
                  <Card className="h-100 position-relative shadow-sm hover-effect">
                    <div className="position-absolute" style={{ top: '10px', right: '10px', zIndex: 2 }}>
                      <span className="me-1 mt-1">{renderStars(restaurant.rating)}</span>
                      <span className="small text-muted me-3">({restaurant.rating})</span>
                      <Button
                        variant="link"
                        className={` custom-dropdown-toggle p-0 ${wishlistData.some(item => item.id === restaurant.id) ? 'text-danger' : 'text-muted'}`}
                        onClick={() => handleToggleWishlist(restaurant)}
                      >
                        {wishlistData.some(item => item.id === restaurant.id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                      </Button>
                    </div>
                    <div className={`position-absolute start-0 mt-2 ms-2 rounded-pill px-2 py-1 bg-${isOpen(restaurant.opening_time, restaurant.closing_time) ? 'success' : 'danger'} text-white small`} style={{ zIndex: 1 }}>
                      {isOpen(restaurant.opening_time, restaurant.closing_time) ? "OPEN NOW" : "CLOSED"}
                    </div>
                    <Card.Body className="p-3">
                      <div className="d-flex">
                        <div className="me-3">
                          <img
                            src={restaurant.images?.[0] || 'placeholder-image.jpg'}
                            alt={restaurant.restaurant_name}
                            className="rounded shadow-sm"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="mb-1 fw-bold">{restaurant.restaurant_name}</h5>
                          <p className="mb-1 text-muted small">
                            <span className={`badge ${restaurant.type === 'veg' ? 'bg-success' : 'bg-danger'} me-2`}>
                              {restaurant.type}
                            </span>
                          </p>
                          <div className="d-flex align-items-center mb-2 small text-muted">
                            <BsGeoAlt size={14} className="me-1" />
                            <span className='me-2'>{restaurant.location}</span>
                            <AiOutlineGlobal size={14} className="me-1" />
                            <span>India</span>
                          </div>
                          <div className="mt-2 d-flex gap-2">
                            <Link to={`/menu/${restaurant.id}`} onClick={scrollToTop}>
                              <Button variant="success" size="sm" className="rounded-2 px-3 all-button">
                                Book Table
                              </Button>
                            </Link>
                            <Link to={`/menu/${restaurant.id}`}>
                              <Button variant="outline-success" size="sm" className="rounded-2 px-3 all-button text-light">
                                View Menu
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
              <Link to="/allrestaurants" className='text-dark text-decoration-none '>
                View More
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>

  );
};

export default Wishlist;
