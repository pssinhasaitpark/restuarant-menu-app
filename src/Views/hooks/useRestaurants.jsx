import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios/axios';

const fetchRestaurants = async () => {
  const response = await axiosInstance.get('/restaurant');
  return response.data.data; 
};

const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
  });
};

export default useRestaurants;
