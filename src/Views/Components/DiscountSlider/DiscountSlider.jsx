// // import React, { useState, useRef, useEffect } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/effect-coverflow";
// // import "swiper/css/pagination";
// // import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// // import { FaPizzaSlice, FaIceCream, FaGlassWhiskey } from "react-icons/fa";
// // import './DiscountSlider.css'
// // const DiscountSlider = ({ qrCode }) => {
// //   const swiperRef = useRef(null);
// //   const [activeSlide, setActiveSlide] = useState(0);

// //   const handleNext = () => {
// //     swiperRef.current.swiper.slideNext();
// //   };

// //   const handlePrev = () => {
// //     swiperRef.current.swiper.slidePrev();
// //   };

// //   const sliderData = [
// //     {
// //       title: "30% OFF PIZZAS",
// //       description: "Enjoy your favorite slice at a special price!",
// //       icon: <FaPizzaSlice size={40} className="text-warning" />,
// //       bgClass: "bg-gradient-primary",
// //       color: " #870000"
// //     },
// //     {
// //       title: "20% OFF DESSERTS",
// //       description: "Treat yourself with our delicious desserts today!",
// //       icon: <FaIceCream size={40} className="text-danger" />,
// //       bgClass: "bg-gradient-secondary",
// //       color: "#182848"
// //     },
// //     {
// //       title: "BUY 1 GET 1 FREE",
// //       description: "Double the refreshment on selected beverages!",
// //       icon: <FaGlassWhiskey size={40} className="text-info" />,
// //       bgClass: "bg-gradient-success",
// //       color: "#414d0b"
// //     },
// //   ];


// //   console.log('v<><<<<', qrCode);



// //   return (
// //     <div className="container ">
// //       <div className="row">
// //         <div className="col-lg-10 col-md-12 mt-2 ">
// //           <div className="position-relative discount-slider-container ">
// //             <Swiper
// //               ref={swiperRef}
// //               modules={[EffectCoverflow, Autoplay, Pagination]}
// //               effect="coverflow"
// //               grabCursor={true}
// //               centeredSlides={true}
// //               slidesPerView="auto"
// //               coverflowEffect={{
// //                 rotate: 0,
// //                 stretch: 0,
// //                 depth: 100,
// //                 modifier: 2,
// //                 slideShadows: true,
// //               }}
// //               autoplay={{
// //                 delay: 3000,
// //                 disableOnInteraction: false,
// //               }}
// //               pagination={{ clickable: true }}
// //               loop={true}
// //               onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
// //               className="swiper-container"
// //             >
// //               {sliderData.map((slide, index) => (
// //                 <SwiperSlide key={index} className="swiper-slide" style={{ width: "100%" }}>
// //                   <div
// //                     className="p-3 py-4 rounded-lg shadow-lg border-0 h-100"
// //                   // style={{ 
// //                   //   background: `linear-gradient(145deg, ${slide.color}22, ${slide.color}55)`,
// //                   //   borderLeft: `8px solid ${slide.color}`
// //                   // }}
// //                   >
// //                     <div className="d-flex align-items-center">
// //                       <div className="me-4">
// //                         <div
// //                           className="rounded-circle d-flex justify-content-center align-items-center shadow p-3"
// //                         //   style={{ background: `${slide.color}22`, backdropFilter: "blur(10px)" }}
// //                         >
// //                           {slide.icon}
// //                         </div>
// //                       </div>
// //                       <div className="flex-grow-1">
// //                         <h3 className="fw-bold mb-1" style={{ color: slide.color }}>
// //                           {slide.title}
// //                         </h3>
// //                         <p className="mb-2 text-dark fs-6">{slide.description}</p>
// //                         <button
// //                           className="btn btn-sm text-white fw-bold mt-2 btn-redeem"
// //                           style={{ backgroundColor: slide.color }}
// //                         >
// //                           REDEEM NOW
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </SwiperSlide>
// //               ))}
// //             </Swiper>

