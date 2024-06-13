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
console.log("hasjdfsd");

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
      console.log("fhsadjfkjads");

      state.userInfo = userdata;
      state.userToken = token;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
