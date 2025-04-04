import React from 'react';
import {
    photo2,
    photo13,
    photo14,
    photo5,
    photo7,
    photo8,
} from '../../../assets/index';
import { Link } from 'react-router-dom';

const restaurants = [
    {
        id: 1,
        name: 'Gourmet Bistro',
        image: photo2,
        description: 'Experience the best dishes at Gourmet Bistro.',
        services: 'We offer online booking, takeaway, and home delivery services.'
    },
    {
        id: 2,
        name: 'Taste Haven',
        image: photo13,
        description: 'Taste Haven brings you delightful culinary experiences.',
        services: 'Enjoy online booking, dine-in, and catering options.'
    },
    {
        id: 3,
        name: 'Savory Spot',
        image: photo14,
        description: 'Discover delicious meals at Savory Spot.',
        services: 'We provide online booking and takeaway services.'
    },
    {
        id: 4,
        name: 'Culinary Corner',
        image: photo5,
        description: 'Join us at Culinary Corner for a memorable dining experience.',
        services: 'Offering home delivery and dine-in services.'
    },
    {
        id: 5,
        name: 'Epicurean Delights',
        image: photo7,
        description: 'Savor exquisite flavors at Epicurean Delights.',
        services: 'We have online booking, catering, and takeaway options available.'
    },
    {
        id: 6,
        name: 'Flavor Fiesta',
        image: photo8,
        description: 'Flavor Fiesta serves a variety of mouthwatering dishes.',
        services: 'Enjoy home delivery and dine-in services.'
    },
];

const ServiceRestro = () => {

    return (
        <div className='container mt-5' id="services">
            <h2 className="all-heading mb-4 text-center underline">Our Services</h2>
            <div className="row ">
                {restaurants.map((restaurant) => (
                    <div className="col-sm-6 col-md-4 mb-4" key={restaurant.id}>
                        <div className="card" style={{ height: "24rem" }} >
                            <img
                                src={restaurant.image}
                                className="card-img-top object-fit-cover"
                                style={{ height: "12rem" }}
                                alt={restaurant.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text">{restaurant.description}</p>
                                <p><strong>Services:</strong> {restaurant.services}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceRestro;
