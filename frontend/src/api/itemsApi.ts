import {
  ICategoryType,
  IItemDetailsResponse,
  IItemResponse,
  INormalResponse,
  IRentDetails,
  IRentDetailsByIdResponse,
  IRentDetailsResponse,
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
    console.log(result);

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

//TODO add type def and fix this
const addItemToRent = async (data: IRentDetails) => {
  console.log(data, "fisdahkljf");
  const response: AxiosResponse<IItemDetailsResponse> = await axios.post(
    `${import.meta.env.VITE_API_URL}/item/rentitem`,
    data
  );
  const result = response.data;
  return result;
};
const fetchItemsRentedByUser = async (userId: string) => {
  try {
    const response: AxiosResponse<IRentDetailsResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/renteditems/${userId}`
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
const markItemAsReceived = async (rentId: string) => {
  try {
    const response: AxiosResponse<INormalResponse> = await axios.post(
      `${import.meta.env.VITE_API_URL}/item/rentitem/changestatus`,
      { rentId, rentStatus: "rented" }
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

const changeRentalStatus = async ({
  rentId,
  rentStatus,
}: {
  rentId: string;
  rentStatus: string;
}) => {
  try {
    const response: AxiosResponse<INormalResponse> = await axios.post(
      `${import.meta.env.VITE_API_URL}/item/rentitem/changestatus`,
      { rentId, rentStatus }
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

const searchItems = async (search: string) => {
  try {
    const response: AxiosResponse<IItemResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/search/${search}`
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

const fetchItemsListedByUser = async (userId: string) => {
  try {
    const response: AxiosResponse<IItemResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/itemlisted/${userId}`
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

const fetchRentalDetailsOfItemById = async (itemId: string) => {
  try {
    const response: AxiosResponse<IRentDetailsByIdResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/rentaldetail/${itemId}`
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

const deleteItem = async (id: string) => {
  try {
    const response: AxiosResponse<INormalResponse> = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/deleteitem/${id}`
    );
    const result = response.data;
    console.log(result);

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
  fetchCategoryDetails,
  submitItem,
  fetchItems,
  fetchItemById,
  addItemToRent,
  fetchItemsRentedByUser,
  markItemAsReceived,
  searchItems,
  changeRentalStatus,
  fetchItemsListedByUser,
  fetchRentalDetailsOfItemById,
  deleteItem,
};
