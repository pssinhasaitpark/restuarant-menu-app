import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaPizzaSlice, FaIceCream, FaGlassWhiskey, FaChevronLeft, FaChevronRight, FaQrcode } from "react-icons/fa";

const inlineStyles = {
  indicator: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    display: "inline-block",
    margin: "0 3px",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  activeIndicator: {
    width: "24px",
    borderRadius: "4px"
  }
};

const DiscountSlider = ({ qrCode }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const sliderData = [
    {
      title: "30% OFF PIZZAS",
      description: "Enjoy your favorite slice at a special price!",
      icon: <FaPizzaSlice size={30} />,
      color: "#e53935",
      bgClass: "bg-danger-subtle"
    },
    {
      title: "20% OFF DESSERTS",
      description: "Treat yourself with our delicious desserts today!",
      icon: <FaIceCream size={30} />,
      color: "#5e35b1",
      bgClass: "bg-primary-subtle"
    },
    {
      title: "BUY 1 GET 1 FREE",
      description: "Double the refreshment on selected beverages!",
      icon: <FaGlassWhiskey size={30} />,
      color: "#00897b",
      bgClass: "bg-success-subtle"
    },
  ];

  return (
    <div className="container mt-3">
      <div className="row">
       
        <div className="col-lg-10 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm h-50">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-3">
              <h5 className="mb-0 fw-bold">Today's Special Offers</h5>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-light rounded-circle me-2 d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px" }}
                  onClick={handlePrev}
                >
                  <FaChevronLeft />
                </button>

                <div className="d-flex mx-2">
                  {sliderData.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        ...inlineStyles.indicator,
                        ...(activeIndex === index ? inlineStyles.activeIndicator : {}),
                        backgroundColor: activeIndex === index ? sliderData[activeIndex].color : '#dee2e6'
                      }}
                      onClick={() => swiperRef.current?.swiper.slideTo(index)}
                      role="button"
                      aria-label={`Slide ${index + 1}`}
                    ></div>
                  ))}
                </div>

                <button
                  className="btn btn-sm btn-light rounded-circle ms-2 d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px" }}
                  onClick={handleNext}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-100"
              >
                {sliderData.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`p-4 h-100 ${slide.bgClass}`}
                      style={{ borderLeft: `5px solid ${slide.color}` }}
                    >
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <div
                            className="bg-white rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm"
                            style={{
                              width: "70px",
                              height: "70px",
                              color: slide.color
                            }}
                          >
                            {slide.icon}
                          </div>
                        </div>

                        <div className="col">
                          <h3 className="fw-bold h4 mb-2" style={{ color: slide.color }}>
                            {slide.title}
                          </h3>
                          <p className="mb-3 text-secondary">{slide.description}</p>
                          <button
                            className="btn text-white px-4"
                            style={{
                              backgroundColor: slide.color,
                              transition: "all 0.3s ease"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            REDEEM NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

           <div className="col-lg-2 col-md-12 mt-4 mt-lg-0">
          <div className="discount-qr bg-light rounded-lg shadow-sm border text-center d-flex flex-column justify-content-center align-items-center">
          <div className=" text-center d-flex py-1">
                <div className=" me-2 ">
                  <FaQrcode size={24} className="my-auto"/>
                </div>
                <h5 className="fs-6 my-auto fw-bold ">Scan For Menu</h5>
                
              </div>
            {qrCode && (
              <div className="qr-code-container">

                <iframe
                  src={qrCode?.data?.qr_code_url}
                  width="94%"
                  height="182px"
                />
              </div>
            )}
           
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default DiscountSlider;