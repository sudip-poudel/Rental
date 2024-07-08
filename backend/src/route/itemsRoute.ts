import {
  handleGetCategory,
  handleGetItem,
  handleGetItemByCategory,
  handleGetItemById,
  handlePostItem,
  handleRentItem,
  handleSearch,
} from "../handlers/itemRouteHandler";
import validateToken from "../middleware/validateToken";

const express = require("express");
const router = express.Router();

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/additem",
  validateToken,
  upload.array("photos", 5),
  handlePostItem
);
router.get("/getcategory", validateToken, handleGetCategory);

router.get("/item", handleGetItem);
router.post("/rentitem", validateToken, handleRentItem);
router.get("/search/:search", validateToken, handleSearch);
router.get("/item/:categoryId", handleGetItemByCategory);
router.get("/:id", validateToken, handleGetItemById);

module.exports = router;
