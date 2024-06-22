"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedOut = exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    if (req.cookies?.token) {
        next();
    }
    return res.status(401);
};
exports.isLoggedIn = isLoggedIn;
const isLoggedOut = (req, res, next) => {
    console.log(req.cookies?.token);
    if (!req.cookies?.token) {
        next();
    }
    return res.status(400);
};
exports.isLoggedOut = isLoggedOut;
