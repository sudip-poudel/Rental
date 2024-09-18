import {
  handleLogout,
  handleLogin,
  handleSignup,
  oAuthHandler,
  oAuth2Server,
  handleForgetPassword,
  verifyUpdatePassword,
  updatePasswordHandler,
  getUserById,
  handleUpdateUserAvater,
  getCurrentUser,
} from "../handlers/userRouteHandler";
import { isLoggedIn, isLoggedOut } from "../middleware/userVerify";
import validateToken from "../middleware/validateToken";
const express = require("express");
const router = express.Router();
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", isLoggedOut, handleSignup);
router.get("/getUserDetails", validateToken, getCurrentUser);
router.get("/getUserDetails/:id", validateToken, getUserById);
router.post("/login", isLoggedOut, handleLogin);
router.get("/logout", isLoggedIn, handleLogout);
//TODO add a route to handle google auth
router.get("/googleoauth", oAuthHandler);
router.get("/oauthsuccess", oAuth2Server);

/** FORGET PASS ROUTES */
router.post("/forgetpassword", isLoggedOut, handleForgetPassword);
router.post("/updatepassword", updatePasswordHandler);
router.get("/updatepassword/:token", verifyUpdatePassword);

/** UPDATE USER DETAILS */
console.log("test");

router.post(
  "/updateavatar",
  validateToken,
  upload.single("useravatar"),
  handleUpdateUserAvater
);
module.exports = router;
