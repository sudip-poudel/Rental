import {
  ICategoryType,
  ILoginData,
  ISignupData,
  IUserLoginResponse,
} from "@/types/types";
import axios, { AxiosResponse } from "axios";

const fetchUserDetails = async (data) => {
  const response: AxiosResponse<string> = await axios.get(
    `${import.meta.env.VITE_API_URL}/user/${data.id}`
  );
  console.log(response);
};

const signupUser = async (data: ISignupData) => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      data,
      {
        withCredentials: true,
      }
    );
    const returnData = response.data;
    return returnData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const loginUser = async (data: ILoginData) => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/login`,
      data,
      {
        withCredentials: true,
      }
    );

    const userData = response.data;

    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const logoutUser = async () => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/logout`,
      {
        withCredentials: true,
      }
    );
    const result = response.data;

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
//** Items API **//

const fetchCategoryDetails = async () => {
  try {
    const response: AxiosResponse<ICategoryType[]> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/getcategory`,
      {
        withCredentials: true,
      }
    );
    const result = response.data;

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export {
  fetchUserDetails,
  signupUser,
  loginUser,
  logoutUser,
  fetchCategoryDetails,
};
