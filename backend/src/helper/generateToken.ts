import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (data: { id: string }) => {
  const token = jwt.sign(data, process.env.JWT_SECRET as string);
  return token;
};
