import React from 'react';
import { Menus } from '../../Pages/index';
import { Navbarcompo, RestrGallery, Footer, BookTable, DiscountSlider } from '../../Components/index';
import { useParams } from 'react-router-dom';

const MenusLayout = () => {
  const { restaurantId } = useParams(); 
 

  return (
    <div>
      <Navbarcompo />
      <RestrGallery />
      <DiscountSlider />
      <Menus restaurantId={restaurantId} /> 
      <BookTable />
      <Footer />
    </div>
  );
};

export default MenusLayout;
