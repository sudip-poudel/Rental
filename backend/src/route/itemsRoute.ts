import {
  handleGetCategory,
  handleGetItem,
  handlePostItem,
} from "../handlers/itemRouteHandler";
import validateToken from "../middleware/validateToken";

const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/additem", validateToken, upload.single("photos"), handlePostItem);
router.get("/getcategory", validateToken, handleGetCategory);
router.get("/:id", validateToken, handleGetItem);
module.exports = router;
