"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRouteHandler_1 = require("../handlers/userRouteHandler");
const userVerify_1 = require("../middleware/userVerify");
const express = require("express");
const router = express.Router();
router.post("/signup", userVerify_1.isLoggedOut, userRouteHandler_1.handleSignup);
router.post("/login", userVerify_1.isLoggedOut, userRouteHandler_1.handleLogin);
router.get("/logout", userVerify_1.isLoggedIn, userRouteHandler_1.handleLogout);
//TODO add a route to handle google auth
router.get("/googleoauth", userRouteHandler_1.oAuthHandler);
router.get("/oauthsuccess", userRouteHandler_1.oAuth2Server);
//TODO handle forget password
router.post("/forgetpassword", userVerify_1.isLoggedOut, userRouteHandler_1.handleForgetPassword);
router.post("/updatepassword", userRouteHandler_1.updatePasswordHandler);
router.get("/updatepassword/:token", userRouteHandler_1.verifyUpdatePassword);
module.exports = router;
