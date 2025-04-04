import React, { useState } from 'react';
import { HeaderTop,BannerSlide,OurResturant, BookTable,Navbarcompo,NewLaunch,ServiceRestro,Testimonial,SupportCompo,Footer} from '../../Components/index'

const LandingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <Navbarcompo />
      <HeaderTop onLocationSelect={handleLocationSelect} />
      <OurResturant selectedLocation={selectedLocation} />
      <BannerSlide/>
      <NewLaunch/>
      <ServiceRestro/>
      <Testimonial/>
      <SupportCompo/>
      <Footer/>

    </div>
  );
};

export default LandingPage;
