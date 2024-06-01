import { handleSignin, handleSignup } from "../handlers/userRouteHandler";
const express = require("express");
const router = express.Router();

router.post("/signup", handleSignup);
router.get("/signin", handleSignin);
module.exports = router;
