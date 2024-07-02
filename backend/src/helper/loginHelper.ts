import { Response } from "express";
import { generateToken } from "./generateToken";
import { BACKEND_URL } from "../config";

export const loginHelper = (
  user: {
    id: string;
    name: string;
    email: string;
  },
  res: Response
) => {
  const token = generateToken({ id: user.id });
  const stringifiedUserData = JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: ".rental-backend-five.vercel.app",
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.cookie("userdata", stringifiedUserData, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: ".rental-backend-five.vercel.app",
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return { success: true };
};
