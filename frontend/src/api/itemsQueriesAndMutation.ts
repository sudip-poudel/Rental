import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KYES } from "./userQueriesAndMutation";
import {
  addItemToRent,
  fetchCategoryDetails,
  fetchItemById,
  fetchItems,
  fetchItemsRentedByUser,
  markItemAsReceived,
  searchItems,
  submitItem,
} from "./itemsApi";

const queryClient = new QueryClient();

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QUERY_KYES.getCategory],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: fetchCategoryDetails,
    throwOnError: true,
  });
};

export const useAddItem = () => {
  return useMutation({
    mutationFn: submitItem,
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
    queryKey: [QUERY_KYES.getItemById, id],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: () => fetchItemById(id),
  });
};

export const useRentItem = () => {
  return useMutation({
    mutationFn: addItemToRent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems, QUERY_KYES.getItemById],
      });
    },
  });
};

export const useGetItemsRentedByUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.getItemsRentedByUser, userId, QUERY_KYES.getItems],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: () => fetchItemsRentedByUser(userId),
  });
};
export const useMarkItemAsReceived = () => {
  return useMutation({
    mutationFn: markItemAsReceived,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItemsRentedByUser, QUERY_KYES.getItems],
      });
    },
  });
};

export const useSearchItems = (search: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.searchItems],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: () => searchItems(search),
  });
};
