import { Request, Response } from "express";
import { db } from "./db";
import { errorHandler } from "./middleware/errorHandler";
const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/user", require("./route/userRoute"));
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World home!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
