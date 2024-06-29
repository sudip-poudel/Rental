import { DateRange } from "react-day-picker";

export type IUserInfo = {
  name: string;
  email: string;
  profilePic?: string;
  id: string;
};

export type IAuthState = {
  userInfo: IUserInfo;
  userToken: string | null;
  success: boolean;
};

export type ISignupData = {
  name: string;
  email: string;
  password: string;
  profilePic?: string;
};
export type RootState = {
  auth: IAuthState;
};
export type ILoginData = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  success: boolean;
  message: string;
};

export type IFormData = {
  title: string;
  category: string;
  rate: number;

  photos: File[];
  // Add other fields as needed
  description: string;
  rentalPeriod: DateRange | undefined;
  // availabilityDates: string;
  pickupLocation: {
    location: string;
    latitude: number;
    longitude: number;
  };
  specialInstructions: string;
  agreement: boolean;
  liabilityWaiver: boolean;
};

export type ICategoryType = {
  id: string;
  name: string;
};