// //             <div className="custom-navigation d-flex justify-content-between position-absolute top-50 start-0 end-0 translate-middle-y z-1 px-3">
// //               <button
// //                 onClick={handlePrev}
// //                 className="prev-button btn rounded-circle shadow-sm d-flex align-items-center justify-content-center bg-light"
// //                 style={{

// //                   width: "40px",
// //                   height: "40px",

// //                 }}
// //               >
// //                 <FaChevronLeft />
// //               </button>
// //               <button
// //                 onClick={handleNext}
// //                 className="next-button btn rounded-circle shadow-sm d-flex align-items-center justify-content-center bg-light"
// //                 style={{

// //                   width: "40px",
// //                   height: "40px",

// //                 }}
// //               >
// //                 <FaChevronRight />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-lg-2 col-md-12 mt-4 mt-lg-0">
// //           <div className="discount-qr bg-light rounded-lg shadow-sm border text-center d-flex flex-column justify-content-center align-items-center">
// //             {qrCode && (
// //               <div className="qr-code-container">

// //                 <iframe
// //                   src={qrCode?.data?.qr_code_url}
// //                   width="94%"
// //                   height="270px"
// //                 />
// //               </div>
// //             )}
// //             {/* <p className="fw-bold mb-0">Scan For Menu</p>
// //             <small className="text-muted">Get exclusive offers</small> */}
// //           </div>
// //         </div>

// //       </div>


// //     </div>
// //   );
// // };

// // export default DiscountSlider;
// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaPizzaSlice, FaIceCream, FaGlassWhiskey, FaChevronLeft, FaChevronRight, FaQrcode } from "react-icons/fa";

// // Small additional CSS for swiper and custom elements
// const inlineStyles = {
//   indicator: {
//     width: "8px",
//     height: "8px",
//     borderRadius: "50%",
//     display: "inline-block",
//     margin: "0 3px",
//     cursor: "pointer",
//     transition: "all 0.3s ease"
//   },
//   activeIndicator: {
//     width: "24px",
//     borderRadius: "4px"
//   }
// };

// const DiscountSlider = ({ qrCode }) => {
//   const swiperRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handlePrev = () => {
//     swiperRef.current?.swiper.slidePrev();
//   };

//   const handleNext = () => {
//     swiperRef.current?.swiper.slideNext();
//   };

//   const sliderData = [
//     {
//       title: "30% OFF PIZZAS",
//       description: "Enjoy your favorite slice at a special price!",
//       icon: <FaPizzaSlice size={30} />,
//       color: "#e53935",
//       bgClass: "bg-danger-subtle"
//     },
//     {
//       title: "20% OFF DESSERTS",
//       description: "Treat yourself with our delicious desserts today!",
//       icon: <FaIceCream size={30} />,
//       color: "#5e35b1",
//       bgClass: "bg-primary-subtle"
//     },
//     {
//       title: "BUY 1 GET 1 FREE",
//       description: "Double the refreshment on selected beverages!",
//       icon: <FaGlassWhiskey size={30} />,
//       color: "#00897b",
//       bgClass: "bg-success-subtle"
//     },
//   ];

//   return (
//     <div className="container py-4">
//       <div className="row">
//         {/* Offers Section */}
//         <div className="col-lg-9 mb-4 mb-lg-0">
//           <div className="card border-0 shadow-sm h-50">
//             <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-3">
//               <h5 className="mb-0 fw-bold">Today's Special Offers</h5>
//               <div className="d-flex align-items-center">
//                 <button
//                   className="btn btn-sm btn-light rounded-circle me-2 d-flex align-items-center justify-content-center"
//                   style={{ width: "32px", height: "32px" }}
//                   onClick={handlePrev}
//                 >
//                   <FaChevronLeft />
//                 </button>

