import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPizzaSlice, FaIceCream, FaGlassWhiskey } from "react-icons/fa";
import './DiscountSlider.css'
const DiscountSlider = () => {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const sliderData = [
    {
      title: "30% OFF PIZZAS",
      description: "Enjoy your favorite slice at a special price!",
      icon: <FaPizzaSlice size={40} className="text-warning" />,
      bgClass: "bg-gradient-primary",
      color: " #870000"
    },
    {
      title: "20% OFF DESSERTS",
      description: "Treat yourself with our delicious desserts today!",
      icon: <FaIceCream size={40} className="text-danger" />,
      bgClass: "bg-gradient-secondary",
      color: "#182848"
    },
    {
      title: "BUY 1 GET 1 FREE",
      description: "Double the refreshment on selected beverages!",
      icon: <FaGlassWhiskey size={40} className="text-info" />,
      bgClass: "bg-gradient-success",
      color: "#414d0b"
    },
  ];

  return (
    <div className="container ">
      <div className="row">
        <div className="col-lg-10 col-md-12">
          <div className="position-relative discount-slider-container">
            <Swiper
              ref={swiperRef}
              modules={[EffectCoverflow, Autoplay, Pagination]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              loop={true}
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              className="swiper-container"
            >
              {sliderData.map((slide, index) => (
                <SwiperSlide key={index} className="swiper-slide" style={{ width: "100%" }}>
                  <div 
                    className="p-2 rounded-lg shadow-lg border-0 h-100"
                    // style={{ 
                    //   background: `linear-gradient(145deg, ${slide.color}22, ${slide.color}55)`,
                    //   borderLeft: `8px solid ${slide.color}`
                    // }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-4">
                        <div 
                          className="rounded-circle d-flex justify-content-center align-items-center shadow p-3"
                        //   style={{ background: `${slide.color}22`, backdropFilter: "blur(10px)" }}
                        >
                          {slide.icon}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="fw-bold mb-1" style={{ color: slide.color }}>
                          {slide.title}
                        </h3>
                        <p className="mb-2 text-dark fs-6">{slide.description}</p>
                        <button 
                          className="btn btn-sm text-white fw-bold mt-2 btn-redeem"
                          style={{ backgroundColor: slide.color }}
                        >
                          REDEEM NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="custom-navigation d-flex justify-content-between position-absolute top-50 start-0 end-0 translate-middle-y z-1 px-3">
              <button
                onClick={handlePrev}
                className="prev-button btn rounded-circle shadow-sm d-flex align-items-center justify-content-center bg-light"
                style={{ 
             
                  width: "40px",
                  height: "40px",
                  
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="next-button btn rounded-circle shadow-sm d-flex align-items-center justify-content-center bg-light"
                style={{ 
        
                  width: "40px",
                  height: "40px",
                 
                }}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-lg-2 col-md-12 mt-4 mt-lg-0">
          <div className="discount-qr p-3 bg-light rounded-lg shadow-sm border text-center h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="mb-3 p-2 rounded bg-white">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <rect x="10" y="10" width="80" height="80" fill="#000" />
                <rect x="20" y="20" width="60" height="60" fill="#fff" />
                <rect x="30" y="30" width="40" height="40" fill="#000" />
                <rect x="40" y="40" width="20" height="20" fill="#fff" />
              </svg>
            </div>
            <p className="fw-bold mb-0">Scan For Menu</p>
            <small className="text-muted">Get exclusive offers</small>
          </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default DiscountSlider;