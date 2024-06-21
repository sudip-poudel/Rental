import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ success: false, messege: "Please Login" });
  }
  const decoded = jwt.verify(token, JWT_SECRET as string);
  if (!decoded) {
    return res.status(401).send({ success: false, messege: "Unauthorized" });
  }
  req.body.userId = (decoded as { id: string }).id;
  next();
};

export default validateToken;
