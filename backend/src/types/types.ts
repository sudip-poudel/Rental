export type IUserInfo = {
  name: string;
  email: string;
  password: string;
  created_at: Date;
  rating: number;
  role: "user" | "admin";
  profileUrl: string;
  totalGivenRent: number;
  totalTakenRent: number;
};

export type IItem = {
  title: string;
  description: string;
  category: string;
  created_at?: Date;
  rentStart: Date;
  rentEnd: Date;
  rate: number;
  pictureUrl: string[];
  initialDeposit: number;
  addedBy: string;
};
export type IItemRes = IItem & { id: string };