//                 <div className="d-flex mx-2">
//                   {sliderData.map((_, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         ...inlineStyles.indicator,
//                         ...(activeIndex === index ? inlineStyles.activeIndicator : {}),
//                         backgroundColor: activeIndex === index ? sliderData[activeIndex].color : '#dee2e6'
//                       }}
//                       onClick={() => swiperRef.current?.swiper.slideTo(index)}
//                       role="button"
//                       aria-label={`Slide ${index + 1}`}
//                     ></div>
//                   ))}
//                 </div>

//                 <button
//                   className="btn btn-sm btn-light rounded-circle ms-2 d-flex align-items-center justify-content-center"
//                   style={{ width: "32px", height: "32px" }}
//                   onClick={handleNext}
//                 >
//                   <FaChevronRight />
//                 </button>
//               </div>
//             </div>

//             <div className="card-body p-0">
//               <Swiper
//                 ref={swiperRef}
//                 modules={[Navigation, Pagination, Autoplay]}
//                 autoplay={{ delay: 5000, disableOnInteraction: false }}
//                 loop={true}
//                 onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                 className="h-100"
//               >
//                 {sliderData.map((slide, index) => (
//                   <SwiperSlide key={index}>
//                     <div
//                       className={`p-4 h-100 ${slide.bgClass}`}
//                       style={{ borderLeft: `5px solid ${slide.color}` }}
//                     >
//                       <div className="row align-items-center">
//                         <div className="col-auto">
//                           <div
//                             className="bg-white rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm"
//                             style={{
//                               width: "70px",
//                               height: "70px",
//                               color: slide.color
//                             }}
//                           >
//                             {slide.icon}
//                           </div>
//                         </div>

//                         <div className="col">
//                           <h3 className="fw-bold h4 mb-2" style={{ color: slide.color }}>
//                             {slide.title}
//                           </h3>
//                           <p className="mb-3 text-secondary">{slide.description}</p>
//                           <button
//                             className="btn text-white px-4"
//                             style={{
//                               backgroundColor: slide.color,
//                               transition: "all 0.3s ease"
//                             }}
//                             onMouseOver={(e) => {
//                               e.currentTarget.style.transform = "translateY(-2px)";
//                               e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
//                             }}
//                             onMouseOut={(e) => {
//                               e.currentTarget.style.transform = "translateY(0)";
//                               e.currentTarget.style.boxShadow = "none";
//                             }}
//                           >
//                             REDEEM NOW
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>
//         </div>

//         {/* QR Code Section */}
//         <div className="col-lg-3">
//           <div className="card border-0 shadow-sm h-50">
//             <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
//               <div className="mb-3 text-center">
//                 <div className="bg-light rounded-circle p-3 d-flex  align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
//                   <FaQrcode size={24} />
//                 </div>
//                 <h5 className="fw-bold mb-1">Scan For Menu</h5>
//                 <p className="text-muted small">Get exclusive offers</p>
//               </div>

//               <div className="col-lg-2 col-md-12 mt-4 mt-lg-0">
//                 <div className="discount-qr bg-light rounded-lg shadow-sm border text-center d-flex flex-column justify-content-center align-items-center">
//                   {qrCode && (
//                     <div className="qr-code-container">

//                       <iframe
//                         src={qrCode?.data?.qr_code_url}
//                         width="94%"
//                         height="270px"
//                       />
//                     </div>
//                   )}
//                   {/* <p className="fw-bold mb-0">Scan For Menu</p>
//             <small className="text-muted">Get exclusive offers</small> */}
//                 </div>
//               </div>


//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscountSlider;
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
        {/* Offers Section */}
        <div className="col-lg-9 mb-4 mb-lg-0">
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
          <div className=" text-center">
                <div className="bg-light rounded-circle d-flex  align-items-center justify-content-center mx-auto " style={{ width: "60px", height: "35px" }}>
                  <FaQrcode size={24} />
                </div>
                <h5 className="fw-bold mb-1">Scan For Menu</h5>
                
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
            {/* <p className="fw-bold mb-0">Scan For Menu</p>
            <small className="text-muted">Get exclusive offers</small> */}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default DiscountSlider;