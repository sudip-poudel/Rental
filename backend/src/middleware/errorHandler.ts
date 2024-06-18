const express = require("express");
import { NextFunction, Request, Response } from "express";

const app = express();

// class of custom error
class MyCustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MyCustomError";
  }
}
// Error handler function
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof MyCustomError) {
    return res.status(500).json({
      error: "Custom Error: Something went wrong",
    });
  } else if (err instanceof TypeError) {
    return res.status(400).json({ error: "Type Error: Bad request" });
  } else {
    // res.status(500).json({ error: "Internal Server Error" });
  }
};
export { errorHandler };
