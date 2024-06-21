import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutUser, signupUser } from "./api";
import getUserCookies from "@/helpers/getUserCookie";
import { logout, setUser } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      const authState: {
        token: string;
        userdata: { id: string; name: string; email: string };
      } = {
        token: getUserCookies().token,
        userdata: JSON.parse(decodeURIComponent(getUserCookies().userdata)),
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
    onSuccess: () => {
      const authState: {
        token: string;
        userdata: { id: string; name: string; email: string };
      } = {
        token: getUserCookies().token,
        userdata: JSON.parse(decodeURIComponent(getUserCookies().userdata)),
      };
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
