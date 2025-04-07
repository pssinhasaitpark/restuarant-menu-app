import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import {
  FaRegHeart,
  FaHeart,
  FaLeaf,
  FaDrumstickBite,
  FaStar,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import { BsGeoAlt, BsClock } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRestaurants, useWhislists } from "../../hooks/index";
import "./AllRestaurant.css";
import { FaArrowUp } from "react-icons/fa6";
const AllRestaurant = ({ selectedLocation }) => {
  const { data: restaurants, isLoading } = useRestaurants();
  const { wishlistData, mutate: wishlistMutate } = useWhislists();
  const [visibleCount, setVisibleCount] = useState(6);
  const [showButton, setShowButton] = useState(false);
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState({});
  const [showFilters, setShowFilters] = useState(true);
  const [nameSearch, setNameSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (wishlistData && wishlistData.length > 0) {
      const wishlistMap = {};
      wishlistData.forEach(item => {
        wishlistMap[item.id] = true;
      });
      setFavorites(wishlistMap);
    }
  }, [wishlistData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleFavoriteToggle = (restaurantId) => {
    if (favorites.includes(restaurantId)) {
      setFavorites(favorites.filter((id) => id !== restaurantId));
    } else {
      setFavorites([...favorites, restaurantId]);
    }
  };

  const filteredRestaurants = () => {
    let filtered = restaurants || [];

    if (filter === "Veg") {
      filtered = filtered.filter((restaurant) => restaurant.mode === "Veg");
    } else if (filter === "Non-Veg") {
      filtered = filtered.filter((restaurant) => restaurant.mode === "Non-Veg");
    } else if (filter === "Offers") {
      filtered = filtered.filter((restaurant) => restaurant.bestOffer);
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }
    if (nameSearch) {
      filtered = filtered.filter((restaurant) =>
        restaurant.restaurant_name.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }


    if (locationSearch) {
      filtered = filtered.filter((restaurant) =>
        restaurant.location.toLowerCase().includes(locationSearch.toLowerCase())
      );
    }

    return filtered;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
        >
          {i < rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  const isOpen = (openingHours) => {
    if (!openingHours) return false;

    const [open, close] = openingHours.split(" to ").map((time) => {
      const [hour, minute] = time.split(":");
      return new Date().setHours(
        (parseInt(hour) % 12) + (time.includes("PM") ? 12 : 0),
        parseInt(minute)
      );
    });

    const now = new Date();
    return now >= open && now < close;
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
    setFilter("all");
    setNameSearch("");
    setLocationSearch("");
  };

  return (
    <Container className="py-5">
      {showButton && (
        <button
          onClick={backToTop}
          className="btn btn-danger btn-lg position-fixed"
          style={{
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            borderRadius: "50%",
          }}
        >
          <FaArrowUp />
        </button>
      )}

      <Row className="">
        <Col lg={3} md={4} className="mb-4">
          <Card className="filter-sidebar rounded-3 mb-4">
            <Card.Header className="bg-white border-bottom-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">Filters</h5>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="d-md-none"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter />
                </Button>
              </div>
            </Card.Header>

            <Card.Body
              className={`pb-0 ${showFilters ? "" : "d-none d-md-block"}`}
            >
              <h6 className="filter-heading text-muted fs-6 fw-medium mb-4">
                Food Preference
              </h6>
              <Form>
                <Form.Check
                  type="switch"
                  id="veg-switch"
                  label={
                    <>
                      <FaLeaf className="text-success me-2" /> Vegetarian Only
                    </>
                  }
                  className="mb-3"
                  checked={filter === "Veg"}
                  onChange={() => setFilter(filter === "Veg" ? "all" : "Veg")}
                />
                <Form.Check
                  type="switch"
                  id="non-veg-switch"
                  label={
                    <>
                      <FaDrumstickBite className="text-danger me-2" />{" "}
                      Non-Vegetarian
                    </>
                  }
                  className="mb-3"
                  checked={filter === "Non-Veg"}
                  onChange={() =>
                    setFilter(filter === "Non-Veg" ? "all" : "Non-Veg")
                  }
                />
              </Form>

              <h6 className="filter-heading mt-4">Special Offers</h6>
              <Form>
                <Form.Check
                  type="switch"
                  id="offers-switch"
                  label={
                    <>
                      <FaStar className="text-warning me-2" /> Discounts
                    </>
                  }
                  className="mb-3"
                  checked={filter === "Offers"}
                  onChange={() =>
                    setFilter(filter === "Offers" ? "all" : "Offers")
                  }
                />
              </Form>
            </Card.Body>

            <Card.Footer className="bg-white border-top-0 text-center">
              <Button
                variant="success"
                className="w-100 all-button"
                onClick={resetFilters}
              >
                Reset All Filters
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col lg={9} md={8}>
          <Row>
            <div className="d-flex justify-content-left align-items-center mb-4">
              <div className="">
                <Form.Group className="mb-0 me-3">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search Restaurant....."
                      value={nameSearch}
                      onChange={(e) => setNameSearch(e.target.value)}
                    />
                    <Button variant="success">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="">
                <Form.Group className="mb-0 me-3">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search Location....."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                    <Button variant="success">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            {isLoading ? (
              <Col xs={12} className="text-center py-5">
                <Spinner animation="border" variant="success" />
                <p className="mt-3">Finding the best restaurants...</p>
              </Col>
            ) : filteredRestaurants().length === 0 ? (
              <Col xs={12} className="text-center py-5">
                <div className="no-results p-4">
                  <div className="mb-3">
                    <FaFilter size={40} className="text-muted" />
                  </div>
                  <h5>No restaurants match your filters</h5>
                  <p className="text-muted">
                    Try adjusting your filters or location
                  </p>
                  <Button variant="outline-success" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </Col>
            ) : (
              filteredRestaurants()
                .slice(0, visibleCount)
                .map((restaurant, index) => (
                  <Col lg={4} className="mb-4" key={index}>
                    <Card className="restaurant-card h-100 border-0">
                      <div className="position-relative">
                        <Card.Img
                          variant="top"
                          src={restaurant.images[0]}
                          className="restaurant-image"
                        />
                        <div className="position-absolute top-0 start-0 m-3 ">
                          <Badge
                            bg={
                              isOpen(restaurant.opening_hours)
                                ? "success"
                                : "danger"
                            }
                            className="px-2 py-2"
                          >
                            {isOpen(restaurant.opening_hours)
                              ? "OPEN NOW"
                              : "CLOSED"}
                          </Badge>
                        </div>
                        <div className="position-absolute top-0 end-0 m-3">
                          <Button
                            variant="link"
                            className={`p-0 ${favorites[restaurant.id] ? 'text-danger' : 'text-dark'} custom-dropdown-toggle bg-light rounded-5 px-1`}
                            onClick={() => toggleFavorite(restaurant.id)}
                          >
                            {favorites[restaurant.id] ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                          </Button>
                        </div>
                        {restaurant.bestOffer && (
                          <div className="position-absolute bottom-0 start-0 m-3">
                            <Badge
                              bg="warning"
                              text="dark"
                              className="px-2 py-1"
                            >
                              <FaStar className="me-1" /> Special Offer
                            </Badge>
                          </div>
                        )}
                      </div>

                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Card.Title className="mb-0">
                            {restaurant.restaurant_name}
                          </Card.Title>
                          <div className="rating-container">
                            <div className="stars d-inline-flex text-warning">
                              {renderStars(restaurant.rating)}
                            </div>
                            <span className="rating-value ms-1 text-warning">
                              ({restaurant.rating})
                            </span>
                          </div>
                        </div>

                        {/* <div className="mb-3">
                          <span className="text-muted">
                            {restaurant.foodType}
                          </span>
                        </div> */}
                        <p className="mb-1 text-muted small">
                          <span className={`badge ${restaurant.type === 'veg' ? 'bg-success' : 'bg-danger'} me-2`}>
                            {restaurant.type}
                          </span>
                        </p>

                        <div className="d-flex mb-1 text-muted small">
                          <div className="me-3">
                            <BsGeoAlt className="me-1" />
                            <span>{restaurant.location}</span>
                          </div>
                          <div>
                            <AiOutlineGlobal className="me-1" />
                            <span>India</span>
                          </div>
                        </div>

                        <div className="text-muted small mb-3">
                          <BsClock className="me-1" />
                          <span>
                            {restaurant.opening_hours || "Call for hours"}
                          </span>
                        </div>
                      </Card.Body>

                      <Card.Footer className="bg-white border-top-0">
                        <Row>
                          <Col xs={6}>
                            <Link to="/menu" className="w-100">
                              <Button
                                variant="outline-success"
                                className="w-100 all-button text-light"
                                onClick={scrollToTop}
                              >
                                View Menu
                              </Button>
                            </Link>
                          </Col>
                          <Col xs={6}>
                            <Link to="/menu" className="w-100">
                              <Button
                                variant="success"
                                className="w-100 all-button"
                                onClick={scrollToTop}
                              >
                                Book Table
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))
            )}
          </Row>

          {filteredRestaurants().length > visibleCount && (
            <div className="text-center mt-4">
              <Button
                variant="outline-success"
                onClick={() => setVisibleCount((prev) => prev + 6)}
              >
                View More <FaArrowRight className="ms-2" />
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AllRestaurant;
