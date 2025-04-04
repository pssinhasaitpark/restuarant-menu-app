
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axios/axios';

const bookTable = async (bookingData) => {
  const response = await axiosInstance.post('/booking', bookingData);
  return response.data; 
};

const useBookTables = () => {
  return useMutation({
    mutationFn: bookTable, 
    onSuccess: (data) => {
      console.log('Booking successful:', data);
      alert(data.message);
    },
    onError: (error) => {
      console.error('Booking failed:', error);
      alert('An error occurred while booking the table.');
    },
  });
};

export default useBookTables;
