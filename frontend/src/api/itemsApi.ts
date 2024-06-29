import { ICategoryType } from "@/types/types";
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

export { fetchCategoryDetails };
