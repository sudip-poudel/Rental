import { IAuthState, IUserInfo } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  userInfo: {
    name: "",
    email: "",
    profilePic: "",
    id: "",
  }, // for user object
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state: IAuthState,
      { payload: { userdata } }: { payload: { userdata: IUserInfo } }
    ) => {
      state.userInfo = userdata;
    },
    logout: (state: IAuthState) => {
      state.userInfo = {
        name: "",
        email: "",
        profilePic: "",
        id: "",
      };
      state.success = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
