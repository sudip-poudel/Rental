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
