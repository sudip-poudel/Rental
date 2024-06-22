"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ success: false, messege: "Please Login" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (!decoded) {
        return res.status(401).send({ success: false, messege: "Unauthorized" });
    }
    req.body.userId = decoded.id;
    next();
};
exports.default = validateToken;
