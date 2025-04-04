import React, { useCallback, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Testimonial.css"; 
import {
  photo2,
  photo13,
  photo14,
  photo5,
  photo7,
  photo8,
} from '../../../assets/index';

const Testimonial = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const testimonials = [
    {
      image: photo8,
      reviewImg: photo2,
      reviewAlt: "lineicon",
      details: "Velit est sit voluptas eum sapiente omnis! Porro, impedit minus quam reprehenderit tempore sint quaerat id! Mollitia perspiciatis est asperiores commodi labore!",
      name: "Larry Diamond",
      position: "Chief Executive Officer."
    },
    {
      image: photo5,
      reviewImg: photo7,
      reviewAlt: "lineicon",
      details: "Bootstrap made our redesign process so much easier! The responsive grid system and pre-built components saved us weeks of development time.",
      name: "Sarah Johnson",
      position: "Product Manager"
    },
    {
      image: photo14,
      reviewImg: photo13,
      reviewAlt: "lineicon",
      details: "The documentation and community support for Bootstrap are outstanding. Whenever we hit a roadblock, solutions were just a quick search away.",
      name: "Michael Chen",
      position: "Lead Developer"
    }
  ];

  return (
    <section className="bg-light py-3" id="testimonial">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8 text-center">
            <h2 className="fw-bold mb-3">What Our Customers Say</h2>
            <p className="text-muted">Discover why our Customers love our Servicing</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 position-relative testimonial-container p-2">
            <Swiper
              slidesPerView={1}
              ref={sliderRef}
              onSlideChange={handleSlideChange}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <SingleTestimonial {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="d-flex justify-content-center mt-4">
              <div className="testimonial-pagination">
                {testimonials.map((_, index) => (
                  <span
                    key={index}
                    className={`testimonial-bullet ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => sliderRef.current.swiper.slideTo(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-primary rounded-circle p-3" onClick={handlePrev}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="btn btn-outline-primary rounded-circle p-3" onClick={handleNext}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

const SingleTestimonial = ({ image, reviewImg, reviewAlt, details, name, position }) => {
  return (
    <div className="card border-0 shadow-sm testimonial-card">
      <div className="row g-0 ">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start testimonial-image" alt="testimonial" />
        </div>
        <div className="col-md-8">
          <div className="card-body py-4 p-0">
            <div className="d-flex align-items-center mb-3">
              <img src={reviewImg} alt={reviewAlt} width="30" height="30" className="me-2" />
              <div className="testimonial-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-warning">★</span>
                ))}
              </div>
            </div>
            <p className="card-text fst-italic mb-4">{details}</p>
            <h5 className="card-title fw-bold mb-1">{name}</h5>
            <p className="card-text text-muted">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;