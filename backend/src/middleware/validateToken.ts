import { NextFunction, Request, Response } from "express";
import { FRONTEND_URL, JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  console.log(token);

  if (!token) {
    console.log(token);

    res.redirect(`${FRONTEND_URL}/signin`);
  }
  const decoded = jwt.verify(token, JWT_SECRET as string);
  console.log(decoded);

  if (!decoded) {
    return res.status(401).send({ success: false, messege: "Unauthorized" });
  }
  req.params.userId = (decoded as { id: string }).id;
  console.log(decoded);

  next();
};

export default validateToken;
