import { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { getcat, insertCategory } from "./seed";
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://rental-ruby.vercel.app"],
    credentials: true,
    METHODS: "GET, POST, PUT, DELETE",
  })
);
app.use(cookieParser());
app.use(express.json());
app.options("*", cors());
app.use("/user", require("./route/userRoute"));
app.use("/item", require("./route/itemsRoute"));

// app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World home!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
