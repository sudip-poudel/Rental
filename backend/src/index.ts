import { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/user", require("./route/userRoute"));
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World home!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
