import React, { useState, useEffect } from "react";
import { Menus } from "../../Pages/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMenuByRestaurantId } from "../../Redux/Slice/menuSlice/menuSlice";
import { fetchQRCode } from "../../Redux/Slice/QrSlice/QrSlice";
import { useRestaurants } from "../../hooks";
import {
  Navbarcompo,
  RestrGallery,
  Footer,
  BookTable,
  DiscountSlider,
} from "../../Components/index";

const MenusLayout = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { data: restaurants } = useRestaurants();
  const restaurant = restaurants?.find((rest) => rest.id === restaurantId);
  const qrCode = useSelector((state) => state.qr.qrCode);

  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  const handleAddMenuItem = (item) => {
    setSelectedMenuItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleRemoveMenuItem = (itemId) => {
    setSelectedMenuItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleUpdateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveMenuItem(itemId);
    } else {
      setSelectedMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchMenuByRestaurantId(restaurantId));
      dispatch(fetchQRCode(restaurantId));
    }
  }, [dispatch, restaurantId]);

  if (!restaurant) return <div className="spinner"></div>;

  return (
    <div>
      <Navbarcompo />
      <RestrGallery restaurant={restaurant} />
      <DiscountSlider qrCode={qrCode} />
      <Menus
        restaurantId={restaurantId}
        onAddMenuItem={handleAddMenuItem}
        selectedMenuItems={selectedMenuItems}
        onRemoveMenuItem={handleRemoveMenuItem}
        onUpdateItemQuantity={handleUpdateItemQuantity}
      />
      <BookTable
        restaurantId={restaurantId}
        selectedMenuItems={selectedMenuItems}
      />
      <Footer />
    </div>
  );
};

export default MenusLayout;



// import React, { useEffect } from 'react';
// import { Menus } from '../../Pages/index';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchMenuByRestaurantId } from '../../Redux/Slice/menuSlice/menuSlice'
// import { useRestaurants } from '../../hooks';
// import { Navbarcompo, RestrGallery, Footer, BookTable, DiscountSlider } from '../../Components/index';

// const MenusLayout = () => {
//   const { restaurantId } = useParams();
//   const dispatch = useDispatch();
//   const { data: restaurants } = useRestaurants();
//   // const menu = useSelector((state) => state.menu.categories);
//   const restaurant = restaurants?.find((rest) => rest.id === restaurantId);

//   useEffect(() => {
//     if (restaurantId) {
//       dispatch(fetchMenuByRestaurantId(restaurantId));
//     }
//   }, [dispatch, restaurantId]);

//   if (!restaurant) return <div>Loading restaurant details...</div>;

//   return (
//     <div>
//       <Navbarcompo />
//       <RestrGallery restaurant={restaurant} />
//       <DiscountSlider />
//       <Menus restaurantId={restaurantId}  />
//       {/* <Menus restaurantId={restaurantId}  menu={menu} /> */}
//       <BookTable />
//       <Footer />
//     </div>
//   );
// };

// export default MenusLayout;

// import React from 'react';
// import { Menus } from '../../Pages/index';
// import { Navbarcompo, RestrGallery, Footer, BookTable, DiscountSlider } from '../../Components/index';
// import { useParams } from 'react-router-dom';

// const MenusLayout = () => {
//   const { restaurantId } = useParams();

//   return (
//     <div>
//       <Navbarcompo />
//       <RestrGallery />
//       <DiscountSlider />
//       <Menus restaurantId={restaurantId} />
//       <BookTable />
//       <Footer />
//     </div>
//   );
// };

// export default MenusLayout;
