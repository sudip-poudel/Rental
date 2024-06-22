"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const generateToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET);
    return token;
};
exports.generateToken = generateToken;
