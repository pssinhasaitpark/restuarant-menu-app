import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear(); 

    return (
      <div className="Footer-Bottom py-2 bg-dark position-fixed bottom-0 left-0 w-100 z-2">
        <p className="fs-5 text-center fw-medium m-0 text-light">
          Copyright © {currentYear} Restaurant Booking
        </p>
      </div>
    );
  };
export default Footer