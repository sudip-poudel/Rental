"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHelper = void 0;
const generateToken_1 = require("./generateToken");
const config_1 = require("../config");
const loginHelper = (user, res) => {
    const token = (0, generateToken_1.generateToken)({ id: user.id });
    const stringifiedUserData = JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
    });
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        domain: config_1.BACKEND_URL,
        secure: true,
        sameSite: "none",
        path: "/",
    });
    res.cookie("userdata", stringifiedUserData, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        domain: config_1.BACKEND_URL,
        secure: true,
        sameSite: "none",
        path: "/",
    });
    return { success: true };
};
exports.loginHelper = loginHelper;
