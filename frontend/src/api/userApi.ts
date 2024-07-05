import {
  ILoginData,
  ISignupData,
  IUserDetailsResponse,
  IUserLoginResponse,
} from "@/types/types";
import axios, { AxiosResponse } from "axios";

const fetchCurrentUserDetails = async () => {
  try {
    const response: AxiosResponse<IUserDetailsResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getUserDetails`
    );
    const data = response.data.data;
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An Unknown Error Occored");
    }
  }
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
    console.log(returnData);

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
const handleForgetPassword = async (email: string) => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/forgetpassword`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const handleUpdatePassword = async (password: string, token: string) => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/updatepassword`,
      {
        password,
        token,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const updateUserAvatar = async (avatar: File) => {
  try {
    const formdata = new FormData();
    formdata.append("useravatar", avatar);
    const response: AxiosResponse<IUserLoginResponse> = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/updateavatar`,
      formdata,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export {
  fetchCurrentUserDetails,
  signupUser,
  loginUser,
  logoutUser,
  handleForgetPassword,
  handleUpdatePassword,
  updateUserAvatar,
};
