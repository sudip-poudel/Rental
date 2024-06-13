import { ISignupData } from "@/types/types";
import axios, { AxiosResponse } from "axios";

const fetchUserDetails = async (data) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/user/${data.id}`
  );
};

const signupUser = async (data: ISignupData) => {
  try {
    console.log(`${import.meta.env.VITE_API_URL}/user/signup`);

    const response: AxiosResponse<string> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const loginUser = () => {};

const logoutUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/logout`,
      {
        withCredentials: true,
      }
    );
    return {
      message: response.data,
      status: response.status,
    };
  } catch (error) {
    return error;
  }
};

export { fetchUserDetails, signupUser, loginUser, logoutUser };
