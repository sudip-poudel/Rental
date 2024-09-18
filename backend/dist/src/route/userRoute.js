"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRouteHandler_1 = require("../handlers/userRouteHandler");
const userVerify_1 = require("../middleware/userVerify");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const express = require("express");
const router = express.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post("/signup", userVerify_1.isLoggedOut, userRouteHandler_1.handleSignup);
router.get("/getUserDetails", validateToken_1.default, userRouteHandler_1.getCurrentUser);
router.get("/getUserDetails/:id", validateToken_1.default, userRouteHandler_1.getUserById);
router.post("/login", userVerify_1.isLoggedOut, userRouteHandler_1.handleLogin);
router.get("/logout", userVerify_1.isLoggedIn, userRouteHandler_1.handleLogout);
//TODO add a route to handle google auth
router.get("/googleoauth", userRouteHandler_1.oAuthHandler);
router.get("/oauthsuccess", userRouteHandler_1.oAuth2Server);
/** FORGET PASS ROUTES */
router.post("/forgetpassword", userVerify_1.isLoggedOut, userRouteHandler_1.handleForgetPassword);
router.post("/updatepassword", userRouteHandler_1.updatePasswordHandler);
router.get("/updatepassword/:token", userRouteHandler_1.verifyUpdatePassword);
/** UPDATE USER DETAILS */
console.log("test");
router.post("/updateavatar", validateToken_1.default, upload.single("useravatar"), userRouteHandler_1.handleUpdateUserAvater);
module.exports = router;
