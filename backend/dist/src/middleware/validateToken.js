"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
        console.log(token);
        res.redirect(`${config_1.FRONTEND_URL}/signin`);
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
        return res.status(401).send({ success: false, messege: "Unauthorized" });
    }
    req.params.userId = decoded.id;
    console.log(decoded);
    next();
};
exports.default = validateToken;
