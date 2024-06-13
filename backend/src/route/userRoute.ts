import {
  handleLogout,
  handleSignin,
  handleSignup,
} from "../handlers/userRouteHandler";
import { isLoggedIn, isLoggedOut } from "../middleware/userVerify";
const express = require("express");
const router = express.Router();

router.post("/signup", isLoggedOut, handleSignup);
router.get("/signin", isLoggedOut, handleSignin);
router.get("/logout", isLoggedIn, handleLogout);
module.exports = router;
