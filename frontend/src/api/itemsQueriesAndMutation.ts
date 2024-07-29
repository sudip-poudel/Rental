import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KYES } from "./userQueriesAndMutation";
import {
  addItemToRent,
  fetchCategoryDetails,
  fetchItemById,
  fetchItems,
  fetchItemsRentedByUser,
  markItemAsReceived,
  markItemAsReturnRequested,
  submitItem,
} from "./itemsApi";

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QUERY_KYES.getCategory],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: fetchCategoryDetails,
    throwOnError: true,
  });
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems],
      });
    },
  });
};

export const useGetItems = () => {
  return useQuery({
    queryKey: [QUERY_KYES.getItems],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: fetchItems,
    throwOnError: true,
  });
};

export const useGetItemById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.getItems, id],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: () => fetchItemById(id),
  });
};

export const useRentItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addItemToRent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems, QUERY_KYES.getItemsRentedByUser],
      });
    },
  });
};

export const useGetItemsRentedByUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.getItems, QUERY_KYES.getItemsRentedByUser, userId],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: () => fetchItemsRentedByUser(userId),
  });
};
export const useMarkItemAsReceived = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markItemAsReceived,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems],
      });
    },
  });
};

export const useMarkItemAsReturnRequested = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markItemAsReturnRequested,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems, QUERY_KYES.getItemsRentedByUser],
      });
    },
  });
};
