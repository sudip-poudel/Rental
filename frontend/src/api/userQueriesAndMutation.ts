import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCurrentUserDetails,
  fetchUserDetailsById,
  handleForgetPassword,
  handleUpdatePassword,
  loginUser,
  logoutUser,
  signupUser,
  updateUserAvatar,
} from "./userApi";
import { logout, setUser } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export enum QUERY_KYES {
  getCategory = "CATEGORY",
  user = "USER",
  getItems = "ITEMS",
  userDetails = "USER_DETAILS",
  getItemById = "ITEM_BY_ID",
  getItemsRentedByUser = "ITEMS_RENTED_BY_USER",
  searchItems = "SEARCH_ITEMS",
  getItemsListedByUser = "ITEMS_LISTED_BY_USER",
  rentDetailsById = "RENT_DETAILS_BY_ID",
}

const queryClient = new QueryClient();
//TODO handle the auth state
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      const data = await fetchCurrentUserDetails();
      const authState: {
        userdata: { id: string; name: string; email: string };
      } = {
        userdata: { id: data.id, name: data.name, email: data.email },
      };
      console.log(authState, "fasdfasd");
      dispatch(setUser(authState));
      navigate("/");
    },
  });
};

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: async () => {
      const data = await fetchCurrentUserDetails();
      const authState: {
        userdata: { id: string; name: string; email: string };
      } = {
        userdata: { id: data.id, name: data.name, email: data.email },
      };
      console.log(authState, "fasdfasd");

      dispatch(setUser(authState));

      navigate("/");
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const response = await logoutUser();
      if (response.success) {
        dispatch(logout());
        navigate("/login");
      }
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await handleForgetPassword(email);
      return response;
    },
  });
};

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: { password: string; token: string }) => {
      const response = await handleUpdatePassword(data.password, data.token);

      return response;
    },
    onSuccess: () => {
      navigate("/signin");
    },
  });
};

export const useUpdateUserAvatar = () => {
  return useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KYES.userDetails] });
    },
  });
};

export const useGetCurrentUserDetails = () => {
  return useQuery({
    queryKey: [QUERY_KYES.userDetails, QUERY_KYES.user],
    queryFn: fetchCurrentUserDetails,
  });
};

export const useGetUserDetailsById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KYES.userDetails, userId],
    queryFn: () => fetchUserDetailsById(userId),
  });
};
