import { IAuthState, IUserInfo } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  userInfo: {
    name: "",
    email: "",
    profilePic: "",
    id: "",
  }, // for user object
  userToken: null, // for storing the JWT
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state: IAuthState,
      {
        payload: { userdata, token },
      }: { payload: { userdata: IUserInfo; token: string | null } }
    ) => {
      state.userInfo = userdata;
      state.userToken = token;
    },
    logout: (state: IAuthState) => {
      state.userInfo = {
        name: "",
        email: "",
        profilePic: "",
        id: "",
      };
      state.userToken = null;
      state.success = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
