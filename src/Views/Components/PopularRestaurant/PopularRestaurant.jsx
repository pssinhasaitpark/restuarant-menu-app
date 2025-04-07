import React from 'react';
import { r1, r2, r3, r4, r5, r6 } from '../../../assets/index';
import { FaArrowRight, FaFire, FaRegClock, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PopularRestaurant = () => {
  const popularRestaurants = [
    {
      name: "Tasty Bites",
      image: r1,
  
      orderCount: 1250,
      lastOrdered: "2 days ago",
      rating: 4.8,
      cuisine: "Italian"
    },
    {
      name: "Spice Garden",
      image: r2,
      discount: 15,
      orderCount: 980,
      lastOrdered: "1 day ago",
      rating: 4.6,
      cuisine: "Indian"
    },
    {
      name: "Urban Grill",
      image: r3,
    
      orderCount: 1430,
      lastOrdered: "3 days ago",
      rating: 4.9,
      cuisine: "American"
    },
    {
      name: "Sushi Master",
      image: r4,
      discount: 10,
      orderCount: 850,
      lastOrdered: "5 days ago",
      rating: 4.7,
      cuisine: "Japanese"
    },
    {
      name: "Green Bowl",
      image: r5,
     
      orderCount: 1120,
      lastOrdered: "1 day ago",
      rating: 4.5,
      cuisine: "Vegan"
    },
    {
      name: "Sweet Corner",
      image: r6,
      discount: 15,
      orderCount: 760,
      lastOrdered: "2 days ago",
      rating: 4.4,
      cuisine: "Desserts"
    },
  ];

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="fw-bold fs-4 p-0 m-0 ">
          <span className="text-success me-2 ">
            {/* <FaFire className="me-2" /> */}
            Most Ordered
          </span>
          Restaurants
        </p>
        <Link to="/order" className="btn btn-outline-success d-flex align-items-center">
       Your Order <FaArrowRight className="ms-2" />
        </Link>
      </div>

      <div className="row ">
        {popularRestaurants.map((restaurant, index) => (
          <div key={index} className="col-md-6 col-lg-2">
            <div className="card h-100 border-0 shadow-sm position-relative">
              {/* <div className="position-absolute top-0 start-0 m-3 bg-danger text-white px-2 py-1 rounded-pill z-3">
                {restaurant.discount}% OFF
              </div> */}
              <div className="ratio ratio-16x9">
                <img 
                  src={restaurant.image} 
                  className="card-img-top object-fit-cover rounded-top" 
                  alt={restaurant.name} 
                />
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{restaurant.name}</h5>
          
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="me-2 text-warning">
                    <FaStar /> {restaurant.rating}
                  </span>
        
                  <Link to={`/restaurant/${index}`} className="btn btn-sm btn-outline-success ms-3">
                    Book Now
                  </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">
                    <FaRegClock className="me-1" />
                    Last ordered {restaurant.lastOrdered}
                  </span>
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRestaurant;