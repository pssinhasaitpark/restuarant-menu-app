import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form } from 'react-bootstrap';
import { photo7, photo8 } from "../../../assets/index";
import { FaStar, FaRegStar, FaUtensils, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCommentAlt, FaHistory } from 'react-icons/fa';
import { FaArrowUp } from "react-icons/fa6";

const YourActivity = () => {
  const [showButton, setShowButton] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [newReviewRestaurant, setNewReviewRestaurant] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(5);
  const [ratingText, setRatingText] = useState('Excellent');

  const recentReviews = [
    {
      id: 1,
      restaurantName: "La Bella Italia",
      image: photo8,
      rating: 4.5,
      date: "April 2, 2025",
      comment: "Amazing pasta and great service! The ambiance was perfect for our anniversary dinner. Will definitely come back again.",
      likes: 12
    },
    {
      id: 2,
      restaurantName: "Sakura Sushi",
      image: photo7,
      rating: 5,
      date: "March 27, 2025",
      comment: "Best sushi in town! Fresh ingredients and creative rolls. The chef's special was outstanding.",
      likes: 8
    }
  ];

  const upcomingBookings = [
    {
      id: 1,
      restaurantName: "Golden Dragon",
      image: photo8,
      date: "April 10, 2025",
      time: "7:30 PM",
      guests: 4,
      address: "123 Main Street, Downtown",
      status: "confirmed"
    }
  ];

  const pastBookings = [
    {
      id: 1,
      restaurantName: "Seaside Grill",
      image: photo7,
      date: "March 22, 2025",
      time: "6:00 PM",
      guests: 2,
      status: "completed"
    },
    {
      id: 2,
      restaurantName: "La Bella Italia",
      image: photo8,
      date: "March 15, 2025",
      time: "8:00 PM",
      guests: 5,
      status: "completed"
    }
  ];

  // Set up review text when editing an existing review
  useEffect(() => {
    if (editingReviewId !== null) {
      const review = recentReviews.find(r => r.id === editingReviewId);
      if (review) {
        setReviewText(review.comment);
        setSelectedRating(review.rating);
        updateRatingText(review.rating);
      }
    }
  }, [editingReviewId]);

  // button
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" style={{ opacity: 0.5 }} />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" />);
    }

    return stars;
  };

  const renderSelectableStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <span 
        key={star} 
        className="fs-4 cursor-pointer" 
        style={{ cursor: 'pointer' }}
        onClick={() => handleRatingClick(star)}
      >
        {star <= selectedRating ? 
          <FaStar className="text-warning" /> : 
          <FaRegStar className="text-warning" />
        }
      </span>
    ));
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    updateRatingText(rating);
  };

  const updateRatingText = (rating) => {
    if (rating <= 1) setRatingText('Poor');
    else if (rating <= 2) setRatingText('Fair');
    else if (rating <= 3) setRatingText('Good');
    else if (rating <= 4) setRatingText('Very Good');
    else setRatingText('Excellent');
  };

  const handleEditReview = (reviewId) => {
    setEditingReviewId(reviewId);
    setNewReviewRestaurant(null);
  };

  const handleLeaveReview = (restaurantName) => {
    setNewReviewRestaurant(restaurantName);
    setEditingReviewId(null);
    setReviewText('');
    setSelectedRating(5);
    updateRatingText(5);
  };

  const handleSubmitReview = () => {
    // Here you would typically save the review to your database
    // For now, we'll just close the form
    setEditingReviewId(null);
    setNewReviewRestaurant(null);
    alert("Review submitted successfully!");
  };

  const handleCancelReview = () => {
    setEditingReviewId(null);
    setNewReviewRestaurant(null);
  };

  return (
    <Container className="py-5">
      {showButton && (
        <button
          onClick={backToTop}
          className="btn btn-danger btn-lg position-fixed"
          style={{
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            borderRadius: '50%',
          }}
        >
          <FaArrowUp />
        </button>
      )}

      <Row>
        <Col lg={12} className="mb-4">
          <h2 className="fw-bold border-bottom pb-3 d-flex align-items-center">
            <FaHistory className="me-2 text-success all-heading" /> Your Restaurant Activity
          </h2>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="display-4 text-success mb-2">7</div>
              <div className="text-dark">Restaurant visits this month</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="display-4 text-success mb-2">4.8</div>
              <div className="text-dark">Average rating given</div>
              <div className="mt-2">
                {renderStars(4.8)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="display-4 text-success mb-2">2</div>
              <div className="text-dark">Upcoming reservations</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      <Row className="mb-5">
        <Col lg={12}>
          <h3 className="fw-bold mb-4 d-flex align-items-center">
            <FaCalendarAlt className="me-2 text-success" /> Upcoming Reservations
          </h3>

          {upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => (
              <Card key={booking.id} className="mb-3 border-0 shadow-sm">
                <Card.Body>
                  <Row>
                    <Col md={2} className="mb-3 mb-md-0">
                      <img
                        src={booking.image}
                        alt={booking.restaurantName}
                        className="img-fluid rounded"
                        style={{ objectFit: "cover", height: "100px", width: "100%" }}
                      />
                    </Col>
                    <Col md={7}>
                      <h5 className="fw-bold">{booking.restaurantName}</h5>
                      <div className="d-flex flex-wrap">
                        <div className="me-4 mb-2 d-flex align-items-center">
                          <FaCalendarAlt className="me-2 text-success" size={14} />
                          <span>{booking.date}</span>
                        </div>
                        <div className="me-4 mb-2 d-flex align-items-center">
                          <FaClock className="me-2 text-success" size={14} />
                          <span>{booking.time}</span>
                        </div>
                        <div className="me-4 mb-2 d-flex align-items-center">
                          <FaUtensils className="me-2 text-success" size={14} />
                          <span>{booking.guests} guests</span>
                        </div>
                      </div>
                      <div className="mt-2 d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2 text-success" size={14} />
                        <span>{booking.address}</span>
                      </div>
                    </Col>
                    <Col md={3} className="d-flex flex-column justify-content-center align-items-md-end mt-3 mt-md-0">
                      <Badge bg="success" className="px-3 py-2 mb-2 fs-6">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <div className="d-flex mt-2">
                        <Button variant="outline-success" size="sm" className="me-2">Cancel</Button>
                        <Button variant="outline-success" size="sm">Modify</Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center py-5">
                <p className="text-dark mb-0">No upcoming reservations</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={12}>
          <h3 className="fw-bold mb-4 d-flex align-items-center">
            <FaCommentAlt className="me-2 text-success" /> Your Recent Reviews
          </h3>

          {recentReviews.map(review => (
            <Card key={review.id} className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <Row>
                  <Col md={2} className="mb-3 mb-md-0">
                    <img
                      src={review.image}
                      alt={review.restaurantName}
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", height: "100px", width: "100%" }}
                    />
                  </Col>
                  <Col md={10}>
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="fw-bold">{review.restaurantName}</h5>
                      <div className="d-flex">
                        {renderStars(review.rating)}
                        <span className="ms-2 text-success fw-bold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-dark small mb-2">Reviewed on {review.date}</p>
                    <p className="mb-2">{review.comment}</p>
                    <div className="d-flex align-items-center">
                      <Button variant="outline-success" size="sm" className="me-2 d-flex align-items-center">
                        <FaStar className="me-1" /> {review.likes}
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleEditReview(review.id)}
                      >
                        Edit Review
                      </Button>
                    </div>
                    
                    {editingReviewId === review.id && (
                      <Card className="mt-3 border-0 shadow-sm bg-light">
                        <Card.Body>
                          <h6 className="mb-3">Edit Your Review</h6>
                          <div className="mb-3">
                            <div className="d-flex align-items-center mb-2">
                              <div className="me-3">
                                {renderSelectableStars()}
                              </div>
                              <span className="text-success fw-bold">{ratingText}</span>
                            </div>
                            <Form.Group>
                              <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Share your experience about this restaurant..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                              />
                            </Form.Group>
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="me-2"
                              onClick={handleCancelReview}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={handleSubmitReview}
                            >
                              Update Review
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <h3 className="fw-bold mb-4 d-flex align-items-center">
            <FaHistory className="me-2 text-success" /> Past Reservations
          </h3>

          <Row>
            {pastBookings.map(booking => (
              <Col md={6} key={booking.id} className="mb-3">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={booking.image}
                        alt={booking.restaurantName}
                        className="rounded me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                      <div>
                        <h6 className="fw-bold mb-1">{booking.restaurantName}</h6>
                        <div className="text-dark small">
                          {booking.date} at {booking.time}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-dark small d-flex align-items-center">
                        <FaUtensils className="me-1" size={12} /> {booking.guests} guests
                      </span>
                      {!recentReviews.some(review => review.restaurantName === booking.restaurantName) ? (
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleLeaveReview(booking.restaurantName)}
                        >
                          Leave Review
                        </Button>
                      ) : (
                        <Badge bg="light" text="success" className="px-2 py-1">
                          Reviewed
                        </Badge>
                      )}
                    </div>
                    
                    {newReviewRestaurant === booking.restaurantName && (
                      <Card className="mt-3 border-0 shadow-sm bg-light">
                        <Card.Body>
                          <h6 className="mb-3">Leave a Review for {booking.restaurantName}</h6>
                          <div className="mb-3">
                            <div className="d-flex align-items-center mb-2">
                              <div className="me-3">
                                {renderSelectableStars()}
                              </div>
                              <span className="text-success fw-bold">{ratingText}</span>
                            </div>
                            <Form.Group>
                              <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Share your experience about this restaurant..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                              />
                            </Form.Group>
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="me-2"
                              onClick={handleCancelReview}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={handleSubmitReview}
                            >
                              Submit Review
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default YourActivity;0