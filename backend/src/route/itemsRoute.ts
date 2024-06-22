import { handleGetItem, handlePostItem } from "../handlers/itemRouteHandler";
import validateToken from "../middleware/validateToken";

const express = require("express");
const router = express.Router();

router.get("/:id", validateToken, handleGetItem);
router.post("/additem", handlePostItem);
module.exports = router;
