import {
  ICategoryType,
  IItemDetailsResponse,
  IItemResponse,
} from "@/types/types";
import axios, { AxiosResponse } from "axios";

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

const fetchItems = async () => {
  try {
    const response: AxiosResponse<IItemResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/item`,
      {
        withCredentials: true,
      }
    );
    const result = response.data.data;
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const submitItem = async (fromPayload: FormData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/item/additem`,
      fromPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
const fetchItemById = async (id: string) => {
  try {
    const response: AxiosResponse<IItemDetailsResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/${id}`
    );
    const result = response.data.data;
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export { fetchCategoryDetails, submitItem, fetchItems, fetchItemById };
