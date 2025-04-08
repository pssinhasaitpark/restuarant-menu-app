import React from 'react';
import { r1, r2, r3, r4, r5, r6, r7, r8 } from '../../../assets/index';
import './NewLaunch.css';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NewLaunch = () => {
  const newRestr = [
    { name: "Launch 1", image: r1 },
    { name: "Launch 2", image: r2 },
    { name: "Launch 3", image: r3 },
    { name: "Launch 4", image: r4 },
    { name: "Launch 5", image: r5 },
    { name: "Launch 6", image: r6 },
    { name: "Launch 7", image: r7 },
    { name: "Launch 8", image: r8 },
  ];

  return (
    <div className='container mt-5'id="launch">
      <h2 className="all-heading mb-4 text-center underline">Explore New Launch</h2>
      <div className='row row-cols-2 '>
        {newRestr.slice(0, 6).map((launch, index) => (
          <div className='col-sm-2 mb-4 testimonial-card' key={index}>
            <div className='text-center'>
              <Link to="/menu">
                <img src={launch.image} alt={launch.name} className='launch-res' />
              </Link>
              <p className='fs-6'>{launch.name}</p>
            </div>
          </div>
        ))}
      </div>
      {newRestr.length > 6 && (
       <div className='text-center'>
       <Link to="/allresturant" className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mt-2 text-decoration-none'>
         View More <FaArrowRight className='ms-2' />
       </Link>
     </div>
      )}
    </div>
  );
};

export default NewLaunch;
