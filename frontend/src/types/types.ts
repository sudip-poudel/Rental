import { DateRange } from "react-day-picker";

export type IUserInfo = {
  name: string;
  email: string;
  profilePic?: string;
  id: string;
};

export type IAuthState = {
  userInfo: IUserInfo;
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
  description: string;
  rentalPeriod: DateRange | undefined;
  pickupLocation: {
    location: string;
    latitude: number;
    longitude: number;
  };
  specialInstructions: string;
  initialDeposit: number;
  agreement: boolean;
  liabilityWaiver: boolean;
};

export type ICategoryType = {
  id: string;
  name: string;
};

export type SearchResultItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  created_at: Date;
  rate: number;
  pricture_url: string;
  initial_deposit: number;
  added_by: string;
};
export type IUserDetails = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  rating: number;
  role: "admin" | "user" | null;
  profileUrl: string | null;
  totalGivenRent: number | null;
  totalTakenRent: number | null;
};
export type IUserDetailsResponse = {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    rating: number;
    role: "admin" | "user";
    profileUrl: string | null;
    totalGivenRent: number | null;
    totalTakenRent: number | null;
  };
};

export type IUserProfileDetails = {
  name: string;
  email: string;
  created_at: Date;
  role: "admin" | "user";
};

export type ILocationSearchResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};

export type IGeoLocationResponse = {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string | null;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
};

export type IItem = {
  item: {
    itemStatus: "available" | "inrent" | "unavailable";
    id: string;
    created_at: Date;
    title: string;
    description: string;
    category: string;
    rate: number;
    pictureUrl: string[];
    initialDeposit: number | null;
    addedBy: string;
  };
  item_location: {
    id: string;
    location: string;
    itemId: string;
    latitude: number;
    longitude: number;
  };
};

export type IItemResponse = {
  success: boolean;
  data: IItem[];
};
export type IItemDetailsResponse = {
  success: boolean;
  data: IItem;
};

export type IRentDetails = {
  id?: string;
  item: string;
  rate: number;
  rentStart: Date;
  rentEnd: Date;
  rentedBy: string;
  status:
    | "requested"
    | "requestAccepted"
    | "requestRejected"
    | "rented"
    | "returnRequested"
    | "returnAccepted"
    | "returnRejected"
    | "returned";
  initialDeposit: number;
};
export type IRentDetailsResponse = {
  success: boolean;
  data: IRentDetails[];
};
export type IRentDetailsByIdResponse = {
  success: boolean;
  data: IRentDetails;
};
export type INormalResponse = {
  success: boolean;
  message: string;
};
