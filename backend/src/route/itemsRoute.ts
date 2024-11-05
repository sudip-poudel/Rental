import {
  handleDeleteItem,
  handleGetCategory,
  handleGetItem,
  handleGetItemByCategory,
  handleGetItemById,
  handleGetListedItemsByUser,
  handleGetRentalDetialsByItemId,
  handleGetRentedItems,
  handlePostItem,
  handleRentItem,
  handleRentStatusChange,
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
router.get("/getcategory", handleGetCategory);

router.get("/item", handleGetItem);
router.post("/rentitem", validateToken, handleRentItem);
router.post("/rentitem/changestatus", validateToken, handleRentStatusChange);
router.get("/renteditems/:user", validateToken, handleGetRentedItems);
router.get("/search/:search", handleSearch);
router.get("/itemlisted/:user", handleGetListedItemsByUser);
router.get("/deleteitem/:itemId", validateToken, handleDeleteItem);
router.get(
  "/rentaldetail/:itemid",
  validateToken,
  handleGetRentalDetialsByItemId
);
router.get("/item/:categoryId", handleGetItemByCategory);

router.get("/:id", handleGetItemById);
// router.post()

module.exports = router;
