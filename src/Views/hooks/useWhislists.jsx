import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../Redux/axios/axios';

const useWhislists = () => {
  const queryClient = useQueryClient();

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get('/restaurant/wishlist');
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  };

  const addToWishlist = async (id) => {
    try {
      const response = await axiosInstance.put(`/restaurant/wishlist/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const response = await axiosInstance.put(`/restaurant/wishlist/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  };

  const { data: wishlistData = [], isLoading, refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
    staleTime: 10000,
  });

  const mutation = useMutation({
    mutationFn: async ({ id, isFavorite }) => {
      return isFavorite ? removeFromWishlist(id) : addToWishlist(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      refetch();
    },
  });

  return {
    wishlistData,
    isLoading,
    mutate: mutation.mutate,
    refetch
  };
};

export default useWhislists;