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
} from "../handlers/userRouteHandler";
import { isLoggedIn, isLoggedOut } from "../middleware/userVerify";
import validateToken from "../middleware/validateToken";
const express = require("express");
const router = express.Router();

router.post("/signup", isLoggedOut, handleSignup);
router.get("/:id", validateToken, getUserById);
router.post("/login", isLoggedOut, handleLogin);
router.get("/logout", isLoggedIn, handleLogout);
//TODO add a route to handle google auth
router.get("/googleoauth", oAuthHandler);
router.get("/oauthsuccess", oAuth2Server);
//TODO handle forget password
router.post("/forgetpassword", isLoggedOut, handleForgetPassword);
router.post("/updatepassword", updatePasswordHandler);
router.get("/updatepassword/:token", verifyUpdatePassword);
module.exports = router;
