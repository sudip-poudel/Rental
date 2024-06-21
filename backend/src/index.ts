import { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const multer = require("multer");
const fs = require('fs');

const app = express();




app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/user", require("./route/userRoute"));
app.use("/item", require("./route/itemsRoute"));

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World home!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
