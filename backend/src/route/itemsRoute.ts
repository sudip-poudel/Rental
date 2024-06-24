import { handleGetItem, handlePostItem } from "../handlers/itemRouteHandler";
import validateToken from "../middleware/validateToken";

const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:id", validateToken, handleGetItem);
router.post("/additem", upload.single("photos"), handlePostItem);
module.exports = router;
