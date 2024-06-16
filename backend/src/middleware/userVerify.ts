import { NextFunction, Request, Response } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies?.token) {
    next();
  }
  return res.status(401);
};

const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies?.token);

  if (!req.cookies?.token) {
    next();
  }
  return res.status(400);
};

export { isLoggedIn, isLoggedOut };
