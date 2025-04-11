import React, { useEffect } from "react";
import { Menus } from "../../Pages/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMenuByRestaurantId } from "../../Redux/Slice/menuSlice/menuSlice";
import { fetchQRCode } from "../../Redux/Slice/QrSlice/QrSlice";
import { useRestaurants } from "../../hooks";
import {
  addOrUpdateItem,
  removeItem,
  updateItemQuantity,
} from "../../Redux/Slice/menuCartSlice/menuCartSlice";
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
  const selectedMenuItems = useSelector(
    (state) => state.menuCart.selectedMenuItems
  );

  const handleAddMenuItem = (item) => {
    dispatch(addOrUpdateItem(item));
  };

  const handleRemoveMenuItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleUpdateItemQuantity = (itemId, newQuantity) => {
    dispatch(updateItemQuantity({ itemId, quantity: newQuantity }));
  };
  const clearSelectedMenuItems = () => {
    dispatch({ type: 'menuCart/clearCart' }); 
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
        setSelectedMenuItems={clearSelectedMenuItems}
        openingTime={restaurant?.opening_time}
        closingTime={restaurant?.closing_time}
      />
      <Footer />
    </div>
  );
};

export default MenusLayout;



// import React, { useState, useEffect } from "react";
// import { Menus } from "../../Pages/index";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchMenuByRestaurantId } from "../../Redux/Slice/menuSlice/menuSlice";
// import { fetchQRCode } from "../../Redux/Slice/QrSlice/QrSlice";
// import { useRestaurants } from "../../hooks";
// import {
//   Navbarcompo,
//   RestrGallery,
//   Footer,
//   BookTable,
//   DiscountSlider,
// } from "../../Components/index";

// const MenusLayout = () => {
//   const { restaurantId } = useParams();
//   const dispatch = useDispatch();
//   const { data: restaurants } = useRestaurants();
//   const restaurant = restaurants?.find((rest) => rest.id === restaurantId);
//   const qrCode = useSelector((state) => state.qr.qrCode);

//   const [selectedMenuItems, setSelectedMenuItems] = useState([]);

//   const handleAddMenuItem = (item) => {
//     setSelectedMenuItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: item.quantity } : i
//         );
//       } else {
//         return [...prevItems, item];
//       }
//     });
//   };

//   const handleRemoveMenuItem = (itemId) => {
//     setSelectedMenuItems((prevItems) =>
//       prevItems.filter((item) => item.id !== itemId)
//     );
//   };

//   const handleUpdateItemQuantity = (itemId, newQuantity) => {
//     if (newQuantity <= 0) {
//       handleRemoveMenuItem(itemId);
//     } else {
//       setSelectedMenuItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === itemId ? { ...item, quantity: newQuantity } : item
//         )
//       );
//     }
//   };

//   useEffect(() => {
//     if (restaurantId) {
//       dispatch(fetchMenuByRestaurantId(restaurantId));
//       dispatch(fetchQRCode(restaurantId));
//     }
//   }, [dispatch, restaurantId]);

//   if (!restaurant) return <div className="spinner"></div>;

//   return (
//     <div>
//       <Navbarcompo />
//       <RestrGallery restaurant={restaurant} />
//       <DiscountSlider qrCode={qrCode} />
//       <Menus
//         restaurantId={restaurantId}
//         onAddMenuItem={handleAddMenuItem}
//         selectedMenuItems={selectedMenuItems}
//         onRemoveMenuItem={handleRemoveMenuItem}
//         onUpdateItemQuantity={handleUpdateItemQuantity}
//       />
//       <BookTable
//         restaurantId={restaurantId}
//         selectedMenuItems={selectedMenuItems}
//       />
//       <Footer />
//     </div>
//   );
// };

// export default MenusLayout;

