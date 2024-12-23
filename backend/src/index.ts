import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://rental-ruby.vercel.app"],
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(cookieParser());
app.use(express.json());
// app.options("*", cors());
app.use("/user", require("./route/userRoute"));
app.use("/item", require("./route/itemsRoute"));

// app.use(errorHandler);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World home!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
