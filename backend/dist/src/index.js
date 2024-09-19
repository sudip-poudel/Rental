"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "https://rental-ruby.vercel.app",
];
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://rental-ruby.vercel.app"],
//     credentials: true,
//     methods: "GET, POST, PUT, DELETE",
//   })
// );
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cookieParser());
app.use(express.json());
app.options("*", cors());
app.use("/user", require("./route/userRoute"));
app.use("/item", require("./route/itemsRoute"));
// app.use(errorHandler);
app.get("/", (req, res) => {
    res.send("Hello World home!");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
