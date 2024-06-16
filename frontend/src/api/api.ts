import { ILoginData, ISignupData } from "@/types/types";
import axios, { AxiosResponse } from "axios";

const fetchUserDetails = async (data) => {
  const response: AxiosResponse<string> = await axios.get(
    `${import.meta.env.VITE_API_URL}/user/${data.id}`
  );
  console.log(response);
};

const signupUser = async (data: ISignupData) => {
  try {
    const response: AxiosResponse<string> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      data,
      {
        withCredentials: true,
      }
    );
    const returnData = {
      message: response.data,
      status: response.status,
    };
    return returnData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.message,
        status: error.response?.status || 500,
      };
    } else {
      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
};

const loginUser = async (data: ILoginData) => {
  try {
    const response: AxiosResponse<string> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/login`,
      data,
      {
        withCredentials: true,
      }
    );

    const userData = {
      message: response.data,
      status: response.status,
    };
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.message,
        status: error.response?.status || 500,
      };
    } else {
      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
};

const logoutUser = async () => {
  try {
    const response: AxiosResponse<string> = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/logout`,
      {
        withCredentials: true,
      }
    );
    const result = {
      message: response.data,
      status: response.status,
    };
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.message,
        status: error.response?.status || 500,
      };
    } else {
      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
};

export { fetchUserDetails, signupUser, loginUser, logoutUser };
