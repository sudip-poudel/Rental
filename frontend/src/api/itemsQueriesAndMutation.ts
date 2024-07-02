import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KYES } from "./userQueriesAndMutation";
import { fetchCategoryDetails, submitItem } from "./itemsApi";

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
