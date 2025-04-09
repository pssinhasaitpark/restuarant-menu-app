import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BannerSlide.css';
import { FaArrowRight } from 'react-icons/fa';
import {
    photo,
    photo2,
    photo12,
    photo18,
    photo5,
    photo7,
    photo8,
    photo9,
    photo10,
    photo11
} from '../../../assets/index';

const BannerSlide = () => {
    const imagesWithNames = [
        { src: photo, name: 'Food Item 1' },
        { src: photo2, name: 'Food Item 2' },
        { src: photo12, name: 'Food Item 3' },
        { src: photo18, name: 'Food Item 4' },
        { src: photo5, name: 'Food Item 5' },
        { src: photo7, name: 'Food Item 6' },
        { src: photo8, name: 'Food Item 7' },
        { src: photo9, name: 'Food Item 8' },
        { src: photo10, name: 'Food Item 9' },
        { src: photo11, name: 'Food Item 10' },
    ];

    return (
        <Container className="banner-slider-container px-0 mt-5">
            <h2 className="all-heading mb-4 text-center underline">Choose by Food</h2>
            <div className="slider-row">
                <div className="slider-track">
                    {[...imagesWithNames, ...imagesWithNames].map((item, index) => (
                        <div className="slider-item " key={`first-${index}`}>
                            <img
                                src={item.src}
                                alt={`Food item ${index + 1}`}
                                className="slider-image"
                            />
                            <p className="image-name fs-5">{item.name}</p>
                        </div>
                    ))}
                </div>
                {imagesWithNames.length > 8 && (
                    <div className='text-center mt-5'>
                        <Link to="/allresturant" className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-decoration-none' >
                            View More <FaArrowRight className='ms-2' />
                        </Link>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default BannerSlide;
