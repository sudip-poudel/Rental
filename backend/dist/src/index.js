"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./middleware/errorHandler");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true,
    METHODS: "GET, POST, PUT, DELETE",
}));
app.use(express.json());
app.options("*", cors());
app.use("/user", require("./route/userRoute"));
app.use("/item", require("./route/itemsRoute"));
app.use(errorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Hello World home!");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
