"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemRouteHandler_1 = require("../handlers/itemRouteHandler");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const express = require("express");
const router = express.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post("/additem", validateToken_1.default, upload.array("photos", 5), itemRouteHandler_1.handlePostItem);
router.get("/getcategory", itemRouteHandler_1.handleGetCategory);
router.get("/item", itemRouteHandler_1.handleGetItem);
router.post("/rentitem", validateToken_1.default, itemRouteHandler_1.handleRentItem);
router.post("/rentitem/changestatus", validateToken_1.default, itemRouteHandler_1.handleRentStatusChange);
router.get("/renteditems/:user", validateToken_1.default, itemRouteHandler_1.handleGetRentedItems);
router.get("/search/:search", itemRouteHandler_1.handleSearch);
router.get("/itemlisted/:user", itemRouteHandler_1.handleGetListedItemsByUser);
router.get("/deleteitem/:itemId", validateToken_1.default, itemRouteHandler_1.handleDeleteItem);
router.get("/rentaldetail/:itemid", validateToken_1.default, itemRouteHandler_1.handleGetRentalDetialsByItemId);
router.get("/item/:categoryId", itemRouteHandler_1.handleGetItemByCategory);
router.get("/:id", itemRouteHandler_1.handleGetItemById);
// router.post()
module.exports = router;
