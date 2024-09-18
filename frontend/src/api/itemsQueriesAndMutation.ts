import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KYES } from "./userQueriesAndMutation";
import {
  addItemToRent,
  changeRentalStatus,
  deleteItem,
  fetchCategoryDetails,
  fetchItemById,
  fetchItems,
  fetchItemsListedByUser,
  fetchItemsRentedByUser,
  fetchRentalDetailsOfItemById,
  markItemAsReceived,
  searchItems,
  submitItem,
} from "./itemsApi";

// const queryClient = new QueryClient();

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
      console.log(
        "fkjdsalkfgjasldk;jfglk;asdjflk;asdjflk;asjdlkfjasdlk;fjasdlk"
      );
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems],
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

export const useChangeRentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeRentalStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems],
      });
    },
  });
};

export const useSearchItems = (search: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.searchItems, search],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: () => searchItems(search),
  });
};

export const useGetItemsListedByUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.getItems, QUERY_KYES.getItemsListedByUser, userId],
    staleTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: () => fetchItemsListedByUser(userId),
  });
};

export const useGetRentalDetailsByItemId = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.getItems, QUERY_KYES.rentDetailsById, id],
    queryFn: () => fetchRentalDetailsOfItemById(id),
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KYES.getItems],
      });
    },
  });
};
