import {
  handleLogout,
  handleLogin,
  handleSignup,
} from "../handlers/userRouteHandler";
import { isLoggedIn, isLoggedOut } from "../middleware/userVerify";
const express = require("express");
const router = express.Router();

router.post("/signup", isLoggedOut, handleSignup);
router.post("/login", isLoggedOut, handleLogin);
router.get("/logout", isLoggedIn, handleLogout);
//TODO add a route to handle google auth
module.exports = router;
