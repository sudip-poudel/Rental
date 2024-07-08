import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KYES } from "./userQueriesAndMutation";
import {
  fetchCategoryDetails,
  fetchItemById,
  fetchItems,
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
