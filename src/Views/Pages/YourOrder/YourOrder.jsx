import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Tab, Nav, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaHistory, FaCalendarAlt, FaShoppingBag, FaUtensils, FaMapMarkerAlt, FaRegClock, FaCheckCircle, FaTruck, FaStar, FaMoneyBillWave } from 'react-icons/fa';
import { photo7, photo19 } from "../../../assets/index";
import { Link } from 'react-router-dom';
import { FaArrowUp } from "react-icons/fa6";
const YourOrder = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const orders = [
    {
      id: 'ORD-8764',
      restaurantName: 'Burger Palace',
      restaurantImage: photo19,
      date: 'April 5, 2025',
      time: '7:30 PM',
      status: 'Dinning',
      timeAgo: '2 days ago',
      items: [

      ],
      subtotal: 42.95,
      CoverFee: 3.99,
      tax: 3.59,
      total: 50.53,
      address: '123 Main St, Apt 4B, New York, NY 10001',
      rating: 4,
      paymentMethod: 'Credit Card (****1234)'
    },
    {
      id: 'ORD-8723',
      restaurantName: 'Pizza Corner',
      restaurantImage: photo7,
      date: 'April 2, 2025',
      time: '6:45 PM',
      status: 'Dinning',
      timeAgo: '5 days ago',
      items: [
        { name: 'Pepperoni Pizza (Large)', quantity: 1, price: 18.99 },
        { name: 'Garlic Breadsticks', quantity: 1, price: 5.99 },
        { name: 'Caesar Salad', quantity: 1, price: 8.99 },
        { name: 'Coke (2L)', quantity: 1, price: 3.49 }
      ],
      subtotal: 37.46,
      CoverFee: 2.99,
      tax: 3.12,
      total: 43.57,
      address: '123 Main St, Apt 4B, New York, NY 10001',
      rating: 5,
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-8342',
      restaurantName: 'Noodle House',
      restaurantImage: photo19,
      date: 'March 18, 2025',
      time: '8:15 PM',
      status: 'Dinning',
      timeAgo: '3 weeks ago',
      items: [
        { name: 'Pad Thai', quantity: 1, price: 14.99 },
        { name: 'Spring Rolls', quantity: 2, price: 6.99 },
        { name: 'Tom Yum Soup', quantity: 1, price: 8.99 },
        { name: 'Thai Iced Tea', quantity: 2, price: 3.99 }
      ],
      subtotal: 45.94,
      CoverFee: 4.99,
      tax: 3.89,
      total: 54.82,
      address: '123 Main St, Apt 4B, New York, NY 10001',
      rating: 3,
      paymentMethod: 'Credit Card (****5678)'
    },
    {
      id: 'ORD-7531',
      restaurantName: 'Taco Fiesta',
      restaurantImage: photo7,
      date: 'February 22, 2025',
      time: '7:00 PM',
      status: 'Dinning',
      timeAgo: '1 month ago',
      items: [

      ],
      subtotal: 31.93,
      CoverFee: 3.99,
      tax: 2.78,
      total: 38.70,
      address: '123 Main St, Apt 4B, New York, NY 10001',
      rating: 5,
      paymentMethod: 'Cash on Delivery'
    }
  ];
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


  const getFilteredOrders = () => {
    const today = new Date();
    let filteredOrders = orders;

    if (activeTab === 'recent') {

      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= lastWeek;
      });
    } else if (activeTab === 'month') {

      const lastMonth = new Date(today);
      lastMonth.setDate(lastMonth.getDate() - 30);
      filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= lastMonth;
      });
    }

    if (searchQuery.trim() !== '') {
      filteredOrders = filteredOrders.filter(order =>
        order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredOrders;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-warning" : "text-muted"}
          style={{ marginRight: '2px' }}
        />
      );
    }
    return stars;
  };
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  const filteredOrders = getFilteredOrders();

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
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold d-flex align-items-center">
              <FaShoppingBag className="me-2 text-success" /> Your Order History
            </h2>
            <div className="d-flex align-items-center">
              <Form.Group className="mb-0 me-3">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="success">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form.Group>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Nav variant="tabs" className="border-bottom">
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
                className={activeTab === 'all' ? "text-success fw-bold" : ""}
              >
                All Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'recent'}
                onClick={() => setActiveTab('recent')}
                className={activeTab === 'recent' ? "text-success fw-bold" : ""}
              >
                Recent (7 Days)
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'month'}
                onClick={() => setActiveTab('month')}
                className={activeTab === 'month' ? "text-success fw-bold" : ""}
              >
                Last 30 Days
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <Card key={order.id} className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center">
                <h5 className="mb-0 fw-bold">{order.restaurantName}</h5>
                <Badge bg="success" className="ms-3">
                  {order.status}
                </Badge>
              </div>
              <div className="text-muted d-flex align-items-center">
                <FaRegClock className="me-2" />
                <span>{order.timeAgo}</span>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={2} className="mb-3 mb-md-0">
                  <img
                    src={order.restaurantImage}
                    alt={order.restaurantName}
                    className="img-fluid rounded shadow-sm"
                    style={{ width: "100%", height: "100px", objectFit: "cover" }}
                  />
                  <div className="d-flex justify-content-center mt-2">
                    {renderStars(order.rating)}
                  </div>
                </Col>
                <Col md={7}>
                  <h6 className="fw-bold text-muted mb-3">Order #{order.id}</h6>
                  <div className="d-flex flex-wrap mb-3">
                    <div className="me-4 mb-2 d-flex align-items-center">
                      <FaCalendarAlt className="me-2 text-success" size={14} />
                      <span>{order.date}</span>
                    </div>
                    <div className="me-4 mb-2 d-flex align-items-center">
                      <FaRegClock className="me-2 text-success" size={14} />
                      <span>{order.time}</span>
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <FaMoneyBillWave className="me-2 text-success" size={14} />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2 mb-3">
                    <FaMapMarkerAlt className="me-2 text-success" size={14} />
                    <span className="text-muted small">{order.address}</span>
                  </div>
                  <div className='mb-2'>
                  <Button variant="outline-success" onClick={() => toggleOrderDetails(order.id)}>
                    <FaHistory className="me-2 " /> Order Details
                  </Button>
                  {expandedOrder === order.id && (
                    <div className="mt-3">
                      <h6 className="fw-bold">Items</h6>
                      {order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="text-muted">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted">No items in this order.</p>
                      )}
                    </div>
                  )}
                   </div>
                </Col>
                <Col md={3} className="border-start border-light">
                  <h6 className="fw-bold">Order Summary</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  {/* <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Cover</span>
                    <span>₹{order.CoverFee.toFixed(2)}</span>
                  </div> */}
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax</span>
                    <span>₹{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-2 mt-2">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold text-success">₹{order.total.toFixed(2)}</span>
                  </div>

                  <div className="mt-4">
                    <Link to="/menu">
                      <Button
                        variant="success"
                        className="w-100 mb-2 d-flex justify-content-center align-items-center"
                      >
                        <FaUtensils className="me-2" /> Reorder
                      </Button></Link>
                    {/* <Button
                      variant="outline-secondary"
                      className="w-100 d-flex justify-content-center align-items-center"
                    >
                      <FaHistory className="me-2" /> Order Details
                    </Button> */}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <FaShoppingBag size={50} className="text-muted mb-3" />
            <h5>No orders found</h5>
            <p className="text-muted">
              {searchQuery ? "Try adjusting your search criteria." : "You haven't placed any orders yet."}
            </p>
            {searchQuery && (
              <Button variant="outline-success" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default YourOrder;