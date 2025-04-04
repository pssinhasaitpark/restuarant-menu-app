import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear(); 

    return (
      <div className="Footer-Bottom py-2 bg-dark">
        <p className="fs-5 text-center fw-medium m-0 text-light">
          Copyright © {currentYear} Restaurant Booking
        </p>
      </div>
    );
  };
export default Footer