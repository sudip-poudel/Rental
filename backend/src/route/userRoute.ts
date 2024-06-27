import {
  handleLogout,
  handleLogin,
  handleSignup,
  oAuthHandler,
  oAuth2Server,
  handleForgetPassword,
} from "../handlers/userRouteHandler";
import { isLoggedIn, isLoggedOut } from "../middleware/userVerify";
const express = require("express");
const router = express.Router();

router.post("/signup", isLoggedOut, handleSignup);
router.post("/login", isLoggedOut, handleLogin);
router.get("/logout", isLoggedIn, handleLogout);
//TODO add a route to handle google auth
router.get("/googleoauth", oAuthHandler);
router.get("/oauthsuccess", oAuth2Server);
//TODO handle forget password
router.post("/forgetpassword", isLoggedOut, handleForgetPassword);
module.exports = router;
