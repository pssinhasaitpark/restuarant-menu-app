import React, { useEffect } from 'react';
import { Menus } from '../../Pages/index';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenuByRestaurantId } from '../../Redux/Slice/menuSlice/menuSlice';

const QrMenuLayout = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchMenuByRestaurantId(restaurantId));
    }
  }, [dispatch, restaurantId]);

  return (
    <div>
      <Menus restaurantId={restaurantId} />
    </div>
  );
};

export default QrMenuLayout;
